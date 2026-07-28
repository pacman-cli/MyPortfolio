"use client"

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/blur'

export const HeroPortraitPanel = ({ className = '' }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`relative isolate h-full min-h-[420px] w-full overflow-hidden ${className}`}>
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden rounded-[1.75rem] border border-emerald-400/10 bg-slate-950/30 shadow-[0_36px_120px_rgba(6,78,59,0.22)] lg:rounded-none lg:border-y-0 lg:border-r-0">
        <div className="absolute inset-0">
          <Image
            src="/profile.webp"
            alt="MD Ashikur Rahman Puspo - Backend Developer"
            fill
            priority
            className="scale-[1.02] object-cover object-[54%_50%] will-change-auto"
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 42vw, 45vw"
            quality={90}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_36%,rgba(16,185,129,0.18),transparent_34%),linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.76)_12%,hsl(var(--background)/0.18)_34%,transparent_58%),linear-gradient(0deg,hsl(var(--background)/0.9)_0%,transparent_31%,hsl(var(--background)/0.16)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 [mask-image:linear-gradient(90deg,black,transparent_84%)]" />
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/45 to-transparent" />

        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute right-[7%] top-[18%] h-44 w-44 rounded-full bg-emerald-400/12 blur-3xl"
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="absolute bottom-7 right-7 hidden w-[min(76%,360px)] rounded-2xl border border-white/10 bg-slate-950/48 p-4 text-emerald-50 shadow-2xl shadow-black/25 backdrop-blur-xl md:block">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">
                Current Focus
              </p>
              <p className="mt-1 text-sm font-semibold">
                Reliable APIs, clean architecture, cloud-ready delivery.
              </p>
            </div>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-xs font-black text-emerald-200">
              API
            </div>
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent md:hidden" />
      </div>

      <svg
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden h-full w-[18%] text-background lg:block"
        viewBox="0 0 240 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-divider-glow" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="0" />
            <stop offset="42%" stopColor="rgb(52 211 153)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="rgb(45 212 191)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 0H166C124 102 130 191 174 276C214 354 204 441 146 529C95 607 99 707 168 818C181 840 193 869 201 900H0V0Z"
          fill="currentColor"
        />
        <path
          d="M166 0C124 102 130 191 174 276C214 354 204 441 146 529C95 607 99 707 168 818C181 840 193 869 201 900"
          fill="none"
          stroke="url(#hero-divider-glow)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
