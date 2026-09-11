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
  description:
    'Read technical blog posts by MD Ashikur Rahman Puspo on Backend Engineering, Spring Boot, System Design, Microservices, Docker, and Cloud Architecture.',
  url: absoluteUrl('/blog'),
  keywords: [
    'Backend Engineering Blog',
    'Spring Boot Tutorial',
    'System Design Blog',
    'Java Developer Blog',
    'Microservices Architecture',
    'Technical Articles',
  ],
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20">
      <JsonLd data={blogPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Writing & Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 mb-3">
            Technical Articles
          </h1>
          <p className="text-zinc-400 max-w-xl text-base leading-relaxed">
            Articles on backend engineering, system design, and software architecture.
          </p>
          <p className="mt-3 text-xs text-zinc-500 font-mono">
            {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} &middot; ~{totalReadTime} min total reading
          </p>
        </div>

        {/* Blog List */}
        <BlogList blogs={blogs} />

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-zinc-800/80 text-center">
          <p className="text-zinc-500 text-sm">
            More articles coming soon. Follow me on{' '}
            <Link
              href="https://www.linkedin.com/in/iampuspo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-medium"
            >
              LinkedIn
            </Link>{' '}
            for updates.
          </p>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
