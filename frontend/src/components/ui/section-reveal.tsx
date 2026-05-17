"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export const SectionReveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring' as const, stiffness: 100, damping: 18 }}
    viewport={{ once: true, margin: '-40px' }}
    className={className}
  >
    {children}
  </motion.div>
)
