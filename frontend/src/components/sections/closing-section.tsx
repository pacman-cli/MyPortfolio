"use client"

import { SocialQuietLinks } from '@/components/ui/social-links'
import { siteConfig } from '@/lib/site'
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
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card text-foreground text-xs font-mono hover:bg-muted transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <span>{email}</span>
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  )
}

export const ClosingSection = () => {
  const resumeUrl = siteConfig.resumeDownloadUrl

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="p-8 rounded-lg border border-border bg-card/50 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Let&apos;s build resilient systems together
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
              Currently open for software engineering and backend roles. Feel free to send an email or reach out on social channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CopyEmailButton />
            <Link
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-border bg-muted/50 text-foreground text-xs font-medium hover:bg-muted transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </Link>
          </div>

          <div className="pt-4 border-t border-border/60 flex items-center justify-between">
            <SocialQuietLinks />
          </div>
        </div>
      </div>
    </section>
  )
}
