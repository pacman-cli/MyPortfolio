"use client"

import { cn } from '@/lib/utils'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

// ============================================================================
// ANIMATION CONFIG
// ============================================================================

const smoothEase = [0.25, 0.1, 0.25, 1] as const

const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: smoothEase,
    },
  }),
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: smoothEase, delay: 0.3 },
  },
}

// ============================================================================
// COPY EMAIL BUTTON
// ============================================================================

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false)
  const email = "puspopuspo520@gmail.com"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      className={cn(
        "group relative inline-flex items-center gap-3 px-6 py-3 rounded-full",
        "bg-card/60 backdrop-blur-sm border border-border/50",
        "hover:border-primary/30 hover:bg-card/80",
        "transition-all duration-300 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {email}
      </span>
      <span className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full",
        "bg-secondary/50 group-hover:bg-primary/10",
        "transition-colors duration-300"
      )}>
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </span>
    </motion.button>
  )
}

// ============================================================================
// SOCIAL LINK
// ============================================================================

interface QuietLinkProps {
  href: string
  label: string
  external?: boolean
}

const QuietLink = ({ href, label, external = true }: QuietLinkProps) => (
  <Link
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={cn(
      "group inline-flex items-center gap-1.5 text-sm font-medium",
      "text-muted-foreground hover:text-foreground",
      "transition-colors duration-300"
    )}
  >
    <span className="relative">
      {label}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
    </span>
    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
  </Link>
)

// ============================================================================
// AVAILABILITY STATUS
// ============================================================================

const AvailabilityStatus = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
      Open to opportunities
    </span>
  </motion.div>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ClosingSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  const resumeUrl = "https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ"

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
      aria-labelledby="closing-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Availability status */}
          <AvailabilityStatus />

          {/* Main headline - typography focused */}
          <motion.h2
            id="closing-heading"
            custom={0}
            variants={prefersReducedMotion ? undefined : textRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Let&apos;s build something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500">
              that matters.
            </span>
          </motion.h2>

          {/* Animated divider */}
          <motion.div
            variants={prefersReducedMotion ? undefined : lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-border to-transparent origin-center"
            aria-hidden="true"
          />

          {/* Subtext - confident, minimal */}
          <motion.p
            custom={2}
            variants={prefersReducedMotion ? undefined : textRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            I enjoy hard problems and clean solutions.
            <br className="hidden sm:block" />
            If something here resonated, let&apos;s talk.
          </motion.p>

          {/* Copy email interaction */}
          <motion.div
            custom={3}
            variants={prefersReducedMotion ? undefined : textRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-10"
          >
            <CopyEmailButton />
          </motion.div>

          {/* Resume download */}
          <motion.div
            custom={4}
            variants={prefersReducedMotion ? undefined : textRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-6"
          >
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium",
                "text-muted-foreground hover:text-foreground",
                "transition-colors duration-300"
              )}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Link>
          </motion.div>

          {/* Quiet links */}
          <motion.div
            custom={5}
            variants={prefersReducedMotion ? undefined : textRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <QuietLink href="https://github.com/pacman-cli" label="GitHub" />
            <QuietLink href="https://www.linkedin.com/in/iampuspo/" label="LinkedIn" />
            <QuietLink href="https://www.instagram.com/pacman.puspo/" label="Instagram" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
