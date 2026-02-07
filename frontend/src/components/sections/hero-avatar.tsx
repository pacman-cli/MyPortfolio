"use client"

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaAws } from "react-icons/fa"
import {
  SiDocker,
  SiGithub,
  SiKubernetes,
  SiLinux,
  SiNextdotjs,
  SiPostgresql,
  SiSpringboot
} from "react-icons/si"

// ===================================
// CONFIGURATION
// ===================================

const TECH_ICONS = [
  { icon: SiSpringboot, color: "text-[#6DB33F]", label: "Spring Boot" },
  { icon: SiPostgresql, color: "text-[#336791]", label: "PostgreSQL" },
  { icon: SiDocker, color: "text-[#2496ED]", label: "Docker" },
  { icon: SiKubernetes, color: "text-[#326CE5]", label: "Kubernetes" },
  { icon: FaAws, color: "text-[#FF9900]", label: "AWS" },
  { icon: SiNextdotjs, color: "text-slate-900 dark:text-white", label: "Next.js" },
  { icon: SiLinux, color: "text-slate-800 dark:text-slate-200", label: "Linux" },
  { icon: SiGithub, color: "text-slate-900 dark:text-white", label: "GitHub" },
]

export const HeroAvatar = () => {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // CONFIG: Animation Parameters
  // Desktop: 8 icons, ~160px radius
  // Mobile: 4 icons, ~110px radius, Slower speed?

  const activeIcons = isMobile
    ? TECH_ICONS.filter((_, i) => [0, 2, 4, 5].includes(i)) // Spring, Docker, AWS, Next
    : TECH_ICONS

  const radius = isMobile ? 120 : 160
  const duration = isMobile ? 150 : 100 // Seconds per rotation (Ultra Slow & Smooth)

  if (!mounted) return <div className="w-[300px] h-[300px]" /> // Skeleton/Placeholder

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible">

      {/*
        ORBITAL SYSTEM
        Container rotates continuously.
        Children counter-rotate to stay upright.
      */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={!prefersReducedMotion ? { rotate: 360 } : {}}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {activeIcons.map((tech, index) => {
          const total = activeIcons.length
          const angleDeg = (index * 360) / total
          const angleRad = (angleDeg * Math.PI) / 180

          // Fixed position on the circle edge
          // We use standard CSS transform for placement to work with the parent rotation
          // Parent rotates, carrying this child.

          return (
            <motion.div
              key={tech.label}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                // Place on circle edge
                transform: `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radius}px) rotate(-${angleDeg}deg)`
                // Explanation:
                // 1. Center element
                // 2. Rotate to target angle
                // 3. Push out by radius
                // 4. Rotate back (counter-rotate) so item is upright relative to center
                // 5. Parent rotation adds global movement
              }}
            >
              {/* COUNTER-ROTATION CONTAINER (Keeps icon upright as parent spins) */}
              <motion.div
                animate={!prefersReducedMotion ? { rotate: -360 } : {}}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* ICON VISUAL + FLOATING & PULSE */}
                <motion.div
                  className={cn(
                    "flex items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800",
                    isMobile ? "w-10 h-10 text-xl" : "w-14 h-14 text-2xl"
                  )}
                  // Micro-float & Pulse
                  animate={!prefersReducedMotion ? {
                    y: [-3, 3, -3],
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{
                    duration: 5 + (index % 5), // 5s, 6s, 7s...
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <tech.icon className={tech.color} />
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/*
        CENTERPIECE: GitHub Profile
        Static position (z-10 above orbit plane if needed, or same plane)
      */}
      <motion.div
        className="relative z-10 group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glow Ring (Glassmorphism) */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-slate-200/50 to-slate-500/10 dark:from-slate-700/50 dark:to-slate-900/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Border Ring */}
        <motion.div
          className="w-32 h-32 md:w-44 md:h-44 rounded-full p-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-2xl"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800">
            <Image
              src="https://github.com/pacman-cli.png"
              alt="Puspo's GitHub Profile"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  )
}
