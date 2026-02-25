import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://puspo.online'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/', '/private/'], // Protect backend and internal routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
