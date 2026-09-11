"use client"

import { SocialQuietLinks } from '@/components/ui/social-links'
import { siteConfig } from '@/lib/site'
import { motion } from 'framer-motion'
import { Check, Copy, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

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
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
        {email}
      </span>
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 group-hover:bg-emerald-500/15 transition-colors duration-300">
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />}
      </span>
    </button>
  )
}

export const ClosingSection = () => {
  const resumeUrl = siteConfig.resumeDownloadUrl

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 overflow-hidden scroll-mt-20"
      aria-labelledby="closing-heading"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-6">
            Open to Opportunities
          </span>

          <h2
            id="closing-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.08] mb-6"
          >
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              that matters.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-10">
            I enjoy hard problems and clean solutions.
            <br className="hidden sm:block" />
            If something here resonated, let&apos;s talk.
          </p>

          <div className="mb-6">
            <CopyEmailButton />
          </div>

          <Link
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors duration-300"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </Link>

          <div className="mt-14 flex flex-col items-center gap-4">
            <h3 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest">Find Me Online</h3>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <SocialQuietLinks />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
