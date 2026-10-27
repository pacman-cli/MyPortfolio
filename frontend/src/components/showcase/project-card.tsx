'use client'

import React from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { ArrowUpRight } from 'lucide-react'

export interface ProjectCardProps {
  project: ShowcaseProject
  index: number
  onHover?: (project: ShowcaseProject, e: React.MouseEvent) => void
  onLeave?: () => void
  onMouseMove?: (e: React.MouseEvent) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onHover,
  onLeave,
  onMouseMove,
}) => {
  const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`project-card-${project.id}`}
      onMouseEnter={(e) => onHover?.(project, e)}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      className="p-4 rounded-lg border border-border bg-card/50 flex items-start justify-between gap-4 hover:border-foreground/30 transition-colors group block"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1.5">
          <span className="font-semibold text-foreground/80">{formattedIndex}</span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Online</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span className="text-[11px] truncate">{project.displayDomain}</span>
        </div>

        <h3 className="text-sm font-semibold text-foreground group-hover:underline underline-offset-4 mb-1">
          {project.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2.5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 mt-1 transition-colors" aria-hidden="true" />
    </a>
  )
}

export const ProjectRow = ProjectCard
export const ProjectRowItem = ProjectCard
export type ProjectRowProps = ProjectCardProps
export type ProjectRowItemProps = ProjectCardProps
