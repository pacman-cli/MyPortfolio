import { BreadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/footer'
import { getBlogs } from '@/lib/api'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { constructMetadata } from '@/lib/seo'
import { calculateReadTime } from '@/lib/utils'
import { BookOpen } from 'lucide-react'
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
    <main className="min-h-screen bg-background">
      <JsonLd data={blogPageJsonLd} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
        ]}
      />
      <div className="container mx-auto px-6 max-w-4xl pt-28 pb-20">
        {/* Header */}
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10" />

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 shrink-0">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
                  Blog
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
                Technical articles on backend engineering, system design, and software architecture.
              </p>
              <p className="mt-3 text-xs text-muted-foreground/50 font-mono">
                {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} &middot; ~{totalReadTime} min total reading
              </p>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <BlogList blogs={blogs} />

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-muted-foreground text-sm">
            More articles coming soon. Follow me on{' '}
            <Link
              href="https://www.linkedin.com/in/iampuspo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              LinkedIn
            </Link>{' '}
            for updates.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
