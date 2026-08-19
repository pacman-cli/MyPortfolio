"use client"

import { SocialQuietLinks } from '@/components/ui/social-links'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { siteConfig } from '@/lib/site'
import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { Check, Copy, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_FADE_UP,
  },
}

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false)
  const email = siteConfig.email

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
      className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {email}
      </span>
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 group-hover:bg-primary/10 transition-colors duration-300">
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />}
      </span>
    </motion.button>
  )
}

export const ClosingSection = () => {
  const resumeUrl = siteConfig.resumeDownloadUrl

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-background overflow-hidden scroll-mt-20"
      aria-labelledby="closing-heading"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <AvailabilityBadge label="Open to opportunities" />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              id="closing-heading"
              className="mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Let&apos;s build something
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500">
                that matters.
              </span>
            </motion.h2>

            <motion.div variants={itemVariants} className="mt-8 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

            <motion.p variants={itemVariants} className="mt-8 text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              I enjoy hard problems and clean solutions.
              <br className="hidden sm:block" />
              If something here resonated, let&apos;s talk.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <CopyEmailButton />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <Link
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center justify-center gap-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Find Me Online</h3>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <SocialQuietLinks />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
