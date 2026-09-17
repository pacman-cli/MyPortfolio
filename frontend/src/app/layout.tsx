import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { WebMCPProvider } from "@/components/webmcp-provider"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { SAME_AS_LINKS, SITE_NAVIGATION, siteConfig } from "@/lib/site"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: 'swap', preload: true })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", display: 'swap', preload: true })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

import { constructMetadata } from "@/lib/seo"

export const metadata: Metadata = constructMetadata()
const jsonLdData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.personName,
    honorificPrefix: 'MD.',
    alternateName: [
      'Ashikur Rahman Puspo',
      'Ashikur Rahman',
      'Puspo',
      'iampuspoo',
      'iampuspo',
      'pacman-cli',
      'springCraftDev',
    ],
    additionalName: 'Puspo',
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: siteConfig.image,
      width: 400,
      height: 400,
    },
    description: siteConfig.description,
    email: siteConfig.email,
    identifier: [
      { '@type': 'PropertyValue', name: 'LinkedIn', value: 'iampuspo', url: 'https://www.linkedin.com/in/iampuspo/' },
      { '@type': 'PropertyValue', name: 'GitHub', value: 'pacman-cli', url: 'https://github.com/pacman-cli' },
      { '@type': 'PropertyValue', name: 'YouTube', value: 'springCraftDev', url: 'https://www.youtube.com/@springCraftDev' },
      { '@type': 'PropertyValue', name: 'X', value: 'iampuspo', url: 'https://x.com/iampuspo' },
      { '@type': 'PropertyValue', name: 'Instagram', value: 'iampuspoo', url: 'https://www.instagram.com/iampuspoo/' },
      { '@type': 'PropertyValue', name: 'Facebook', value: 'pacman.puspo', url: 'https://www.facebook.com/pacman.puspo/' },
      { '@type': 'PropertyValue', name: 'LeetCode', value: 'pacman-cli', url: 'https://leetcode.com/u/pacman-cli/' },
    ],
    sameAs: SAME_AS_LINKS,
    jobTitle: 'Backend Engineer & Software Developer',
    knowsAbout: [
      'Backend Engineering',
      'Software Development',
      'Spring Boot',
      'Java',
      'Microservices',
      'System Design',
      'Docker',
      'Kubernetes',
      'AWS',
      'PostgreSQL',
      'MySQL',
      'REST APIs',
      'Cloud Architecture',
      'DevOps',
    ],
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
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.siteName,
    alternateName: ['Puspo', 'iampuspoo', 'Ashikur Rahman Puspo Portfolio'],
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: 'Ashikur Rahman Puspo | Backend Engineer & Software Developer',
    description: siteConfig.description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: siteConfig.image,
    },
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: SITE_NAVIGATION.map((item) => item.name),
    url: SITE_NAVIGATION.map((item) => item.url),
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
        <link rel="preconnect" href="https://api.github.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="preconnect" href="https://github-contributions-api.jogruber.de" crossOrigin="" />
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        {SAME_AS_LINKS.map((url) => (
          <link key={url} rel="me" href={url} />
        ))}
        {jsonLdData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className={cn(inter.variable, jakarta.variable, "font-sans min-h-screen antialiased text-foreground selection:bg-zinc-800 selection:text-zinc-100 dark:selection:bg-zinc-200 dark:selection:text-zinc-900")} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-zinc-100 focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen max-w-5xl mx-auto bg-background border-x border-border/40 shadow-2xl relative">
            <Navbar />
            {children}
            <CookieConsent />
            <WebMCPProvider />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
