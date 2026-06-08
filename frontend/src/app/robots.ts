import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Note: This static robots.ts output is overridden at runtime by the
// middleware (src/middleware.ts) which intercepts /robots.txt to inject
// Content-Signal directives. Keep this file as a fallback / build-time
// reference.

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_URL

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        host: baseUrl,
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
