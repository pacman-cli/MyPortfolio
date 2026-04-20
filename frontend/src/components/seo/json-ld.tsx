import { Blog, Project } from '@/types'
import { absoluteUrl, siteConfig } from '@/lib/site'

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>

/**
 * Renders a JSON-LD script tag for SEO structured data.
 * Use in Server Components to inject schema into <head>.
 */
export function JsonLd({ data }: { data: JsonLdValue }) {
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
      name: siteConfig.fullName,
      url: siteConfig.url,
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
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    keywords: blog.tags,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return <JsonLd data={data} />
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; item: string }>
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.item),
        })),
      }}
    />
  )
}
