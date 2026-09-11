import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { getProjects } from '@/lib/projects'
import { constructMetadata } from '@/lib/seo'
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20">
      <JsonLd data={projectsPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Projects', item: '/projects' },
        ]}
      />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Showcase
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 mb-3">
            All Projects
          </h1>
          <p className="text-zinc-400 max-w-xl text-base leading-relaxed">
            Full-stack architectures, high-concurrency backends, and cloud engineering solutions.
          </p>
        </div>

        {/* Project List */}
        <ProjectList projects={projects} />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
