import { SocialFooterLinks } from '@/components/ui/social-links'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-3 text-muted-foreground text-sm">
          <span suppressHydrationWarning>© {new Date().getFullYear()} <span className="font-bold text-foreground">Puspo</span>. All rights reserved.</span>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
            <Link href="/about-me" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Blog</Link>
            <Link href="/resume" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Resume</Link>
            <Link href="/links" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Social Links</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <SocialFooterLinks />
        </div>
      </div>
    </footer >
  )
}
