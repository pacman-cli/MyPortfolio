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

const smoothEase = [0.25, 0.1, 0.25, 1] as const
const entryEase = [0.22, 1, 0.36, 1] as const

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  active: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  }
}

const contentVariants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: entryEase }
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
      whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
      whileFocus={prefersReducedMotion ? undefined : { scale: 1.08 }}
      className={cn(
        "group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl",
        "bg-card border-2 border-border/50 shadow-lg backdrop-blur-sm",
        "transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isActive && "border-primary/50 shadow-xl"
      )}
      aria-label={`${milestone.role} at ${milestone.organization}`}
      tabIndex={0}
    >
      {/* Glow effect */}
      {isActive && !prefersReducedMotion && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-40 blur-xl -z-10",
            `bg-gradient-to-r ${getTypeColor()}`
          )}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: smoothEase
          }}
        />
      )}

      {/* Icon container */}
      <div className={cn(
        "p-3 rounded-xl transition-colors duration-300",
        getTypeBgColor()
      )}>
        {milestone.icon}
      </div>

      {/* Pulse ring on active */}
      {isActive && !prefersReducedMotion && (
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl border-2",
            milestone.type === 'work' ? 'border-blue-500/50' :
              milestone.type === 'education' ? 'border-purple-500/50' :
                'border-emerald-500/50'
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
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
  prefersReducedMotion: boolean | null
}

const TimelineContent = ({ milestone, direction, prefersReducedMotion }: TimelineContentProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getTypeBadgeColor = () => {
    switch (milestone.type) {
      case 'work': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
      case 'education': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
      case 'leadership': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    }
  }

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={prefersReducedMotion ? undefined : contentVariants}
      initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative p-5 md:p-6 rounded-2xl",
        "bg-card/60 backdrop-blur-md border border-border/50",
        "shadow-lg hover:shadow-xl transition-shadow duration-300"
      )}
    >
      {/* Type badge */}
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border mb-3",
        getTypeBadgeColor()
      )}>
        {milestone.type === 'work' && <Briefcase className="w-3 h-3" />}
        {milestone.type === 'education' && <GraduationCap className="w-3 h-3" />}
        {milestone.type === 'leadership' && <Users className="w-3 h-3" />}
        {milestone.type.charAt(0).toUpperCase() + milestone.type.slice(1)}
      </span>

      {/* Header */}
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 leading-tight">
        {milestone.role}
      </h3>
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {milestone.organization}
      </p>

      {/* Period */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <Calendar className="w-3.5 h-3.5" />
        {milestone.period}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {milestone.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {milestone.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================================================
// DESKTOP SVG PATH
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
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
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
      <svg
        className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2"
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
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
        {/* Animated progress path */}
        <motion.line
          x1="8"
          y1="0"
          x2="8"
          y2="100"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: prefersReducedMotion ? 1 : pathProgress,
          }}
        />
      </svg>

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
      {/* Vertical line */}
      <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary rounded-full origin-top"
          style={{
            height: '100%',
            scaleY: prefersReducedMotion ? 1 : pathProgress,
          }}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="relative flex gap-6"
            role="listitem"
          >
            {/* Node */}
            <div className="relative z-10 shrink-0">
              <TimelineNode
                milestone={milestone}
                isActive={false}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* Content */}
            <div className="flex-1 pt-2">
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

  // Use the container to track scroll. Progress 0 to 1 as we scroll through it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const pathProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-20 md:py-32 bg-background/50 relative overflow-hidden"
      aria-labelledby="journey-heading"
    >
      {/* Background accents */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 id="journey-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A path of continuous learning, leadership, and building impactful solutions.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
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
