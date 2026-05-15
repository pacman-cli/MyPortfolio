"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const TEXTS = ['Software Developer', 'System Architect', 'Cloud Enthusiast']
const SHOW_DURATION = 6000
const STAGGER = 0.07

function getParticleOffsets() {
  return {
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 100,
    rotate: (Math.random() - 0.5) * 360,
  }
}

export function ScrambleRole() {
  const [index, setIndex] = useState(0)
  const current = TEXTS[index]

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXTS.length)
    }, SHOW_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <h2 className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-heading text-xl font-black leading-tight text-emerald-600 dark:text-emerald-400 sm:text-2xl md:justify-start lg:text-[2rem] xl:text-[2.35rem]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={current}
          initial={{ opacity: 0, scale: 0.2, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex"
        >
          {current.split('').map((char, i) => {
            const offset = getParticleOffsets()
            return (
              <motion.span
                key={`${current}-${i}`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: offset.x,
                  y: offset.y,
                  rotate: offset.rotate,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  x: offset.x * 2,
                  y: offset.y * 2,
                  rotate: offset.rotate * 3,
                  transition: { duration: 0.5 },
                }}
                transition={{
                  duration: 0.8,
                  delay: i * STAGGER,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}
        </motion.span>
      </AnimatePresence>
    </h2>
  )
}
