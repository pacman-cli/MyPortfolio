import { Blog } from "@/types"

// Single high-quality static blog post
const BLOGS: Blog[] = [
    {
        id: 3,
        title: "LLM Deep Thinking: Reasoning Models, Techniques, Evaluation, and the Landscape",
        slug: "llm-deep-thinking",
        excerpt: "A comprehensive exploration of how large language models \"think\" — from the internal architecture of reasoning models like o1, R1, and Claude, to practical prompting techniques, rigorous evaluation methods, and a look at where the field is heading.",
        tags: "LLM, Deep Learning, Reasoning, AI Architecture, Prompt Engineering",
        publishedAt: "2026-05-16T10:00:00.000Z",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        content: `
## Introduction

For most of their short history, large language models generated answers in a single pass — one forward propagation through the network, producing one token at a time from left to right with no回头, no revision, no second thoughts. That changed in late 2024.

OpenAI's o1 preview introduced a new paradigm: **reasoning models** that spend extra compute at inference time to generate hidden "thinking" tokens before arriving at an answer. DeepSeek-R1 open-sourced a competitive approach days later. Anthropic added extended thinking to Claude. Google shipped Gemini 2.0 Flash Thinking. By 2026, almost every frontier model has some form of internal reasoning capability.

This article covers the full landscape across four sections:

1. **How reasoning models work** — the architecture and internals of o1, R1, Claude thinking, and others
2. **Practical techniques** — prompting strategies that elicit deeper reasoning from any capable LLM
3. **Evaluating reasoning** — benchmarks, failure modes, and what the numbers don't tell you
4. **The road ahead** — history, open challenges, and future directions

---

## Section 1: Reasoning Models — How "Thinking" Works Under the Hood

### The Standard Paradigm

A conventional LLM generates text through a straightforward loop:

\`\`\`mermaid
flowchart LR
    Q["User Prompt"] --> M["Model Forward Pass"]
    M --> T["Sample next token"]
    T -->|"{append to context}"| M
    T -->|"{<EOS> or length limit}"| Out["Final Output"]
\`\`\`

Each token depends on all previous tokens, but there is no mechanism for the model to "change its mind" or explore alternative paths. The generation is greedy (or slightly randomized via temperature), always moving forward.

### The Reasoning Paradigm

Reasoning models insert an intermediate phase between the prompt and the answer:

\`\`\`mermaid
flowchart LR
    subgraph Encoding["Standard Processing"]
        Q["User Prompt"] --> E["Encode"]
        E --> Gen["Direct Generation"]
        Gen --> Ans["Final Answer"]
    end

    subgraph Reasoning["Reasoning Processing"]
        QR["User Prompt"] --> ER["Encode"]
        ER --> Think["Thinking Phase\n(internal reasoning tokens)"]
        Think --> Revise["Revise / Backtrack"]
        Revise --> Think
        Revise --> AnsR["Final Answer"]
    end

    style Think fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style Revise fill:#b45309,stroke:#fbbf24,color:#e2e8f0
\`\`\`

During the thinking phase, the model generates tokens that are not visible in the final output. These tokens represent intermediate reasoning steps — chains of thought, candidate answers, self-checks, or backtracking markers. The model can rewrite its own reasoning, try alternative approaches, and only commit to a final answer when it has converged on a solution.

### How Each Frontier Model Approaches Reasoning

| Model | Approach | Visible Thinking? | Open Source? | Cost Multiplier |
|-------|----------|:-:|:-:|:-:|
| **OpenAI o1 / o3** | RL from reasoning traces, "private" CoT | No (summarized only) | No | ~2-5x |
| **DeepSeek-R1** | RL via GRPO + cold-start SFT | Yes (optional) | Yes | ~2-3x |
| **Claude Extended Thinking** | Transparent reasoning with token budget | Yes | No | ~2-4x |
| **Gemini 2.0 Flash Thinking** | Hybrid fast/slow reasoning | Yes | No | ~1.5-2x |
| **QwQ (Qwen)** | Open reasoning via SFT + RL | Yes | Yes | ~2x |

> [!NOTE]
> **Why "hidden" thinking?**
> OpenAI keeps o-series reasoning traces private, citing competitive concerns and safety (a visible chain-of-thought could reveal model internals or be manipulated). Anthropic and DeepSeek take the opposite view — transparency builds trust and enables debugging.

### Deep Dive: DeepSeek-R1's GRPO Algorithm

DeepSeek-R1 introduced **Group Relative Policy Optimization (GRPO)**, a reinforcement learning approach that does not require a critic/value model. Instead, it samples multiple reasoning trajectories from the current policy and optimizes based on relative quality within each group.

\`\`\`mermaid
flowchart TD
    Prompt["Prompt"] --> Policy["Policy (model)"]
    Policy --> T1["Trajectory 1"]
    Policy --> T2["Trajectory 2"]
    Policy --> T3["Trajectory 3"]
    Policy --> TN["Trajectory N"]
    T1 --> R1["Reward"]
    T2 --> R2["Reward"]
    T3 --> R3["Reward"]
    TN --> RN["Reward"]
    R1 --> Group["Compute\nGroup Mean & Std"]
    R2 --> Group
    R3 --> Group
    RN --> Group
    Group --> Advantage["Advantage =\n(reward - mean) / std"]
    Advantage --> Update["Policy Gradient\n(advantage-weighted)"]
    Update --> Policy
\`\`\`

The key insight: by normalizing rewards within each group, GRPO eliminates the need for a separate value network (critic), dramatically reducing memory and compute requirements during training.

---

## Section 2: Practical Techniques for Deeper Reasoning

You don't need a reasoning model to get better reasoning. These techniques work with any capable LLM and can be combined for additive gains.

### 1. Chain-of-Thought (CoT) Prompting

The simplest and most reliable technique. Elicit step-by-step reasoning by asking the model to think before answering.

**Zero-shot CoT** — just append to your prompt:

> [!TIP]
> **Zero-shot CoT Template**
> \\\`\\\`
> {question}
>
> Let's think through this step by step.
> \\\`\\\`

**Few-shot CoT** — provide examples with explicit reasoning:

> [!TIP]
> **Few-shot CoT Template**
> \\\`\\\`
> Q: {example question}
> A: {step-by-step reasoning} Therefore, the answer is {answer}.
>
> Q: {target question}
> A:
> \\\`\\\`

### 2. Self-Consistency

Generate multiple reasoning chains independently, then take a majority vote on the final answer. Simple, parallelizable, and empirically robust.

\`\`\`python
import openai  # or any API client

def self_consistency(prompt, n=5, temperature=0.7):
    responses = []
    for _ in range(n):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
        )
        responses.append(parse_answer(response.choices[0].message.content))

    # Majority vote
    from collections import Counter
    final_answer = Counter(responses).most_common(1)[0][0]
    return final_answer, responses
\`\`\`

**Trade-off**: Self-consistency multiplies cost by N. For math/reasoning tasks, accuracy typically plateaus at N=5-10. Beyond that, diminishing returns set in.

### 3. Tree-of-Thoughts (ToT)

Instead of a single reasoning chain, ToT explores multiple paths simultaneously, using a search algorithm (typically BFS or DFS) to explore, evaluate, and prune branches.

\`\`\`mermaid
flowchart TD
    Root["Initial Thought"] --> B1["Branch A\n'Let me calculate...'"]
    Root --> B2["Branch B\n'Let me look up...'"]
    Root --> B3["Branch C\n'Let me decompose...'"]
    B1 --> B1a["A1: 42"]
    B1 --> B1b["A2: 43"]
    B2 --> B2a["B1: 'The formula is...'"]
    B2 --> B2b["B2: 'Wait, different formula...'"]
    B3 --> B3a["C1: Step 1 done"]
    B3 --> B3b["C2: Step 2 reveals..."]

    B1a -.->|"PRUNE (low score)"| X1["✗"]
    B1b -->|"Selected"| Final1["Final: 43 ✓"]
    B2b -->|"Selected"| Final2["Final via formula ✓"]
    B3b -->|"Selected"| Final3["Final via decomposition ✓"]

    style B1a fill:#dc2626,stroke:#fca5a5,color:#e2e8f0
    style X1 fill:#dc2626,stroke:#fca5a5,color:#e2e8f0
    style Final1 fill:#16a34a,stroke:#86efac,color:#e2e8f0
    style Final2 fill:#16a34a,stroke:#86efac,color:#e2e8f0
    style Final3 fill:#16a34a,stroke:#86efac,color:#e2e8f0
\`\`\`

ToT is powerful for tasks with clear intermediate states (math problems, puzzle solving, planning) but requires a way to evaluate each branch — typically by asking the LLM itself to score the progress of each partial solution.

### 4. Reflexion / Self-Critique

The model generates an answer, evaluates its own reasoning, identifies errors, and regenerates. This creates a feedback loop that often converges on better answers.

\`\`\`mermaid
sequenceDiagram
    participant User
    participant LLM
    participant Eval as "Self-Evaluator"

    User->>LLM: "Solve this problem"
    LLM->>LLM: Generate initial reasoning
    LLM->>Eval: "Critique your answer"
    Eval->>Eval: Check for errors, assumptions, completeness
    Eval-->>LLM: "Issue found: step 2 assumes..."
    LLM->>LLM: Regenerate with feedback
    LLM->>Eval: "Critique revised answer"
    Eval-->>LLM: "All steps verified ✓"
    LLM->>User: Final answer
\`\`\`

> [!TIP]
> **Self-Critique Prompt Template**
> \\\`\\\`
> {question}
>
> Let me think through this step by step:
> {model's reasoning}
>
> Now, critically evaluate your reasoning above. Check:
> 1. Are all assumptions valid?
> 2. Are the calculations correct?
> 3. Could there be alternative interpretations?
>
> If you find any issues, provide a corrected version.
> \\\`\\\`

### Putting It All Together

These techniques are complementary. A practical pipeline might combine them:

| Step | Technique | Purpose |
|------|-----------|---------|
| 1 | Few-shot CoT | Establish reasoning patterns |
| 2 | Self-consistency (N=5) | Reduce variance |
| 3 | Self-critique on top-2 | Refine best candidates |
| 4 | Final selection | Human or LLM judge |

---

## Section 3: Evaluating LLM Reasoning Quality

### The Benchmark Landscape

When someone says "model X is better at reasoning," they usually mean it scores higher on one or more of these benchmarks:

| Benchmark | Domain | Key Challenge | 2024 SOTA | 2025-6 SOTA |
|-----------|--------|:-:|:-:|:-:|
| **GSM8K** | Grade-school math | Multi-step arithmetic | 95% | 97% |
| **MATH** | Competition math | Complex symbolic reasoning | 84% | 94% |
| **MMLU-Pro** | Broad knowledge (57 subjects) | Expert-level QA | 72% | 82% |
| **GPQA** | Graduate-level Q&A | PhD-level science | 65% | 81% |
| **ARC-AGI-2** | Visual abstract reasoning | Novel puzzle generalization | 35% | 58% |
| **LiveBench** | Adversarial evaluation | Contamination-resistant | N/A | Leaderboard |

> [!WARNING]
> **Benchmark data can be contaminated.**
> If a model was trained on GSM8K examples (or very similar problems), a high score may reflect memorization rather than reasoning ability. Adversarial benchmarks like LiveBench and ARC-AGI-2 are designed to resist contamination by using fresh, non-public questions.

### What Benchmarks Miss

Benchmarks measure final-answer accuracy. They do not capture:

1. **Trace quality** — Is the reasoning logically sound even if the answer is wrong? Does the model take a correct but brittle path?
2. **Faithfulness** — Does the reasoning actually produce the answer, or does the model rationalize a correct guess?
3. **Reward hacking** — Some models learn to generate long, plausible-sounding chains that happen to produce correct answers, even when individual steps are invalid. This is a growing concern as models are optimized for RL rewards based on final answers.
4. **Cost efficiency** — A model that achieves 90% accuracy at 10x the cost may be less useful in practice than one with 85% at 1x cost.

### Evaluation Pipeline

\`\`\`mermaid
flowchart LR
    DS["Test Dataset"] --> Q["Questions"]
    Q --> Model["LLM Under Test"]
    Model --> Raw["Raw Outputs"]
    Raw --> Ext["Answer Extraction\n(regex / parser)"]
    Ext --> Comp["Compare vs\nGround Truth"]
    Comp --> Report["Accuracy Report"]

    Raw --> Eval2["Trace Evaluation\n(LLM-as-Judge)"]
    Eval2 --> Rep2["Quality Report\n(coherence, soundness)"]

    style DS fill:#1e40af,stroke:#3b82f6,color:#e2e8f0
    style Model fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style Report fill:#16a34a,stroke:#86efac,color:#e2e8f0
    style Rep2 fill:#16a34a,stroke:#86efac,color:#e2e8f0
\`\`\`

A robust evaluation should include both an **accuracy score** (from automated answer comparison) and a **quality score** (from trace evaluation, ideally done by a separate LLM judge or human annotators).

### Evaluation Frameworks

| Framework | Type | Strengths |
|-----------|------|-----------|
| **LM-eval-harness** | Benchmark runner | Standardized, widely used, supports 200+ benchmarks |
| **LLM-as-Judge** | Quality evaluator | Scalable, captures nuance, but biased toward the judging model |
| **Process Reward Models** | Step-by-step verifier | Detects flawed reasoning even when final answer is correct |
| **Human evaluation** | Gold standard | Most accurate, but slow and expensive |

> [!TIP]
> **Practical recommendation**
> For regular evaluation, use LM-eval-harness on a diverse set of benchmarks (include at least one math, one knowledge, and one adversarial benchmark). Supplement with LLM-as-Judge for trace quality on a 200-sample subset. Reserve human eval for major model releases.

---

## Section 4: History, Open Challenges, and the Road Ahead

### A Brief Timeline

\`\`\`mermaid
flowchart TD
    subgraph Era1["Era 1: Emergence"]
        GPT3["2020: GPT-3\n175B params, few-shot"]
        Instruct["2022: InstructGPT\nRLHF + Instruction Following"]
        ChatGPT["Nov 2022: ChatGPT\nChat interface mass adoption"]
    end

    subgraph Era2["Era 2: Capability"]
        GPT4["Mar 2023: GPT-4\nImproved reasoning, longer context"]
        Claude3["Mar 2024: Claude 3\nVision, nuanced reasoning"]
        GPT4o["May 2024: GPT-4o\nMultimodal, real-time"]
    end

    subgraph Era3["Era 3: Reasoning"]
        o1preview["Sep 2024: o1 Preview\nFirst reasoning model"]
        QwQ["Nov 2024: QwQ\nOpen-source reasoning"]
        R1["Jan 2025: DeepSeek-R1\nOpen reasoning RL breakthrough"]
        o3["2025: o3\nFrontier reasoning"]
        ClaudeThink["2025: Claude Extended Thinking"]
        GeminiThink["2025: Gemini 2.0 Flash Thinking"]
        Now["2026: Continued evolution\nAgentic reasoning, tool-use,\nself-improving systems"]
    end

    GPT3 --> Instruct
    Instruct --> ChatGPT
    ChatGPT --> GPT4
    GPT4 --> Claude3
    Claude3 --> GPT4o
    GPT4o --> o1preview
    o1preview --> QwQ
    QwQ --> R1
    R1 --> o3
    o3 --> ClaudeThink
    ClaudeThink --> GeminiThink
    GeminiThink --> Now

    style Era1 fill:#1e293b,stroke:#64748b,color:#e2e8f0
    style Era2 fill:#1e293b,stroke:#64748b,color:#e2e8f0
    style Era3 fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style Now fill:#16a34a,stroke:#86efac,color:#e2e8f0
\`\`\`

### Open Challenges

Despite rapid progress, fundamental problems remain unsolved:

1. **Formal verification of reasoning** — Can we prove that a model's reasoning chain is logically valid? Current approaches (PRMs, self-evaluation) are probabilistic, not rigorous.

2. **Scaling test-time compute** — More thinking tokens generally improve accuracy, but the relationship is noisy. Some problems benefit from 10x compute; others plateau at 1x. We lack reliable predictors for optimal compute allocation per query.

3. **Agentic reasoning** — Reasoning models that use tools (code execution, search, APIs) introduce new failure modes: the model can hallucinate tool outputs, get stuck in tool-calling loops, or take unsafe actions based on flawed reasoning.

4. **Hallucination in long chains** — The longer the reasoning trace, the more opportunities for the model to introduce factual errors. Early evidence suggests reasoning models hallucinate *more* than standard models on certain knowledge-intensive tasks because they spend more time generating plausible-sounding but incorrect explanations.

5. **Self-improving reasoning** — Can models improve their own reasoning without human data? Approaches like STaR (Self-Taught Reasoner) and V-StaR show promise, but the gains are still bounded by the model's existing knowledge.

### Future Directions

- **Constitutional AI via reasoning** — Models that reason about safety constraints internally before generating responses, rather than relying on external guardrails.
- **Multi-modal reasoning** — Combining visual, audio, and text reasoning in a unified thinking process.
- **Synthetic data flywheels** — Using reasoning models to generate high-quality training data for smaller models, compressing reasoning capability into cheaper-to-run architectures.
- **Compute-optimal inference** — Dynamically allocating thinking compute based on problem difficulty, query cost budget, and latency requirements.

---

## Conclusion

The shift from single-pass generation to multi-step reasoning is the most significant change in LLM architecture since the transformer. It changes not just what models can do, but *how* they do it — from pattern-matching engines to systems that can explore, evaluate, and revise their own thoughts.

**Key takeaways:**

1. **Reasoning models are a paradigm shift, not an incremental improvement.** The architecture fundamentally changes the reliability ceiling for complex tasks.

2. **Techniques are model-agnostic.** Chain-of-thought, self-consistency, and reflexion work across all capable models. Invest in prompt engineering alongside model selection.

3. **Evaluation is the hardest problem.** Don't trust a single benchmark. Combine accuracy metrics with trace quality evaluation for a complete picture.

4. **The gap is narrowing.** Open-source reasoning models (DeepSeek-R1, QwQ) are closing the gap with closed models faster than many expected. The best time to start reasoning with LLMs was 2024. The second-best time is now.

Experiment with these techniques. Run your own evaluations. The field moves fast, but the fundamentals — clear thinking, careful evaluation, and systematic iteration — remain timeless.
    `,
    },
    {
        id: 2,
        title: "Unlocking Spring Security: Authentication Pipeline & Bean Connections",
        slug: "spring-security-architecture-linkedin",
        excerpt: "A visual deep dive into how Spring Security processes requests under the hood, featuring a detailed pipeline diagram and key configuration concepts every backend engineer should understand.",
        tags: "Spring Security, Backend, Architecture, Java",
        publishedAt: "2024-05-20T09:00:00.000Z",
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
        content: `
## Introduction

For years, I configured Spring Security by copying snippets from tutorials — a \`SecurityFilterChain\` bean here, an \`AuthenticationManager\` there — without truly understanding how the pieces connected. So I decided to dig deeper.

This article captures what I learned about the Spring Security authentication pipeline and how each component fits together. If you have been configuring Spring Security blindly like I did, this visual breakdown will be a game changer.

---

## The Authentication Pipeline

Every request that hits a Spring Boot application passes through a chain of filters before reaching your controller. Spring Security plugs into this chain and intercepts requests that require authentication.

Here is the complete flow:

\`\`\`mermaid
flowchart TD
    Req["HTTP Request"] --> SFC["SecurityFilterChain\n(Chain of Security Filters)"]

    subgraph Filters["Security Filters"]
        direction TB
        AAF["UsernamePasswordAuthenticationFilter\n(Credentials → Auth Token)"]
        CSF["CsrfFilter\n(CSRF Token Validation)"]
        AAF --> AM["AuthenticationManager\n(Coordinator)"]
        AM --> AP["AuthenticationProvider\n(e.g. DaoAuthenticationProvider)"]
        AP --> UDS["UserDetailsService\n(Load user from DB)"]
        AP --> PE["PasswordEncoder\n(Verify password hash)"]
        UDS --> PE
        PE -->|"Valid ✓"| SC["SecurityContextHolder\nSet Authentication object"]
        SC -->|"Authenticated"| C["@Controller / @RestController"]
        PE -->|"Invalid ✗"| F["401 Unauthorized"]
    end

    AAF -->|"Bypass for\npublic endpoints"| C

    style Req fill:#1e40af,stroke:#3b82f6,color:#e2e8f0
    style SFC fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style AM fill:#b45309,stroke:#fbbf24,color:#e2e8f0
    style SC fill:#16a34a,stroke:#86efac,color:#e2e8f0
    style F fill:#dc2626,stroke:#fca5a5,color:#e2e8f0
    style C fill:#047857,stroke:#34d399,color:#e2e8f0
\`\`\`

---

## Key Concepts

### SecurityFilterChain

The backbone of Spring Security. Every HTTP request passes through a configured chain of filters — authentication, authorization, CSRF protection, CORS, exception handling, and more. Each filter has a single responsibility and can decide to pass the request to the next filter or short-circuit with a response.

\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .formLogin(Customizer.withDefaults())
        .httpBasic(Customizer.withDefaults());
    return http.build();
}
\`\`\`

### AuthenticationManager

Acts as the central coordinator. It receives an authentication request (typically a username/password token) and delegates validation to one or more configured \`AuthenticationProvider\` instances. If no provider can authenticate the request, an \`AuthenticationException\` is thrown.

### AuthenticationProvider (DaoAuthenticationProvider)

The most commonly used provider. It:
1. Delegates user lookup to \`UserDetailsService\`
2. Delegates password verification to \`PasswordEncoder\`
3. Returns a fully populated \`Authentication\` object on success

### PasswordEncoder (BCrypt)

Passwords should never be stored in plain text. BCrypt is the default and recommended encoder — it applies a salt and multiple hash rounds, making brute-force attacks computationally expensive.

\`\`\`java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
\`\`\`

### Session Management

Controls how HTTP sessions are created and maintained after authentication. For stateful applications (traditional server-rendered apps), sessions track the authenticated user across requests. For stateless APIs (REST backends), JWT tokens replace session-based tracking.

\`\`\`java
http.sessionManagement(session -> session
    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // For REST APIs
);
\`\`\`

### CSRF Protection

Cross-Site Request Forgery protection is enabled by default in Spring Security. It ensures that requests modifying state (POST, PUT, DELETE) include a token that an attacker cannot forge. For stateless APIs using JWT, CSRF protection is typically disabled since tokens serve as the anti-forgery mechanism.

---

## The Biggest Realization

Before this deep dive, I assembled security configurations like a puzzle without the picture on the box. Now I see the full picture:

1. **The SecurityFilterChain** is the entry point — every request flows through it
2. **Filters extract credentials** and pass them to the AuthenticationManager
3. **The AuthenticationManager delegates** to a provider that knows how to validate
4. **UserDetailsService + PasswordEncoder** form the final authority on "is this user real?"
5. **On success**, the SecurityContextHolder is populated — this is what \`@AuthenticationPrincipal\` and \`SecurityContextHolder.getContext().getAuthentication()\` read from

Understanding this flow means you can debug authentication issues confidently, customize any part of the pipeline, and move from "copy-paste security" to "designed security."

---

> [!TIP]
> This article was originally posted on LinkedIn. If you found it helpful, feel free to connect and share your thoughts.
>
> [View the original LinkedIn post →](https://www.linkedin.com/posts/iampuspo_today-i-deep-dived-into-how-spring-security-share-7430609877632237568-D53Q)
    `,
    },
    {
        id: 1,
        title: "Microservices in Spring Boot: Architecture, Design Patterns, and Production Practices",
        slug: "microservices-spring-boot-architecture",
        excerpt: "Building scalable, resilient systems using Spring Boot, Spring Cloud, and modern infrastructure patterns. A comprehensive guide for backend engineers.",
        content: `
## Introduction

Microservices architecture has become the de facto standard for building scalable, resilient, and maintainable applications. In this comprehensive guide, we'll explore how to leverage the power of **Spring Boot** and **Spring Cloud** to build a robust microservices ecosystem.

### Monolith vs. Microservices

| Feature | Monolithic Architecture | Microservices Architecture |
| :--- | :--- | :--- |
| **Deployment** | Single unit | Independent services |
| **Scaling** | Scale everything | Scale individual components |
| **Complexity** | Low initially, high over time | High initially, managed over time |
| **Tech Stack** | Single stack | Polyglot (can use best tool for job) |

> [!TIP]
> **When to adopt Microservices?**
> Don't start with microservices. Start with a modular monolith. Move to microservices only when specific domains need independent scaling or team velocity is hindered by the monolith.

---

## High-Level Architecture Overview

Before diving into each component, here's how all the pieces fit together in a typical Spring Boot microservices ecosystem:

\`\`\`mermaid
flowchart TD
    Client["Client (Browser / Mobile)"]
    Gateway["API Gateway\n(Spring Cloud Gateway)\nRouting · Auth · Rate Limiting"]
    Order["Order Service"]
    Payment["Payment Service"]
    Inventory["Inventory Service"]
    Notification["Notification Service"]
    Broker["Message Broker\n(Kafka / RabbitMQ)"]
    Eureka["Eureka Service Registry"]
    DB["DB (Per Service)"]

    Client --> Gateway
    Gateway --> Order
    Gateway --> Payment
    Gateway --> Inventory
    Gateway --> Notification
    Order --> DB
    Payment --> Broker
    Inventory --> Broker
    Notification --> Broker
    Order -.-> Eureka
    Payment -.-> Eureka
    Inventory -.-> Eureka
    Notification -.-> Eureka

    style Client fill:#1e40af,stroke:#3b82f6,color:#e2e8f0
    style Gateway fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style Order fill:#047857,stroke:#34d399,color:#e2e8f0
    style Payment fill:#047857,stroke:#34d399,color:#e2e8f0
    style Inventory fill:#047857,stroke:#34d399,color:#e2e8f0
    style Notification fill:#047857,stroke:#34d399,color:#e2e8f0
    style Broker fill:#b45309,stroke:#fbbf24,color:#e2e8f0
    style Eureka fill:#be185d,stroke:#f472b6,color:#e2e8f0
    style DB fill:#1e293b,stroke:#64748b,color:#e2e8f0
\`\`\`

---

## Core Microservices Components

A robust microservices architecture relies on several key components working in harmony.

### 1. Service Discovery (Eureka)

In a dynamic environment where service instances come and go, hardcoding IP addresses is impossible. **Spring Cloud Netflix Eureka** acts as a phone book — services register themselves on startup, and other services look them up by name instead of address.

#### How Eureka Works

Eureka follows a **client-server** model:
1. **Eureka Server**: A standalone registry that maintains a list of all available service instances.
2. **Eureka Clients**: Each microservice registers itself with the server on startup and sends periodic **heartbeats** (every 30 seconds by default) to signal it's still alive.
3. **Discovery**: When Service A needs to call Service B, it asks the Eureka Server for the current list of healthy Service B instances.

\`\`\`mermaid
flowchart TD
    Eureka["EUREKA SERVER\n(Service Registry)"]
    Registry["Registry Table:\n\norder-service → 192.168.1.10, .11\ninventory-service → 192.168.1.20\npayment-service → 192.168.1.30, .31"]
    OrderSvc["Order Service\n(Eureka Client)"]
    InvSvc["Inventory Service\n(Eureka Client)"]

    Eureka --- Registry
    OrderSvc -->|"(1) Register\n+ Heartbeat"| Eureka
    InvSvc -->|"(2) Discover\n+ Fetch List"| Eureka
    OrderSvc -->|"(3) Call by name"| InvSvc

    style Eureka fill:#be185d,stroke:#f472b6,color:#e2e8f0
    style Registry fill:#1e293b,stroke:#64748b,color:#94a3b8
    style OrderSvc fill:#047857,stroke:#34d399,color:#e2e8f0
    style InvSvc fill:#047857,stroke:#34d399,color:#e2e8f0
\`\`\`

#### Setting Up the Eureka Server

First, add the dependency to your \`pom.xml\`:

\`\`\`java
// pom.xml (Eureka Server)
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
\`\`\`

Then, enable the server with a single annotation:

\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}
\`\`\`

Configure \`application.yml\` for the Eureka Server:

\`\`\`java
// application.yml (Eureka Server)
server:
  port: 8761

eureka:
  client:
    register-with-eureka: false   # Server doesn't register with itself
    fetch-registry: false         # Server doesn't need to fetch its own registry
  server:
    enable-self-preservation: true
    eviction-interval-timer-in-ms: 5000
\`\`\`

> [!NOTE]
> **Self-Preservation Mode**
> When Eureka detects that too many clients have stopped sending heartbeats (e.g., due to a network partition), it enters self-preservation mode and stops evicting instances. This prevents cascade failures from wiping the registry during temporary network issues.

#### Registering a Microservice as an Eureka Client

Each microservice needs the client dependency:

\`\`\`java
// pom.xml (Eureka Client)
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

And the configuration:

\`\`\`java
// application.yml (e.g., Order Service)
spring:
  application:
    name: order-service     # This is the name other services use to discover it

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
    instance-id: \${spring.application.name}:\${random.value}
\`\`\`

#### Service-to-Service Communication via Eureka

Once registered, services can call each other **by name** instead of hardcoded URLs. Use a load-balanced \`RestTemplate\` or \`WebClient\`:

\`\`\`java
@Bean
@LoadBalanced   // Enables service name resolution via Eureka
public RestTemplate restTemplate() {
    return new RestTemplate();
}

// Usage — "inventory-service" is the spring.application.name
String url = "http://inventory-service/api/v1/stock/{productId}";
StockResponse stock = restTemplate.getForObject(url, StockResponse.class, productId);
\`\`\`

The \`@LoadBalanced\` annotation integrates with Spring Cloud LoadBalancer, which fetches the list of instances from Eureka and distributes requests using **round-robin** by default.

#### Eureka Dashboard

Once running, the Eureka Server provides a built-in dashboard at \`http://localhost:8761\`. It shows:
- All registered services and their instances
- Instance health status (UP, DOWN, OUT_OF_SERVICE)
- Self-preservation mode status
- Lease expiration and renewal information

| Eureka Config Property | Default | Purpose |
| :--- | :--- | :--- |
| \`lease-renewal-interval-in-seconds\` | 30 | How often the client sends heartbeats |
| \`lease-expiration-duration-in-seconds\` | 90 | How long the server waits before evicting |
| \`registry-fetch-interval-seconds\` | 30 | How often clients refresh their local cache |
| \`enable-self-preservation\` | true | Prevents mass eviction during network partitions |

> [!TIP]
> **Production Best Practice**
> Run **at least two Eureka Server instances** in a peer-aware setup for high availability. Configure them to register with each other so the registry survives a single-node failure.

### 2. API Gateway (Spring Cloud Gateway)

The Gateway is the single entry point for all client requests. It handles routing, security, and rate limiting.

\`\`\`mermaid
flowchart TD
    Client["CLIENT"]
    Gateway["API GATEWAY :8080"]
    Route["Route Matching"]
    Auth["Auth Filter"]
    RateLimit["Rate Limiter"]
    CB["Circuit Breaker"]
    OrderSvc["Order Service"]
    PaySvc["Payment Service"]
    InvSvc["Inventory Service"]

    Client -->|"GET /api/orders/123"| Gateway
    Gateway --> Route
    Route --> Auth
    Auth --> RateLimit
    RateLimit --> CB

    CB -->|"/api/orders/**"| OrderSvc
    CB -->|"/api/payments/**"| PaySvc
    CB -->|"/api/stock/**"| InvSvc

    style Client fill:#1e40af,stroke:#3b82f6,color:#e2e8f0
    style Gateway fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style Route fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
    style Auth fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
    style RateLimit fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
    style CB fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
    style OrderSvc fill:#047857,stroke:#34d399,color:#e2e8f0
    style PaySvc fill:#047857,stroke:#34d399,color:#e2e8f0
    style InvSvc fill:#047857,stroke:#34d399,color:#e2e8f0
\`\`\`

**Key responsibilities:**
- **Routing**: Forwarding requests to the correct service.
- **Security**: Authentication and authorization (OAuth2).
- **Resilience**: Retry logic and circuit breaking.

### 3. Inter-service Communication

Services often need to talk to each other.
- **Synchronous**: REST (using \`RestClient\` or \`WebClient\`) or Feign Client.
- **Asynchronous**: Event-driven architecture using Kafka or RabbitMQ.

#### OpenFeign — Declarative REST Client

While \`RestTemplate\` and \`WebClient\` work, they require boilerplate code for every service call. **Spring Cloud OpenFeign** takes a different approach — you declare an interface, and Feign generates the HTTP client for you. Combined with Eureka, it automatically resolves service names and load-balances requests.

\`\`\`mermaid
flowchart TD
    subgraph OrderService["ORDER SERVICE"]
        Call["OrderService.java\ninventoryClient.getStock('P001')"]
        FeignIF["InventoryClient Interface\n@FeignClient('inventory-service')"]
        LB["Spring Cloud LoadBalancer\n(Round Robin / Weighted)"]
    end

    Eureka["EUREKA SERVER\nReturns: 192.168.1.20, .21"]
    Inst1["Inventory Instance 1\n:8081"]
    Inst2["Inventory Instance 2\n:8082"]

    Call -->|"(1) Method call"| FeignIF
    FeignIF -->|"(2) Auto-generates HTTP client"| LB
    LB -->|"(3) Lookup in Eureka"| Eureka
    Eureka -->|"(4) HTTP GET /api/v1/stock/P001"| Inst1
    Eureka -->|"(4) HTTP GET /api/v1/stock/P001"| Inst2

    style Call fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
    style FeignIF fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style LB fill:#1e40af,stroke:#3b82f6,color:#e2e8f0
    style Eureka fill:#be185d,stroke:#f472b6,color:#e2e8f0
    style Inst1 fill:#047857,stroke:#34d399,color:#e2e8f0
    style Inst2 fill:#047857,stroke:#34d399,color:#e2e8f0
\`\`\`

**Add the dependency:**

\`\`\`java
// pom.xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
\`\`\`

**Enable Feign in your main application:**

\`\`\`java
@SpringBootApplication
@EnableFeignClients   // Scans for @FeignClient interfaces
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
\`\`\`

#### Defining a Feign Client

Create an interface that mirrors the target service's API. Feign handles the rest:

\`\`\`java
@FeignClient(name = "inventory-service")  // Matches the spring.application.name in Eureka
public interface InventoryClient {

    @GetMapping("/api/v1/stock/{productId}")
    StockResponse getStock(@PathVariable("productId") String productId);

    @PostMapping("/api/v1/stock/reserve")
    ReservationResponse reserveStock(@RequestBody ReserveRequest request);

    @GetMapping("/api/v1/stock/bulk")
    List<StockResponse> getBulkStock(@RequestParam("ids") List<String> productIds);
}
\`\`\`

**Usage in a service — just inject and call:**

\`\`\`java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final InventoryClient inventoryClient;

    public OrderResponse createOrder(OrderRequest request) {
        // Feign handles: Eureka lookup → load balancing → HTTP call → deserialization
        StockResponse stock = inventoryClient.getStock(request.getProductId());

        if (!stock.isAvailable()) {
            throw new InsufficientStockException("Product out of stock");
        }

        inventoryClient.reserveStock(new ReserveRequest(request.getProductId(), request.getQuantity()));
        return orderRepository.save(Order.from(request)).toResponse();
    }
}
\`\`\`

> [!TIP]
> **Why Feign over RestTemplate?**
> - **No boilerplate** — no URL construction, no \`getForObject()\` calls, no manual deserialization.
> - **Type-safe** — compile-time checking of request/response types.
> - **Built-in integration** — works seamlessly with Eureka, LoadBalancer, and Circuit Breakers.
> - **Readable** — the interface reads like API documentation.

#### Feign with Fallbacks (Resilience)

Combine Feign with **Resilience4j** to handle failures gracefully:

\`\`\`java
@FeignClient(
    name = "inventory-service",
    fallback = InventoryFallback.class
)
public interface InventoryClient {
    @GetMapping("/api/v1/stock/{productId}")
    StockResponse getStock(@PathVariable("productId") String productId);
}

@Component
public class InventoryFallback implements InventoryClient {
    @Override
    public StockResponse getStock(String productId) {
        // Return a safe default when inventory-service is down
        return StockResponse.builder()
            .productId(productId)
            .available(false)
            .message("Inventory service temporarily unavailable")
            .build();
    }
}
\`\`\`

#### Feign Configuration

Customize timeouts, logging, and retry behavior per client:

\`\`\`java
// application.yml
spring:
  cloud:
    openfeign:
      client:
        config:
          default:                    # Applies to all Feign clients
            connect-timeout: 5000
            read-timeout: 5000
            logger-level: basic
          inventory-service:          # Override for a specific client
            connect-timeout: 3000
            read-timeout: 10000
            logger-level: full        # Logs headers, body, and metadata
\`\`\`

| Feign Logger Level | What It Logs |
| :--- | :--- |
| **NONE** | No logging (default) |
| **BASIC** | Request method, URL, response status, and execution time |
| **HEADERS** | Basic + request/response headers |
| **FULL** | Headers + request/response body (use only in development) |

#### Feign with Request Interceptors

Pass authentication tokens or custom headers automatically to all downstream calls:

\`\`\`java
@Bean
public RequestInterceptor authInterceptor() {
    return template -> {
        // Forward the JWT token from the current request context
        String token = SecurityContextHolder.getContext()
            .getAuthentication().getCredentials().toString();
        template.header("Authorization", "Bearer " + token);
    };
}
\`\`\`

> [!WARNING]
> **Feign is Synchronous**
> Feign clients are blocking by default. For high-throughput scenarios where you don't need the response immediately, prefer **asynchronous** communication via message queues (Kafka, RabbitMQ). Use Feign for request-reply patterns where you need the result right away.

> [!WARNING]
> **Avoid Distributed Transactions**
> Trying to maintain ACID properties across services is a recipe for disaster. Use **Sagas** or **Eventual Consistency** patterns instead.

---

## Resilience & Observability

Distributed systems fail. It's not a matter of *if*, but *when*.

### Circuit Breaker (Resilience4j)

Prevent cascading failures by failing fast when a dependent service is down.

\`\`\`mermaid
stateDiagram-v2
    [*] --> CLOSED
    CLOSED --> OPEN : Failure rate exceeds threshold
    OPEN --> HALF_OPEN : Wait timeout expires
    HALF_OPEN --> CLOSED : Probe succeeds
    HALF_OPEN --> OPEN : Probe fails

    note right of CLOSED
        Normal Operation
        All requests pass through
        Failures are counted
    end note
    note right of OPEN
        Failing Fast
        Requests rejected immediately
        Routed to fallback
    end note
    note right of HALF_OPEN
        Testing Recovery
        Limited test requests sent
        Evaluating service health
    end note
\`\`\`

- **CLOSED**: All requests pass through normally. Failures are counted.
- **OPEN**: All requests are immediately rejected and routed to the fallback. No calls hit the failing service.
- **HALF-OPEN**: After a wait period, a few test requests are allowed through. If they succeed, the breaker closes. If they fail, it opens again.

\`\`\`java
@CircuitBreaker(name = "inventory", fallbackMethod = "fallbackInventory")
public String getInventoryStatus(String productId) {
    return inventoryClient.getStatus(productId);
}

public String fallbackInventory(String productId, Throwable t) {
    return "Inventory Temporarily Unavailable";
}
\`\`\`

### Distributed Tracing

With requests jumping between multiple services, debugging is hard. Tools like **Zipkin** or **Jaeger** (via Micrometer Tracing) are essential to visualize the request path.

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant Gateway as API Gateway
    participant Order as Order Service
    participant Inventory as Inventory Service
    participant Payment as Payment Service
    participant ExtAPI as External Payment API

    Client->>Gateway: Request (Trace: abc-123)
    Gateway->>Order: Span 1 (2ms)
    Order->>Inventory: Span 3 via Feign (8ms)
    Inventory->>Inventory: DB Query - Span 4 (3ms)
    Inventory-->>Order: Stock Response
    Order->>Payment: Span 5 via Feign (45ms)
    Payment->>ExtAPI: Span 6 (38ms)
    ExtAPI-->>Payment: Payment Confirmed
    Payment-->>Order: Payment Response
    Order-->>Gateway: Order Created
    Gateway-->>Client: 201 Created (Total: 62ms)
\`\`\`

Each **span** represents a unit of work. The **trace** connects all spans for a single request, making it easy to pinpoint exactly where latency or failures occur.

---

## Deployment & Scalability

### Docker & Kubernetes

Containerization is non-negotiable. Each Spring Boot application should be packaged as a Docker container.

\`\`\`dockerfile
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
\`\`\`

**Kubernetes (K8s)** orchestrates these containers, handling:
- **Auto-scaling**: Based on CPU/Memory usage.
- **Self-healing**: Restarting crashed containers.
- **Load Balancing**: Distributing traffic.

\`\`\`mermaid
flowchart TD
    subgraph Cluster["Kubernetes Cluster"]
        subgraph NS["Namespace: production"]
            Pod1["Pod 1\nOrder Service"]
            Pod2["Pod 2\nOrder Service"]
            SVC["K8s Service\n(Load Balancer)\nClusterIP / NodePort"]
            HPA["HPA Auto-Scaler\nmin: 2, max: 10\nCPU target: 70%"]
        end
        subgraph Ingress["Ingress Controller"]
            R1["api.puspo.online → order-service"]
            R2["api.puspo.online/pay → payment-service"]
        end
    end

    Pod1 --> SVC
    Pod2 --> SVC
    HPA -.->|"scales"| Pod1
    HPA -.->|"scales"| Pod2
    Ingress -->|"routes"| SVC

    style Pod1 fill:#047857,stroke:#34d399,color:#e2e8f0
    style Pod2 fill:#047857,stroke:#34d399,color:#e2e8f0
    style SVC fill:#1e40af,stroke:#3b82f6,color:#e2e8f0
    style HPA fill:#b45309,stroke:#fbbf24,color:#e2e8f0
    style R1 fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
    style R2 fill:#1e293b,stroke:#94a3b8,color:#e2e8f0
\`\`\`

---

## Conclusion

Migrating to microservices is a journey, not a destination. It requires a shift in mindset—from "building an app" to "building a distributed system."

**Key Takeaways:**
1.  **Isolate domains** carefully (Domain-Driven Design).
2.  **Automate everything** (CI/CD, Infrastructure as Code).
3.  **Monitor aggressively** (Logs, Metrics, Traces).

Start small, extract one service at a time, and validate your assumptions.
    `,
        tags: "Spring Boot, Microservices, Architecture, System Design",
        publishedAt: "2024-04-10T10:30:00.000Z"
    },
    {
        id: 4,
        title: "Data Cleaning and Model Training: A Practical Guide",
        slug: "data-cleaning-model-training",
        excerpt: "A hands-on guide to data cleaning pipelines, feature engineering, and model training workflows — covering pandas techniques, scikit-learn patterns, and production-ready ML practices.",
        tags: "Python, Machine Learning, Data Science, Pandas, scikit-learn",
        publishedAt: "2026-05-17T10:00:00.000Z",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        content: `
## Introduction

Real-world data is messy. Missing values, inconsistent formats, duplicates, outliers, and encoding errors are the norm, not the exception. The popular claim that data scientists spend 80% of their time on data preparation is not an exaggeration — it reflects the reality that model performance is bounded by data quality.

This article covers the full pipeline from raw data to trained model:

1. **Data Quality Assessment** — profiling, identifying issues, understanding distributions
2. **Cleaning Techniques** — handling missing values, duplicates, outliers, type conversions
3. **Feature Engineering** — transforming raw columns into model-ready features
4. **Model Training** — scikit-learn workflows, cross-validation, hyperparameter tuning
5. **Evaluation and Iteration** — metrics, error analysis, feedback loops

---

## Section 1: Data Quality Assessment

### The Data Cleaning Pipeline

Before cleaning anything, you need to understand what's broken. The assessment phase produces a structured inventory of issues:

\`\`\`mermaid
flowchart TD
    A["Raw Dataset"] --> B["Profile Data"]
    B --> C["Identify Issues"]
    C --> D["Missing Values"]
    C --> E["Duplicates"]
    C --> F["Outliers"]
    C --> G["Type Mismatches"]
    C --> H["Encoding Errors"]
    D --> I["Cleaning Plan"]
    E --> I
    F --> I
    G --> I
    H --> I
    I --> J["Execute Cleaning"]
\`\`\`

### Profiling with pandas

Start by loading the data and getting a high-level view:

\`\`\`python
import pandas as pd
import numpy as np

df = pd.read_csv('data/raw_dataset.csv')

# Shape and memory
print(f"Rows: {df.shape[0]}, Columns: {df.shape[1]}")
print(f"Memory: {df.memory_usage(deep=True).sum() / 1e6:.1f} MB")

# Data types
print(df.dtypes)

# Missing values
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(2)
print(pd.DataFrame({'count': missing, 'pct': missing_pct}).query('count > 0'))
\`\`\`

> [!TIP]
> Always check memory usage upfront. A 50M-row dataset that fits in memory on your laptop may not fit on a shared production server. Use \`dtypes\` to spot \`object\` columns that should be \`category\` or \`datetime\`.

### Statistical Summary

\`\`\`python
# Numeric columns
df.describe(percentiles=[.01, .05, .25, .5, .75, .95, .99])

# Categorical columns
for col in df.select_dtypes(include='object').columns:
    print(f"\\n{col}: {df[col].nunique()} unique values")
    print(df[col].value_counts().head(10))
\`\`\`

| Metric | What to look for |
|--------|-----------------|
| \`count\` | Less than total rows = missing data |
| \`mean\` vs \`50%\` | Large gap = skewed distribution |
| \`std\` | Zero = constant column (no signal) |
| \`min/max\` | Impossible values (negative age, future dates) |
| \`unique\` | High cardinality categorical = potential feature engineering |

---

## Section 2: Cleaning Techniques

### Handling Missing Values

Missing data is the most common issue. The strategy depends on the mechanism:

\`\`\`mermaid
flowchart TD
    A["Missing Values"] --> B{"Missing Mechanism?"}
    B -->|"MCAR<br>Missing Completely At Random"| C["Drop rows<br>(if < 5% missing)"]
    B -->|"MAR<br>Missing At Random"| D["Impute from<br>correlated features"]
    B -->|"MNAR<br>Missing Not At Random"| E["Flag with<br>indicator column"]
    C --> F["Clean Dataset"]
    D --> F
    E --> F
\`\`\`

**Drop rows** — only safe when missing is random and sparse:

\`\`\`python
# Drop rows where critical columns are missing
critical_cols = ['id', 'target', 'timestamp']
df = df.dropna(subset=critical_cols)

# Drop columns with > 50% missing
threshold = len(df) * 0.5
df = df.dropna(axis=1, thresh=threshold)
\`\`\`

**Impute** — fill with statistical estimates:

\`\`\`python
from sklearn.impute import SimpleImputer

# Numeric: median is robust to outliers
num_imputer = SimpleImputer(strategy='median')
df[num_cols] = num_imputer.fit_transform(df[num_cols])

# Categorical: mode (most frequent)
cat_imputer = SimpleImputer(strategy='most_frequent')
df[cat_cols] = cat_imputer.fit_transform(df[cat_cols])
\`\`\`

> [!WARNING]
> Never impute before splitting train/test. Fit the imputer on training data only, then transform both sets. Otherwise you leak test information into training.

**Flag missingness** — sometimes the fact that data is missing is itself informative:

\`\`\`python
# Create indicator columns before imputing
for col in cols_with_missing:
    df[f'{col}_was_missing'] = df[col].isnull().astype(int)
\`\`\`

### Removing Duplicates

\`\`\`python
# Exact duplicates
n_dupes = df.duplicated().sum()
print(f"Exact duplicates: {n_dupes}")
df = df.drop_duplicates()

# Near-duplicates (same name, slight variations)
from rapidfuzz import fuzz
# Check pairs with similarity > 90%
# (expensive — use blocking keys to reduce comparisons)
\`\`\`

### Handling Outliers

\`\`\`python
# IQR method
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# Cap instead of remove (winsorization)
df['salary'] = df['salary'].clip(lower, upper)

# Z-score method (for normally distributed data)
from scipy import stats
z_scores = np.abs(stats.zscore(df['age']))
df = df[z_scores < 3]
\`\`\`

> [!NOTE]
> Outliers are not always errors. A salary of $500K might be a CEO — legitimate data. Domain knowledge determines whether to cap, remove, or keep extreme values.

### Type Conversions

\`\`\`python
# Datetime parsing
df['created_at'] = pd.to_datetime(df['created_at'], utc=True)

# Categorical downcast (saves memory)
df['status'] = df['status'].astype('category')

# Numeric coercion (invalid values become NaN)
df['price'] = pd.to_numeric(df['price'], errors='coerce')

# String cleanup
df['email'] = df['email'].str.strip().str.lower()
df['phone'] = df['phone'].str.replace(r'[^0-9+]', '', regex=True)
\`\`\`

---

## Section 3: Feature Engineering

Raw cleaned data rarely performs well. Feature engineering transforms columns into representations that machine learning models can learn from effectively.

### Numeric Features

\`\`\`python
# Scaling (required for linear models, neural networks)
from sklearn.preprocessing import StandardScaler, MinMaxScaler

scaler = StandardScaler()
df[num_cols] = scaler.fit_transform(df[num_cols])

# Log transform for skewed distributions
df['income_log'] = np.log1p(df['income'])

# Binning continuous variables
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 55, 100],
                         labels=['young', 'adult', 'middle', 'senior'])

# Interaction features
df['price_per_sqft'] = df['price'] / df['sqft']
df['rooms_per_person'] = df['rooms'] / df['household_size']
\`\`\`

### Categorical Features

\`\`\`python
# One-hot encoding (low cardinality)
df = pd.get_dummies(df, columns=['color', 'size'], drop_first=True)

# Target encoding (high cardinality — e.g., zip code)
from sklearn.preprocessing import TargetEncoder
te = TargetEncoder(smooth='auto')
df['zip_encoded'] = te.fit_transform(df[['zip_code']], df['target'])

# Frequency encoding
freq = df['category'].value_counts(normalize=True)
df['category_freq'] = df['category'].map(freq)
\`\`\`

### Text Features

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer

# TF-IDF for text columns
tfidf = TfidfVectorizer(max_features=100, stop_words='english')
text_features = tfidf.fit_transform(df['description'])
text_df = pd.DataFrame(text_features.toarray(),
                       columns=tfidf.get_feature_names_out())
df = pd.concat([df, text_df], axis=1)
\`\`\`

### Feature Engineering Pipeline

\`\`\`mermaid
flowchart LR
    A["Clean Data"] --> B["Numeric<br>Scaling/Transform"]
    A --> C["Categorical<br>Encoding"]
    A --> D["Text<br>Vectorization"]
    A --> E["Datetime<br>Decomposition"]
    B --> F["Feature Matrix"]
    C --> F
    D --> F
    E --> F
    F --> G["Feature Selection"]
    G --> H["Model Training"]
\`\`\`

---

## Section 4: Model Training

### Train/Test Split

\`\`\`python
from sklearn.model_selection import train_test_split

X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
\`\`\`

> [!IMPORTANT]
> Always set \`random_state\` for reproducibility. Use \`stratify=y\` for classification to preserve class distribution in both splits.

### Baseline Model

Start simple. A baseline tells you whether complex models are actually learning:

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Baseline: logistic regression
baseline = LogisticRegression(max_iter=1000)
baseline.fit(X_train, y_train)
y_pred = baseline.predict(X_test)

print(classification_report(y_test, y_pred))
\`\`\`

### Cross-Validation

Never evaluate on a single train/test split. Cross-validation gives a more reliable estimate:

\`\`\`python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(baseline, X_train, y_train,
                         cv=5, scoring='f1_weighted')
print(f"CV F1: {scores.mean():.3f} (+/- {scores.std():.3f})")
\`\`\`

### Model Selection

\`\`\`python
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC

models = {
    'logistic': LogisticRegression(max_iter=1000),
    'random_forest': RandomForestClassifier(n_estimators=100),
    'gradient_boost': GradientBoostingClassifier(n_estimators=100),
}

results = {}
for name, model in models.items():
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='f1_weighted')
    results[name] = scores.mean()
    print(f"{name}: {scores.mean():.3f} (+/- {scores.std():.3f})")
\`\`\`

### Hyperparameter Tuning

\`\`\`python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

param_dist = {
    'n_estimators': randint(50, 300),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10),
    'max_features': uniform(0.1, 0.9),
}

search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_distributions=param_dist,
    n_iter=50,
    cv=5,
    scoring='f1_weighted',
    random_state=42,
    n_jobs=-1
)
search.fit(X_train, y_train)

print(f"Best params: {search.best_params_}")
print(f"Best CV score: {search.best_score_:.3f}")
\`\`\`

> [!TIP]
> Use \`RandomizedSearchCV\` over \`GridSearchCV\` for most cases. Grid search is exhaustive but exponentially expensive. Random search explores the space more efficiently — 50 random trials often outperform a full grid on 5 parameters.

---

## Section 5: Evaluation and Error Analysis

### Metrics

\`\`\`python
from sklearn.metrics import (
    confusion_matrix, ConfusionMatrixDisplay,
    roc_auc_score, precision_recall_curve
)

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
ConfusionMatrixDisplay(cm).plot()

# ROC-AUC (for probabilistic predictions)
y_proba = search.best_estimator_.predict_proba(X_test)[:, 1]
roc_auc = roc_auc_score(y_test, y_proba)
print(f"ROC-AUC: {roc_auc:.3f}")
\`\`\`

### Error Analysis

The most productive iteration loop is examining what the model gets wrong:

\`\`\`python
# Find misclassified samples
errors = X_test[y_test != y_pred].copy()
errors['true_label'] = y_test[y_test != y_pred]
errors['predicted'] = y_pred[y_test != y_pred]

# Look for patterns
print(errors.groupby('true_label').describe())
\`\`\`

### The Full Pipeline

\`\`\`mermaid
flowchart TD
    A["Raw Data"] --> B["Assess Quality"]
    B --> C["Clean"]
    C --> D["Engineer Features"]
    D --> E["Split Train/Test"]
    E --> F["Train Baseline"]
    F --> G["Cross-Validate"]
    G --> H{"Score Acceptable?"}
    H -->|"No"| I["Tune Hyperparams"]
    I --> J["Error Analysis"]
    J --> K["Improve Features"]
    K --> G
    H -->|"Yes"| L["Evaluate on Test Set"]
    L --> M["Deploy Model"]
\`\`\`

---

## Production Checklist

| Step | Action | Why |
|------|--------|-----|
| 1 | Profile data before cleaning | You can't fix what you don't understand |
| 2 | Split train/test before any transformation | Prevents data leakage |
| 3 | Use pipelines (\`sklearn.pipeline.Pipeline\`) | Ensures consistent preprocessing |
| 4 | Save preprocessing artifacts | Imputers, scalers, encoders must match training |
| 5 | Log all experiments | Reproducibility requires knowing what you tried |
| 6 | Version your data | Models are only reproducible with the same data |
| 7 | Monitor in production | Data drift degrades model performance over time |

---

## Conclusion

Data cleaning and model training are iterative, not sequential. A clean dataset with poor features will underperform. Great features on dirty data will mislead. The feedback loop between cleaning, engineering, and training is where real ML work happens.

**Key Takeaways:**
1. **Profile first** — understand what's broken before fixing it
2. **Prevent leakage** — fit transformers on training data only
3. **Start simple** — baseline models reveal whether complexity helps
4. **Iterate on errors** — error analysis drives the next improvement
5. **Automate pipelines** — \`sklearn.pipeline.Pipeline\` ensures consistency from training to production
    `
    }
]

export async function getBlogs(): Promise<Blog[]> {
    return Promise.resolve(
        [...BLOGS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    )
}

export async function getBlogSummaries(): Promise<Omit<Blog, 'content'>[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Promise.resolve(
        [...BLOGS]
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .map(({ content, ...rest }) => rest)
    )
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const blog = BLOGS.find(b => b.slug === slug)
    return Promise.resolve(blog || null)
}
