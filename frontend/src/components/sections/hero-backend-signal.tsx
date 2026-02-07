"use client"

import { BezierDefinition, motion, useReducedMotion } from 'framer-motion'

export const HeroBackendSignal = () => {
  const prefersReducedMotion = useReducedMotion()

  // Animation constants
  const DURATION = 2.5
  const DELAY = 0.5
  const EASE: BezierDefinition = [0.16, 1, 0.3, 1] // Apple-like ease-out

  // Variant for the line drawing
  const lineVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: DURATION * 0.8,
        ease: EASE,
        delay: DELAY
      }
    }
  }

  // Variant for the label fade-in
  const fadeVariant = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: DELAY + 0.5
      }
    }
  }

  return (
    <div className="relative w-full aspect-square max-w-[400px] md:max-w-[500px] mx-auto select-none pointer-events-none">

      {/* SVG Canvas */}
      <svg
        className="w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. CENTRAL SYSTEM NODE */}
        {/* Minimal rounded rectangle */}
        <motion.rect
          x="140" y="110" width="120" height="80" rx="4"
          className="stroke-slate-300 dark:stroke-slate-700 fill-white/50 dark:fill-slate-900/50"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        />

        {/* 2. LABELS / INDICATORS */}
        {/* Main Label */}
        <foreignObject x="140" y="110" width="120" height="80">
          <div className="w-full h-full flex items-center justify-center">
            <motion.span
              variants={fadeVariant}
              initial="hidden"
              animate="visible"
              className="text-xs font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase"
            >
              System
            </motion.span>
          </div>
        </foreignObject>

        {/* Subtle Indicators (Static) */}
        <g className="opacity-60">
          {/* API (Top) */}
          <motion.text
            x="200" y="80"
            textAnchor="middle"
            className="text-[10px] fill-slate-400 dark:fill-slate-600 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            API
          </motion.text>

          {/* DB (Bottom) */}
          <motion.text
            x="200" y="220"
            textAnchor="middle"
            className="text-[10px] fill-slate-400 dark:fill-slate-600 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1 }}
          >
            DATA
          </motion.text>

          {/* INFRA (Right) */}
          <motion.text
            x="300" y="155"
            textAnchor="middle"
            className="text-[10px] fill-slate-400 dark:fill-slate-600 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1 }}
          >
            INFRA
          </motion.text>
        </g>

        {/* 3. DATA FLOW LINE */}
        {/* Path: Enters left, passes through center, exits right */}
        {/* Using a simple straight line for maximum minimalism and clarity */}
        <motion.path
          d="M 40 150 L 360 150"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-slate-200 dark:text-slate-800"
          variants={lineVariant}
          initial="hidden"
          animate="visible"
        />

        {/* 4. DATA DOT (The "Signal") */}
        {/* Only animates if not reduced motion */}
        {!prefersReducedMotion && (
          <motion.circle r="3" fill="currentColor" className="text-emerald-500">
            <animateMotion
              dur={`${DURATION}s`}
              begin={`${DELAY}s`}
              fill="freeze"
              repeatCount="1" // Plays ONLY once
              path="M 40 150 L 360 150"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.16 1 0.3 1" // Custom cubic-bezier
            />
            {/* Fade out element at the end */}
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.9;1"
              dur={`${DURATION}s`}
              begin={`${DELAY}s`}
              fill="freeze"
            />
          </motion.circle>
        )}

      </svg>

      {/* Mobile Fallback is handled by Framer Motion's initial/animate states which resolve to final state */}
    </div>
  )
}
