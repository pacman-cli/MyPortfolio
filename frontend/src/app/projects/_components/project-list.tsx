import type { Project } from '@/types'
import { ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className="p-5 rounded-lg border border-border bg-card/50 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-foreground/30 transition-colors"
        >
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                0{index + 1}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="text-base font-semibold text-foreground hover:underline underline-offset-4"
              >
                {project.name}
              </Link>
              {project.featured && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-muted text-muted-foreground">
                  Featured
                </span>
              )}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-1">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`GitHub repo for ${project.name}`}
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Live demo for ${project.name}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-mono text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Case Study &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
