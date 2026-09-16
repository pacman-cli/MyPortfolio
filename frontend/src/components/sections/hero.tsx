"use client"

import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { SocialHeroLinks } from '@/components/ui/social-links'
import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'

export const Hero = () => {
  return (
    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-start gap-8 max-w-3xl">
          {/* Status badge */}
          <div>
            <AvailabilityBadge label="Open to Backend & Full-Stack Opportunities" />
          </div>

          {/* Identity & Eyebrow */}
          <div className="space-y-1">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
              MD Ashikur Rahman Puspo &middot; Software Engineer
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08] text-balance"
            >
              Building reliable backend systems and scalable digital products.
            </h1>
          </div>

          {/* Supporting description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            I engineer server-side architectures with Java and Spring Boot — focusing on clean REST APIs, distributed microservices, and reliable data flows that stay maintainable as products grow.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-foreground text-background hover:bg-foreground/90 transition-all shadow-sm active:scale-[0.98]"
            >
              Selected Work
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-md border border-border bg-card text-foreground hover:bg-muted/80 transition-colors"
            >
              Get in Touch
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors ml-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume ↗</span>
            </Link>
          </div>

          {/* Quiet Social Links */}
          <div className="pt-8 border-t border-border/60 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              Connect & Source
            </span>
            <SocialHeroLinks />
          </div>
        </div>
      </div>
    </section>
  )
}
