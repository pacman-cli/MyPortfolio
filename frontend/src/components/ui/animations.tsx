"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef } from "react"

interface PageEntranceProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  className?: string
}

/**
 * PageEntrance - Orchestrated entrance animation for page load
 * Use for hero sections and key content areas
 */
export function PageEntrance({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.6,
  className = "",
}: PageEntranceProps) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer - For staggered children animations
 */
interface StaggerContainerProps {
  children: React.ReactNode
  delay?: number
  stagger?: number
  className?: string
}

export function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.08,
  className = "",
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  duration?: number
  className?: string
}

export function StaggerItem({
  children,
  direction = "up",
  distance = 20,
  duration = 0.5,
  className = "",
}: StaggerItemProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, ...directions[direction] },
        animate: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollReveal - Animate in when element enters viewport
 */
interface ScrollRevealProps {
  children: React.ReactNode
  threshold?: number
  direction?: "up" | "down" | "left" | "right" | "scale"
  distance?: number
  duration?: number
  className?: string
}

export function ScrollReveal({
  children,
  threshold = 0.1,
  direction = "up",
  distance = 30,
  duration = 0.5,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    scale: { scale: 0.9 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxSection - Creates parallax scrolling effect
 */
interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number // 0-1, higher = more movement
  className?: string
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const yOpposite = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y: y }} className="relative z-10">
        {children}
      </motion.div>
      <motion.div
        style={{ y: yOpposite }}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}

/**
 * FloatingElement - Continuous floating animation
 */
interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  amplitude?: number
  className?: string
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  amplitude = 10,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * GlowingPulse - Pulsing glow effect
 */
interface GlowingPulseProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function GlowingPulse({
  children,
  color = "16, 185, 129", // emerald
  className = "",
}: GlowingPulseProps) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px rgba(${color}, 0.2)`,
          `0 0 40px rgba(${color}, 0.4)`,
          `0 0 20px rgba(${color}, 0.2)`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * TextReveal - Character/word by character text reveal
 */
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: "span" | "div"
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Component = "span",
}: TextRevealProps) {
  const words = text.split(" ")

  return (
    <Component className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}

/**
 * MagneticCursor - Element that follows cursor slightly
 */
interface MagneticCursorProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticCursor({
  children,
  strength = 0.3,
  className = "",
}: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // Simplified version without mouse tracking for SSR safety
  return (
    <motion.div
      ref={ref}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * BorderReveal - Border that fills on hover
 */
interface BorderRevealProps {
  children: React.ReactNode
  className?: string
}

export function BorderReveal({ children, className = "" }: BorderRevealProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollProgressBar - Animated progress bar based on scroll
 */
interface ScrollProgressBarProps {
  className?: string
  color?: string
}

export function ScrollProgressBar({
  className = "",
  color = "16, 185, 129",
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 z-[100] origin-left ${className}`}
      style={{
        scaleX,
        background: `linear-gradient(90deg, rgb(${color}), rgb(45, 212, 191))`,
      }}
    />
  )
}

/**
 * AnimatedGradient - Background gradient animation
 */
interface AnimatedGradientProps {
  className?: string
}

export function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  return (
    <motion.div
      className={`absolute inset-0 -z-10 ${className}`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(45, 212, 191, 0.1), transparent 50%), radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05), transparent 70%)",
      }}
    />
  )
}