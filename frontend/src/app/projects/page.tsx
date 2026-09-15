import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { getProjects } from '@/lib/projects'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { ProjectList } from './_components/project-list'

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
        <div className="border-b border-border/80 pb-6 mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Project Index
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Projects & Architecture
          </h1>
          <p className="text-xs text-muted-foreground mt-2">
            Full-stack systems, high-concurrency microservices, and distributed cloud applications.
          </p>
        </div>

        <ProjectList projects={projects} />
      </div>
      <Footer />
    </main>
  )
}
