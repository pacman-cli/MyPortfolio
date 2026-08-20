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

For most of their short history, large language models (LLMs) generated answers in a single pass — one forward propagation through the network, producing one token at a time from left to right with no backtracking, no revision, and no second thoughts. This is analogous to human **System 1** thinking: fast, instinctive, and automatic.

That paradigm changed radically in late 2024. The release of OpenAI's o1 preview, followed rapidly by DeepSeek-R1, Anthropic's Claude 3.5 Sonnet (with extended thinking), and Google's Gemini Flash Thinking, introduced **System 2** thinking to AI: slow, deliberate, analytical, and logical. By spending extra compute at *inference time* (rather than just training time), these models generate hidden reasoning steps before outputting their final response.

In this deep dive, we explore how reasoning models work internally, techniques to leverage them, current evaluation benchmarks, and the frontier of System 2 scaling laws.

---

## 1. How Reasoning Models Work

Standard LLMs predict the next token based on raw statistical likelihood from their training data. If they start down a wrong logical path, they cannot correct themselves; they must continue generating text from that point. Reasoning models solve this by generating a structured **Chain of Thought (CoT)**.

### The Inference-Time Execution Cycle

At runtime, the model decouples its internal thoughts from the final response. It iterates through planning, evaluating steps, correcting mistakes, and validating answers in a loop before returning the final text to the user.

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

### Reinforcement Learning (RL) and Process Rewards

How do we train a model to think? The key is Reinforcement Learning (RL).
1. **Outcome-based Reward Models (ORM)**: The model is rewarded only if the final answer is correct (ideal for code compilers and math problems).
2. **Process-based Reward Models (PRM)**: The model is rewarded for *each correct step* in its reasoning chain. This prevents the model from arriving at the right answer via flawed logic.

During RL training, models spontaneously learn reasoning behaviors:
* **Backtracking**: Deciding a step was wrong, declaring "Wait, that's incorrect. Let me re-calculate," and trying a different approach.
* **Self-Verification**: Double-checking code or math calculations before formulating the final response.
* **Reframing**: Translating a complex query into simpler sub-problems.

> [!IMPORTANT]
> The reasoning tokens are not just standard text; they represent a structured search space. Many API providers charge for these "thinking tokens" even though they are filtered out of the final user-facing response.

---

## 2. Prompting Techniques for Reasoning Models

Traditional prompt engineering (e.g., "Think step-by-step") is redundant for reasoning models because they are trained to do this natively. However, new strategies have emerged to maximize their capability.

### XML Structuring for Complex Constraints

Reasoning models perform exceptionally well when given structured constraints. Wrapping instructions in XML tags gives the model clear boundaries:

\`\`\`xml
<system_prompt>
You are an expert systems architect. Analyze the provided Spring Boot controller.
</system_prompt>

<code_snippet>
@GetMapping("/users/{id}")
public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    // Potential performance issue: Lazy loading trigger inside DTO mapping
    return ResponseEntity.ok(convertToDto(user));
}
</code_snippet>

<instructions>
1. Inspect the Hibernate session lifecycle.
2. Identify N+1 query vulnerability during DTO conversion.
3. Suggest a query optimization using EntityGraphs or Join Fetch.
</instructions>
\`\`\`

### Dynamic Planning Prompts

Do not micro-manage the logical steps. Let the model dictate the planning phase. 
Instead of:
* *"First write the query, then write the controller, then write the test."*
Use:
* *"Analyze the requirements, establish a design plan, and implement the optimized solution."*

This allows the model to explore a wider search space during its hidden thinking phase.

---

## 3. Evaluation & Performance Comparison

How do reasoning models compare to standard frontier LLMs?

### Benchmark Metrics

In complex academic and logic benchmarks, System 2 models show a massive step-change.

| Benchmark | Standard Model (GPT-4o) | Reasoning Model (DeepSeek-R1) | Focus Area |
| :--- | :--- | :--- | :--- |
| **AIME 2024** | 9.3% | 79.8% | High-level Mathematics |
| **Codeforces** | 12.0% | 96.3% | Competitive Programming |
| **GPQA Diamond** | 49.9% | 62.1% | Graduate-Level Science |
| **MMLU** | 88.7% | 90.8% | General Academic Knowledge |

### System 2 Failure Modes

Despite their power, reasoning models are prone to unique failure modes:
1. **CoT Bloat (Overthinking)**: The model spends 2,000 thinking tokens on a trivial query that requires a simple "yes" or "no".
2. **Premature Halting**: The model assumes it has solved the problem when it has only solved a simplified sub-problem.
3. **Logic Loop Lock**: The model gets stuck in an infinite backtracking loop, correcting the same step repeatedly until it hits maximum token limits.

> [!TIP]
> If a reasoning model gets stuck in a logic loop, re-run the query with a slight change in prompt wording or modify the temperature parameter to force alternative paths in the search tree.

---

## 4. How to Parse Thinking Tokens in Code

If you are using reasoning models via raw APIs (like DeepSeek or OpenAI), the response payload typically contains a dedicated field for the reasoning tokens.

Here is a Python example showing how to extract and display both the reasoning process and the final content:

\`\`\`python
import openai

client = openai.OpenAI(
    base_url="https://api.deepseek.com/v1",
    api_key="your-api-key-here"
)

response = client.chat.completions.create(
    model="deepseek-reasoning",
    messages=[
        {"role": "user", "content": "Prove that there are infinitely many primes."}
    ],
    stream=False
)

# Access the reasoning content (thinking tokens)
thinking = response.choices[0].message.reasoning_content
# Access the final output
final_answer = response.choices[0].message.content

print("=== THINKING PROCESS ===")
print(thinking)
print("\n=== FINAL ANSWER ===")
print(final_answer)
\`\`\`

---

## Conclusion

Inference-time compute scaling is the new frontier of artificial intelligence. By allowing models to think, evaluate, and self-correct, we have unlocked capabilities once thought years away. As developers, understanding how to structure our queries and parse these outputs is crucial to building next-generation agentic workflows.`
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

