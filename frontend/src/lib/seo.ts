import { Metadata } from 'next'
import { absoluteUrl, siteConfig } from './site'

const SITE_URL = siteConfig.url

const defaultMeta = {
    title: 'Ashikur Rahman Puspo | Backend Engineer & Software Developer',
    description: 'Official portfolio of Ashikur Rahman Puspo — Backend Engineer, Software Developer, and DevOps enthusiast from Dhaka, Bangladesh. Explore projects, skills, experience, GitHub, LinkedIn, and contact information.',
    url: SITE_URL,
    image: siteConfig.ogImage,
    twitterHandle: siteConfig.twitterHandle,
}

/** SEO keyword clusters for personal brand discoverability */
const DEFAULT_KEYWORDS = [
    // Personal brand — primary
    'Ashikur Rahman Puspo',
    'Ashikur Rahman',
    'Ashikur Puspo',
    'Puspo',
    'iampuspoo',
    'iampuspo',
    'MD Ashikur Rahman Puspo',
    // Usernames
    'pacman-cli',
    'springCraftDev',
    // Professional titles
    'Backend Engineer',
    'Backend Developer',
    'Software Developer',
    'Software Engineer',
    'Spring Boot Developer',
    'Java Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    // Technical skills
    'Spring Boot',
    'Java',
    'Microservices',
    'System Design',
    'Docker',
    'Kubernetes',
    'AWS',
    'Cloud Infrastructure',
    'PostgreSQL',
    'MySQL',
    'REST APIs',
    'Next.js',
    // Location
    'Bangladesh Developer',
    'Software Engineer Dhaka',
    'Backend Developer Bangladesh',
    'Dhaka',
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
    type = 'website',
    publishedTime,
}: {
    title?: string
    description?: string
    image?: string
    url?: string
    keywords?: string[]
    noIndex?: boolean
    type?: 'website' | 'article' | 'profile'
    publishedTime?: string
} = {}): Metadata {
    const ogType = type === 'article' ? 'article' : type === 'profile' ? 'profile' : 'website'
    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        keywords,
        applicationName: siteConfig.siteName,
        alternates: {
            canonical: absoluteUrl(url),
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(url),
            siteName: siteConfig.siteName,
            type: ogType,
            ...(publishedTime && { releaseDate: publishedTime }),
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
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
                name: siteConfig.fullName,
                url: SITE_URL,
            },
        ],
        creator: siteConfig.fullName,
        publisher: siteConfig.fullName,
        robots: noIndex
            ? { index: false, follow: false }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                    'max-video-preview': -1,
                },
            },
    }
}
