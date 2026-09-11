import { SocialFooterLinks } from '@/components/ui/social-links'
import Link from 'next/link'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer = () => {
  return (
    <footer className="py-10 border-t border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="text-zinc-500 text-sm">
            &copy; {CURRENT_YEAR} <span className="font-semibold text-zinc-300">Puspo</span>. All rights reserved.
          </span>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-zinc-500">
            <Link href="/about-me" className="hover:text-emerald-400 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-emerald-400 transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link>
            <Link href="/resume" className="hover:text-emerald-400 transition-colors">Resume</Link>
            <Link href="/links" className="hover:text-emerald-400 transition-colors">Social Links</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <SocialFooterLinks />
        </div>
      </div>
    </footer>
  )
}
