"use client"

import { cn } from '@/lib/utils'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaAws } from "react-icons/fa"
import {
  SiDocker,
  SiKubernetes,
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
]

export const HeroAvatar = () => {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Radius for desktop layout
  const RADIUS = 135

  // 1. ENTRY ANIMATION
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay: 0.2, ease: "easeOut" }
    }
  }

  // 2. SLOW RADIAL BREATH (GROUP)
  const breathingVariants: Variants = {
    animate: {
      scale: [1, 1.01, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // 3. CONTINUOUS MICRO-FLOAT (ICONS) & HOVER DEPTH
  // Float is continuous. Hover depth (move outward) is an event.
  // We use separate variants on separate wrappers to avoid conflict.

  const iconFloatVariants = (delay: number): Variants => ({
    animate: {
      y: [-3, 3, -3],
      transition: {
        duration: 7 + (delay % 4), // 7-10s random-ish
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 0.5
      }
    }
  })

  // Calculate generic hover expansion vector
  const getHoverVariant = (x: number, y: number): Variants => {
    // Normalize vector
    const length = Math.sqrt(x * x + y * y)
    const dx = (x / length) * 6 // Move 6px outward
    const dy = (y / length) * 6

    return {
      hover: {
        x: dx,
        y: dy,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }
    }
  }

  // Logic to determine if animations should run
  const shouldAnimate = mounted && !prefersReducedMotion

  return (
    <motion.div
      className="relative w-full max-w-[450px] aspect-square flex items-center justify-center mx-auto"
      initial="hidden"
      animate={["visible", shouldAnimate ? "animate" : ""]}
      whileHover="hover" // Triggers hover variants on children
      variants={containerVariants}
    >

      {/*
        DESKTOP / TABLET LAYOUT: Radial
        Hidden on Mobile (< sm)
      */}
      <motion.div
        className="hidden sm:block absolute inset-0"
        variants={shouldAnimate ? breathingVariants : {}}
      >
        {TECH_ICONS.map((tech, index) => {
          const angle = (index * 360) / TECH_ICONS.length - 90
          const angleRad = (angle * Math.PI) / 180
          const x = RADIUS * Math.cos(angleRad)
          const y = RADIUS * Math.sin(angleRad)

          return (
            <motion.div
              key={tech.label}
              className="absolute w-14 h-14"
              // Base Position
              style={{
                left: "50%",
                top: "50%",
                marginLeft: x - 28, // Center offset
                marginTop: y - 28,
              }}
              // HOVER DEPTH LAYER
              variants={getHoverVariant(x, y)}
            >
              {/* FLOATING LAYER */}
              <motion.div
                className={cn(
                  "flex items-center justify-center w-full h-full rounded-full",
                  "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
                  "text-3xl z-10",
                  tech.color
                )}
                variants={shouldAnimate ? iconFloatVariants(index) : {}}
                // If nested variant names match parent (animate), they run auto.
                // container runs "animate", so this runs "animate" variant. Perfect.
                aria-hidden="true"
              >
                <tech.icon />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/*
        CENTRAL AVATAR
      */}
      <motion.div
        className="relative z-0 group"
        variants={shouldAnimate ? breathingVariants : {}}
      >
        {/* Glow Ring that brightens on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border border-emerald-500/20 transition-opacity duration-300 opacity-50 group-hover:opacity-100 group-hover:border-emerald-500/30"
          animate={shouldAnimate ? { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Avatar */}
        <motion.div
          className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-2 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-2xl overflow-hidden"
          variants={{
            hover: { scale: 1.06, transition: { type: "spring", stiffness: 300, damping: 20 } }
          }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-950 border-[3px] border-white dark:border-slate-950">
            <Image
              src="https://github.com/pacman-cli.png"
              alt="Puspo's GitHub Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      {/*
        MOBILE LAYOUT (Row)
        Visible only on mobile (< sm)
      */}
      <div className="sm:hidden absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-10 w-max">
        {TECH_ICONS.map((tech, index) => (
          <motion.div
            key={tech.label}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
              "text-xl",
              tech.color
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <tech.icon />
          </motion.div>
        ))}
      </div>

    </motion.div>
  )
}
