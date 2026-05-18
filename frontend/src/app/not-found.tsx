import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <span className="text-[10rem] md:text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Page not found
              </p>
              <p className="text-muted-foreground text-base md:text-lg">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium transition-all duration-300"
          >
            <Search className="w-4 h-4" />
            Browse blog
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4">Or try one of these:</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/projects" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Projects
            </Link>
            <span className="text-border">/</span>
            <Link href="/blog" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <span className="text-border">/</span>
            <Link href="/gallery" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Gallery
            </Link>
            <span className="text-border">/</span>
            <Link href="/about-me" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              About
            </Link>
            <span className="text-border">/</span>
            <Link href="/resume" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Resume
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Go back
          </Link>
        </div>
      </div>
    </main>
  )
}
