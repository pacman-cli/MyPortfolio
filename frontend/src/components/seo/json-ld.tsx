import { Blog, Project } from '@/types'

/**
 * Renders a JSON-LD script tag for SEO structured data.
 * Use in Server Components to inject schema into <head>.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** SoftwareSourceCode schema for project pages */
export function SoftwareSourceCodeSchema({ project }: { project: Project }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    codeRepository: project.githubUrl,
    url: project.demoUrl || project.githubUrl,
    programmingLanguage: project.techStack,
    author: {
      '@type': 'Person',
      name: 'MD Ashikur Rahman Puspo',
      url: 'https://puspo.online',
    },
    ...(project.demoUrl && {
      targetProduct: {
        '@type': 'WebApplication',
        name: project.name,
        url: project.demoUrl,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Any',
      },
    }),
  }

  return <JsonLd data={data} />
}

/** BlogPosting schema for blog article pages */
export function BlogPostingSchema({ blog, url }: { blog: Blog; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    url,
    author: {
      '@type': 'Person',
      name: 'MD Ashikur Rahman Puspo',
      url: 'https://puspo.online',
    },
    publisher: {
      '@type': 'Person',
      name: 'MD Ashikur Rahman Puspo',
      url: 'https://puspo.online',
    },
    keywords: blog.tags,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return <JsonLd data={data} />
}
