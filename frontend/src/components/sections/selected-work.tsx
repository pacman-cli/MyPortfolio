"use client"

import { getTechIcon, getTechIconColor } from '@/lib/tech-icons'
import type { Project } from '@/types'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import Link from 'next/link'
import { memo } from 'react'

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300 shadow-xl"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            0{index + 1} / Project
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub Repo"
              >
                <SiGithub className="w-5 h-5" />
              </Link>
            )}
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-emerald-400 transition-colors"
                aria-label="Live Demo"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        <Link href={`/projects/${project.slug}`} className="block group-hover:text-emerald-400 transition-colors">
          <h3 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
            {project.name}
          </h3>
        </Link>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={`text-xs px-2.5 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 ${getTechIconColor(tech)}`}
          >
            <span>{getTechIcon(tech)}</span>
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
})

ProjectCard.displayName = "ProjectCard"

export const SelectedWork = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Featured Projects
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-sm mt-3 md:mt-0">
          Handcrafted full-stack architectures, high-concurrency backends, and cloud solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
