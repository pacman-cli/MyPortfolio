import { SocialFooterLinks } from '@/components/ui/social-links'
import Link from 'next/link'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border mt-16 print:hidden">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            &copy; {CURRENT_YEAR} MD Ashikur Rahman Puspo
          </span>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-muted-foreground">
            <Link href="/about-me" aria-label="Full Biography (About Me)" className="hover:text-foreground transition-colors">About Me</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/gallery" className="hover:text-foreground transition-colors">Gallery</Link>
            <Link href="/resume" className="hover:text-foreground transition-colors">Resume</Link>
            <Link href="/links" className="hover:text-foreground transition-colors">Links</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SocialFooterLinks />
        </div>
      </div>
    </footer>
  )
}
