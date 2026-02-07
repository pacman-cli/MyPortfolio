"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

// Configuration for status items
const STATUS_ITEMS = [
  { name: 'API Services', status: 'Healthy', color: 'bg-emerald-500' },
  { name: 'Database', status: 'Optimized', color: 'bg-emerald-500' },
  { name: 'Cache Layer', status: 'Active', color: 'bg-emerald-500' },
  { name: 'Auth & Security', status: 'Secured', color: 'bg-emerald-500' },
  { name: 'Deployment', status: 'Stable', color: 'bg-emerald-500' },
]

export const HeroStatusPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-[360px] mx-auto overflow-hidden",
        "rounded-xl border border-slate-200 dark:border-slate-800",
        "bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-sm",
        "divide-y divide-slate-100 dark:divide-slate-800/50"
      )}
    >
      {/* Header */}
      <div className="px-5 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            [ System Status ]
          </span>
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Rows Container */}
      <div className="p-2 space-y-1">
        {STATUS_ITEMS.map((item, index) => (
          <StatusRow
            key={item.name}
            item={item}
            index={index}
          />
        ))}
      </div>

    </motion.div>
  )
}

// Sub-component for individual rows to handle stagger cleanly
const StatusRow = ({ item, index }: { item: typeof STATUS_ITEMS[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2 + (index * 0.1), // Staggered delay
        duration: 0.5,
        ease: "easeOut"
      }}
      className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
    >
      {/* Service Name */}
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-mono">
        {item.name}
      </span>

      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {item.status}
        </span>
        <div className="relative flex h-2 w-2">
          {/* Ping animation (One-time) */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{
              delay: 0.8 + (index * 0.1),
              duration: 1,
              repeat: 0 // No loop
            }}
            className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", item.color)}
          />
          <span className={cn("relative inline-flex rounded-full h-2 w-2", item.color)} />
        </div>
      </div>
    </motion.div>
  )
}
