import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { LazyCursorFollower } from "@/components/ui/cursor-follower-lazy"
import { LightModeBackground } from "@/components/ui/light-mode-background"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' },
  ],
}

export const metadata: Metadata = {
  title: 'Puspo | Backend Developer',
  description: 'Meet Puspo (MD. Ashikur Rahman), a Backend Engineer and Software Developer specializing in Spring Boot,My Sql and Cloud technologies.',
  keywords: ['Puspo', 'Ashikur Rahman Puspo', 'Backend Developer', 'Backend Engineer', 'Software Developer', 'Spring Boot', 'MySQL', 'Cloud', 'DevOps'],
  authors: [{ name: 'Puspo', url: 'https://www.puspo.online' }],
  creator: 'Puspo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.puspo.online/',
    title: 'Puspo | Backend Developer',
    description: 'Meet Puspo (MD. Ashikur Rahman), a Backend Engineer and Software Developer specializing in Spring Boot,My Sql and Cloud technologies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Puspo - Backend Developer',
      },
    ],
    siteName: 'Puspo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puspo | Backend Developer',
    description: 'Meet Puspo (MD. Ashikur Rahman), a Backend Engineer and Software Developer specializing in Spring Boot,My Sql and Cloud technologies.',
    images: ['/og-image.png'],
    creator: '@iam_puspo',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.puspo.online'),
  alternates: {
    canonical: 'https://www.puspo.online/',
  },
  other: {
    'google-site-verification': 'google-site-verification-token',
  }
}

const jsonLdData = [
  // 1. Person Schema — tells Google WHO you are + your social profiles
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.puspo.online/#person',
    name: 'Puspo',
    givenName: 'MD. Ashikur Rahman',
    alternateName: ['MD. Ashikur Rahman', 'MD. Ashikur Rahman Puspo', 'Ashikur Rahman', 'Ashikur Rahman Puspo', 'iam_puspo'],
    url: 'https://www.puspo.online',
    image: {
      '@type': 'ImageObject',
      url: 'https://www.puspo.online/og-image.png',
      width: 1200,
      height: 630,
    },
    jobTitle: 'Backend Developer',
    description: 'Meet Puspo (MD. Ashikur Rahman), a Backend Engineer and Software Developer specializing in Spring Boot, MySQL and Cloud technologies.',
    // sameAs is THE key property that links your social profiles in Google Search
    sameAs: [
      'https://github.com/pacman-cli',
      'https://www.linkedin.com/in/iampuspo/',
      'https://x.com/iam_puspo',
      'https://web.facebook.com/pacman.puspo/',
    ],
    knowsAbout: [
      'Spring Boot', 'Java', 'MySQL', 'PostgreSQL',
      'Microservices Architecture', 'AWS', 'Docker',
      'Kubernetes', 'React', 'Next.js', 'System Design'
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'United International University',
      sameAs: 'https://www.uiu.ac.bd/',
    },
    nationality: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
  },
  // 2. WebSite Schema — helps Google generate sitelinks (sub-pages under your result)
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.puspo.online/#website',
    url: 'https://www.puspo.online',
    name: 'Puspo | Backend Developer',
    description: 'Portfolio website of Puspo (MD. Ashikur Rahman), a Backend Developer.',
    publisher: { '@id': 'https://www.puspo.online/#person' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.puspo.online/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },
  // 3. ProfilePage Schema — tells Google this page IS a profile page
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://www.puspo.online/#profilepage',
    url: 'https://www.puspo.online',
    name: 'Puspo | Backend Developer',
    mainEntity: { '@id': 'https://www.puspo.online/#person' },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  },
  // 4. SiteNavigationElement — explicitly tells Google about your main pages (sitelinks)
  {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: ['About', 'Projects', 'Resume', 'Blog', 'Contact'],
    url: [
      'https://www.puspo.online/about',
      'https://www.puspo.online/#projects',
      'https://www.puspo.online/resume',
      'https://www.puspo.online/blog',
      'https://www.puspo.online/#contact',
    ],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn(inter.variable, jakarta.variable, "font-sans min-h-screen antialiased bg-background text-foreground selection:bg-primary/20")} suppressHydrationWarning>
        {jsonLdData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LightModeBackground />
          <LazyCursorFollower />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
