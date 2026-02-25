import { getBlogs } from '@/lib/api'
import { getAllProjectSlugs } from '@/lib/projects'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puspo.online'

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/resume`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Dynamic project routes
    const projectSlugs = getAllProjectSlugs()
    const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
        url: `${baseUrl}/projects/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Dynamic blog routes
    const blogs = await getBlogs()
    const blogRoutes: MetadataRoute.Sitemap = blogs
        .filter((blog) => blog.content) // Only include blogs with full content
        .map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.publishedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

    return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
