"use client"

import { Button } from '@/components/ui/button'
import { ThemeTabs } from '@/components/ui/theme-tabs'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#technical-expertise' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Latest Insights', href: '/#blogs' },
    { name: 'Contact', href: '/#contact' },
  ]

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      if (isHomePage) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(href)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden",
        isScrolled ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-3" : "bg-transparent py-5"
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Branding — Static SVG, no infinite animations */}
        <Link href="/" className="group" onClick={() => isHomePage && window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible transition-transform duration-300 group-hover:scale-110"
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
                className="animate-pulse"
              />
            </svg>
            <span className="sr-only">Home</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.href)}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-emerald-500 dark:text-emerald-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400"
              )}
              {...(pathname === link.href && { 'aria-current': 'page' as const })}
            >
              {link.name}
            </button>
          ))}

          <Button
            variant="ghost"
            onClick={() => router.push('/resume')}
            className={cn(
              "text-sm font-medium transition-colors hover:text-emerald-500 hover:bg-emerald-500/10",
              pathname === '/resume' ? "text-emerald-500 bg-emerald-500/10" : "text-gray-700 dark:text-gray-300"
            )}
            {...(pathname === '/resume' && { 'aria-current': 'page' as const })}
          >
            Resume
          </Button>

          <div className="hidden lg:flex items-center gap-2 mr-2">
            <ThemeTabs />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeTabs />
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  role="menuitem"
                  onClick={() => handleNavigation(link.href)}
                  className="text-left text-lg font-medium text-gray-900 dark:text-gray-100 py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:text-emerald-500"
                >
                  {link.name}
                </button>
              ))}
              <button
                role="menuitem"
                onClick={() => handleNavigation('/resume')}
                className={cn(
                  "text-left text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:text-emerald-500",
                  pathname === '/resume' ? "text-emerald-500" : "text-gray-900 dark:text-gray-100"
                )}
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
