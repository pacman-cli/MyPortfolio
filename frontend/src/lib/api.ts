import { Blog } from "@/types"
import { fetchJson } from "@/lib/utils"

/** Static slug list for generateStaticParams fallback when backend is unavailable. */
export const STATIC_BLOG_SLUGS = [
  "llm-deep-thinking",
  "spring-security-architecture-linkedin",
  "microservices-spring-boot-architecture",
  "data-cleaning-model-training",
]

const API_BASE: string =
  process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL}/api/v1`
    : process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1`
      : "http://localhost:8082/api/v1"

interface PagedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  totalPages: number
}

interface BlogDTO {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  imageUrl: string | null
  publishedAt: string
}

const STATIC_BLOGS: Blog[] = [
  {
    id: 1,
    title: "LLM Deep Thinking: Reasoning Models, Techniques, Evaluation, and the Landscape",
    slug: "llm-deep-thinking",
    excerpt: "A comprehensive exploration of how large language models \"think\" — from the internal architecture of reasoning models like o1, R1, and Claude, to practical prompting techniques, rigorous evaluation methods, and a look at where the field is heading.",
    tags: "LLM, Deep Learning, Reasoning, AI Architecture, Prompt Engineering",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-05-16T10:00:00",
    content: `## Introduction

For most of their short history, large language models generated answers in a single pass — one forward propagation through the network, producing one token at a time from left to right with no backtracking, no revision, and no second thoughts. That changed in late 2024.

OpenAI's o1 preview introduced a new paradigm: **reasoning models** that spend extra compute at inference time to generate hidden "thinking" tokens before arriving at an answer. DeepSeek-R1 open-sourced a competitive approach days later. Anthropic added extended thinking to Claude. Google shipped Gemini 2.0 Flash Thinking. By 2026, almost every frontier model has some form of internal reasoning capability.

This article covers the full landscape across four sections:
1. **How reasoning models work** — the architecture and internals of o1, R1, Claude thinking, and others
2. **Practical techniques** — prompting strategies that elicit deeper reasoning from any capable LLM
3. **Evaluating reasoning** — benchmarks, failure modes, and what the numbers don't tell you
4. **The road ahead** — history, open challenges, and future directions

---

## 1. How Reasoning Models Work

Unlike standard transformers that generate output immediately, reasoning models decouple the internal thinking process from the final output generation.

### The Inference-Time Compute Cycle

During inference, instead of feeding token $N$ directly back to generate $N+1$ for the user, the model outputs hidden reasoning tokens. This forms a "Chain of Thought" (CoT) where the model performs step-by-step logic, checks its assumptions, detects errors, and corrects its path before generating the final visible response.

\`\`\`mermaid
graph TD
    A[User Prompt] --> B[Model Decides Reasoning Depth]
    B --> C[Generate Search Space / Chain of Thought]
    C --> D[Evaluate Intermediate Step]
    D -- Self-Correction Needed --> E[Backtrack & Modify Plan]
    E --> C
    D -- Reasoning Done / Confidence Reached --> F[Format Final Response]
    F --> G[Output to User]
    
    style A fill:#1e293b,stroke:#3b82f6,stroke-width:2px
    style C fill:#1e1b4b,stroke:#818cf8,stroke-width:2px
    style D fill:#111827,stroke:#10b981,stroke-width:2px
    style G fill:#064e3b,stroke:#059669,stroke-width:2px
\`\`\`

### Reinforcement Learning (RL) Bootstrapping

The core breakthrough in reasoning models is not just prompting, but how they are trained. Rather than purely utilizing supervised fine-tuning (SFT) on human reasoning data, models like DeepSeek-R1 and OpenAI's reasoning stack use large-scale Reinforcement Learning (RL).

The RL process rewards:
- Correctness of the final answer (especially in math, coding, and logic).
- Step-by-step structure (using clear XML or markdown delimiters for thinking).
- Self-correction patterns (finding errors and backtracking).

---

## 2. Practical Elicitation Techniques

How do we get the best out of these reasoning models? Traditional prompting techniques need adjustments.

### Frame-of-Reference Prompts

Give the model a solid framework to base its logic on. Clearly define the goal and constraints:

\`\`\`xml
<instruction>
Please analyze the performance bottleneck of this Spring Boot controller.
Break down your reasoning into separate sub-problems:
1. DB Connection Pool configuration.
2. Hibernate N+1 queries.
3. Thread blockages.
Explain your step-by-step reasoning in detail before showing any code.
</instruction>
\`\`\`

### Letting the Model Dynamic-Plan

Avoid micro-managing the reasoning steps. Let the model choose its own logical divisions. Studies show that specifying rigid steps for a reasoning model actually *limits* its search space.

---

## 3. Evaluation & Failure Modes

Reasoning models excel at competitive programming, mathematics, and complex multi-step reasoning. However, they introduce unique challenges:

- **Overthinking (CoT Bloat)**: The model spends thousands of tokens thinking about simple questions.
- **Premature Halting**: Stopping the reasoning before solving the actual problem.
- **Hallucinated Logic**: The reasoning looks flawless but starts from a false assumption.

### Comparison Table

| Metric / Capability | Standard Transformer (e.g., GPT-4o) | Reasoning Model (e.g., R1, o1) |
| :--- | :--- | :--- |
| **Math & Coding** | Moderate | High (Silver/Gold Olympiad) |
| **Creative Writing** | High | Moderate (Often dry/formal) |
| **Response Latency** | Low (Instant generation) | High (Reasoning delay) |
| **Cost per Token** | Standard | Higher (due to hidden CoT tokens) |

---

## 4. The Road Ahead

As we push the boundaries of LLM capabilities, inference-time compute scaling laws (System 2 thinking) are taking center stage. Scaling compute during training is starting to hit diminishing returns, but scaling compute during *inference* is showing exponential returns. The future lies in models that dynamically adjust their thinking time based on the difficulty of the problem.`
  },
  {
    id: 2,
    title: "Unlocking Spring Security: Authentication Pipeline & Bean Connections",
    slug: "spring-security-architecture-linkedin",
    excerpt: "A deep dive into Spring Security's authentication architecture — how filters, providers, and SecurityContextHolder work together to secure your application.",
    tags: "Spring Security, Java, Authentication, Backend",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-05-10T10:00:00",
    content: `## The Authentication Architecture

Spring Security's authentication system is built on a pipeline of filters, providers, and context holders. Understanding how they connect is key to configuring security correctly.

### The Pipeline at a Glance

When a client sends a request to your API, it passes through a servlet filter chain. Spring Security intercepts the request using the \`DelegatingFilterProxy\`, which forwards it to the \`FilterChainProxy\` containing the active \`SecurityFilterChain\`.

\`\`\`mermaid
sequenceDiagram
    actor User
    participant SC as SecurityFilterChain
    participant AM as AuthenticationManager
    participant AP as AuthenticationProvider
    participant UD as UserDetailsService
    participant SCH as SecurityContextHolder
    
    User->>SC: HTTP Request (Credentials/Token)
    SC->>SC: AuthenticationFilter extracts tokens
    SC->>AM: authenticate(Authentication token)
    AM->>AP: support & authenticate
    AP->>UD: loadUserByUsername()
    UD-->>AP: UserDetails (from DB/In-memory)
    AP-->>AM: Authentication (authenticated = true)
    AM-->>SC: Authentication
    SC->>SCH: setContext(Authentication)
    SC-->>User: HTTP Response (Authenticated resource)
\`\`\`

---

## 1. Key Pipeline Components

Let's trace how credentials are converted to a fully authenticated security context:

### The Authentication Filter

The entry point. For basic authentication, it's \`UsernamePasswordAuthenticationFilter\`. For JWTs, you typically write a custom filter extending \`OncePerRequestFilter\`. The filter:
1. Extracts credentials from request headers (e.g., Bearer Token).
2. Creates an unauthenticated \`Authentication\` object (like \`UsernamePasswordAuthenticationToken\`).
3. Passes this token to the \`AuthenticationManager\`.

### The Authentication Manager & Providers

The \`AuthenticationManager\` (usually \`ProviderManager\`) orchestrates authentication. It delegates the check to registered \`AuthenticationProvider\`s.
- Each provider checks if it supports the authentication token type.
- The provider queries user records (using \`UserDetailsService\` or OAuth token resolvers).
- If credentials match, the provider returns a fully populated, authenticated \`Authentication\` object.

### The SecurityContextHolder

Once authenticated, the filter places the \`Authentication\` token in the \`SecurityContext\`:

\`\`\`java
SecurityContext context = SecurityContextHolder.createEmptyContext();
context.setAuthentication(authResult);
SecurityContextHolder.setContext(context);
\`\`\`

For subsequent requests, Spring Security loads this context, allowing you to access the current user globally.

---

## 2. Configuration Best Practices

Here is a modern Spring Boot Security configuration class implementing Stateless JWT Authentication:

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
\`\`\`

### Critical Checklist:
- **Disable Session State**: Ensure your API is completely stateless when using tokens (\`SessionCreationPolicy.STATELESS\`).
- **Handle CORS First**: Configure CORS filters before the security filter chain to avoid pre-flight options request failures.
- **Never Hardcode Secrets**: Store token signing keys in secure environment variables or vault systems.`
  },
  {
    id: 3,
    title: "Microservices in Spring Boot: Architecture, Design Patterns, and Production Practices",
    slug: "microservices-spring-boot-architecture",
    excerpt: "A comprehensive guide to designing, building, and deploying microservices with Spring Boot — covering service discovery, API gateways, resilience patterns, and production deployment strategies.",
    tags: "Microservices, Spring Boot, Java, Architecture, Docker",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-05-05T10:00:00",
    content: `## Introduction

Microservices architecture has become the de facto standard for building scalable, resilient, and maintainable applications. In this comprehensive guide, we'll explore how to leverage the power of **Spring Boot** and **Spring Cloud** to build a robust microservices ecosystem.

### Why Microservices?

Monolithic applications, while easier to start with, often become difficult to maintain and scale as they grow. Microservices offer:

- **Scalability**: Scale individual components based on demand.
- **Resilience**: Failure in one service doesn't bring down the entire system.
- **Technology Agnosticism**: Use the best tool for each job.

---

## 1. System Architecture Blueprint

A production-grade microservices system requires infrastructure services surrounding your core business microservices.

\`\`\`mermaid
graph TD
    Client[Client Browser/Mobile] --> Gateway[Spring Cloud API Gateway]
    Gateway --> Eureka[Eureka Discovery Server]
    Gateway --> Config[Central Config Server]
    
    Gateway --> SvcA[Service A - Account Service]
    Gateway --> SvcB[Service B - Inventory Service]
    
    SvcA --> DB1[(MySQL DB)]
    SvcB --> DB2[(Redis Cache)]
    
    SvcA -- REST/FeignClient --x SvcB
    SvcA -. Resilience4j Circuit Breaker .-> SvcB
\`\`\`

### The Infrastructure Core:
1. **Service Registry (Eureka)**: Acts as the address book. Microservices register their IPs and ports here dynamically.
2. **API Gateway (Spring Cloud Gateway)**: The single entry point. Handles routing, load balancing, security rate limiting, and SSL termination.
3. **Config Server (Spring Cloud Config)**: Externalizes configuration. Reads properties files from a secure git repository or vault.
4. **Circuit Breaker (Resilience4j)**: Prevents cascading failures. If a service goes down, fallback mechanisms gracefully return static/cached data.

---

## 2. Implementing Circuit Breakers

In microservices, networks are unreliable. If Service A makes a direct REST call to Service B, and Service B is slow or offline, Service A can run out of thread pool capacity and fail. We wrap the call in a Circuit Breaker.

### Maven Dependency
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
\`\`\`

### Code Implementation
We use \`@CircuitBreaker\` annotation on our Feign clients or service layers:

\`\`\`java
@Service
public class OrderService {

    private final InventoryClient inventoryClient;

    public OrderService(InventoryClient inventoryClient) {
        this.inventoryClient = inventoryClient;
    }

    @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackVerifyInventory")
    public OrderResponse createOrder(OrderRequest request) {
        // This network call is monitored by Resilience4j
        boolean available = inventoryClient.verifyStock(request.getProductId(), request.getQuantity());
        
        if (!available) {
            throw new OutOfStockException("Product out of stock");
        }
        return processOrder(request);
    }

    // Fallback method executed when circuit is OPEN or call fails
    public OrderResponse fallbackVerifyInventory(OrderRequest request, Throwable throwable) {
        return OrderResponse.builder()
            .status("PENDING")
            .message("Inventory verification is temporarily unavailable. Order queued.")
            .build();
    }
}
\`\`\`

---

## 3. Containerization & Orchestration

Deploying multiple microservices requires absolute consistency. We use Docker to containerize our Spring Boot apps:

\`\`\`dockerfile
# Dockerfile for Spring Boot
FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY \${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
\`\`\`

And coordinate them locally using Docker Compose, wiring dependencies like MySQL and Redis automatically.`
  },
  {
    id: 4,
    title: "Data Cleaning and Model Training: A Practical Guide",
    slug: "data-cleaning-model-training",
    excerpt: "A hands-on guide to data cleaning, preprocessing, and training machine learning models — from handling missing values to feature engineering and model evaluation.",
    tags: "Data Science, Machine Learning, Python, Data Engineering",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-04-28T10:00:00",
    content: `## The Data Pipeline

Data cleaning is often the most time-consuming part of any machine learning project. This guide covers the essential steps to transform raw data into a model-ready format.

\`\`\`mermaid
graph LR
    Raw[Raw Ingest] --> Pre[Null Imputation & Preprocessing]
    Pre --> Out[Anomaly / Outlier Filtering]
    Out --> Feat[Feature Scaling & Encoding]
    Feat --> Split[Train/Test Validation Split]
    Split --> Train[Model Training & Hyperparameter Tuning]
    Train --> Eval[Performance Evaluation]
    Eval -- Metrics Satisfied --> Deploy[Model Deployment]
    Eval -- Refine Strategy --> Pre
\`\`\`

---

## 1. Step 1: Handling Missing Values

Missing data is a common issue in real-world datasets. Standard algorithms like XGBoost, LightGBM, or Scikit-learn models may throw errors or behave unexpectedly when encountering \`NaN\` values.

### Common Imputation Strategies:
- **Deletion**: Remove rows with missing targets if they represent <2% of the dataset.
- **Central Tendency Imputation**: Replace missing continuous values with the \`mean\` (if symmetric) or \`median\` (if skewed).
- **Categorical Imputation**: Replace missing text classes with the \`mode\` (most frequent value) or assign a new category tag: \`"Unknown"\`.

### Code Implementation (Python & Pandas)
\`\`\`python
import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv("data.csv")

# Impute continuous feature with median
df["age"] = df["age"].fillna(df["age"].median())

# Impute categorical feature with mode/Unknown
df["department"] = df["department"].fillna("Unknown")
\`\`\`

---

## 2. Step 2: Feature Engineering

Feature engineering translates raw numbers into meaningful vectors that algorithms can train on.

### Encoding Categorical Variables
Machine learning models only process numeric values. We use:
- **One-Hot Encoding**: For nominal categories with low cardinality (e.g., \`gender\`, \`country\`).
- **Target/Label Encoding**: For ordinal categories or features with high cardinality (e.g., \`zip_code\`, \`device_model\`).

### Scaling Numerical Features
Features on wildly different scales (e.g., \`income\` up to 1,000,000 and \`age\` up to 100) will cause distance-based models (like SVM or KNN) and gradient descent to fail to converge properly. We apply **StandardScaler** (Z-score normalization) or **MinMaxScaler**:

$$x_{scaled} = \\frac{x - \\mu}{\\sigma}$$

---

## 3. Step 3: Model Training and Evaluation

With clean data, we split our dataset to evaluate generalization performance:

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Split dataset (80% Train, 20% Test)
X = df.drop(columns=["target"])
y = df["target"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
\`\`\`

Always use cross-validation (e.g., K-Fold Cross-Validation) to get a robust estimate of performance across different subsets of the data!`
  }
]

