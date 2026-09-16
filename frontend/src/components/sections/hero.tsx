"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, FileText, Server, Database, Layers, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SocialHeroLinks } from '@/components/ui/social-links'

const TECH_TAGS = [
  'JAVA',
  'SPRING BOOT',
  'MICROSERVICES',
  'POSTGRESQL',
  'REST APIs',
  'DOCKER',
] as const

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const fadeIn = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  })

  return (
    <section
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/40 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-20 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT COLUMN: Editorial Content & Hierarchy */}
          <div className="md:col-span-7 flex flex-col items-start gap-6">

            {/* Meta Eyebrow & Status */}
            <motion.div {...fadeIn(0)} className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase font-semibold">
                01 // INTRO
              </span>
              <span className="h-3 w-px bg-border" aria-hidden="true" />
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono font-medium text-emerald-800 dark:text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>OPEN TO BACKEND & FULL-STACK ROLES</span>
              </div>
            </motion.div>

            {/* Name Identity */}
            <motion.div {...fadeIn(0.1)} className="space-y-1">
              <p className="text-xs font-mono tracking-wider text-muted-foreground uppercase font-semibold">
                MD ASHIKUR RAHMAN PUSPO &middot; SOFTWARE ENGINEER
              </p>

              {/* Dramatic Editorial Headline */}
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05] font-heading text-balance"
              >
                BUILDING BACKEND SYSTEMS THAT SCALE.
              </h1>
            </motion.div>

            {/* Tech Stack Micro-Layer */}
            <motion.div
              {...fadeIn(0.2)}
              className="w-full py-2.5 px-3 rounded-sm border border-border/60 bg-card/40 backdrop-blur-sm flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-muted-foreground"
            >
              <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">
                CORE STACK &rarr;
              </span>
              {TECH_TAGS.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="hover:text-foreground transition-colors">{tag}</span>
                  {i < TECH_TAGS.length - 1 && (
                    <span className="text-border" aria-hidden="true">/</span>
                  )}
                </span>
              ))}
            </motion.div>

            {/* Concise Supporting Description */}
            <motion.p
              {...fadeIn(0.3)}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              Architecting resilient server-side microservices, high-performance database flows, and production REST APIs using Java and Spring Boot.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              {...fadeIn(0.4)}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md active:scale-[0.98]"
              >
                EXPLORE MY WORK
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-medium uppercase tracking-wider rounded-sm border border-border bg-card text-foreground hover:bg-muted transition-colors"
              >
                LET&apos;S TALK
              </Link>

              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors ml-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME ↗</span>
              </Link>
            </motion.div>

            {/* Social Metadata Row */}
            <motion.div
              {...fadeIn(0.5)}
              className="pt-6 border-t border-border/60 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-muted-foreground"
            >
              <span className="uppercase tracking-wider text-[10px]">
                CONNECT & VERIFIED PROFILES
              </span>
              <SocialHeroLinks />
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Editorial Portrait & Architectural System Annotation (Hybrid) */}
          <motion.div
            {...fadeIn(0.2)}
            className="md:col-span-5 flex flex-col items-center md:items-end w-full"
          >
            <div className="relative w-full max-w-sm">

              {/* Outer Architectural Framing */}
              <div className="relative rounded-sm border border-border/80 bg-card p-2 shadow-2xl">

                {/* Header Metadata Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 text-[10px] font-mono text-muted-foreground mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-foreground uppercase">SYSTEM ARCHITECT</span>
                  </div>
                  <span>DHAKA, BD</span>
                </div>

                {/* Editorial Portrait Image */}
                <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-muted group border border-border/50">
                  <Image
                    src="/profile.webp"
                    alt="MD Ashikur Rahman Puspo"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Overlay text on portrait */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono">
                    <p className="font-semibold tracking-wide">MD Ashikur Rahman Puspo</p>
                    <p className="text-[10px] text-zinc-300">Backend Software Engineer</p>
                  </div>
                </div>

                {/* Technical System Annotation Micro-Card */}
                <div className="mt-2.5 p-3 rounded-sm border border-border/60 bg-muted/30 text-xs font-mono flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> ACTIVE SYSTEM
                    </span>
                    <span>SPRING BOOT 3.x</span>
                  </div>

                  {/* Architecture Data Flow Annotation */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                    <div className="p-1.5 rounded border border-border/50 bg-background flex flex-col items-center gap-0.5">
                      <Server className="w-3 h-3 text-emerald-500" />
                      <span className="text-foreground font-semibold">API</span>
                    </div>
                    <div className="p-1.5 rounded border border-border/50 bg-background flex flex-col items-center gap-0.5">
                      <Layers className="w-3 h-3 text-blue-500" />
                      <span className="text-foreground font-semibold">SERVICES</span>
                    </div>
                    <div className="p-1.5 rounded border border-border/50 bg-background flex flex-col items-center gap-0.5">
                      <Database className="w-3 h-3 text-amber-500" />
                      <span className="text-foreground font-semibold">DATA</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Accent Marker */}
              <div className="absolute -bottom-3 -left-3 px-2 py-1 bg-foreground text-background text-[9px] font-mono uppercase tracking-widest rounded-xs hidden sm:block shadow-md">
                JAVA &bull; SPRING &bull; SQL
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
