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

For most of their short history, large language models generated answers in a single pass — one forward propagation through the network, producing one token at a time from left to right with no回头, no revision, no second thoughts. That changed in late 2024.

OpenAI's o1 preview introduced a new paradigm: **reasoning models** that spend extra compute at inference time to generate hidden "thinking" tokens before arriving at an answer. DeepSeek-R1 open-sourced a competitive approach days later. Anthropic added extended thinking to Claude. Google shipped Gemini 2.0 Flash Thinking. By 2026, almost every frontier model has some form of internal reasoning capability.

This article covers the full landscape across four sections:

1. **How reasoning models work** — the architecture and internals of o1, R1, Claude thinking, and others
2. **Practical techniques** — prompting strategies that elicit deeper reasoning from any capable LLM
3. **Evaluating reasoning** — benchmarks, failure modes, and what the numbers don't tell you
4. **The road ahead** — history, open challenges, and future directions`
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

### The Filter Chain

Every request passes through a chain of filters. The \`UsernamePasswordAuthenticationFilter\` (for form logins) or \`BearerTokenAuthenticationFilter\` (for JWT) extracts credentials and creates an \`Authentication\` object.

### The Provider Manager

The \`AuthenticationManager\` delegates to one or more \`AuthenticationProvider\`s. Each provider attempts to authenticate the request. Common providers include \`DaoAuthenticationProvider\` (username/password against a database) and \`JwtAuthenticationProvider\` (JWT token validation).

### SecurityContextHolder

On successful authentication, the \`SecurityContextHolder\` stores the \`Authentication\` object for the duration of the request. This is how controllers and services access the current user via \`SecurityContextHolder.getContext().getAuthentication()\`.`
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

### Key Components

1. **Service Discovery** (Eureka)
2. **API Gateway** (Spring Cloud Gateway)
3. **Centralized Configuration** (Spring Cloud Config)
4. **Circuit Breakers** (Resilience4j)

### Deployment with Docker

Each microservice is containerized using Docker, with Docker Compose orchestrating the entire system. This ensures consistent environments across development, staging, and production.`
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

### 1. Handling Missing Values

Missing data can significantly impact model performance. Common strategies include:
- Removing rows with missing values (when the proportion is small)
- Imputing with mean, median, or mode
- Using model-based imputation for complex patterns

### 2. Feature Engineering

Creating informative features from raw data often makes the difference between a good model and a great one. Techniques include:
- Encoding categorical variables
- Creating interaction features
- Extracting date/time components
- Scaling numerical features

### 3. Model Training and Evaluation

Once the data is clean, split into training, validation, and test sets. Use cross-validation to ensure the model generalizes well, and track metrics like precision, recall, and F1-score.`
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
