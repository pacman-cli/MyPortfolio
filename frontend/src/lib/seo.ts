import { Metadata } from 'next'
import { absoluteUrl, siteConfig } from './site'

const SITE_URL = siteConfig.url

const defaultMeta = {
    title: 'MD Ashikur Rahman Puspo | Backend Developer Portfolio',
    description: siteConfig.description,
    url: SITE_URL,
    image: siteConfig.ogImage,
    twitterHandle: siteConfig.twitterHandle,
}

/** SEO keyword clusters for developer portfolio discoverability */
const DEFAULT_KEYWORDS = [
    // Personal brand name variations
    'MD Ashikur Rahman Puspo',
    'Ashikur Rahman Puspo',
    'Ashikur Rahman',
    'Puspo',
    'ashikur rahman puspo',
    // Social handles / usernames
    'pacman.puspo',
    'pacman-cli',
    'iampuspo',
    'springCraftDev',
    '@springCraftDev',
    // Professional titles
    'Backend Developer',
    'Backend Engineer',
    'Software Developer',
    'Software Engineer',
    'Spring Boot Developer',
    'Java Developer',
    'API Developer',
    'Full Stack Developer',
    // Technical skills
    'System Design',
    'Microservices',
    'MySQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Cloud Infrastructure',
    'Next.js Developer',
    'DevOps',
    // Competitive programming
    'LeetCode',
    'Problem Solving',
    'Data Structures and Algorithms',
    // Location-based
    'Backend Developer Bangladesh',
    'Software Engineer Dhaka',
    'Software Engineer Bangladesh',
    'Official portfolio',
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
        applicationName: siteConfig.siteName,
        alternates: {
            canonical: absoluteUrl(url),
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(url),
            siteName: siteConfig.siteName,
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
                name: siteConfig.fullName,
                url: SITE_URL,
            },
        ],
        creator: siteConfig.fullName,
        publisher: siteConfig.fullName,
        robots: noIndex
            ? {
                index: false,
                follow: false,
            }
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
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}
