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
    content: "## Introduction\n\nFor most of their short history, large language models generated answers in a single pass — one forward propagation through the network, producing one token at a time from left to right with no revision, no second thoughts. That changed in late 2024.\n\nOpenAI's o1 preview introduced a new paradigm: reasoning models that spend extra compute at inference time to generate hidden thinking tokens before arriving at an answer. DeepSeek-R1 open-sourced a competitive approach days later. Anthropic added extended thinking to Claude. Google shipped Gemini 2.0 Flash Thinking. By 2026, almost every frontier model has some form of internal reasoning capability."
  },
  {
    id: 2,
    title: "Unlocking Spring Security: Authentication Pipeline & Bean Connections",
    slug: "spring-security-architecture-linkedin",
    excerpt: "A deep dive into Spring Security's authentication architecture — how filters, providers, and SecurityContextHolder work together to secure your application.",
    tags: "Spring Security, Java, Authentication, Backend",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-05-10T10:00:00",
    content: "## The Authentication Architecture\n\nSpring Security's authentication system is built on a pipeline of filters, providers, and context holders. Understanding how they connect is key to configuring security correctly.\n\n### The Filter Chain\n\nEvery request passes through a chain of filters. The UsernamePasswordAuthenticationFilter (for form logins) or BearerTokenAuthenticationFilter (for JWT) extracts credentials and creates an Authentication object."
  },
  {
    id: 3,
    title: "Microservices in Spring Boot: Architecture, Design Patterns, and Production Practices",
    slug: "microservices-spring-boot-architecture",
    excerpt: "A comprehensive guide to designing, building, and deploying microservices with Spring Boot — covering service discovery, API gateways, resilience patterns, and production deployment strategies.",
    tags: "Microservices, Spring Boot, Java, Architecture, Docker",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-05-05T10:00:00",
    content: "## Introduction\n\nMicroservices architecture has become the de facto standard for building scalable, resilient, and maintainable applications. In this comprehensive guide, we'll explore how to leverage the power of Spring Boot and Spring Cloud to build a robust microservices ecosystem."
  },
  {
    id: 4,
    title: "Data Cleaning and Model Training: A Practical Guide",
    slug: "data-cleaning-model-training",
    excerpt: "A hands-on guide to data cleaning, preprocessing, and training machine learning models — from handling missing values to feature engineering and model evaluation.",
    tags: "Data Science, Machine Learning, Python, Data Engineering",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    publishedAt: "2026-04-28T10:00:00",
    content: "## The Data Pipeline\n\nData cleaning is often the most time-consuming part of any machine learning project. This guide covers the essential steps to transform raw data into a model-ready format."
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
