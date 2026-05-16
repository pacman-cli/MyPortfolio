"use client"

import { Button } from '@/components/ui/button'
import { ThemeTabs } from '@/components/ui/theme-tabs'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#technical-expertise', id: 'technical-expertise' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Latest Insights', href: '/#blogs', id: 'blogs' },
  { name: 'Contact', href: '/#contact', id: 'contact' },
  { name: 'Gallery', href: '/gallery' },
] as const

const SECTION_IDS = NAV_LINKS.map(link => 'id' in link ? link.id : null).filter(Boolean) as string[]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const menu = menuRef.current
    if (!menu) return

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length) focusable[0].focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeMenu(); return }
      if (e.key !== 'Tab') return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen, closeMenu])

  const isActiveLink = (href: string, id?: string) => {
    if (id && pathname === '/') {
      return activeSection === id
    }
    return pathname === href
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="group"
          onClick={() => {
            setIsMobileMenuOpen(false)
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <div className="flex items-center gap-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="paint_green_linear" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4ADE80" />
                  <stop offset="1" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>

              <rect
                x="10"
                y="8"
                width="7"
                height="24"
                rx="3.5"
                fill="url(#paint_green_linear)"
              />

              <path
                d="M20 12H24C27.3137 12 30 14.6863 30 18V18C30 21.3137 27.3137 24 24 24H20"
                stroke="url(#paint_green_linear)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              <circle
                cx="27"
                cy="18"
                r="2"
                fill="#F0FDF4"
              />
            </svg>
            <span className="sr-only">Home</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href, 'id' in link ? link.id : undefined)

            return (
              <div key={link.name} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:scale-105 active:scale-95 inline-block origin-center",
                    isActive
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                  {...(isActive && { 'aria-current': 'page' as const })}
                >
                  {link.name}
                </Link>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full origin-left animate-[scaleX_0.2s_ease-out]" />
                )}
              </div>
            )
          })}

          <Button
            asChild
            variant="ghost"
            className={cn(
              "text-sm font-medium transition-colors hover:text-emerald-600 hover:bg-emerald-500/10",
              pathname === '/resume' ? "text-emerald-600 bg-emerald-500/10" : "text-muted-foreground"
            )}
          >
            <Link
              href="/resume"
              onClick={() => setIsMobileMenuOpen(false)}
              {...(pathname === '/resume' && { 'aria-current': 'page' as const })}
            >
              Resume
            </Link>
          </Button>

          <div className="hidden lg:flex items-center gap-2 mr-2">
            <ThemeTabs />
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeTabs />
          <motion.button
            ref={toggleRef}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="w-11 h-11 flex items-center justify-center text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ stiffness: 300, damping: 20 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-y-auto max-h-[85dvh]"
          >
            <ul className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "block text-left text-lg font-medium py-2 border-b border-border last:border-0 hover:text-emerald-700 dark:hover:text-emerald-400",
                      isActiveLink(link.href, 'id' in link ? link.id : undefined) ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"
                    )}
                    {...(isActiveLink(link.href, 'id' in link ? link.id : undefined) && { 'aria-current': 'page' as const })}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  onClick={closeMenu}
                    className={cn(
                      "block text-left text-lg font-medium py-2 border-b border-border last:border-0 hover:text-emerald-700 dark:hover:text-emerald-400",
                      pathname === '/resume' ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"
                    )}
                >
                  Resume
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
