"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export const CursorFollower = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true))
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice || window.innerWidth < 768) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  if (!isMounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "white",
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: 1,
      }}
    >
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50 transition-all duration-300 ${isHovering ? 'w-full h-full opacity-20' : 'w-1 h-1 opacity-0'}`} />
    </motion.div>
  )
}
