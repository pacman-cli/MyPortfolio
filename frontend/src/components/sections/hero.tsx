"use client"

import { SocialHeroLinks } from '@/components/ui/social-links'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const Hero = () => {
  return (
    <section
      className="relative pt-32 pb-16 md:pt-44 md:pb-20"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div>
            <AvailabilityBadge label="Available for Backend & Full-Stack Roles" />
          </div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            MD Ashikur Rahman Puspo
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Backend Software Engineer specializing in scalable Spring Boot microservices, distributed system design, clean REST APIs, and modern web application development.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Selected Work
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md border border-border bg-card text-foreground hover:bg-muted transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          <div className="pt-6 border-t border-border/60">
            <SocialHeroLinks />
          </div>
        </div>
      </div>
    </section>
  )
}
