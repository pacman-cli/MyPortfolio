'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import type { ShowcaseProject } from '@/data/showcase-projects'
import { BrowserWindow } from './browser-window'
import { LivePreviewIFrame } from './live-preview-iframe'
import { ArrowUpRight } from 'lucide-react'

export interface ProjectCardProps {
  project: ShowcaseProject
  index: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isActive, setIsActive] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      setIsActive(true)
    }, 200) // 200ms hover-intent delay
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    if (
      typeof document !== 'undefined' &&
      cardRef.current?.contains(document.activeElement)
    ) {
      return
    }
    setIsActive(false)
  }, [])

  const handleFocus = useCallback(() => {
    setIsActive(true)
  }, [])

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsActive(false)
    }
  }, [])

  const togglePreview = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`

  return (
    <article
      ref={cardRef}
      data-testid={`project-card-${project.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`group relative rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:shadow-xl hover:shadow-primary/5 ${
        isActive ? 'ring-1 ring-foreground/20' : ''
      }`}
    >
      <div>
        {/* Miniature Browser Frame */}
        <BrowserWindow
          project={project}
          isActive={isActive}
          onTogglePreview={togglePreview}
        >
          <LivePreviewIFrame project={project} isActive={isActive} />
        </BrowserWindow>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground/80">
                {formattedIndex}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] uppercase tracking-wider">
                Production
              </span>
            </span>

            <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online</span>
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 focus:outline-none"
            >
              {project.title}
            </a>
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Tech Badges & Live Site Action */}
      <div className="px-5 pb-5 pt-3 border-t border-border/60 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/40"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] font-mono text-muted-foreground">
            {project.displayDomain}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-foreground hover:text-primary transition-colors group/link"
            aria-label={`Visit ${project.title} live website in a new tab`}
          >
            <span>Visit Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
