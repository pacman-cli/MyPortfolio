import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { CursorFollower } from "@/components/ui/cursor-follower"
import { LightModeBackground } from "@/components/ui/light-mode-background"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: 'swap' })

export const metadata: Metadata = {
  title: 'Puspo | Backend Engineer & Software Developer',
  description: 'Meet Puspo (MD. Ashikur Rahman), a Backend Engineer and Software Developer specializing in Spring Boot, Go, and Cloud technologies.',
  keywords: ['Puspo', 'Ashikur Rahman Puspo', 'Backend Engineer', 'Software Developer', 'Spring Boot', 'Go', 'Cloud', 'DevOps'],
  authors: [{ name: 'Puspo', url: 'https://puspo.online' }],
  creator: 'Puspo',
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://puspo.online',
    title: 'Puspo | Backend Engineer & Software Developer',
    description: 'Meet Puspo (MD. Ashikur Rahman), a Backend Engineer and Software Developer specializing in Spring Boot, Go, and Cloud technologies.',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Puspo - Backend Engineer',
      },
    ],
    siteName: 'Puspo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puspo | Backend Engineer & Software Developer',
    description: 'Backend Engineer and Software Developer specializing in Spring Boot, Go, and Cloud technologies.',
    images: ['/profile.jpg'],
    creator: '@iam_puspo',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://puspo.online'),
  alternates: {
    canonical: 'https://puspo.online',
  },
  other: {
    'google-site-verification': 'google-site-verification-token',
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Puspo',
  alternateName: ['MD. Ashikur Rahman', 'MD. Ashikur Rahman Puspo', 'Ashikur Rahman', 'iam_puspo'],
  url: 'https://puspo.online',
  image: 'https://puspo.online/profile.jpg',
  jobTitle: 'Backend Engineer & Software Developer',
  description: 'Backend Engineer and Software Developer specializing in Spring Boot, Go, and Cloud technologies.',
  sameAs: [
    'https://github.com/pacman-cli',
    'https://www.linkedin.com/in/iampuspo/',
    'https://x.com/iam_puspo',
    'https://stackoverflow.com/users/story/12345678' // Placeholder or remove if unknown
  ],
  knowsAbout: [
    'Spring Boot',
    'Java',
    'Go (Golang)',
    'Microservices Architecture',
    'AWS (Amazon Web Services)',
    'Docker',
    'Kubernetes',
    'React',
    'Next.js',
    'PostgreSQL',
    'System Design'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance / Open Source'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, jakarta.variable, "font-sans min-h-screen antialiased bg-background text-foreground selection:bg-primary/20")} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LightModeBackground />
          <CursorFollower />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
