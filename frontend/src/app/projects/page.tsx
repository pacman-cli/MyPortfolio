import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { getProjects } from '@/lib/projects'
import { constructMetadata } from '@/lib/seo'
import { Folder } from 'lucide-react'
import type { Metadata } from 'next'
import { ProjectList } from './_components/project-list'

export const metadata: Metadata = constructMetadata({
  title: 'Projects | MD Ashikur Rahman Puspo',
  description:
    'Explore my portfolio of full-stack projects built with Spring Boot, Next.js, Docker, and MySQL. Each project includes architecture details, challenges, and results.',
  url: absoluteUrl('/projects'),
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

export default function ProjectsPage() {
  const projects = getProjects()
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
    <main className="min-h-screen bg-background">
      <JsonLd data={projectsPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/projects' },
        ]}
      />
      <div className="container mx-auto px-6 max-w-5xl pt-28 pb-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <Folder className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
                  All Projects
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
                A collection of projects reflecting my passion for backend architecture, full-stack engineering, and system design.
              </p>
            </div>
          </div>
        </div>

        {/* Project List */}
        <ProjectList projects={projects} />
      </div>
      <Footer />
    </main>
  )
}
