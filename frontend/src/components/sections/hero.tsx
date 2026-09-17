import { ArrowUpRight, FileText, Server, Database, Cpu, Activity, ShieldCheck, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SocialHeroLinks } from '@/components/ui/social-links'

const CORE_TECH = [
  { name: 'JAVA 21', category: 'LANG' },
  { name: 'SPRING BOOT 3', category: 'FRAMEWORK' },
  { name: 'POSTGRESQL', category: 'DATABASE' },
  { name: 'MICROSERVICES', category: 'ARCH' },
  { name: 'REST APIs', category: 'PROTOCOL' },
  { name: 'DOCKER', category: 'DEVOPS' },
] as const

export const Hero = () => {
  return (
    <section
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-20 border-b border-border/50 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Subtle Grid & Focal Radial Mask */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-30 dark:opacity-15 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Decorative Subtle Corner Index Tag */}
      <div className="absolute top-24 left-6 hidden lg:flex items-center gap-2 text-[10px] font-mono text-muted-foreground font-medium tracking-widest uppercase pointer-events-none select-none">
        <span>SYS.ID // 2026-PORTFOLIO</span>
        <span>&bull;</span>
        <span>VERIFIED_SOURCE</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT COLUMN: Editorial Content & Typography Hierarchy (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-7">

            {/* Meta Eyebrow, Identity & Availability */}
            <div className="animate-hero-fade flex flex-wrap items-center gap-2.5" style={{ animationDelay: '0ms' }}>
              <span className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase font-semibold">
                01 // INTRO
              </span>
              <span className="h-3 w-px bg-border/80" aria-hidden="true" />
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-[11px] font-mono font-semibold text-emerald-900 dark:text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>OPEN TO BACKEND ROLES</span>
              </div>
            </div>

            {/* Identity & Dramatic Editorial Headline */}
            <div className="animate-hero-fade space-y-3" style={{ animationDelay: '80ms' }}>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground uppercase font-semibold">
                <span className="text-foreground">MD ASHIKUR RAHMAN PUSPO</span>
                <span>&bull;</span>
                <span>SOFTWARE ENGINEER</span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.02] font-heading uppercase text-balance"
              >
                BUILDING <br className="hidden sm:inline" />
                BACKEND SYSTEMS <br />
                <span className="text-emerald-700 dark:text-emerald-400 font-serif italic font-normal tracking-normal lowercase text-[0.88em] sm:text-[0.88em]">
                  that scale.
                </span>
              </h1>
            </div>

            {/* Core Tech Stack Micro-Layer */}
            <div
              className="animate-hero-fade w-full py-2.5 px-3.5 rounded-lg border border-border/80 bg-card/60 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[11px] font-mono text-muted-foreground"
              style={{ animationDelay: '160ms' }}
            >
              <span className="font-bold text-foreground uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                CORE STACK:
              </span>
              {CORE_TECH.map((tech, i) => (
                <span key={tech.name} className="flex items-center gap-2">
                  <span className="hover:text-foreground transition-colors font-medium">
                    {tech.name}
                  </span>
                  {i < CORE_TECH.length - 1 && (
                    <span className="text-muted-foreground" aria-hidden="true">&bull;</span>
                  )}
                </span>
              ))}
            </div>

            {/* Concise Supporting Bio Description */}
            <p
              className="animate-hero-fade text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal"
              style={{ animationDelay: '240ms' }}
            >
              Architecting resilient server-side microservices, high-throughput REST APIs, and production database flows with Java &amp; Spring Boot — engineered for clarity and performance.
            </p>

            {/* Action CTAs Cluster */}
            <div
              className="animate-hero-fade flex flex-wrap items-center gap-3.5 pt-1"
              style={{ animationDelay: '320ms' }}
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider rounded-md bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg active:scale-[0.98] group"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-md border border-border bg-card/80 text-foreground hover:bg-muted/80 transition-colors"
              >
                LET&apos;S TALK
              </Link>

              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 px-3.5 py-3.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="group-hover:underline underline-offset-4">RESUME ↗</span>
              </Link>
            </div>

            {/* Refined Horizontal Social Metadata Row */}
            <div
              className="animate-hero-fade pt-6 border-t border-border/60 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-muted-foreground"
              style={{ animationDelay: '400ms' }}
            >
              <span className="uppercase tracking-widest text-[10px] font-semibold text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                VERIFIED PROFILES
              </span>
              <SocialHeroLinks />
            </div>

          </div>

          {/* RIGHT COLUMN (FIRST ON MOBILE): Architectural Hybrid Portrait & System Telemetry Card (5 Cols) */}
          <div
            className="animate-hero-fade lg:col-span-5 flex flex-col items-center lg:items-end w-full order-first lg:order-last"
            style={{ animationDelay: '120ms' }}
          >
            <div className="relative w-full max-w-md">

              {/* Decorative Background Offset Frame */}
              <div className="absolute -inset-1.5 rounded-xl border border-border/40 bg-muted/20 -z-10 translate-x-2 translate-y-2 pointer-events-none" />

              {/* Outer Architectural Container Card */}
              <div className="relative rounded-xl border border-border/90 bg-card p-3 shadow-2xl space-y-3">

                {/* Card Header Metadata Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 text-[10px] font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-foreground uppercase tracking-wider">
                      SYSTEM ARCHITECT
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>DHAKA, BD</span>
                  </div>
                </div>

                {/* Editorial Portrait Frame */}
                <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-muted group border border-border/70 shadow-inner">
                  <Image
                    src="/profile.webp"
                    alt="MD Ashikur Rahman Puspo - Software Engineer"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 380px, 420px"
                    className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Subtle Gradient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                  {/* Overlaid Editorial Metadata */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold tracking-wider text-sm">MD ASHIKUR RAHMAN PUSPO</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-semibold">
                        JAVA / SPRING
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-300 font-normal">
                      Sr. Backend Engineer &bull; System Architect
                    </p>
                  </div>
                </div>

                {/* Live Architecture Data Flow & Telemetry Widget */}
                <div className="p-3 rounded-lg border border-border/70 bg-muted/40 text-xs font-mono space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                      <Activity className="w-3 h-3 animate-pulse" /> SYSTEM FLOW DIAGRAM
                    </span>
                    <span className="text-[9px] text-muted-foreground">LATENCY &lt; 25ms</span>
                  </div>

                  {/* Architecture Request Flow Diagram */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-md border border-border/60 bg-background flex flex-col items-center gap-1 shadow-2xs">
                      <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-foreground font-bold uppercase tracking-wider">REST API</span>
                      <span className="text-[8px] text-muted-foreground">CONTROLLER</span>
                    </div>
                    <div className="p-2 rounded-md border border-border/60 bg-background flex flex-col items-center gap-1 shadow-2xs">
                      <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span className="text-foreground font-bold uppercase tracking-wider">SPRING BOOT</span>
                      <span className="text-[8px] text-muted-foreground">SERVICE</span>
                    </div>
                    <div className="p-2 rounded-md border border-border/60 bg-background flex flex-col items-center gap-1 shadow-2xs">
                      <Database className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-foreground font-bold uppercase tracking-wider">POSTGRES</span>
                      <span className="text-[8px] text-muted-foreground">PERSISTENCE</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Corner Label Tag */}
              <div className="absolute -bottom-3 -left-3 px-2.5 py-1 bg-foreground text-background text-[9px] font-mono uppercase tracking-widest rounded-md hidden sm:block shadow-md">
                ENGINEERING EXCELLENCE
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

