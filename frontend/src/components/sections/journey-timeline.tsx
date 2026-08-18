"use client"

import { cn } from '@/lib/utils'
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, Variants } from 'framer-motion'
import { Briefcase, Calendar, Code, Cpu, Database, GraduationCap, Settings, Users } from 'lucide-react'
import React, { useRef } from 'react'

// ============================================================================
// DATA
// ============================================================================

interface Milestone {
  id: string
  type: 'work' | 'education' | 'leadership'
  role: string
  organization: string
  period: string
  description: string
  skills: string[]
  icon: React.ReactNode
}

const milestones: Milestone[] = [
  {
    id: 'uiu-degree',
    type: 'education',
    role: 'B.Sc. in Computer Science & Engineering',
    organization: 'United International University',
    period: '2022 – Present',
    description: 'Focused on full-stack development, algorithms, and system design. Active in tech communities and academic leadership.',
    skills: ['Algorithms', 'System Design', 'Full-Stack Development'],
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    id: 'electronics-lab',
    type: 'leadership',
    role: 'Project Leader – Electronics Lab',
    organization: 'UIU (5th Semester)',
    period: '5th Semester',
    description: 'Led hardware prototyping projects, coordinating team efforts for electronic circuit design and embedded systems integration.',
    skills: ['Electronics', 'Team Leadership', 'Prototyping'],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: 'dbms-lab',
    type: 'leadership',
    role: 'Project Leader – DBMS Lab',
    organization: 'UIU (6th Semester)',
    period: '6th Semester',
    description: 'Directed database design projects, implementing efficient query optimization and schema architecture.',
    skills: ['Database Design', 'SQL', 'Query Optimization'],
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: 'software-lab',
    type: 'leadership',
    role: 'Team Leader – Software Lab',
    organization: 'UIU (9th Semester)',
    period: '9th Semester',
    description: 'Spearheaded collaborative software development projects, implementing agile methodologies and code review practices.',
    skills: ['Agile', 'Code Review', 'Project Management'],
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: 'microcontroller-lab',
    type: 'leadership',
    role: 'Project Leader – Microprocessor & Microcontroller Lab',
    organization: 'UIU (9th Semester)',
    period: '9th Semester',
    description: 'Led embedded systems projects involving ARM processors and sensor integration for IoT applications.',
    skills: ['Embedded Systems', 'ARM', 'IoT'],
    icon: <Settings className="w-5 h-5" />,
  },
]

// ============================================================================
// ANIMATION VARIANTS & EASING
// ============================================================================

const premiumEase = [0.16, 1, 0.3, 1] as const

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
}

const contentVariants: Variants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    y: 20,
    x: direction === 'left' ? -20 : 20,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.7, ease: premiumEase as [number, number, number, number] }
  }
}

const skillContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1
    }
  }
}

const skillItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 15 }
  }
}

// ============================================================================
// TIMELINE NODE COMPONENT
// ============================================================================

interface TimelineNodeProps {
  milestone: Milestone
  isActive: boolean
  prefersReducedMotion: boolean | null
}

const TimelineNode = ({ milestone, isActive, prefersReducedMotion }: TimelineNodeProps) => {
  const getTypeColor = () => {
    switch (milestone.type) {
      case 'work': return 'from-blue-500 to-cyan-500'
      case 'education': return 'from-purple-500 to-pink-500'
      case 'leadership': return 'from-emerald-500 to-teal-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const getTypeBgColor = () => {
    switch (milestone.type) {
      case 'work': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20'
      case 'education': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20'
      case 'leadership': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20'
      default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    }
  }

  return (
    <motion.button
      variants={prefersReducedMotion ? undefined : nodeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
      whileFocus={prefersReducedMotion ? undefined : { scale: 1.1 }}
      className={cn(
        "group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full",
        "bg-background border-2 shadow-lg backdrop-blur-md",
        "transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isActive 
          ? "border-primary shadow-xl scale-110" 
          : "border-border hover:border-muted-foreground/30"
      )}
      aria-label={`${milestone.role} at ${milestone.organization}`}
      tabIndex={0}
    >
      {/* Background Glow */}
      {isActive && !prefersReducedMotion && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full opacity-40 blur-xl -z-10",
            `bg-gradient-to-r ${getTypeColor()}`
          )}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Outer spinning ring for active state */}
      {isActive && !prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full -m-0.5 pointer-events-none" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#node-gradient)"
            strokeWidth="2"
            strokeDasharray="15 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Inner Icon container */}
      <div className={cn(
        "p-3 rounded-full transition-all duration-300",
        getTypeBgColor(),
        isActive && "scale-105"
      )}>
        {milestone.icon}
      </div>

      {/* Pulse rings */}
      {isActive && !prefersReducedMotion && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full border-2",
            milestone.type === 'work' ? 'border-blue-500/40' :
              milestone.type === 'education' ? 'border-purple-500/40' :
                'border-emerald-500/40'
          )}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.4, 0, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </motion.button>
  )
}

