"use client"

import { getTechIcon, getTechIconColor } from '@/lib/tech-icons'
import type { Project } from '@/types'
import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </div>
  )
}

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ...SPRING_FADE_UP }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="glass glass-hover rounded-xl overflow-hidden relative">
        <div className="accent-bar-left" />

        <div className="flex flex-col md:flex-row gap-4 p-4 md:px-6 md:py-5 md:items-start">
          <div className="w-12 pt-1">
            <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-emerald-500 group-hover:scale-130 transition-all inline-block origin-left">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors hover:underline tracking-tight"
              >
                {project.name}
              </Link>
              {project.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-600 uppercase tracking-wide">
                  Featured
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs text-muted-foreground/60 flex items-center gap-1.5 transition-colors duration-300 ${getTechIconColor(tech)}`}
                >
                  <span className="transition-colors duration-300">{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:pt-1 self-start md:self-auto mt-4 md:mt-0">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              aria-label={`GitHub repo for ${project.name}`}
            >
              <Github className="w-5 h-5" />
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 rounded-full transition-all"
                aria-label={`Live demo for ${project.name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm font-medium text-muted-foreground hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