Spring Security is arguably the most powerful yet misunderstood framework in the Java enterprise ecosystem. Many developers configure it using boilerplate code without understanding the underlying servlet architecture.

At its core, Spring Security is built on a **chain of servlet filters**. It intercepts incoming HTTP requests, performs authentication and authorization checks, and either permits the request to pass to your Controller or rejects it with an appropriate HTTP error code.

### The Pipeline at a Glance

When an API request arrives, it is intercepted by a special servlet filter called the \`DelegatingFilterProxy\`. This proxy delegates the work to the \`FilterChainProxy\`, which loads the active \`SecurityFilterChain\` matching the request URL.

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

## 1. Trace the Authentication Lifecycle

Let's break down the execution steps when securing a REST endpoint with a stateless JSON Web Token (JWT):

### Step 1: Request Interception
The request passes through a custom filter (typically extending \`OncePerRequestFilter\`).
* The filter extracts the \`Authorization\` header.
* It parses the token and checks if it starts with \`Bearer \`.
* If a token is found, the filter constructs an unauthenticated \`UsernamePasswordAuthenticationToken\` (containing the principal/subject and the raw credentials).

### Step 2: Authentication Delegation
The filter passes the unauthenticated token to the \`AuthenticationManager\` (usually implemented by \`ProviderManager\`).
* The \`AuthenticationManager\` iterates through a list of configured \`AuthenticationProvider\`s.
* An \`AuthenticationProvider\` (like \`DaoAuthenticationProvider\` or a custom \`JwtAuthenticationProvider\`) loads user details from a database using \`UserDetailsService\`.
* It verifies the password hashes or token signatures.

### Step 3: Storing Context
If authentication is successful, the provider returns a fully populated, authenticated \`Authentication\` object (which includes authorities/roles).
* The filter takes this authenticated token and stores it in the \`SecurityContextHolder\`'s \`SecurityContext\`.

\`\`\`java
SecurityContext context = SecurityContextHolder.createEmptyContext();
context.setAuthentication(authentication);
SecurityContextHolder.setContext(context);
\`\`\`

> [!NOTE]
> Always use \`SecurityContextHolder.createEmptyContext()\` instead of \`SecurityContextHolder.getContext().setAuthentication()\` to avoid multi-threaded race conditions in high-concurrency environments.

---

## 2. Complete Code Implementation

Here is a modern, production-ready Spring Security configuration utilizing a stateless JWT filter.

### Custom JWT Authentication Filter

\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
        }
        filterChain.doFilter(request, response);
    }
}
\`\`\`

### Security Configuration Class

\`\`\`java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
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
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/public/**").permitAll()
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

---

## 3. Advanced Context Propagation in Async Threads

By default, the \`SecurityContextHolder\` uses a \`ThreadLocal\` strategy. This means the authentication details are only bound to the specific thread handling the request.

If you spawn asynchronous background jobs using Spring's \`@Async\`, the security context is lost.

> [!TIP]
> To propagate security context to child threads, configure the Strategy Name during application startup:
> \`\`\`java
> @PostConstruct
> public void enableAuthPropagation() {
>     SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
> }
> \`\`\`

### Common Pitfalls to Avoid:
1. **Not disabling CSRF for stateless APIs**: If your backend is a stateless REST API (no cookies, only JWT/Headers), CSRF tokens are unnecessary. Disable them to improve latency.
2. **Missing CorsFilter Order**: Standard CORS configuration must run *before* Spring Security filter chain checks, or browser pre-flight \`OPTIONS\` requests will be rejected with HTTP 403.
3. **Leaving default Exception Handling**: Customize \`AuthenticationEntryPoint\` and \`AccessDeniedHandler\` to return standardized JSON error bodies instead of raw HTML error pages.`
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

