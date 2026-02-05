"use client"

import { cn } from '@/lib/utils'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import {
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaPython,
  FaReact
} from "react-icons/fa"
import {
  SiFigma,
  SiFramer,
  SiGithubactions,
  SiGraphql,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from "react-icons/si"

// ============================================================================
// CONFIGURATION
// ============================================================================

interface SkillItem {
  name: string
  icon: React.ReactNode
  color?: string
}

interface SkillCategory {
  id: string
  title: string
  subtitle: string
  color: string
  accentColor: string
  skills: SkillItem[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Server-side systems',
    color: 'from-emerald-500 to-teal-500',
    accentColor: 'emerald',
    skills: [
      { name: 'Spring Boot', icon: <SiSpringboot />, color: 'text-green-500' },
      { name: 'Java', icon: <FaJava />, color: 'text-orange-500' },
      { name: 'REST APIs', icon: <SiGraphql />, color: 'text-pink-500' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interactive interfaces',
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'blue',
    skills: [
      { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-foreground' },
      { name: 'React', icon: <FaReact />, color: 'text-cyan-400' },
      { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-500' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-400' },
      { name: 'Framer Motion', icon: <SiFramer />, color: 'text-purple-500' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    subtitle: 'Deployment & infrastructure',
    color: 'from-purple-500 to-pink-500',
    accentColor: 'purple',
    skills: [
      { name: 'Docker', icon: <FaDocker />, color: 'text-blue-500' },
      { name: 'AWS', icon: <FaAws />, color: 'text-orange-400' },
      { name: 'Kubernetes', icon: <SiKubernetes />, color: 'text-blue-600' },
      { name: 'GitHub Actions', icon: <SiGithubactions />, color: 'text-foreground' },
      { name: 'Vercel', icon: <SiVercel />, color: 'text-foreground' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    subtitle: 'Storage & persistence',
    color: 'from-orange-500 to-red-500',
    accentColor: 'orange',
    skills: [
      { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-600' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-400' },
      { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
      { name: 'Redis', icon: <SiRedis />, color: 'text-red-500' },
      { name: 'Python', icon: <FaPython />, color: 'text-yellow-500' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Development workflow',
    color: 'from-gray-500 to-slate-500',
    accentColor: 'gray',
    skills: [
      { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-600' },
      { name: 'Linux', icon: <SiLinux />, color: 'text-yellow-500' },
      { name: 'Figma', icon: <SiFigma />, color: 'text-purple-500' },
      { name: 'Postman', icon: <SiPostman />, color: 'text-orange-500' },
    ],
  },
]

// ============================================================================
// COMPONENTS
// ============================================================================

const smoothEase = [0.25, 0.1, 0.25, 1] as const

interface CategoryBlockProps {
  category: SkillCategory
  index: number
  isLast: boolean
  prefersReducedMotion: boolean | null
}

const CategoryBlock = ({ category, index, isLast, prefersReducedMotion }: CategoryBlockProps) => {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Use Framer Motion's useInView to detect when this block is "active" (visible in viewport)
  // We use a high threshold/margin so it triggers when the block is somewhat central
  const isInView = useInView(containerRef, {
    amount: 0.3,
    once: false,
    margin: "-10% 0px -10% 0px"
  })

  // The segment is active if the user scrolls to it OR if they hover it
  const isActive = isInView || isHovered

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12 pb-12 md:pb-16 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*
        1. PATH SEGMENT (Left Line)
           - Draws connection from this node to the next
           - Glows when active/hovered
      */}
      {!isLast && (
        <div
          className="absolute left-[11px] md:left-[19px] top-8 bottom-0 w-[2px] md:w-[3px] bg-border/20 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className={cn(
              "w-full h-full origin-top cursor-pointer transition-opacity duration-500",
              "bg-gradient-to-b",
              category.color
            )}
            initial={{ scaleY: 0, opacity: 0.3 }}
            animate={{
              scaleY: isActive ? 1 : 0.3,
              opacity: isActive ? 1 : 0.3,
              boxShadow: isHovered ? "0 0 15px currentColor" : "none"
            }}
            transition={{ duration: 0.5, ease: smoothEase }}
          />
        </div>
      )}

      {/*
        2. NODE MARKER (Circle on path)
           - Anchors the category line
           - Scales/Glows when active
      */}
      <div className="absolute left-0 md:left-2 top-0 md:top-1 z-10 p-1">
        <motion.div
          className={cn(
            "w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 flex items-center justify-center transition-colors duration-300",
            isActive ? "border-transparent bg-white dark:bg-slate-900" : "border-border bg-background"
          )}
          animate={{
            scale: isHovered ? 1.2 : isActive ? 1.1 : 1,
            boxShadow: isActive ? "0 0 20px rgba(var(--primary), 0.5)" : "none"
          }}
        >
          {/* Inner dot */}
          <div className={cn(
            "w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300",
            isActive ? `bg-${category.accentColor}-500` : "bg-muted-foreground"
          )} />
        </motion.div>
      </div>

      {/*
        3. CONTENT
           - Category Header
           - Skill Grid
      */}
      <div className="relative">
        {/* Header Link Line */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            className={cn(
              "text-left group-hover:translate-x-2 transition-transform duration-300",
              "focus:outline-none"
            )}
          >
            <h3 className={cn(
              "text-xl md:text-2xl font-bold transition-colors duration-300",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}>
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              {category.subtitle}
            </p>
          </motion.button>
        </div>

        {/* Skill Grid - Desktop Grid, Mobile Wrap */}
        <div className="flex flex-wrap gap-3 md:gap-4">
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={cn(
                "flex items-center gap-2.5 px-3 md:px-5 py-2 md:py-3 rounded-xl",
                "bg-card/50 border border-border/40 backdrop-blur-sm",
                "transition-all duration-300",
                "hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                "cursor-default group/skill"
              )}
            >
              <span className={cn("text-lg", skill.color)} aria-hidden="true">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-muted-foreground group-hover/skill:text-foreground transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const TechnicalExpertise = () => {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background accents */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 id="skills-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A deep dive into my engineering toolkit.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryBlock
              key={category.id}
              category={category}
              index={index}
              isLast={index === SKILL_CATEGORIES.length - 1}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
