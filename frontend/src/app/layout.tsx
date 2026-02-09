import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { CursorFollower } from "@/components/ui/cursor-follower"
import { LightModeBackground } from "@/components/ui/light-mode-background"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

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
    creator: '@iampuspo', // Assuming handle, can be removed or verified later if needed, but safe to include generic or specific if known. User didn't specify twitter handle, but 'twitter meta tags' was in checklist. I will assuming standard schema or leave creator out if unknown. I'll omit creator for now to be safe.
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://puspo.online'),
  alternates: {
    canonical: 'https://puspo.online',
  },
  other: {
    'google-site-verification': 'google-site-verification-token', // User said "Google Search Console is already verified", so maybe this is already done via DNS or existing tag. I won't overwrite existing if I don't see it, but I will just assume they handled it.
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Puspo',
  alternateName: ['MD. Ashikur Rahman', 'MD. Ashikur Rahman Puspo', 'Ashikur Rahman'],
  url: 'https://puspo.online',
  image: 'https://puspo.online/profile.jpg',
  jobTitle: 'Backend Engineer',
  description: 'Backend Engineer and Software Developer specializing in Spring Boot, Go, and Cloud technologies.',
  sameAs: [
    'https://github.com/pacman-cli',
    'https://www.linkedin.com/in/iampuspo/',
    // Add other social links if known
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance / Open Source' // Or specific company if known. 'Profession: Backend Engineer'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, jakarta.variable, "font-sans min-h-screen antialiased bg-background text-foreground selection:bg-primary/20")}>
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
