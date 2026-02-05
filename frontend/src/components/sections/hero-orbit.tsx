"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LayoutGrid, Lock } from 'lucide-react'
import { SiAmazonwebservices, SiPostgresql, SiRedis, SiSpringboot } from "react-icons/si"

// ============================================================================
// CONFIGURATION
// ============================================================================

const NODES = [
  {
    id: 'gateway',
    label: "API Gateway",
    icon: <LayoutGrid className="w-6 h-6 text-white" />,
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/40",
    position: { x: 0, y: 0 } // Center
  },
  {
    id: 'service',
    label: "Microservices",
    icon: <SiSpringboot className="w-5 h-5 text-emerald-400" />,
    color: "bg-slate-800",
    shadow: "shadow-emerald-900/40",
    position: { x: -120, y: -80 }
  },
  {
    id: 'db',
    label: "PostgreSQL",
    icon: <SiPostgresql className="w-5 h-5 text-blue-400" />,
    color: "bg-slate-800",
    shadow: "shadow-blue-900/40",
    position: { x: 120, y: -80 }
  },
  {
    id: 'cache',
    label: "Redis Cache",
    icon: <SiRedis className="w-5 h-5 text-red-400" />,
    color: "bg-slate-800",
    shadow: "shadow-red-900/40",
    position: { x: -120, y: 80 }
  },
  {
    id: 'cloud',
    label: "AWS Cloud",
    icon: <SiAmazonwebservices className="w-5 h-5 text-amber-400" />,
    color: "bg-slate-800",
    shadow: "shadow-amber-900/40",
    position: { x: 120, y: 80 }
  },
  {
    id: 'auth',
    label: "Auth Guard",
    icon: <Lock className="w-4 h-4 text-purple-400" />,
    color: "bg-slate-900",
    shadow: "shadow-purple-900/40",
    position: { x: 0, y: -130 }, // Top center
    mini: true
  }
]

// ============================================================================
// SYSTEM NODE COMPONENT
// ============================================================================

const SystemNode = ({ node, delay = 0 }: { node: typeof NODES[0], delay?: number }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="absolute top-1/2 left-1/2"
      style={{
        marginLeft: node.position.x,
        marginTop: node.position.y,
        x: '-50%',
        y: '-50%'
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.2 }}
        className="relative group"
      >
        {/* Node Body */}
        <div className={cn(
          "relative flex items-center justify-center rounded-2xl border border-slate-700/50 backdrop-blur-md transition-all duration-300 z-10",
          node.mini ? "w-10 h-10" : "w-16 h-16 md:w-20 md:h-20",
          node.color,
          "shadow-lg", node.shadow
        )}>
          {node.icon}

          {/* Active Pulse Ring */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 animate-pulse" />
        </div>

        {/* Label Tooltip */}
        <div className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[10px] md:text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 border border-slate-700",
          "shadow-xl backdrop-blur-sm"
        )}>
          {node.label}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// DATA FLOW PARTICLE
// ============================================================================

const DataFlow = ({ start, end, delay = 0 }: { start: { x: number, y: number }, end: { x: number, y: number }, delay?: number }) => {
  // SVG Coordinates calculation relative to center (200x200 viewbox concept essentially)
  // We'll use absolute coordinates in the parent SVG

  return (
    <motion.g>
      {/* Path Line - Faint */}
      <line
        x1={250 + start.x} y1={250 + start.y}
        x2={250 + end.x} y2={250 + end.y}
        className="stroke-slate-200/20 dark:stroke-slate-700/30"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Travelling Particle */}
      <motion.circle
        r="3"
        fill="currentColor"
        className={cn("text-emerald-400 dark:text-emerald-400")}
      >
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={`M${250 + start.x},${250 + start.y} L${250 + end.x},${250 + end.y}`}
          keyPoints="0;1"
          keyTimes="0;1"
          begin={`${delay}s`}
        />
        {/* Particle Glow */}
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
      </motion.circle>

      {/* Return Packet (Response) */}
      <motion.circle
        r="2"
        fill="currentColor"
        className="text-blue-400 dark:text-blue-400"
      >
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={`M${250 + end.x},${250 + end.y} L${250 + start.x},${250 + start.y}`}
          keyPoints="0;1"
          keyTimes="0;1"
          begin={`${delay + 1}s`}
        />
      </motion.circle>

    </motion.g>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const OrbitingTechStack = () => {
  // We are keeping the component name `OrbitingTechStack` (exported) to avoid breaking hero.tsx import
  // But internally this is the "Backend Architecture Visualizer"

  return (
    <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center my-8 md:my-0 select-none">

      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: "rgba(16, 185, 129, 0.1)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgba(16, 185, 129, 0)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="150" fill="url(#grad1)" />

        {/* Connections from Gateway (0,0) to others */}
        <DataFlow start={{ x: 0, y: 0 }} end={{ x: -120, y: -80 }} delay={0} />   {/* To Service */}
        <DataFlow start={{ x: 0, y: 0 }} end={{ x: 120, y: -80 }} delay={0.5} />  {/* To DB */}
        <DataFlow start={{ x: 0, y: 0 }} end={{ x: -120, y: 80 }} delay={1} />  {/* To Cache */}
        <DataFlow start={{ x: 0, y: 0 }} end={{ x: 120, y: 80 }} delay={1.5} />  {/* To Cloud */}

        {/* Connection Service -> Auth */}
        <DataFlow start={{ x: -120, y: -80 }} end={{ x: 0, y: -130 }} delay={0.2} />
      </svg>

      {/* Nodes Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Container for absolute positioning of React nodes */}
        <div className="relative w-full h-full pointer-events-auto">
          {NODES.map((node, i) => (
            <SystemNode key={node.id} node={node} delay={i * 0.1} />
          ))}
        </div>
      </div>

    </div>
  )
}
