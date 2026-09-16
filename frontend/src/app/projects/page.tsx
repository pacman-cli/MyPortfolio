import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { getProjects } from '@/lib/projects'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { ProjectList } from './_components/project-list'
import { Cpu, Database, Layers, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = constructMetadata({
  title: 'Projects | MD Ashikur Rahman Puspo',
  description: 'Explore full-stack portfolio projects built with Spring Boot, Next.js, Docker, and MySQL, featuring architecture design and live demos.',
  url: absoluteUrl('/projects'),
})

export default async function ProjectsPage() {
  const projects = await getProjects()
  const projectsPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/projects')}#webpage`,
    url: absoluteUrl('/projects'),
    name: 'Projects | MD Ashikur Rahman Puspo',
    description: 'Portfolio case studies, demos, and source repositories by MD Ashikur Rahman Puspo.',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.name,
        url: absoluteUrl(`/projects/${project.slug}`),
      })),
    },
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16">
      <JsonLd data={projectsPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/projects' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6">
        <header className="border-b border-border/80 pb-6 mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Software Portfolio & Case Studies
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Projects & Systems Architecture
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
            A comprehensive showcase of production-grade microservices, RESTful APIs, distributed database applications, and full-stack web platforms engineered by MD Ashikur Rahman Puspo.
          </p>
        </header>

        {/* Server-rendered architectural principles summary */}
        <section className="grid sm:grid-cols-2 gap-4 mb-10 text-xs text-muted-foreground">
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Microservices Architecture</h3>
              <p className="leading-relaxed">
                Clean separation of concerns using Spring Boot, Eureka discovery, Spring Cloud API Gateway, and stateless JWT authentication.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex items-start gap-3">
            <Database className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Database & Query Tuning</h3>
              <p className="leading-relaxed">
                Optimized PostgreSQL and MySQL schema designs with strategic composite indexing, achieving 35–40% query latency reductions.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex items-start gap-3">
            <Layers className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Full-Stack Integration</h3>
              <p className="leading-relaxed">
                Next.js App Router frontends with server components, dynamic SEO schemas, Tailwind CSS styling, and responsive user interfaces.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-card/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">DevOps & Containerization</h3>
              <p className="leading-relaxed">
                Dockerized multi-container setups orchestrated via Docker Compose for consistent local development and cloud deployments.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="sr-only">Project Listing</h2>
          <ProjectList projects={projects} />
        </section>

        {/* Detailed architectural methodology note */}
        <section className="mt-16 pt-8 border-t border-border/60 text-xs text-muted-foreground space-y-4">
          <h3 className="text-sm font-semibold text-foreground tracking-tight">Engineering Methodology & Code Quality</h3>
          <p className="leading-relaxed">
            Every project listed above represents hands-on implementation of software design patterns including Singleton, Builder, Factory, and Observer patterns. Systems are designed with domain-driven boundaries, automated testing via Vitest and JUnit, and comprehensive error handling.
          </p>
          <p className="leading-relaxed">
            Click on any project card above to view the full technical case study — featuring problem statements, key feature breakdowns, Mermaid system architecture sequence diagrams, database ER schemas, and measurable performance results.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  )
}
