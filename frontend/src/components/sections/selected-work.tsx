"use client"

import { cn } from '@/lib/utils'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Folder, GitFork, Github, Star } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRef } from 'react'
import { FaJava } from 'react-icons/fa'
import { SiDocker, SiMysql, SiNextdotjs, SiPython, SiReact, SiSpringboot, SiTailwindcss, SiTypescript } from 'react-icons/si'

// ============================================================================
// CONFIGURATION - Edit this to add/remove featured projects
// ============================================================================

interface FeaturedProject {
  name: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  stars?: number
  forks?: number
  category: 'fullstack' | 'backend' | 'frontend' | 'systems'
  featured?: boolean
  livePreview?: boolean
}

// Curated list of projects - edit this to customize your showcase
const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: "TakaTrack",
    description: "A comprehensive personal finance management platform with real-time visualizations, expense tracking, and savings goal management.",
    techStack: ["Next.js", "Spring Boot", "MySQL", "Docker"],
    githubUrl: "https://github.com/pacman-cli/TakaTrack",
    demoUrl: "https://takatrack.puspo.online",
    category: "fullstack",
    featured: true,
    livePreview: true,
  },
  {
    name: "StayMate",
    description: "Full-stack rental property marketplace with secure authentication, real-time messaging, and comprehensive listing management.",
    techStack: ["Next.js", "Spring Boot", "MySQL", "Docker"],
    githubUrl: "https://github.com/pacman-cli/staymate",
    demoUrl: "https://staymate-demo.puspo.online?theme=light",
    category: "fullstack",
    featured: true,
    livePreview: true,
  },
  {
    name: "Portfolio",
    description: "Modern developer portfolio built with Next.js 16, featuring scroll-driven animations, dark mode, and responsive design.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/pacman-cli/MyPortfolio",
    demoUrl: "https://puspo.online",
    category: "frontend",
    livePreview: true,
  },
  {
    name: "E-Commerce",
    description: "A comprehensive e-commerce platform with product management, shopping cart functionality, and secure checkout processes.",
    techStack: ["Next.js", "Spring Boot", "MySQL", "Docker"],
    githubUrl: "https://github.com/pacman-cli/e-commerce",
    demoUrl: "https://ecommerce.puspo.online/",
    category: "fullstack",
    livePreview: true,
  },
  {
    name: "Java Learning",
    description: "Comprehensive repository of Java learning projects covering core concepts, algorithms, and advanced OOP patterns.",
    techStack: ["Java", "Algorithms", "OOP"],
    githubUrl: "https://github.com/pacman-cli/Java-Learning",
    category: "backend",
  },
  {
    name: "Business Analytics Dashboard",
    description: "Data-driven analytics dashboard for business insights with interactive visualizations and reporting capabilities.",
    techStack: ["Java", "Spring Boot", "Analytics"],
    githubUrl: "https://github.com/pacman-cli/Java-Learning/tree/main/server/businessAnalytics",
    category: "backend",
  },
]

// ============================================================================
// TECH ICON MAPPING
// ============================================================================

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('next')) return <SiNextdotjs className="w-3.5 h-3.5" />
  if (t.includes('react')) return <SiReact className="w-3.5 h-3.5" />
  if (t.includes('spring')) return <SiSpringboot className="w-3.5 h-3.5" />
  if (t.includes('mysql')) return <SiMysql className="w-3.5 h-3.5" />
  if (t.includes('docker')) return <SiDocker className="w-3.5 h-3.5" />
  if (t.includes('typescript')) return <SiTypescript className="w-3.5 h-3.5" />
  if (t.includes('tailwind')) return <SiTailwindcss className="w-3.5 h-3.5" />
  if (t.includes('python')) return <SiPython className="w-3.5 h-3.5" />
  if (t.includes('java') && !t.includes('javascript')) return <FaJava className="w-3.5 h-3.5" />
  return null
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fullstack': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    case 'backend': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    case 'frontend': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    case 'systems': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
    default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
  }
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const smoothEase = [0.25, 0.1, 0.25, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
}

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================

interface ProjectCardProps {
  project: FeaturedProject
  prefersReducedMotion: boolean | null
}

const ProjectCard = ({ project, prefersReducedMotion }: ProjectCardProps) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  const { resolvedTheme } = useTheme()

  const livePreviewUrl = project.livePreview && project.demoUrl
    ? (project.name === "StayMate"
      ? `${project.demoUrl.split('?')[0]}?theme=${resolvedTheme || 'dark'}`
      : project.demoUrl)
    : null

  return (
    <motion.article
      ref={cardRef}
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "group relative flex flex-col h-full",
        "bg-card/60 backdrop-blur-sm rounded-2xl",
        "border border-border/50",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300",
        project.featured && "ring-1 ring-primary/20"
      )}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary text-primary-foreground shadow-lg">
            Featured
          </span>
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Live Preview / Media */}
        {livePreviewUrl && (
          <div className="w-full h-48 border-b border-border/50 relative overflow-hidden bg-muted/30 group-hover:h-48 transition-all duration-500 ease-out rounded-t-2xl">
            <div className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25]">
              <iframe
                src={livePreviewUrl}
                title={`${project.name} Live Preview`}
                className="w-full h-full border-0 bg-white dark:bg-slate-950"
                loading="lazy"
                tabIndex={-1}
              />
            </div>
            {/* Overlay to prevent interaction stealing scroll but allow clicking */}
            <Link
              href={livePreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 block cursor-pointer"
              aria-label={`Visit ${project.name} live demo`}
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110",
                getCategoryColor(project.category)
              )}>
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <span className={cn(
                  "inline-block text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border mt-1",
                  getCategoryColor(project.category)
                )}>
                  {project.category}
                </span>
              </div>
            </div>

            {/* Stats */}
            {(project.stars || project.forks) && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {project.stars && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {project.stars}
                  </span>
                )}
                {project.forks && (
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {project.forks}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground border border-border/50 hover:border-primary/30 transition-colors"
              >
                {getTechIcon(tech)}
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                "bg-secondary/50 hover:bg-secondary text-foreground",
                "border border-border/50 hover:border-primary/30",
                "transition-all duration-300"
              )}
              aria-label={`View ${project.name} source code on GitHub`}
            >
              <Github className="w-4 h-4" />
              Code
            </Link>

            {project.demoUrl && (
              <Link
                href={livePreviewUrl || project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                  "transition-all duration-300"
                )}
                aria-label={`View ${project.name} live demo`}
              >
                Live Demo
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SelectedWork = () => {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-20 md:py-28 bg-muted/20 relative overflow-hidden"
      aria-labelledby="work-heading"
    >
      {/* Background accents */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 id="work-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Things I&apos;ve Built
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A curated selection of projects showcasing full-stack capabilities and engineering craft.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.ul
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto list-none pl-0"
        >
          {FEATURED_PROJECTS.map((project) => (
            <motion.li key={project.name} className="h-full">
              <ProjectCard
                project={project}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.li>
          ))}
        </motion.ul>

        {/* View more on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="https://github.com/pacman-cli"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              "text-muted-foreground hover:text-foreground",
              "transition-colors duration-300"
            )}
          >
            <Github className="w-4 h-4" />
            View more on GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
