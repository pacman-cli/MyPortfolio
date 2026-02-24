"use client"

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { ArrowRight, Folder, Github } from 'lucide-react'
import Link from 'next/link'
import { FaJava } from "react-icons/fa"
import { SiMysql, SiNextdotjs, SiSpringboot } from "react-icons/si"

// Project Type Definition
interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
}

// Hardcoded Selected Projects
const SELECTED_PROJECTS: Project[] = [
  {
    title: "Expense Tracker",
    description: "Track daily expenses efficiently with detailed analytics and categorization. Features a robust backend and intuitive frontend for seamless financial monitoring.",
    techStack: ["Next.js", "Spring Boot", "MySQL"],
    githubUrl: "https://github.com/pacman-cli/expense-tracker",
  },
  {
    title: "TakaTrack",
    description: "A comprehensive personal finance management web application. empowering users to track income, expenses, and savings goals with real-time visualizations.",
    techStack: ["Next.js", "Spring Boot", "MySQL"],
    githubUrl: "https://takatrack.puspo.online/",
    featured: true
  },
  {
    title: "Java Learning",
    description: "A comprehensive repository of Java learning projects, exercises, and examples. Covers core concepts, algorithms, and advanced object-oriented programming patterns.",
    techStack: ["Java", "OOP", "Algorithms"],
    githubUrl: "https://github.com/pacman-cli/Java-Learning",
  }
]

const getProjectIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('next')) return <SiNextdotjs className="w-4 h-4" />
  if (t.includes('spring')) return <SiSpringboot className="w-4 h-4" />
  if (t.includes('mysql')) return <SiMysql className="w-4 h-4" />
  if (t.includes('java')) return <FaJava className="w-4 h-4" />
  return <Folder className="w-4 h-4" />
}

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A curated selection of my key projects, demonstrating full-stack capabilities and continuous learning.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6 max-w-5xl mx-auto">
          {SELECTED_PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <div className="bg-background rounded-2xl p-8 border border-border/50 hover:border-blue-500/30 transition-colors group relative overflow-hidden">
                {/* Featured Badge Decoration */}
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                    FEATURED
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Left: Icon & Info */}
                  <div className="flex items-start gap-6 md:w-5/12 w-full">
                    <div className={`p-4 rounded-2xl shrink-0 ${project.featured ? 'bg-blue-500/10 text-blue-600' : 'bg-muted text-muted-foreground'} group-hover:scale-110 transition-transform duration-300`}>
                      <Folder className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Tech & Actions */}
                  <div className="flex-1 w-full flex flex-col gap-6">

                    {/* TakaTrack Live Preview (Conditional) */}
                    {project.title === 'TakaTrack' && (
                      <div className="w-full mb-2 group/preview relative">
                        {/* Desktop: Live Iframe Preview */}
                        <div className="hidden md:block w-full aspect-video rounded-xl overflow-hidden border border-border/50 bg-slate-100 dark:bg-slate-900 relative shadow-sm transition-all duration-500 group-hover/preview:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover/preview:scale-[1.05] group-hover/preview:border-blue-500/50 ease-out">

                          {/* Click Overlay - Enforces "Preview Only" feel & Opens New Tab */}
                          <a
                            href={project.demoUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-20 cursor-pointer"
                            aria-label="Open Live Demo"
                          />

                          {/* Loading Skeleton (Simulated via CSS or just background) */}
                          <iframe
                            src="https://takatrack.puspo.online/"
                            title="TakaTrack Live Preview"
                            className="w-full h-full object-cover pointer-events-none select-none"
                            loading="lazy"
                            tabIndex={-1}
                          />
                        </div>

                        {/* Mobile: Static Fallback with Call-to-Action */}
                        <div className="md:hidden w-full rounded-xl border border-border/50 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 text-center space-y-3">
                          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <SiSpringboot className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">Interactive Preview</h4>
                            <p className="text-xs text-muted-foreground">Tap to view the full application</p>
                          </div>
                          <Button size="sm" className="w-full rounded-full bg-blue-600" asChild>
                            <Link href={project.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                              View Live Project
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Pucks */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border rounded-full text-xs font-medium hover:border-primary/30 transition-colors">
                          {getProjectIcon(tech)}
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
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
