import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { LazyCursorFollower } from "@/components/ui/cursor-follower-lazy"
import { LightModeBackground } from "@/components/ui/light-mode-background"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import Script from "next/script"
import { SAME_AS_LINKS, SITE_NAVIGATION, siteConfig } from "@/lib/site"
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
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.personName,
    honorificPrefix: 'MD.',
    alternateName: ['MD Ashikur Rahman Puspo', 'Ashikur Rahman', 'Puspo', 'ashikur rahman puspo', 'pacman-cli', 'iampuspo', 'springCraftDev'],
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
      { '@type': 'PropertyValue', name: 'GitHub', value: 'pacman-cli', url: 'https://github.com/pacman-cli' },
      { '@type': 'PropertyValue', name: 'LinkedIn', value: 'iampuspo', url: 'https://www.linkedin.com/in/iampuspo/' },
      { '@type': 'PropertyValue', name: 'LeetCode', value: 'pacman-cli', url: 'https://leetcode.com/u/pacman-cli/' },
      { '@type': 'PropertyValue', name: 'YouTube', value: 'springCraftDev', url: 'https://www.youtube.com/@springCraftDev' },
      { '@type': 'PropertyValue', name: 'Instagram', value: 'pacman.puspo', url: 'https://www.instagram.com/pacman.puspo/' },
      { '@type': 'PropertyValue', name: 'Facebook', value: 'pacman.puspo', url: 'https://www.facebook.com/pacman.puspo/' },
    ],
    sameAs: SAME_AS_LINKS,
    jobTitle: siteConfig.jobTitle,
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
    gender: 'Male',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.siteName,
    alternateName: [siteConfig.shortName, siteConfig.fullName, 'Puspo Portfolio'],
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: 'MD Ashikur Rahman Puspo | Backend Developer Portfolio',
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
        <meta name="google-adsense-account" content="ca-pub-5094804024850501" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
