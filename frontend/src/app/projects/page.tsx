import { Footer } from '@/components/footer'
import { getProjects } from '@/lib/projects'
import { constructMetadata } from '@/lib/seo'
import { ArrowUpRight, Folder, Github } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FaJava } from 'react-icons/fa'
import { SiDocker, SiMysql, SiNextdotjs, SiPython, SiReact, SiSpringboot, SiTailwindcss, SiTypescript } from 'react-icons/si'

export const metadata: Metadata = constructMetadata({
  title: 'Projects | MD Ashikur Rahman Puspo',
  description:
    'Explore my portfolio of full-stack projects built with Spring Boot, Next.js, Docker, and MySQL. Each project includes architecture details, challenges, and results.',
  url: 'https://puspo.online/projects',
  keywords: [
    'Backend Developer Projects',
    'Spring Boot Projects',
    'Full Stack Portfolio',
    'Java Projects',
    'Next.js Projects',
    'System Design Projects',
    'API Development Portfolio',
  ],
})

function getTechIcon(tech: string) {
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

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-5xl pt-28 pb-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <Folder className="w-10 h-10 text-emerald-500" />
            All Projects
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A collection of projects reflecting my passion for backend architecture,
            full-stack engineering, and system design.
          </p>
        </div>

        {/* Project List */}
        <div className="border-t border-border/40">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="group border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 p-4 md:px-6 md:py-5 md:items-start">
                {/* Index */}
                <div className="w-12 pt-1">
                  <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-emerald-500 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors hover:underline"
                    >
                      {project.name}
                    </Link>
                    {project.featured && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-600 uppercase tracking-wide">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-muted-foreground/80 flex items-center gap-1.5"
                      >
                        {getTechIcon(tech)}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
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
                    className="text-sm font-medium text-muted-foreground hover:text-emerald-500 transition-colors"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
