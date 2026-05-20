import { Project } from "@/types"

const API_BASE: string =
  process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL}/api/v1`
    : process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1`
      : "http://localhost:8082/api/v1"

const REVALIDATE = 3600

interface PagedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  totalPages: number
}

interface ProjectDTO {
  id: number
  title: string
  slug: string
  description: string
  techStack: string[]
  githubUrl: string
  liveDemoUrl: string | null
  imageUrl: string | null
}

const STATIC_RICH_DATA: Record<string, Partial<Project>> = {
  takatrack: {
    longDescription:
      "TakaTrack is a full-stack personal finance application designed to help users take control of their financial life. It features real-time expense tracking, interactive charts, savings goal management, and category-based analytics — all backed by a robust Spring Boot API and MySQL database.",
    category: "fullstack",
    featured: true,
    problemStatement:
      "Managing personal finances across multiple categories is overwhelming without a centralized tool. Most free budgeting apps lack real-time insights and goal tracking, forcing users to rely on spreadsheets.",
    architecture: [
      "Next.js Frontend",
      "Spring Boot API",
      "MySQL Database",
      "JWT Authentication",
      "Docker Compose",
    ].join(", "),
    challenges: [
      "Implementing real-time chart updates without compromising page performance",
      "Designing a flexible category system that supports custom user categories",
      "Handling concurrent expense submissions from multiple devices",
    ],
    solutions: [
      "Used React Query with optimistic updates for instant UI feedback",
      "Built a hierarchical category model with parent-child relationships in MySQL",
      "Implemented database-level locking with Spring Boot @Transactional for data consistency",
    ],
    results: [
      "Handles 1000+ expense entries per user with sub-200ms API response times",
      "Deployed on cloud with Docker Compose for easy horizontal scaling",
      "Interactive dashboards with Chart.js render in under 100ms",
    ],
    relatedBlogSlugs: ["microservices-spring-boot-architecture"],
  },
  staymate: {
    longDescription:
      "StayMate is a production-grade rental property marketplace that connects landlords with tenants. It features property listing management, search with filters, user authentication via JWT, real-time messaging, and image uploads — built with a clean separation between the Next.js frontend and Spring Boot backend.",
    category: "fullstack",
    featured: true,
    problemStatement:
      "Finding rental properties in local markets often relies on fragmented social media posts and phone calls, lacking a unified search and communication platform.",
    challenges: [
      "Building a secure multi-role authentication system (landlord vs tenant)",
      "Implementing efficient property search with multiple filter combinations",
      "Handling image uploads and storage at scale",
    ],
    solutions: [
      "Designed role-based JWT auth with Spring Security and refresh token rotation",
      "Built dynamic query construction using JPA Specifications for flexible filtering",
      "Implemented cloud-based image storage with pre-signed URLs for secure uploads",
    ],
    results: [
      "Supports 500+ property listings with paginated search in under 300ms",
      "Zero authentication vulnerabilities in security testing",
      "Deployed via Docker Compose with separate services for frontend, backend, and database",
    ],
    relatedBlogSlugs: ["spring-security-architecture-linkedin"],
  },
  portfolio: {
    category: "frontend",
    featured: true,
    longDescription:
      "A modern developer portfolio built with Next.js 16, featuring scroll-driven animations, dark mode, and responsive design. This is the site you are currently viewing.",
    problemStatement:
      "Developer portfolios need to balance visual appeal with performance and SEO. Most template-based portfolios sacrifice either design quality or Core Web Vitals scores.",
    challenges: [
      "Achieving smooth scroll-driven animations without impacting Lighthouse performance score",
      "Implementing a theme system with multiple modes (light/dark/system)",
      "Optimizing LCP with dynamic imports for below-the-fold content",
    ],
    solutions: [
      "Used Framer Motion with lazy loading and CSS transforms for GPU-accelerated animations",
      "Built a tab-based theme switcher with next-themes and smooth transitions",
      "Implemented next/dynamic with SSR/CSR split for optimal initial load",
    ],
    results: [
      "95+ Lighthouse performance score on mobile",
      "Sub-2 second LCP on 3G connections",
      "Fully responsive across all breakpoints",
    ],
  },
  "e-commerce": {
    category: "fullstack",
    longDescription:
      "A comprehensive e-commerce platform with product management, shopping cart functionality, and secure checkout processes built with Next.js and Spring Boot.",
    problemStatement:
      "Building a production-ready e-commerce platform requires handling complex state management, inventory tracking, and secure payment processing.",
    challenges: [
      "Managing shopping cart state across sessions and devices",
      "Preventing race conditions during concurrent inventory updates",
      "Implementing secure checkout with payment validation",
    ],
    solutions: [
      "Used server-side session management with Redis-backed caching",
      "Applied optimistic locking in JPA for inventory concurrency control",
      "Built a multi-step checkout flow with server-side validation at each step",
    ],
    results: [
      "Full CRUD product management with image galleries",
      "Cart persistence across browser sessions",
      "Containerized deployment with Docker Compose",
    ],
  },
  "java-learning": {
    category: "backend",
    longDescription:
      "Comprehensive repository of Java learning projects covering core concepts, algorithms, and advanced OOP patterns.",
  },
  "business-analytics": {
    category: "backend",
    longDescription:
      "Data-driven analytics dashboard for business insights with interactive visualizations and reporting capabilities.",
  },
}

function toProject(dto: ProjectDTO): Project {
  const rich = STATIC_RICH_DATA[dto.slug] ?? {}
  return {
    ...rich,
    slug: dto.slug,
    name: dto.title,
    description: dto.description,
    techStack: dto.techStack,
    githubUrl: dto.githubUrl,
    demoUrl: dto.liveDemoUrl ?? undefined,
  } as Project
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
  return res.json()
}

async function fetchProjectsFromApi(): Promise<Project[]> {
  const first = await fetchJson<PagedResponse<ProjectDTO>>(
    `${API_BASE}/projects?page=0&size=50`,
  )
  if (first.totalPages <= 1) return first.items.map(toProject)

  const rest = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, i) =>
      fetchJson<PagedResponse<ProjectDTO>>(
        `${API_BASE}/projects?page=${i + 1}&size=50`,
      ),
    ),
  )
  return first.items
    .concat(...rest.map((p) => p.items))
    .map(toProject)
}

function getStaticProjects(): Project[] {
  return Object.entries(STATIC_RICH_DATA).map(([slug, rich]) => {
    const name = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return {
      slug,
      name,
      description: (rich.longDescription ?? "").slice(0, 120) + "...",
      techStack: [],
      githubUrl: "",
      ...rich,
    } as Project
  })
}

export async function getProjects(): Promise<Project[]> {
  try {
    return await fetchProjectsFromApi()
  } catch (error) {
    console.error("Failed to fetch projects, using static fallback:", error)
    return getStaticProjects()
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | null> {
  try {
    const dto = await fetchJson<ProjectDTO>(`${API_BASE}/projects/${slug}`)
    return toProject(dto)
  } catch (error) {
    console.error(`Failed to fetch project "${slug}", using static fallback:`, error)
    const rich = STATIC_RICH_DATA[slug]
    if (!rich) return null
    return { slug, ...rich } as Project
  }
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(STATIC_RICH_DATA)
}
