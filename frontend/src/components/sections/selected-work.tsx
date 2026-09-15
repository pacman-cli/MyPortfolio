import type { Project } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export const SelectedWork = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Selected Work & Architecture
            </h2>
            <Link
              href="/projects"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              View all ({projects.length}) &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="p-5 rounded-lg border border-border bg-card/50 flex flex-col justify-between gap-4 hover:border-foreground/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                    <span>0{index + 1}</span>
                    {project.demoUrl ? (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground inline-flex items-center gap-1"
                      >
                        Live Demo <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span>Case Study</span>
                    )}
                  </div>

                  <Link href={`/projects/${project.slug}`} className="group">
                    <h3 className="text-base font-semibold text-foreground group-hover:underline underline-offset-4 mb-2">
                      {project.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
