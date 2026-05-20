import { Footer } from '@/components/footer'
import { BreadcrumbSchema, SoftwareSourceCodeSchema } from '@/components/seo/json-ld'
import { GithubBadge } from '@/components/ui/github-badge'
import { SectionReveal } from '@/components/ui/section-reveal'
import { absoluteUrl } from '@/lib/site'
import { getAllProjectSlugs, getProjectBySlug, getProjects } from '@/lib/projects'
import { constructMetadata } from '@/lib/seo'
import { ArrowLeft, ArrowUpRight, CheckCircle, Github, Lightbulb, Target, Wrench } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    if (projects.length > 0) {
      return projects.map((p) => ({ slug: p.slug }))
    }
  } catch {
    // fallback below
  }
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return constructMetadata({
    title: `${project.name} — Case Study | MD Ashikur Rahman Puspo`,
    description: project.longDescription || project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    keywords: [
      project.name,
      ...project.techStack,
      'Case Study',
      'Backend Project',
      'Full Stack Project',
    ],
  })
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const hasCaseStudy = project.problemStatement || project.challenges?.length

  return (
    <main className="min-h-screen bg-background">
      {/* JSON-LD Schema */}
      <SoftwareSourceCodeSchema project={project} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/projects' },
          { name: project.name, item: `/projects/${project.slug}` },
        ]}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-4xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
              aria-label={`View ${project.name} source code on GitHub`}
            >
              <Github className="w-4 h-4" />
              Source Code
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                aria-label={`View ${project.name} live demo`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </nav>

      <article className="container max-w-4xl mx-auto px-6 pt-10 md:pt-14 pb-12 md:pb-20">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="glass rounded-full px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            <span className="glass rounded-full px-3 py-1 text-xs font-medium capitalize">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {project.name}
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* GitHub Stats Badge */}
          <div className="mt-6">
            <Suspense fallback={<div className="h-10 w-64 animate-pulse bg-muted rounded-lg" />}>
              <GithubBadge repoUrl={project.githubUrl} />
            </Suspense>
          </div>
        </header>

        {hasCaseStudy ? (
          <div className="space-y-12">
            {/* Problem Statement */}
            {project.problemStatement && (
              <SectionReveal>
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
                    <Target className="w-6 h-6 text-red-500" />
                    Problem Statement
                  </h2>
                  <div className="glass border-red-500/10 rounded-xl p-6">
                    <p className="text-muted-foreground/80 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>
                </section>
              </SectionReveal>
            )}

            {/* Tech Stack */}
            <SectionReveal delay={0.1}>
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
                  <Wrench className="w-6 h-6 text-blue-500" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="glass rounded-lg px-4 py-2 text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </section>
            </SectionReveal>

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <SectionReveal delay={0.2}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    Challenges & Solutions
                  </h2>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, i) => (
                      <div key={i} className="glass rounded-xl p-6 space-y-3">
                        <div>
                          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Challenge {i + 1}</span>
                          <p className="text-foreground font-medium mt-1">{challenge}</p>
                        </div>
                        {project.solutions && project.solutions[i] && (
                          <div>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Solution</span>
                            <p className="text-muted-foreground/80 mt-1">{project.solutions[i]}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </SectionReveal>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <SectionReveal delay={0.3}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                    Results
                  </h2>
                  <div className="glass border-emerald-500/10 rounded-xl p-6">
                    <ul className="space-y-3">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground/80">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </SectionReveal>
            )}
          </div>
        ) : (
          /* Fallback for projects without case study content */
          <SectionReveal>
            <div className="text-center py-16 glass rounded-2xl">
              <p className="text-muted-foreground/80 mb-4">Detailed case study coming soon.</p>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
              >
                <Github className="w-4 h-4" />
                View Source Code
              </Link>
            </div>
          </SectionReveal>
        )}

        {/* Internal Linking CTA */}
        <SectionReveal delay={0.1}>
          <div className="mt-16 pt-8 border-t border-border/50">
            <div className="glass rounded-2xl p-8 text-center border-emerald-500/10">
              <h3 className="text-xl font-bold mb-2">Want to see more?</h3>
              <p className="text-muted-foreground/80 mb-6">
                Check out my other projects or read my technical blog posts.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                >
                  All Projects
                </Link>
                <Link
                  href="/#blogs"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
                >
                  Read Blog Posts
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </article>

      <Footer />
    </main>
  )
}