// ============================================================================
// TIMELINE CONTENT COMPONENT
// ============================================================================

interface TimelineContentProps {
  milestone: Milestone
  direction: 'left' | 'right'
  isActive?: boolean
  prefersReducedMotion: boolean | null
}

const TimelineContent = ({ milestone, direction, isActive: propIsActive, prefersReducedMotion }: TimelineContentProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const isActive = propIsActive !== undefined ? propIsActive : isInView

  const getTypeBadgeColor = () => {
    switch (milestone.type) {
      case 'work': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
      case 'education': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
      case 'leadership': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    }
  }

  const getShadowColor = () => {
    if (!isActive) return 'shadow-lg hover:shadow-xl hover:shadow-primary/5'
    switch (milestone.type) {
      case 'work': return 'shadow-[0_0_30px_rgba(59,130,246,0.12)]'
      case 'education': return 'shadow-[0_0_30px_rgba(168,85,247,0.12)]'
      case 'leadership': return 'shadow-[0_0_30px_rgba(16,185,129,0.12)]'
      default: return 'shadow-[0_0_30px_rgba(59,130,246,0.12)]'
    }
  }

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={prefersReducedMotion ? undefined : contentVariants}
      initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      whileHover={prefersReducedMotion ? undefined : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={cn(
        "relative p-5 md:p-6 rounded-2xl border transition-all duration-500 overflow-hidden",
        "bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl",
        isActive ? "border-transparent scale-[1.01] md:scale-[1.02]" : "border-border/50",
        getShadowColor()
      )}
    >
      {/* Premium Active Gradient Border */}
      {isActive && !prefersReducedMotion && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: '1px',
            background: milestone.type === 'education'
              ? 'linear-gradient(135deg, #c084fc, #f472b6, #c084fc)'
              : milestone.type === 'leadership'
                ? 'linear-gradient(135deg, #34d399, #2dd4bf, #34d399)'
                : 'linear-gradient(135deg, #60a5fa, #22d3ee, #60a5fa)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Accent Strip inside card */}
      <div className={cn(
        "absolute top-0 bottom-0 w-[3px] transition-transform duration-500 origin-center",
        direction === 'left' ? "right-0" : "left-0",
        isActive ? "scale-y-100" : "scale-y-0",
        milestone.type === 'education' ? 'bg-gradient-to-b from-purple-500 to-pink-500' :
        milestone.type === 'leadership' ? 'bg-gradient-to-b from-emerald-500 to-teal-500' :
        'bg-gradient-to-b from-blue-500 to-cyan-500'
      )} />

      {/* Horizontal Connector Line (Desktop Only) */}
      {!prefersReducedMotion && (
        <motion.div
          className={cn(
            "hidden lg:block absolute top-1/2 w-8 h-[2px] -translate-y-1/2 pointer-events-none",
            direction === 'left' ? "right-[-2rem] origin-right" : "left-[-2rem] origin-left"
          )}
          style={{
            background: milestone.type === 'education'
              ? 'linear-gradient(to right, #a855f7, #ec4899)'
              : milestone.type === 'leadership'
                ? 'linear-gradient(to right, #10b981, #14b8a6)'
                : 'linear-gradient(to right, #3b82f6, #06b6d4)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: premiumEase }}
        />
      )}

      {/* Type badge */}
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mb-4",
        "transition-colors duration-300",
        getTypeBadgeColor()
      )}>
        {milestone.type === 'work' && <Briefcase className="w-3 h-3" />}
        {milestone.type === 'education' && <GraduationCap className="w-3 h-3" />}
        {milestone.type === 'leadership' && <Users className="w-3 h-3" />}
        {milestone.type.charAt(0).toUpperCase() + milestone.type.slice(1)}
      </span>

      {/* Header */}
      <h3 className={cn(
        "text-lg md:text-xl font-bold mb-1 leading-tight transition-colors duration-300",
        isActive ? "text-primary" : "text-foreground"
      )}>
        {milestone.role}
      </h3>
      <p className="text-sm font-semibold text-muted-foreground/80 mb-2">
        {milestone.organization}
      </p>

      {/* Period */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Calendar className="w-3.5 h-3.5" />
        {milestone.period}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {milestone.description}
      </p>

      {/* Skills */}
      <motion.div
        variants={prefersReducedMotion ? undefined : skillContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap gap-1.5"
      >
        {milestone.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={prefersReducedMotion ? undefined : skillItemVariants}
            className={cn(
              "text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-md border transition-all duration-300",
              isActive
                ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                : "bg-secondary text-secondary-foreground border-border/50"
            )}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// DESKTOP SVG PATH & TIMELINE
// ============================================================================

interface DesktopTimelineProps {
  pathProgress: ReturnType<typeof useTransform<number, number>>
  prefersReducedMotion: boolean | null
}

const DesktopTimeline = ({ pathProgress, prefersReducedMotion }: DesktopTimelineProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  // Track which node is in view
  React.useEffect(() => {
    const observers = nodeRefs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index)
          }
        },
        { threshold: 0.5, rootMargin: '-25% 0px -25% 0px' }
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  return (
    <div className="hidden lg:block relative" role="list" aria-label="Career journey timeline">
      {/* SVG Path Background */}
      <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2">
        <svg
          className="w-full h-full"
          viewBox="0 0 16 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Background path */}
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
          />
          {/* Animated progress path */}
          <motion.line
            x1="8"
            y1="0"
            x2="8"
            y2="100"
            stroke="url(#line-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              pathLength: prefersReducedMotion ? 1 : pathProgress,
            }}
          />
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>


      </div>

      {/* Milestones */}
      <div className="space-y-24">
        {milestones.map((milestone, index) => {
          const isLeft = index % 2 === 0
          const isActive = activeIndex === index

          return (
            <div
              key={milestone.id}
              ref={(el) => { nodeRefs.current[index] = el }}
              className="relative grid grid-cols-[1fr_auto_1fr] gap-8 items-center"
              role="listitem"
            >
              {/* Left content or spacer */}
              <div className={cn(isLeft ? "pr-4" : "")}>
                {isLeft && (
                  <TimelineContent
                    milestone={milestone}
                    direction="left"
                    isActive={isActive}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )}
              </div>

              {/* Center node */}
              <TimelineNode
                milestone={milestone}
                isActive={isActive}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* Right content or spacer */}
              <div className={cn(!isLeft ? "pl-4" : "")}>
                {!isLeft && (
                  <TimelineContent
                    milestone={milestone}
                    direction="right"
                    isActive={isActive}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// MOBILE TIMELINE
// ============================================================================

interface MobileTimelineProps {
  pathProgress: ReturnType<typeof useTransform<number, number>>
  prefersReducedMotion: boolean | null
}

const MobileTimeline = ({ pathProgress, prefersReducedMotion }: MobileTimelineProps) => {
  return (
    <div className="lg:hidden relative" role="list" aria-label="Career journey timeline">
      {/* Vertical line container */}
      <div className="absolute left-7 top-0 bottom-0 w-1" aria-hidden="true">
        {/* Background path */}
        <div className="absolute inset-0 bg-border/40 w-0.5 left-0.5 rounded-full border-dashed border-l border-border" />
        {/* Progress path */}
        <motion.div
          className="absolute top-0 left-0.5 w-0.5 rounded-full origin-top"
          style={{
            height: '100%',
            scaleY: prefersReducedMotion ? 1 : pathProgress,
            background: "linear-gradient(to bottom, #3b82f6, #a855f7, #10b981)"
          }}
        />

      </div>

      {/* Milestones */}
      <div className="space-y-10">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="relative flex gap-6"
            role="listitem"
          >
            {/* Node */}
            <div className="relative z-10 shrink-0">
              <TimelineNode
                milestone={milestone}
                isActive={false} // Will fall back to local inView check inside TimelineContent
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <TimelineContent
                milestone={milestone}
                direction="right"
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const JourneyTimeline = () => {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Scroll tracking setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const pathProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 bg-background/50 relative overflow-hidden"
      aria-labelledby="journey-heading"
    >
      {/* Premium ambient light backgrounds */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="text-center mb-20 md:mb-24"
        >
          <h2 id="journey-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            My Journey
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full shadow-sm" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A path of continuous learning, leadership, and building impactful engineering solutions.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="max-w-5xl mx-auto">
          <DesktopTimeline
            pathProgress={pathProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
          <MobileTimeline
            pathProgress={pathProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  )
}
