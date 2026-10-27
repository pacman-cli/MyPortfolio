'use client'

import React, { useState, useCallback } from 'react'
import { SHOWCASE_PROJECTS, type ShowcaseProject } from '@/data/showcase-projects'
import { ProjectCard } from './project-card'
import { CursorFloatingPreview } from './cursor-floating-preview'
import Link from 'next/link'

export const ProjectsShowcase: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleRowHover = useCallback((project: ShowcaseProject, e: React.MouseEvent) => {
    setActiveProject(project)
    setCursorPos({ x: e.clientX, y: e.clientY })
    setIsHovering(true)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleRowLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          {/* Header matching Technical Writing & Insights (RecentBlogs) */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Projects Showcase
            </h2>
            <Link
              href="/projects"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          {/* Space-y-3 vertical list of compact project rows */}
          <div className="space-y-3">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onHover={handleRowHover}
                onLeave={handleRowLeave}
                onMouseMove={handleMouseMove}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating preview following cursor on desktop */}
      <CursorFloatingPreview
        project={activeProject}
        cursorPosition={cursorPos}
        isVisible={isHovering}
      />
    </section>
  )
}
