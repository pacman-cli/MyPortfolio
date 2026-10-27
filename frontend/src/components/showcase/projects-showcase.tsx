import React from 'react'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'
import { ProjectCard } from './project-card'
import Link from 'next/link'
import { Layers } from 'lucide-react'

export const ProjectsShowcase: React.FC = () => {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Interactive Applications
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Interactive Projects Showcase
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                Hover over any card to launch an interactive live preview of the deployed production website.
              </p>
            </div>

            <Link
              href="/projects"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors shrink-0 inline-flex items-center gap-1"
            >
              View Case Studies & Architecture &rarr;
            </Link>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
