/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer } from '@/components/footer'
import { Alert } from '@/components/ui/alert'
import { BlogProgress } from '@/components/ui/blog-progress'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { getBlogBySlug } from '@/lib/api'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) return { title: 'Blog Not Found' }

  return {
    title: `${blog.title} | Puspo`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      authors: ['Puspo'],
      publishedTime: blog.publishedAt,
      tags: blog.tags?.split(',').map(tag => tag.trim())
    }
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  // Calculate read time (approximate)
  const wordCount = blog.content?.split(/\s+/).length || 0
  const readTime = Math.ceil(wordCount / 200)

  return (
    <main className="min-h-screen bg-background selection:bg-blue-500/30">
      <BlogProgress />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 supports-[backdrop-filter]:bg-background/90">
        <div className="container max-w-3xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#blogs"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <span className="text-sm font-medium text-muted-foreground hidden md:block truncate flex-1 text-right min-w-0">
            {blog.title}
          </span>
        </div>
      </nav>

      <article className="container max-w-3xl mx-auto px-6 py-12 md:py-20 pt-32 md:pt-40">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags && (typeof blog.tags === 'string' ? blog.tags.split(',') : []).map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-500/20"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={blog.publishedAt}>
                {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Technical Guide</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-img:rounded-xl prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-0 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node: _node, ...props }) => <h2 className="mt-12 mb-6 scroll-mt-24 text-primary" {...props} />,
              h3: ({ node: _node, ...props }) => <h3 className="mt-8 mb-4 scroll-mt-24 text-primary/90" {...props} />,
              blockquote: ({ node, className, children, ...props }) => {
                const firstChild = node?.children?.[0]
                if (
                  firstChild &&
                  firstChild.type === 'element' &&
                  firstChild.tagName === 'p' &&
                  firstChild.children?.[0]?.type === 'text'
                ) {
                  const textContent = firstChild.children[0].value
                  const match = textContent.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/)

                  if (match) {
                    const type = match[1] as any
                    return (
                      <Alert type={type} {...props}>
                        {children}
                      </Alert>
                    )
                  }
                }
                return (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-blue-500/5 py-2 pr-4 rounded-r-lg my-6" {...props}>
                    {children}
                  </blockquote>
                )
              },
              table: ({ node: _node, ...props }) => (
                <div className="overflow-x-auto my-8 border border-border/50 rounded-lg shadow-sm">
                  <table className="w-full text-sm text-left" {...props} />
                </div>
              ),
              thead: ({ node: _node, ...props }) => <thead className="bg-muted/50 text-muted-foreground" {...props} />,
              th: ({ node: _node, ...props }) => <th className="p-4 font-semibold border-b border-border/50 whitespace-nowrap" {...props} />,
              td: ({ node: _node, ...props }) => <td className="p-4 border-b border-border/10 last:border-0 align-top" {...props} />,
              tr: ({ node: _node, ...props }) => <tr className="hover:bg-muted/20 transition-colors" {...props} />,
              pre: ({ node: _node, children, ...props }) => <>{children}</>,
              code: ({ node: _node, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { node?: any }) => {
                const match = /language-(\w+)/.exec(className || '')
                const isInline = !match && !String(children).includes('\n')

                if (isInline) {
                  return (
                    <code className="bg-muted/50 rounded px-1.5 py-0.5 text-sm font-mono text-pink-500" {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    language={match ? match[1] : 'text'}
                    value={String(children).replace(/\n$/, '')}
                  />
                )
              }
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="bg-muted/30 rounded-2xl p-8 text-center border border-border/50">
            <h3 className="text-xl font-bold mb-2">Enjoyed this article?</h3>
            <p className="text-muted-foreground mb-6">Check out my other projects or get in touch.</p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/#projects">View Projects</Link>
              </Button>
              <Button asChild>
                <Link href="/#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
