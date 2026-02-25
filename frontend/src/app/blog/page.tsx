import { Footer } from '@/components/footer'
import { getBlogs } from '@/lib/api'
import { constructMetadata } from '@/lib/seo'
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = constructMetadata({
  title: 'Blog | MD Ashikur Rahman Puspo — Technical Articles',
  description:
    'Read technical blog posts by MD Ashikur Rahman Puspo on Backend Engineering, Spring Boot, System Design, Microservices, Docker, and Cloud Architecture.',
  url: 'https://puspo.online/blog',
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

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-4xl pt-28 pb-20">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-500" />
            Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Technical articles on backend engineering, system design, and software
            architecture.
          </p>
        </div>

        {/* Blog List */}
        <div className="space-y-1 border-t border-border/40">
          {blogs.map((blog) => {
            const readTime = blog.content
              ? Math.ceil(blog.content.split(/\s+/).length / 200)
              : 3

            return (
              <article
                key={blog.id}
                className="group border-b border-border/40 hover:bg-muted/30 transition-colors"
              >
                <Link
                  href={
                    blog.content
                      ? `/blog/${blog.slug}`
                      : blog.externalUrl || '#'
                  }
                  {...(!blog.content && blog.externalUrl
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="block p-5 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <h2 className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {readTime} min read
                        </span>
                        <span
                          className="text-xs text-muted-foreground"
                          suppressHydrationWarning
                        >
                          {new Date(blog.publishedAt).toLocaleDateString(
                            'en-US',
                            {
                              timeZone: 'UTC',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                        {blog.tags && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Tag className="w-3.5 h-3.5" />
                            {blog.tags
                              .split(',')
                              .slice(0, 3)
                              .map((t) => t.trim())
                              .join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground group-hover:text-blue-500 transition-colors shrink-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            More articles coming soon. Follow me on{' '}
            <Link
              href="https://www.linkedin.com/in/iampuspo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
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
