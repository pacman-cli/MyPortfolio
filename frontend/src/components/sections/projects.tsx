import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'
import { getFeaturedProjects } from '@/lib/projects'
import { ArrowRight, Folder, Github } from 'lucide-react'
import Link from 'next/link'
import { FaJava } from "react-icons/fa"
import { SiMysql, SiNextdotjs, SiSpringboot } from "react-icons/si"

const getProjectIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('next')) return <SiNextdotjs className="w-4 h-4" />
  if (t.includes('spring')) return <SiSpringboot className="w-4 h-4" />
  if (t.includes('mysql')) return <SiMysql className="w-4 h-4" />
  if (t.includes('java')) return <FaJava className="w-4 h-4" />
  return <Folder className="w-4 h-4" />
}

const ProjectSchema = ({ project }: { project: { name: string; description: string; demoUrl?: string; githubUrl?: string } }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.name,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "description": project.description,
    "url": project.demoUrl || project.githubUrl,
    "author": {
      "@type": "Person",
      "name": "MD Ashikur Rahman Puspo"
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const Projects = () => {
  const projects = getFeaturedProjects()

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <SectionDivider />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A curated selection of my key projects, demonstrating full-stack capabilities and continuous learning.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1}>
              <div className="bg-background rounded-2xl p-8 border border-border/50 hover:border-foreground/10 transition-colors group relative overflow-hidden">
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                    FEATURED
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-start gap-8">
                  <ProjectSchema project={project} />

                  <div className="flex items-start gap-6 md:w-5/12 w-full">
                    <div className={`p-4 rounded-2xl shrink-0 ${project.featured ? 'bg-blue-500/10 text-blue-600' : 'bg-muted text-muted-foreground'} group-hover:-translate-y-1 transition-transform duration-300`}>
                      <Folder className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 w-full flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border rounded-full text-xs font-medium hover:border-primary/30 transition-colors">
                          {getProjectIcon(tech)}
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="rounded-full" asChild>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" /> View Code
                          </Link>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
