import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puspo.online'

const defaultMeta = {
    title: 'MD Ashikur Rahman Puspo | Backend Developer',
    description:
        'Experienced Backend Engineer specializing in Spring Boot, Java, MySQL, Docker, and scalable Cloud Infrastructure. Building production-grade APIs and microservices.',
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    twitterHandle: '@iam_puspo',
}

/** SEO keyword clusters for developer portfolio discoverability */
const DEFAULT_KEYWORDS = [
    'MD Ashikur Rahman Puspo',
    'Puspo',
    'Backend Developer',
    'Backend Engineer',
    'Software Developer',
    'Spring Boot Developer',
    'Java Developer',
    'API Developer',
    'Full Stack Developer',
    'System Design',
    'Microservices',
    'MySQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Cloud Infrastructure',
    'Next.js Developer',
    'DevOps',
]

/**
 * Constructs a standardized Metadata object for Next.js App Router SEO.
 *
 * Usage:
 * ```ts
 * export const metadata = constructMetadata({ title: 'My Page' })
 * ```
 */
export function constructMetadata({
    title = defaultMeta.title,
    description = defaultMeta.description,
    image = defaultMeta.image,
    url = defaultMeta.url,
    keywords = DEFAULT_KEYWORDS,
    noIndex = false,
}: {
    title?: string
    description?: string
    image?: string
    url?: string
    keywords?: string[]
    noIndex?: boolean
} = {}): Metadata {
    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'MD Ashikur Rahman Puspo',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: defaultMeta.twitterHandle,
        },
        authors: [
            {
                name: 'MD Ashikur Rahman Puspo',
                url: SITE_URL,
            },
        ],
        creator: 'MD Ashikur Rahman Puspo',
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}
