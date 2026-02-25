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

import { constructMetadata } from "@/lib/seo"

export const metadata: Metadata = constructMetadata()
const jsonLdData = [
  // 1. Person Schema — tells Google WHO you are + your social profiles
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.puspo.online/#person',
    name: 'MD Ashikur Rahman Puspo',
    givenName: 'MD Ashikur Rahman',
    familyName: 'Puspo',
    alternateName: ['Puspo', 'MD. Ashikur Rahman', 'MD. Ashikur Rahman Puspo', 'Ashikur Rahman', 'Ashikur Rahman Puspo', 'iam_puspo', 'pacman.puspo'],
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
      'https://www.threads.net/@pacman.puspo',
      'https://www.instagram.com/pacman.puspo/',
      'https://link.me/pacman',
    ],
    knowsAbout: [
      'Spring Boot', 'Java', 'Go', 'MySQL', 'PostgreSQL',
      'Microservices Architecture', 'AWS', 'Docker',
      'Kubernetes', 'React', 'Next.js', 'System Design',
      'API Development', 'REST API', 'DevOps', 'CI/CD',
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
    name: 'MD Ashikur Rahman Puspo | Backend Developer',
    description: 'Portfolio website of MD Ashikur Rahman Puspo, a Backend Developer specializing in Spring Boot, Java, and Cloud Architecture.',
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
    name: 'MD Ashikur Rahman Puspo | Backend Developer',
    mainEntity: { '@id': 'https://www.puspo.online/#person' },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  },
  // 4. SiteNavigationElement — explicitly tells Google about your main pages (sitelinks)
  {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: ['About', 'Projects', 'Resume', 'Blog'],
    url: [
      'https://puspo.online/about',
      'https://puspo.online/projects',
      'https://puspo.online/resume',
      'https://puspo.online/blog',
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
        {jsonLdData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className={cn(inter.variable, jakarta.variable, "font-sans min-h-screen antialiased bg-background text-foreground selection:bg-primary/20")} suppressHydrationWarning>
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
