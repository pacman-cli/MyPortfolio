import { Blog } from "@/types"

// Single high-quality static blog post
const BLOGS: Blog[] = [
    {
        id: 2,
        title: "Deep Dive: Spring Security Architecture & Request Pipeline",
        slug: "spring-security-architecture-linkedin",
        excerpt: "A visual deep dive into how Spring Security processes requests under the hood, featuring a detailed pipeline diagram and configuration best practices.",
        tags: "Spring Security, Backend, Architecture",
        publishedAt: "2024-05-20T09:00:00.000Z",
        externalUrl: "https://www.linkedin.com/posts/iampuspo_today-i-deep-dived-into-how-spring-security-share-7430609877632237568-D53Q",
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop" // Beautiful generic code/security image
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
    Client["🖥️ Client (Browser / Mobile)"]
    Gateway["🔀 API Gateway\n(Spring Cloud Gateway)\nRouting · Auth · Rate Limiting"]
    Order["📦 Order Service"]
    Payment["💳 Payment Service"]
    Inventory["📋 Inventory Service"]
    Notification["🔔 Notification Service"]
    Broker["📨 Message Broker\n(Kafka / RabbitMQ)"]
    Eureka["📡 Eureka Service Registry"]
    DB["🗄️ DB (Per Service)"]

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
    Eureka["📡 EUREKA SERVER\n(Service Registry)"]
    Registry["Registry Table:\n\norder-service → 192.168.1.10, .11\ninventory-service → 192.168.1.20\npayment-service → 192.168.1.30, .31"]
    OrderSvc["📦 Order Service\n(Eureka Client)"]
    InvSvc["📋 Inventory Service\n(Eureka Client)"]

    Eureka --- Registry
    OrderSvc -->|"① Register\n+ Heartbeat"| Eureka
    InvSvc -->|"② Discover\n+ Fetch List"| Eureka
    OrderSvc -->|"③ Call by name"| InvSvc

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
    Client["🖥️ CLIENT"]
    Gateway["🔀 API GATEWAY :8080"]
    Route["Route Matching"]
    Auth["Auth Filter"]
    RateLimit["Rate Limiter"]
    CB["Circuit Breaker"]
    OrderSvc["📦 Order Service"]
    PaySvc["💳 Payment Service"]
    InvSvc["📋 Inventory Service"]

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
    subgraph OrderService["📦 ORDER SERVICE"]
        Call["OrderService.java\ninventoryClient.getStock('P001')"]
        FeignIF["InventoryClient Interface\n@FeignClient('inventory-service')"]
        LB["Spring Cloud LoadBalancer\n(Round Robin / Weighted)"]
    end

    Eureka["📡 EUREKA SERVER\nReturns: 192.168.1.20, .21"]
    Inst1["📋 Inventory Instance 1\n:8081"]
    Inst2["📋 Inventory Instance 2\n:8082"]

    Call -->|"① Method call"| FeignIF
    FeignIF -->|"② Auto-generates HTTP client"| LB
    LB -->|"③ Lookup in Eureka"| Eureka
    Eureka -->|"④ HTTP GET /api/v1/stock/P001"| Inst1
    Eureka -->|"④ HTTP GET /api/v1/stock/P001"| Inst2

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

    CLOSED : ✅ Normal Operation
    CLOSED : All requests pass through
    CLOSED : Failures are counted

    OPEN : ❌ Failing Fast
    OPEN : Requests rejected immediately
    OPEN : Routed to fallback

    HALF_OPEN : 🔄 Testing Recovery
    HALF_OPEN : Limited test requests sent
    HALF_OPEN : Evaluating service health
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
    subgraph Cluster["☸️ Kubernetes Cluster"]
        subgraph NS["Namespace: production"]
            Pod1["🟢 Pod 1\nOrder Service"]
            Pod2["🟢 Pod 2\nOrder Service"]
            SVC["K8s Service\n(Load Balancer)\nClusterIP / NodePort"]
            HPA["📈 HPA Auto-Scaler\nmin: 2, max: 10\nCPU target: 70%"]
        end
        subgraph Ingress["🌐 Ingress Controller"]
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
    }
]

export async function getBlogs(): Promise<Blog[]> {
    return Promise.resolve(BLOGS)
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const blog = BLOGS.find(b => b.slug === slug)
    return Promise.resolve(blog || null)
}
