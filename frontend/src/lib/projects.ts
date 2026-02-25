import { Project } from '@/types'

/**
 * Centralized project data store.
 * This is the single source of truth for ALL project data displayed across:
 * - Homepage selected-work section
 * - /projects listing page
 * - /projects/[slug] case study pages
 * - Sitemap generation
 */
export const PROJECTS: Project[] = [
    {
        slug: 'takatrack',
        name: 'TakaTrack',
        description:
            'A comprehensive personal finance management platform with real-time visualizations, expense tracking, and savings goal management.',
        longDescription:
            'TakaTrack is a full-stack personal finance application designed to help users take control of their financial life. It features real-time expense tracking, interactive charts, savings goal management, and category-based analytics — all backed by a robust Spring Boot API and MySQL database.',
        techStack: ['Next.js', 'Spring Boot', 'MySQL', 'Docker'],
        githubUrl: 'https://github.com/pacman-cli/expense-tracker',
        demoUrl: 'https://takatrack.puspo.online',
        category: 'fullstack',
        featured: true,
        problemStatement:
            'Managing personal finances across multiple categories is overwhelming without a centralized tool. Most free budgeting apps lack real-time insights and goal tracking, forcing users to rely on spreadsheets.',
        architecture: `
\`\`\`mermaid
flowchart TD
    Client["🖥️ Next.js Frontend"]
    API["🔀 Spring Boot API"]
    DB["🗄️ MySQL Database"]
    Auth["🔐 JWT Authentication"]
    Docker["🐳 Docker Compose"]

    Client -->|"REST API"| API
    API --> Auth
    API --> DB
    Docker -.->|"orchestrates"| Client
    Docker -.->|"orchestrates"| API
    Docker -.->|"orchestrates"| DB
\`\`\`
    `,
        challenges: [
            'Implementing real-time chart updates without compromising page performance',
            'Designing a flexible category system that supports custom user categories',
            'Handling concurrent expense submissions from multiple devices',
        ],
        solutions: [
            'Used React Query with optimistic updates for instant UI feedback',
            'Built a hierarchical category model with parent-child relationships in MySQL',
            'Implemented database-level locking with Spring Boot @Transactional for data consistency',
        ],
        results: [
            'Handles 1000+ expense entries per user with sub-200ms API response times',
            'Deployed on cloud with Docker Compose for easy horizontal scaling',
            'Interactive dashboards with Chart.js render in under 100ms',
        ],
        relatedBlogSlugs: ['microservices-spring-boot-architecture'],
    },
    {
        slug: 'staymate',
        name: 'StayMate',
        description:
            'Full-stack rental property marketplace with secure authentication, real-time messaging, and comprehensive listing management.',
        longDescription:
            'StayMate is a production-grade rental property marketplace that connects landlords with tenants. It features property listing management, search with filters, user authentication via JWT, real-time messaging, and image uploads — built with a clean separation between the Next.js frontend and Spring Boot backend.',
        techStack: ['Next.js', 'Spring Boot', 'MySQL', 'Docker'],
        githubUrl: 'https://github.com/pacman-cli/staymate',
        demoUrl: 'https://staymate-demo.puspo.online',
        category: 'fullstack',
        featured: true,
        problemStatement:
            'Finding rental properties in local markets often relies on fragmented social media posts and phone calls, lacking a unified search and communication platform.',
        challenges: [
            'Building a secure multi-role authentication system (landlord vs tenant)',
            'Implementing efficient property search with multiple filter combinations',
            'Handling image uploads and storage at scale',
        ],
        solutions: [
            'Designed role-based JWT auth with Spring Security and refresh token rotation',
            'Built dynamic query construction using JPA Specifications for flexible filtering',
            'Implemented cloud-based image storage with pre-signed URLs for secure uploads',
        ],
        results: [
            'Supports 500+ property listings with paginated search in under 300ms',
            'Zero authentication vulnerabilities in security testing',
            'Deployed via Docker Compose with separate services for frontend, backend, and database',
        ],
        relatedBlogSlugs: ['spring-security-architecture-linkedin'],
    },
    {
        slug: 'portfolio',
        name: 'Portfolio',
        description:
            'Modern developer portfolio built with Next.js 16, featuring scroll-driven animations, dark mode, and responsive design.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/pacman-cli/MyPortfolio',
        demoUrl: 'https://puspo.online',
        category: 'frontend',
        problemStatement:
            'Developer portfolios need to balance visual appeal with performance and SEO. Most template-based portfolios sacrifice either design quality or Core Web Vitals scores.',
        challenges: [
            'Achieving smooth scroll-driven animations without impacting Lighthouse performance score',
            'Implementing a theme system with multiple modes (light/dark/system)',
            'Optimizing LCP with dynamic imports for below-the-fold content',
        ],
        solutions: [
            'Used Framer Motion with lazy loading and CSS transforms for GPU-accelerated animations',
            'Built a tab-based theme switcher with next-themes and smooth transitions',
            'Implemented next/dynamic with SSR/CSR split for optimal initial load',
        ],
        results: [
            '95+ Lighthouse performance score on mobile',
            'Sub-2 second LCP on 3G connections',
            'Fully responsive across all breakpoints',
        ],
    },
    {
        slug: 'e-commerce',
        name: 'E-Commerce',
        description:
            'A comprehensive e-commerce platform with product management, shopping cart functionality, and secure checkout processes.',
        techStack: ['Next.js', 'Spring Boot', 'MySQL', 'Docker'],
        githubUrl: 'https://github.com/pacman-cli/e-commerce',
        demoUrl: 'https://ecommerce.puspo.online/',
        category: 'fullstack',
        problemStatement:
            'Building a production-ready e-commerce platform requires handling complex state management, inventory tracking, and secure payment processing.',
        challenges: [
            'Managing shopping cart state across sessions and devices',
            'Preventing race conditions during concurrent inventory updates',
            'Implementing secure checkout with payment validation',
        ],
        solutions: [
            'Used server-side session management with Redis-backed caching',
            'Applied optimistic locking in JPA for inventory concurrency control',
            'Built a multi-step checkout flow with server-side validation at each step',
        ],
        results: [
            'Full CRUD product management with image galleries',
            'Cart persistence across browser sessions',
            'Containerized deployment with Docker Compose',
        ],
    },
    {
        slug: 'java-learning',
        name: 'Java Learning',
        description:
            'Comprehensive repository of Java learning projects covering core concepts, algorithms, and advanced OOP patterns.',
        techStack: ['Java', 'Algorithms', 'OOP'],
        githubUrl: 'https://github.com/pacman-cli/Java-Learning',
        category: 'backend',
    },
    {
        slug: 'business-analytics',
        name: 'Business Analytics Dashboard',
        description:
            'Data-driven analytics dashboard for business insights with interactive visualizations and reporting capabilities.',
        techStack: ['Java', 'Spring Boot', 'Analytics'],
        githubUrl:
            'https://github.com/pacman-cli/Java-Learning/tree/main/server/businessAnalytics',
        category: 'backend',
    },
]

/** Get all projects */
export function getProjects(): Project[] {
    return PROJECTS
}

/** Get featured projects for homepage */
export function getFeaturedProjects(): Project[] {
    return PROJECTS.filter((p) => p.featured)
}

/** Get a single project by slug */
export function getProjectBySlug(slug: string): Project | null {
    return PROJECTS.find((p) => p.slug === slug) || null
}

/** Get all project slugs (for generateStaticParams) */
export function getAllProjectSlugs(): string[] {
    return PROJECTS.map((p) => p.slug)
}
