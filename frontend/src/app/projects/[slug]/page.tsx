import { Footer } from '@/components/footer'
import { BreadcrumbSchema, SoftwareSourceCodeSchema } from '@/components/seo/json-ld'
import { GithubBadge } from '@/components/ui/github-badge'
import { SectionReveal } from '@/components/ui/section-reveal'
import { absoluteUrl } from '@/lib/site'
import { getAllProjectSlugs, getProjectBySlug, getProjects } from '@/lib/projects'
import { getBlogBySlug } from '@/lib/api'
import { constructMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart,
  CheckCircle,
  Code,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Github,
  Home,
  Image as ImageIcon,
  Lightbulb,
  Moon,
  Package,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Target,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

const MermaidDiagram = dynamic(() => import('@/components/ui/mermaid-diagram').then(mod => mod.MermaidDiagram), { ssr: false })

function featureIcon(title: string): React.ReactNode {
  const t = title.toLowerCase()
  if (t.includes("expense") || t.includes("track")) return <Zap className="w-5 h-5" />
  if (t.includes("goal") || t.includes("target")) return <Target className="w-5 h-5" />
  if (t.includes("analytic") || t.includes("chart") || t.includes("dashboard") || t.includes("report")) return <BarChart className="w-5 h-5" />
  if (t.includes("device") || t.includes("sync")) return <Smartphone className="w-5 h-5" />
  if (t.includes("property") || t.includes("list")) return <Home className="w-5 h-5" />
  if (t.includes("auth") || t.includes("access") || t.includes("role")) return <Shield className="w-5 h-5" />
  if (t.includes("search") || t.includes("filter")) return <Search className="w-5 h-5" />
  if (t.includes("upload") || t.includes("image")) return <ImageIcon className="w-5 h-5" />
  if (t.includes("seo") || t.includes("dark") || t.includes("light") || t.includes("theme")) return <Moon className="w-5 h-5" />
  if (t.includes("blog") || t.includes("markdown")) return <FileText className="w-5 h-5" />
  if (t.includes("github")) return <Github className="w-5 h-5" />
  if (t.includes("cart") || t.includes("checkout")) return <ShoppingCart className="w-5 h-5" />
  if (t.includes("inventory") || t.includes("product")) return <Package className="w-5 h-5" />
  if (t.includes("java") || t.includes("core") || t.includes("pattern") || t.includes("algorithm")) return <Code className="w-5 h-5" />
  if (t.includes("data") || t.includes("structure")) return <Database className="w-5 h-5" />
  if (t.includes("concurrency") || t.includes("thread")) return <Cpu className="w-5 h-5" />
  if (t.includes("pipeline") || t.includes("process") || t.includes("etl")) return <GitBranch className="w-5 h-5" />
  if (t.includes("kpi") || t.includes("metric") || t.includes("trend")) return <TrendingUp className="w-5 h-5" />
  return <Zap className="w-5 h-5" />
}

function detectMermaid(text: string): boolean {
  return /^(graph |flowchart |sequenceDiagram |erDiagram |classDiagram |stateDiagram )/.test(text.trim())
}

const DIAGRAM_BORDER_COLORS: Record<string, string> = {
  purple: 'border-purple-500/10',
  sky: 'border-sky-500/10',
}

function DiagramSection({ title, icon, borderColor, content, delay }: { title: string; icon: ReactNode; borderColor: string; content: string; delay: number }) {
  return (
    <SectionReveal delay={delay}>
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
          {icon}
          {title}
        </h2>
        {detectMermaid(content) ? (
          <div className={cn("glass rounded-xl p-4 md:p-6 overflow-x-auto", borderColor)}>
            <MermaidDiagram chart={content} />
          </div>
        ) : (
          <div className={cn("glass rounded-xl p-6", borderColor)}>
            <p className="text-muted-foreground/80 leading-relaxed whitespace-pre-line font-mono text-sm">
              {content}
            </p>
          </div>
        )}
      </section>
    </SectionReveal>
  )
}

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

  const relatedBlogs = project.relatedBlogSlugs?.length
    ? (await Promise.all(project.relatedBlogSlugs.map(getBlogBySlug))).filter(Boolean)
    : []

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

          <div className="mt-6">
            <Suspense fallback={<div className="h-10 w-64 animate-pulse bg-muted rounded-lg" />}>
              <GithubBadge repoUrl={project.githubUrl} />
            </Suspense>
          </div>
        </header>

        {hasCaseStudy ? (
          <div className="space-y-12">
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

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <SectionReveal delay={0.1}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
                    <Zap className="w-6 h-6 text-amber-500" />
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.keyFeatures.map((feature, i) => (
                      <div key={i} className="glass rounded-xl p-5 space-y-2 border border-amber-500/10">
                        <div className="flex items-center gap-2 text-amber-500">
                          {featureIcon(feature.title)}
                          <h3 className="font-semibold text-sm">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </SectionReveal>
            )}

            {project.architecture && (
              <DiagramSection
                title="Architecture"
                icon={<GitBranch className="w-6 h-6 text-purple-500" />}
                borderColor={DIAGRAM_BORDER_COLORS.purple}
                content={project.architecture}
                delay={0.15}
              />
            )}

            {project.databaseDesign && (
              <DiagramSection
                title="Database Design"
                icon={<Database className="w-6 h-6 text-sky-500" />}
                borderColor={DIAGRAM_BORDER_COLORS.sky}
                content={project.databaseDesign}
                delay={0.2}
              />
            )}

            <SectionReveal delay={0.25}>
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

            {project.challenges && project.challenges.length > 0 && (
              <SectionReveal delay={0.3}>
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

            {project.results && project.results.length > 0 && (
              <SectionReveal delay={0.35}>
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

            {relatedBlogs.length > 0 && (
              <SectionReveal delay={0.4}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
                    <FileText className="w-6 h-6 text-indigo-500" />
                    Related Blog Posts
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedBlogs.map((blog) => (
                      <Link
                        key={blog!.slug}
                        href={`/blog/${blog!.slug}`}
                        className="glass rounded-xl p-5 space-y-2 border border-indigo-500/10 hover:border-indigo-500/30 transition-colors group"
                      >
                        <h3 className="font-semibold text-sm group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {blog!.title}
                        </h3>
                        <p className="text-xs text-muted-foreground/70 line-clamp-2">
                          {blog!.excerpt}
                        </p>
                        <span className="text-xs text-indigo-400 font-medium inline-flex items-center gap-1">
                          Read <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
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