Building microservices is easy. Building *production-ready* microservices that scale, handle network partitions, and maintain consistency is incredibly difficult. 

When transitioning from a monolith to microservices, we trade simple in-memory function calls for unpredictable network hops. In this guide, we map the essential components of a Spring Boot microservices ecosystem, focusing on architectural resiliency, load balancing, and container orchestration.

---

## 1. System Architecture Blueprint

In a production microservices topology, core business microservices (e.g., Order Service, Catalog Service) are supported by dynamic discovery, configuration, and routing layers.

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

### Core Infrastructure Services:

1. **Spring Cloud Gateway**: The entry point. It manages path-based routing, intercepts authentication (JWT decoding), rate limits clients, and handles CORS headers.
2. **Eureka Service Registry**: Coordinates network locations. Microservices register their dynamic IP addresses and ports with Eureka, and Feign/LoadBalancer queries Eureka for routing lookups.
3. **Spring Cloud Config Server**: Centralized configuration store. Externalizes environment settings by pulling YAML files directly from a private Git repository or HashiCorp Vault.
4. **Resilience4j**: Implements circuit breakers and rate limiters to prevent cascading system failures.

---

## 2. Implementing Circuit Breakers with Resilience4j

If Service A queries Service B via HTTP, and Service B experiences database locking, Service A's thread pool will fill up with blocked threads waiting for socket timeouts. This causes a cascade failure across the system.

We resolve this by implementing a **Circuit Breaker** using **Resilience4j**.

### Maven Configuration

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
\`\`\`

### Java Code Annotation

\`\`\`java
@Service
public class OrderService {

    private final InventoryClient inventoryClient;

    public OrderService(InventoryClient inventoryClient) {
        this.inventoryClient = inventoryClient;
    }

    @CircuitBreaker(name = "inventoryBreaker", fallbackMethod = "handleInventoryFallback")
    public OrderResponse createOrder(OrderRequest request) {
        // Monitored network call
        boolean inStock = inventoryClient.checkStock(request.getProductId(), request.getQuantity());
        
        if (!inStock) {
            throw new OutOfStockException("Product out of stock");
        }
        return saveOrderToDb(request);
    }

    // Executed when call fails or circuit is OPEN
    public OrderResponse handleInventoryFallback(OrderRequest request, Throwable t) {
        return OrderResponse.builder()
            .status("FALLBACK_PENDING")
            .message("Inventory service is currently busy. Your order is queued for async processing.")
            .build();
    }
}
\`\`\`

### Config properties (\`application.yml\`)

\`\`\`yaml
resilience4j.circuitbreaker:
  instances:
    inventoryBreaker:
      registerHealthIndicator: true
      slidingWindowSize: 10
      minimumNumberOfCalls: 5
      failureRateThreshold: 50
      waitDurationInOpenState: 10000ms
      permittedNumberOfCallsInHalfOpenState: 3
\`\`

> [!TIP]
> Always configure separate fallback methods depending on the type of Exception. For instance, throw an immediate 404 for \`EntityNotFoundException\`, but trigger the fallback behavior for \`ConnectException\` or \`TimeoutException\`.

---

## 3. Local Orchestration with Docker Compose

To run a microservices ecosystem locally for development, we containerize our build artifacts and use Docker Compose to spin up the architecture.

Here is a sample \`docker-compose.yml\` coordinating the config server, discovery registry, and database dependency:

\`\`\`yaml
version: '3.8'

services:
  eureka-server:
    image: my-registry/eureka-server:latest
    ports:
      - "8761:8761"
    networks:
      - portfolio-network

  config-server:
    image: my-registry/config-server:latest
    ports:
      - "8888:8888"
    environment:
      - SPRING_PROFILES_ACTIVE=git
      - SPRING_CLOUD_CONFIG_SERVER_GIT_URI=https://github.com/my-org/config-repo
    networks:
      - portfolio-network

  mysql-db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD=root
      MYSQL_DATABASE=orders_db
    ports:
      - "3306:3306"
    networks:
      - portfolio-network

  order-service:
    image: my-registry/order-service:latest
    ports:
      - "8081:8081"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql-db:3306/orders_db
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
      - SPRING_CONFIG_IMPORT=configserver:http://config-server:8888
    depends_on:
      - eureka-server
      - config-server
      - mysql-db
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
\`\`\`

---

## Conclusion

Transitioning to microservices involves trading development simplicity for operational complexity. Using Spring Boot and Spring Cloud, we can build robust components like API Gateways, Eureka Discovery Registries, and Resilience4j Circuit Breakers to manage this complexity, keeping our distributed applications fast and resilient.`
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

