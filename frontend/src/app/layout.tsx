import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { SAME_AS_LINKS, siteConfig } from "@/lib/site"
import dynamic from "next/dynamic"
import "./globals.css"

const CookieConsent = dynamic(() => import("@/components/ui/cookie-consent").then(m => m.CookieConsent))
const WebMCPProvider = dynamic(() => import("@/components/webmcp-provider").then(m => m.WebMCPProvider))

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
import { personSchema, siteNavigationSchema, webPageSchema, websiteSchema } from "@/lib/schema"

export const metadata: Metadata = constructMetadata()
/**
 * Single connected entity graph. Google consolidates the knowledge panel from
 * one coherent graph — disconnected scripts get partial credit only.
 */
const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    personSchema(),
    websiteSchema(),
    {
      ...webPageSchema({
        path: '/',
        name: 'Ashikur Rahman Puspo | Backend Engineer & Software Developer',
        description: siteConfig.description,
      }),
      '@id': `${siteConfig.url}/#webpage`,
    },
    ...siteNavigationSchema(),
  ],
}

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
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        {SAME_AS_LINKS.map((url) => (
          <link key={url} rel="me" href={url} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
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