function toBlog(dto: BlogDTO): Blog {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    excerpt: dto.excerpt,
    content: dto.content,
    tags: dto.tags.join(", "),
    imageUrl: dto.imageUrl ?? undefined,
    publishedAt: dto.publishedAt,
  }
}

async function fetchAllBlogs(): Promise<BlogDTO[]> {
  const first = await fetchJson<PagedResponse<BlogDTO>>(
    `${API_BASE}/blogs?page=0&size=50`,
  )
  if (first.totalPages <= 1) return first.items

  const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, i) =>
      fetchJson<PagedResponse<BlogDTO>>(
        `${API_BASE}/blogs?page=${i + 1}&size=50`,
      ),
    ),
  )
  return first.items.concat(...rest.map((p) => p.items))
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const dtos = await fetchAllBlogs()
    return dtos
      .map(toBlog)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
  } catch (error) {
    console.error("Failed to fetch blogs, using static fallback:", error)
    return STATIC_BLOGS
  }
}

export async function getBlogSummaries(): Promise<Omit<Blog, "content">[]> {
  const blogs = await getBlogs()
  return blogs.map((blog) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...rest } = blog
    return rest
  })
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const dto = await fetchJson<BlogDTO>(`${API_BASE}/blogs/${slug}`)
    return toBlog(dto)
  } catch (error) {
    console.error(`Failed to fetch blog "${slug}", using static fallback:`, error)
    return STATIC_BLOGS.find((b) => b.slug === slug) || null
  }
}
