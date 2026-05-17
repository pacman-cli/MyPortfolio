"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  enableTilt?: boolean
  enablePress?: boolean
  tiltIntensity?: number
  onClick?: () => void
}

// Spring configs for smooth animations
const springConfig = {
  stiff: 400,
  damping: 30,
  mass: 0.8,
}

const pressSpring = {
  stiff: 500,
  damping: 20,
  mass: 0.5,
}

/**
 * InteractiveCard - Card with micro-interactions
 * - Hover: subtle lift + shadow enhancement
 * - Press: scale down feedback
 * - Tilt: 3D tilt on mouse move (optional)
 */
export function InteractiveCard({
  children,
  className = "",
  enableTilt = false,
  enablePress = true,
  tiltIntensity = 8,
  onClick,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Tilt gesture values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["8deg", "-8deg"]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-8deg", "8deg"]), springConfig)

  // Press animation values
  const scale = useSpring(1, pressSpring)
  const shadowScale = useSpring(0, pressSpring)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableTilt) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: enableTilt ? rotateX : undefined,
        rotateY: enableTilt ? rotateY : undefined,
        transformStyle: "preserve-3d",
        scale,
      }}
      whileHover={{
        scale: enablePress ? 1.02 : 1,
        y: -4,
      }}
      whileTap={{
        scale: enablePress ? 0.98 : 1,
      }}
      animate={{
        boxShadow: shadowScale.get() > 0
          ? `0 ${8 + shadowScale.get() * 10}px ${
              20 + shadowScale.get() * 15
            }px rgba(0, 0, 0, ${0.1 + shadowScale.get() * 0.1})`
          : undefined,
      }}
      className={`transition-shadow ${className}`}
    >
      <motion.div style={{ transform: "translateZ(20px)" }}>{children}</motion.div>
    </motion.div>
  )
}

/**
 * InteractiveButton - Button with press/tap micro-interactions
 */
interface InteractiveButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  disabled?: boolean
}

export function InteractiveButton({
  children,
  className = "",
  onClick,
  disabled,
}: InteractiveButtonProps) {
  const scale = useSpring(1, pressSpring)

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={{ scale }}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      className={className}
    >
      {children}
    </motion.button>
  )
}

/**
 * IconButton - Icon button with scale + rotate micro-interaction
 */
interface IconButtonProps {
  icon: React.ReactNode
  className?: string
  label: string
  onClick?: () => void
  enableRotate?: boolean
}

export function IconButton({ icon, className = "", label, onClick, enableRotate = false }: IconButtonProps) {
  const rotate = useSpring(0, springConfig)

  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      style={{ rotate }}
      whileHover={enableRotate ? { rotate: 15 } : { scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      {icon}
    </motion.button>
  )
}

/**
 * LinkWithIndicator - Link with animated underline indicator
 */
interface LinkWithIndicatorProps {
  href: string
  children: React.ReactNode
  className?: string
  active?: boolean
}

export function LinkWithIndicator({ href, children, className = "", active = false }: LinkWithIndicatorProps) {
  const underlineScaleX = useSpring(active ? 1 : 0, springConfig)

  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px bg-current"
        style={{ scaleX: underlineScaleX }}
        initial={false}
      />
    </motion.a>
  )
}

/**
 * TiltWrapper - Wrapper that adds 3D tilt on mouse movement
 */
interface TiltWrapperProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  perspective?: number
}

export function TiltWrapper({
  children,
  className = "",
  intensity = 10,
  perspective = 1000,
}: TiltWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`])
  const rotateY = useTransform(x, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) / (rect.width / 2))
    y.set((e.clientY - centerY) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  )
}

/**
 * MagneticButton - Button that pulls toward cursor on hover
 */
interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfigMagnet = { stiffness: 150, damping: 15, mass: 0.1 }
  const xSpring = useSpring(0, springConfigMagnet)
  const ySpring = useSpring(0, springConfigMagnet)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}