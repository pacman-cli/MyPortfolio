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
    keyFeatures: [
      { title: "Real-Time Expense Tracking", description: "Log and categorize expenses instantly with an intuitive interface. Records update in real-time across devices." },
      { title: "Savings Goal Management", description: "Set monthly budgets and savings targets with visual progress bars showing how close you are to each goal." },
      { title: "Category-Based Analytics", description: "Break down spending by category (food, transport, utilities) with interactive pie and bar charts." },
      { title: "Multi-Device Sync", description: "Access your financial data from any device with JWT-based authentication and cloud persistence." },
    ],
    architecture:
      "graph TD\n  A[Next.js Frontend] -->|REST API| B[Spring Boot API]\n  B --> C[MySQL Database]\n  B --> D[JWT Auth Service]\n  A --> E[Chart.js Dashboards]\n  B --> F[Docker Compose Orchestration]\n  F --> A\n  F --> B\n  F --> C",
    databaseDesign:
      "erDiagram\n  User ||--o{ Expense : logs\n  User ||--o{ Goal : sets\n  User {\n    bigint id PK\n    string email\n    string password_hash\n  }\n  Expense {\n    bigint id PK\n    bigint user_id FK\n    decimal amount\n    string category\n    datetime created_at\n  }\n  Goal {\n    bigint id PK\n    bigint user_id FK\n    string name\n    decimal target\n    decimal current\n  }",
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
    keyFeatures: [
      { title: "Property Listing Management", description: "Landlords can create, update, and manage property listings with images, pricing, and availability." },
      { title: "Role-Based Access Control", description: "Separate authentication flows for landlords and tenants with granular permission management." },
      { title: "Advanced Search & Filters", description: "Search properties by location, price range, size, and amenities with dynamic JPA Specification queries." },
      { title: "Secure Image Uploads", description: "Cloud-based image hosting with pre-signed URLs ensures secure and scalable media storage." },
    ],
    architecture:
      "graph TD\n  A[Next.js Frontend] -->|REST API| B[Spring Boot API]\n  B --> C[MySQL Database]\n  B --> D[Cloud Storage]\n  B --> E[JWT Auth - Landlord]\n  B --> F[JWT Auth - Tenant]\n  G[Docker Compose] --> A\n  G --> B\n  G --> C",
    databaseDesign:
      "erDiagram\n  User ||--o{ Property : owns\n  User ||--o{ Message : sends\n  User {\n    bigint id PK\n    string email\n    string role\n    string password_hash\n  }\n  Property {\n    bigint id PK\n    bigint owner_id FK\n    string title\n    decimal price\n    string location\n  }\n  Message {\n    bigint id PK\n    bigint sender_id FK\n    bigint property_id FK\n    text content\n    datetime sent_at\n  }",
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
    keyFeatures: [
      { title: "Dynamic SEO & Structured Data", description: "Full JSON-LD schemas (Person, Article, Breadcrumb) with dynamic sitemap and Open Graph for every page." },
      { title: "Dark/Light Mode", description: "System-preference-aware theme switching with next-themes and smooth CSS transitions." },
      { title: "Blog with Markdown & Diagrams", description: "Technical articles rendered from markdown with syntax highlighting and Mermaid architecture diagrams." },
      { title: "Live GitHub Integration", description: "Real GitHub stats (stars, forks, last commit) fetched at build time and displayed on project cards." },
    ],
    architecture:
      "graph TD\n  A[Next.js 16 App Router] -->|ISR 3600s| B[Spring Boot API]\n  A -->|SSR| C[Static Pages]\n  B --> D[MySQL Database]\n  A --> E[Google Drive API]\n  A --> F[Vercel Deployment]\n  F --> A",
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
    keyFeatures: [
      { title: "Product Management", description: "Full CRUD operations with image galleries, categories, pricing tiers, and inventory tracking." },
      { title: "Persistent Shopping Cart", description: "Server-side cart management with Redis caching ensures cart state survives browser closures." },
      { title: "Secure Multi-Step Checkout", description: "Server-side validation at every checkout step with payment gateway integration." },
      { title: "Inventory Concurrency Control", description: "Optimistic locking in JPA prevents overselling during high-traffic flash sales." },
    ],
    architecture:
      "graph TD\n  A[Next.js Frontend] -->|REST API| B[Spring Boot API]\n  B --> C[MySQL Database]\n  B --> D[Redis Cache - Cart]\n  B --> E[Payment Gateway]\n  F[Docker Compose] --> A\n  F --> B\n  F --> C\n  F --> D",
    databaseDesign:
      "erDiagram\n  Product ||--o{ CartItem : contains\n  User ||--o{ Cart : owns\n  Cart ||--o{ CartItem : has\n  Order ||--o{ OrderItem : includes\n  Product {\n    bigint id PK\n    string name\n    decimal price\n    int stock\n    string category\n  }\n  Cart {\n    bigint id PK\n    bigint user_id FK\n    datetime created_at\n  }\n  Order {\n    bigint id PK\n    bigint user_id FK\n    decimal total\n    string status\n    datetime placed_at\n  }",
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
      "A comprehensive repository of Java learning projects covering core language concepts, data structures, algorithms, design patterns, and advanced OOP principles — organized by topic with detailed documentation.",
    problemStatement:
      "Learning Java beyond syntax requires hands-on projects that demonstrate real-world application of OOP principles, design patterns, and concurrency — most tutorials stop at toy examples.",
    keyFeatures: [
      { title: "Core Java Concepts", description: "Demonstrations of inheritance, polymorphism, interfaces, abstract classes, and exception handling with runnable examples." },
      { title: "Design Pattern Implementations", description: "Singleton, Factory, Builder, Observer, Strategy, and other GoF patterns implemented in pure Java." },
      { title: "Data Structures & Algorithms", description: "Custom implementations of linked lists, trees, hash maps, sorting algorithms, and graph traversals." },
      { title: "Concurrency & Multithreading", description: "Executor services, synchronized blocks, locks, and concurrent collections with thread-safe examples." },
    ],
    architecture:
      "graph LR\n  A[Java Learning Repo]\n  A --> B[core/ - Language Fundamentals]\n  A --> C[patterns/ - Design Patterns]\n  A --> D[dsa/ - Data Structures]\n  A --> E[concurrency/ - Multithreading]\n  A --> F[algorithms/ - Sorting & Searching]",
    challenges: [
      "Organizing multiple independent learning modules without cross-contamination",
      "Writing idiomatic Java that follows industry best practices and naming conventions",
      "Providing clear documentation for each concept without overwhelming learners",
    ],
    solutions: [
      "Modular package structure with clear separation of concerns per topic area",
      "Adhered to Oracle Java Code Conventions with consistent formatting across all modules",
      "Each module includes inline comments, README, and runnable main methods for self-learning",
    ],
    results: [
      "20+ independently runnable Java modules covering 10+ design patterns",
      "100% compilable code with zero warnings under standard javac flags",
      "Structured progression from fundamentals to advanced concurrency patterns",
    ],
  },
  "business-analytics": {
    category: "backend",
    longDescription:
      "A data-driven analytics platform for business insights, featuring interactive visualizations, custom report generation, and real-time data processing pipelines for informed decision-making.",
    problemStatement:
      "Business stakeholders need actionable insights from raw data, but most analytics tools require SQL expertise or lack customization for specific business KPIs.",
    keyFeatures: [
      { title: "Interactive Dashboards", description: "Drag-and-drop dashboard builder with customizable widgets for revenue, growth, and operational metrics." },
      { title: "Automated Report Generation", description: "Schedule PDF and CSV report generation with email delivery to stakeholders on a recurring basis." },
      { title: "Data Pipeline Processing", description: "ETL pipeline that ingests, cleans, and transforms raw business data into analytics-ready format." },
      { title: "Custom KPI Tracking", description: "Define and track custom KPIs with visual trend lines, period-over-period comparisons, and anomaly detection." },
    ],
    architecture:
      "graph TD\n  A[Spring Boot Backend] --> B[Data Processing Engine]\n  B --> C[(MySQL Data Warehouse)]\n  A --> D[Report Generator]\n  A --> E[REST API]\n  F[Dashboard UI] -->|REST| A\n  C --> G[ETL Pipeline]",
    databaseDesign:
      "erDiagram\n  Dashboard ||--o{ Widget : contains\n  ReportSchedule ||--o{ Report : generates\n  KpiDefinition ||--o{ KpiValue : tracks\n  Dashboard {\n    bigint id PK\n    string name\n    string owner\n  }\n  Widget {\n    bigint id PK\n    bigint dashboard_id FK\n    string chart_type\n    string metric\n  }\n  KpiValue {\n    bigint id PK\n    bigint kpi_id FK\n    decimal value\n    date recorded_at\n  }",
    challenges: [
      "Processing large datasets without blocking API responses",
      "Designing a flexible widget system that supports multiple chart types",
      "Ensuring report generation handles edge cases like missing data points",
    ],
    solutions: [
      "Async processing with Spring @Async and CompletableFuture for non-blocking operations",
      "Builder pattern for widget configuration supporting line, bar, pie, heatmap, and table charts",
      "Graceful degradation with default values and interpolation for sparse datasets",
    ],
    results: [
      "Dashboards render sub-500ms for datasets with 50K+ rows",
      "Automated reports serve 10+ stakeholders weekly with zero manual intervention",
      "Modular widget architecture supports 6 chart types with minimal code duplication",
    ],
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