It is a common adage in data science: *"Garbage in, garbage out."* Even the most sophisticated neural networks or gradient-boosted trees will perform poorly if they are trained on messy, biased, or unaligned data.

A professional machine learning pipeline follows a disciplined, step-by-step approach to ingest, clean, encode, scale, and evaluate data before models are shipped to production.

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

Missing data is not just an inconvenience; it represents a key statistical challenge. We must first diagnose the mechanism of missingness:
* **Missing Completely at Random (MCAR)**: The missingness has no relationship with any data values.
* **Missing at Random (MAR)**: The missingness depends on observed features (e.g., older users skipping the "salary" field).
* **Missing Not at Random (MNAR)**: The missingness depends on the unobserved value itself (e.g., high-income earners refusing to disclose their wealth).

### Common Imputation Strategies:

* **Median Imputation**: Ideal for skewed numeric values (like income).
* **Constant Value (e.g., -1 or "Missing")**: Ensures the model is aware that the values are absent (useful for tree-based algorithms).
* **KNN Imputation**: Uses nearest neighbor algorithms to estimate missing entries based on similar profiles.

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer

df = pd.read_csv("dataset.csv")

# Identify null percentages
print(df.isnull().sum() / len(df) * 100)

# Replace missing values using KNN Imputer
imputer = KNNImputer(n_neighbors=5)
numerical_cols = ["age", "income", "credit_score"]
df[numerical_cols] = imputer.fit_transform(df[numerical_cols])
\`\`\`

---

## 2. Step 2: Outlier Handling & Feature Scaling

### Outlier Filtration via Interquartile Range (IQR)

Outliers can heavily skew linear regression, SVMs, and neural networks. We can identify anomalies using the IQR method:

$$\\text{IQR} = Q_3 - Q_1$$
$$\\text{Lower Bound} = Q_1 - 1.5 \\times \\text{IQR}$$
$$\\text{Upper Bound} = Q_3 + 1.5 \\times \\text{IQR}$$

\`\`\`python
# Filter outliers from column 'income'
q1 = df["income"].quantile(0.25)
q3 = df["income"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

df_clean = df[(df["income"] >= lower_bound) & (df["income"] <= upper_bound)]
\`\`\`

### Feature Scaling: MinMax vs. StandardScaler

Gradient descent converges significantly faster when features reside on similar bounds (typically $[0, 1]$ or mean $0$, standard deviation $1$).

* **MinMaxScaler**: Scale values between 0 and 1. Highly sensitive to outliers.
* **StandardScaler**: Transform features to have a mean of 0 and variance of 1. Ideal for algorithms assuming normal distribution.

> [!WARNING]
> Always fit your scaling transformers *only* on the training dataset to prevent **data leakage**. Transform the test dataset using the parameters fitted during the training step.

---

## 3. Step 3: End-to-End Scikit-Learn Pipeline

Using isolated script commands can lead to processing errors during deployment. The best practice is compiling the cleaning and training processes into a single Scikit-Learn \`Pipeline\`.

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Define preprocessing for numerical columns
num_features = ["age", "income", "credit_score"]
num_transformer = Pipeline(steps=[
    ("imputer", KNNImputer(n_neighbors=5)),
    ("scaler", StandardScaler())
])

# Define preprocessing for categorical columns
cat_features = ["occupation", "gender", "has_loan"]
cat_transformer = Pipeline(steps=[
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

# Combine preprocessing
preprocessor = ColumnTransformer(transformers=[
    ("num", num_transformer, num_features),
    ("cat", cat_transformer, cat_features)
])

# Define the full model pipeline
model_pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))
])

# Split and train
X = df.drop(columns=["target"])
y = df["target"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model_pipeline.fit(X_train, y_train)

# Evaluate model
predictions = model_pipeline.predict(X_test)
print(classification_report(y_test, predictions))
\`\`\`

Using this pipeline pattern, deploying your model is simple: you can dump the entire pipeline object as a serialization file (using \`pickle\` or \`joblib\`) and execute it on raw input request objects instantly in your production server.`
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
