export interface Blog {
    id: number
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    content?: string
    tags: string // Comma separated
    category?: 'backend-engineering' | 'system-design' | 'spring-boot' | 'database' | 'api-development' | 'devops'
    externalUrl?: string // For linking to external posts (e.g., LinkedIn)
    imageUrl?: string    // For displaying a rich card thumbnail
}

export interface Certification {
    id: string
    title: string
    issuer: string
    date: string
    url: string
    skills?: string[]
}

export interface Project {
    slug: string
    name: string
    description: string
    longDescription?: string // For the case-study page
    techStack: string[]
    githubUrl: string
    demoUrl?: string
    category: 'fullstack' | 'backend' | 'frontend' | 'systems'
    featured?: boolean

    // Case study sections
    problemStatement?: string
    architecture?: string       // Mermaid diagram or description
    databaseDesign?: string     // DB schema description
    challenges?: string[]       // Key challenges faced
    solutions?: string[]        // How they were solved
    results?: string[]          // Metrics / outcomes

    // GitHub stats (populated at build time or via API)
    stars?: number
    forks?: number
    lastCommit?: string

    // Internal linking
    relatedBlogSlugs?: string[]
}
