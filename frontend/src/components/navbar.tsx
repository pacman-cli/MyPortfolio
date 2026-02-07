"use client"

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
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
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#technical-expertise' },
    { name: 'Projects', href: '/#projects' },
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
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Branding */}
        <Link href="/" className="group" onClick={() => isHomePage && window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex items-center gap-2">
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <defs>
                <linearGradient id="paint_green_linear" x1="10" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4ADE80" /> {/* Soft Green */}
                  <stop offset="1" stopColor="#2DD4BF" /> {/* Mint/Teal */}
                </linearGradient>
              </defs>

              <motion.rect
                x="10"
                y="8"
                width="7"
                height="24"
                rx="3.5"
                fill="url(#paint_green_linear)"
                initial={{ height: 0, y: 20 }}
                animate={{ height: [24, 18, 24], y: [8, 11, 8] }}
                transition={{
                  height: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
              />

              <motion.path
                d="M20 12H24C27.3137 12 30 14.6863 30 18V18C30 21.3137 27.3137 24 24 24H20"
                stroke="url(#paint_green_linear)"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{
                  pathLength: 1,
                  rotate: [0, 10, 0, -10, 0]
                }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ originX: "20px", originY: "18px" }}
              />

              <motion.circle
                cx="27"
                cy="18"
                r="2"
                fill="#F0FDF4"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.5, 1],
                  filter: [
                    "drop-shadow(0 0 2px rgba(74, 222, 128, 0.5))",
                    "drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))",
                    "drop-shadow(0 0 2px rgba(74, 222, 128, 0.5))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.svg>
            <span className="sr-only">Home</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link.href)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
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
          >
            Resume
          </Button>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="text-left text-lg font-medium text-gray-900 dark:text-gray-100 py-2 border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:text-emerald-500"
                >
                  {link.name}
                </button>
              ))}
              <button
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
