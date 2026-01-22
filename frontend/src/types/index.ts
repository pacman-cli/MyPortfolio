export interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    tags: string; // Comma separated
    publishedAt: string;
}
