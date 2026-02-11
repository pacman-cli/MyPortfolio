"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const LightModeBackground = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden dark:hidden bg-slate-50/50">
      {/* Top Left - Soft Mint/Green Abstract Shape */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] blur-3xl opacity-60 will-change-transform"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-green-200/40">
          <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.4,70.9,32.4C59.6,43.4,48.3,52.4,36.4,60.8C24.5,69.2,12,76.9,-1.1,78.8C-14.2,80.7,-27.1,76.8,-39.8,69.4C-52.5,62,-65.1,51.1,-73.4,37.8C-81.7,24.5,-85.7,8.7,-84, -6.3C-82.3,-21.3,-74.9,-35.3,-64.1,-46.6C-53.3,-57.9,-39.1,-66.4,-25.3,-73.9C-11.5,-81.4,1.8,-87.8,14.6,-86.3L44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      {/* Bottom Right - Cyan/Green Blend Abstract Shape */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -bottom-[15%] -right-[5%] w-[60%] h-[60%] blur-3xl opacity-50 will-change-transform"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-emerald-200/40">
          <path d="M39.6,-66.7C52.1,-61.2,63.6,-53.4,71.3,-43.3C78.9,-33.2,82.7,-20.8,81.9,-8.7C81.1,3.4,75.7,15.2,68.6,26.1C61.5,37,52.7,46.9,42.4,54.8C32.1,62.7,20.3,68.6,8.2,69.8C-3.9,71,-18.2,67.5,-30.9,61.4C-43.6,55.3,-54.7,46.6,-64,35.6C-73.3,24.6,-80.8,11.3,-80.3,-1.6C-79.9,-14.5,-71.4,-27,-61.8,-37.6C-52.2,-48.2,-41.4,-57,-29.6,-62.9C-17.8,-68.8,-5,-71.8,7.9,-70.6L39.6,-66.7Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      {/* Floating Particles/Orbs for detail */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-teal-200/20 rounded-full blur-2xl"
      />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
    </div>
  )
}
