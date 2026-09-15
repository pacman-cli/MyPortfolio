import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { getBlogs } from '@/lib/api'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import { calculateReadTime } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogList } from './_components/blog-list'

export const metadata: Metadata = constructMetadata({
  title: 'Blog | MD Ashikur Rahman Puspo — Technical Articles',
  description: 'Read technical blog posts by MD Ashikur Rahman Puspo on Backend Engineering, Spring Boot, System Design, Microservices, and Cloud Architecture.',
  url: absoluteUrl('/blog'),
})

export default async function BlogPage() {
  const blogs = await getBlogs()
  const totalReadTime = blogs.reduce((acc, b) => {
    return acc + (b.content ? calculateReadTime(b.content) : 3)
  }, 0)

  const blogPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/blog')}#webpage`,
    url: absoluteUrl('/blog'),
    name: 'Blog | MD Ashikur Rahman Puspo',
    description: 'Technical articles, guides, and external posts by MD Ashikur Rahman Puspo.',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: blog.title,
        url: blog.content ? absoluteUrl(`/blog/${blog.slug}`) : blog.externalUrl,
      })),
    },
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16">
      <JsonLd data={blogPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-b border-border/80 pb-6 mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Writing Index
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Technical Articles
          </h1>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} &middot; ~{totalReadTime} min total reading
          </p>
        </div>

        <BlogList blogs={blogs} />

        <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center">
          More articles coming soon. Follow on{' '}
          <Link
            href="https://www.linkedin.com/in/iampuspo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            LinkedIn
          </Link>{' '}
          for updates.
        </div>
      </div>
      <Footer />
    </main>
  )
}
