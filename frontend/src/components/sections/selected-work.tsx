"use client"

import { PROJECTS } from '@/lib/projects'
import type { Project } from '@/types'
import { motion } from 'framer-motion'
import { ArrowUpRight, Folder, Github } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { FaJava } from 'react-icons/fa'
import { SiDocker, SiMysql, SiNextdotjs, SiPython, SiReact, SiSpringboot, SiTailwindcss, SiTypescript } from 'react-icons/si'

// Use centralized project data
const FEATURED_PROJECTS = PROJECTS

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

// ============================================================================
// PROJECT ROW COMPONENT
// ============================================================================

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 md:px-6 md:py-5 md:items-start">
        {/* Index */}
        <div className="w-12 pt-1">
          <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-primary transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="text-xl font-bold text-foreground group-hover:text-primary transition-colors hover:underline"
            >
              {project.name}
            </Link>
            {project.featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
                {getTechIcon(tech)}
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:pt-1 self-start md:self-auto mt-4 md:mt-0">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              aria-label="GitHub Repo"
            >
              <Github className="w-5 h-5" />
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
              aria-label="Live Demo"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            Case Study →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SelectedWork = () => {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-12 md:py-16 bg-background relative"
      aria-labelledby="work-heading"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 id="work-heading" className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Folder className="w-8 h-8 text-primary" />
              Featured projects
            </h2>
            <p className="text-muted-foreground max-w-md">
              A selection of projects reflecting my passion for backend architecture and full-stack engineering.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* List */}
        <div className="border-t border-border/40">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
