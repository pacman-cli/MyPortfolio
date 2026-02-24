export interface Blog {
    id: number
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    content?: string
    tags: string // Comma separated
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
