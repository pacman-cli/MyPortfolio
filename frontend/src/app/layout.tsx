import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { LazyCursorFollower } from "@/components/ui/cursor-follower-lazy"
import { LightModeBackground } from "@/components/ui/light-mode-background"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import Script from "next/script"
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
    alternateName: ['Ashikur Rahman Puspo', 'Ashikur Rahman', 'Puspo', 'ashikur rahman puspo', 'pacman-cli'],
    additionalName: 'Puspo',
    url: 'https://www.puspo.online',
    mainEntityOfPage: 'https://www.puspo.online',
    image: {
      '@type': 'ImageObject',
      url: 'https://www.puspo.online/profile.jpg',
      width: 400,
      height: 400,
    },
    description: 'MD Ashikur Rahman Puspo is a Backend Developer and Software Engineer from Dhaka, Bangladesh, specializing in Spring Boot, Java, Microservices, Docker, and AWS. Active on LeetCode as pacman-cli, GitHub, LinkedIn, YouTube, Facebook, and Instagram.',
    email: 'puspopuspo520@gmail.com',
    identifier: [
      { '@type': 'PropertyValue', name: 'GitHub', value: 'pacman-cli', url: 'https://github.com/pacman-cli' },
      { '@type': 'PropertyValue', name: 'LinkedIn', value: 'iampuspo', url: 'https://www.linkedin.com/in/iampuspo/' },
      { '@type': 'PropertyValue', name: 'LeetCode', value: 'pacman-cli', url: 'https://leetcode.com/u/pacman-cli/' },
      { '@type': 'PropertyValue', name: 'YouTube', value: 'pacmanTichKule', url: 'https://www.youtube.com/@pacmanTichKule' },
      { '@type': 'PropertyValue', name: 'Instagram', value: 'pacman.puspo', url: 'https://www.instagram.com/pacman.puspo/' },
      { '@type': 'PropertyValue', name: 'Facebook', value: 'pacman.puspo', url: 'https://www.facebook.com/pacman.puspo/' },
    ],
    sameAs: [
      'https://github.com/pacman-cli',
      'https://www.linkedin.com/in/iampuspo/',
      'https://www.instagram.com/pacman.puspo/',
      'https://www.facebook.com/pacman.puspo/',
      'https://x.com/iam_puspo',
      'https://www.threads.net/@pacman.puspo',
      'https://leetcode.com/u/pacman-cli/',
      'https://www.youtube.com/@pacmanTichKule',
      'https://www.youtube.com/@pacmanTichKule/featured',
    ],
    jobTitle: 'Backend Developer',
    knowsAbout: ['Spring Boot', 'Java', 'Microservices', 'Docker', 'AWS', 'Next.js', 'System Design', 'LeetCode', 'Data Structures', 'Algorithms', 'REST APIs', 'Cloud Architecture'],
    knowsLanguage: ['English', 'Bengali'],
    nationality: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'United International University',
      url: 'https://www.uiu.ac.bd/',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Self / Freelancer',
    },
    gender: 'Male',
  },
  // 2. WebSite Schema — helps Google generate sitelinks (sub-pages under your result)
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.puspo.online/#website',
    url: 'https://www.puspo.online',
    name: 'MD Ashikur Rahman Puspo | Backend Developer',
    alternateName: ['Puspo Portfolio', 'Ashikur Rahman Puspo Website'],
    description: 'Portfolio website of MD Ashikur Rahman Puspo, a Backend Developer specializing in Spring Boot, Java, and Cloud Architecture. View projects, blog, resume, and social profiles.',
    publisher: { '@id': 'https://www.puspo.online/#person' },
    inLanguage: 'en-US',
  },
  // 3. ProfilePage Schema — tells Google this page IS a profile page
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://www.puspo.online/#profilepage',
    url: 'https://www.puspo.online',
    name: 'MD Ashikur Rahman Puspo | Backend Developer',
    mainEntity: { '@id': 'https://www.puspo.online/#person' },
    dateCreated: '2024-06-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
  },
  // 4. SiteNavigationElement — explicitly tells Google about your main pages (sitelinks)
  {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: ['About', 'Projects', 'Resume', 'Blog', 'Social Links'],
    url: [
      'https://www.puspo.online/about-me',
      'https://www.puspo.online/projects',
      'https://www.puspo.online/resume',
      'https://www.puspo.online/blog',
      'https://www.puspo.online/links',
    ],
  },
  // 5. BreadcrumbList — tells Google to show breadcrumbs for organized navigation
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.puspo.online' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.puspo.online/about-me' },
      { '@type': 'ListItem', position: 3, name: 'Projects', item: 'https://www.puspo.online/projects' },
      { '@type': 'ListItem', position: 4, name: 'Blog', item: 'https://www.puspo.online/blog' },
      { '@type': 'ListItem', position: 5, name: 'Resume', item: 'https://www.puspo.online/resume' },
      { '@type': 'ListItem', position: 6, name: 'Social Links', item: 'https://www.puspo.online/links' },
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
        <meta name="google-adsense-account" content="ca-pub-5094804024850501" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5094804024850501"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
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
