"use client"

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Defer to avoid synchronous state update warning
    const timer = setTimeout(() => setMounted(true), 0)

    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // CONFIG: Animation Parameters
  // Desktop: 8 icons, ~160px radius
  // Mobile: 4 icons, ~110px radius
  const activeIcons = TECH_ICONS
  const radius = isMobile ? 120 : 220

  if (!mounted) return <div className="w-[300px] h-[300px]" /> // Skeleton/Placeholder

  return (
    <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-visible z-10">

      {/*
        ORBITAL SYSTEM
        Container rotates continuously using CSS for better performance.
        Children counter-rotate to stay upright.
      */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          !prefersReducedMotion && "animate-spin-slow"
        )}
      >
        {activeIcons.map((tech, index) => {
          const total = activeIcons.length
          const angleDeg = (index * 360) / total

          // Fixed position on the circle edge
          return (
            <div
              key={tech.label}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radius}px) rotate(-${angleDeg}deg)`
              }}
            >
              {/* COUNTER-ROTATION CONTAINER (Keeps icon upright as parent spins) */}
              <div
                className={cn(
                  !prefersReducedMotion && "animate-spin-reverse-slow"
                )}
              >
                {/* ICON VISUAL + FLOATING & PULSE (Kept simple Framer Motion for interactivity or subtle effects) */}
                <motion.div
                  className={cn(
                    "flex items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800",
                    isMobile ? "w-9 h-9 text-lg" : "w-14 h-14 text-2xl"
                  )}
                  // Micro-float & Pulse - Low cost transform only
                  animate={!prefersReducedMotion ? {
                    y: [-3, 3, -3],
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{
                    duration: 5 + (index % 5),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <tech.icon className={tech.color} />
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>

      {/*
        CENTERPIECE: GitHub Profile
        Static position
      */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsHovered(false)}
          >
            <motion.div
              layoutId="profile-expand"
              className="relative w-full max-w-2xl aspect-square rounded-3xl overflow-hidden border-4 border-white dark:border-slate-950 shadow-xl shadow-emerald-500/10 dark:shadow-2xl bg-[#F5F9F7] dark:bg-[#020817]"
              onMouseLeave={() => setIsHovered(false)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src="/profile.jpg"
                alt="Puspo's Profile"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative z-10 group"
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Glow Ring (Glassmorphism) */}
        <div className={cn(
          "absolute -inset-4 rounded-full bg-gradient-to-tr from-slate-200/50 to-slate-500/10 dark:from-slate-700/50 dark:to-slate-900/10 blur-xl transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        )} />

        {/* Border Ring */}
        <motion.div
          className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full p-2 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-xl"
          animate={{ opacity: isHovered ? 0 : 1 }}
        >
          {/* Main Avatar Circle */}
          {!isHovered && (
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <motion.div
                layoutId="profile-expand"
                className="w-full h-full relative border-4 border-white dark:border-slate-950 bg-[#F5F9F7] dark:bg-[#020817] rounded-full overflow-hidden shadow-sm"
              >
                <Image
                  src="/profile.jpg"
                  alt="Puspo's Profile"
                  fill
                  className="object-cover scale-105"
                  priority
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>
          )}
          {/* When hovered, we keep the empty shell to maintain spacing */}
          {isHovered && (
            <div className="w-full h-full" />
          )}
        </motion.div>
      </div>

    </div>
  )
}
