"use client"

import { ThemeTabs } from '@/components/ui/theme-tabs'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#technical-expertise', id: 'technical-expertise' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Writing', href: '/#blogs', id: 'blogs' },
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

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false)
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      const id = href.substring(2)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }, [pathname])

  const isActiveLink = (href: string, id?: string) => {
    if (id && pathname === '/') {
      return activeSection === id
    }
    return pathname === href
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 max-w-5xl mx-auto z-50 transition-all duration-200 print:hidden",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-3.5"
          : "bg-transparent py-5"
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => {
            setIsMobileMenuOpen(false)
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Ashikur Rahman
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(link.href, 'id' in link ? link.id : undefined)

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={(e) => handleNavClick(e, link.href)}
                {...(isActive && { 'aria-current': 'page' as const })}
              >
                {link.name}
              </Link>
            )
          })}

          <Link
            href="/resume"
            className={cn(
              "text-xs font-medium transition-colors",
              pathname === '/resume' ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resume
          </Link>

          <div className="pl-2 border-l border-border">
            <ThemeTabs />
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeTabs />
          <button
            ref={toggleRef}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden bg-background border-b border-border px-6 py-4 transition-all"
        >
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "block text-sm font-medium py-1.5 transition-colors",
                    isActiveLink(link.href, 'id' in link ? link.id : undefined)
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
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
                  "block text-sm font-medium py-1.5 transition-colors",
                  pathname === '/resume' ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
