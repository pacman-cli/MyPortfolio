import { Footer } from '@/components/footer'
import { BlogPostingSchema, BreadcrumbSchema } from '@/components/seo/json-ld'
import { Alert } from '@/components/ui/alert'
import { BlogProgress } from '@/components/ui/blog-progress'
import { Button } from '@/components/ui/button'
import { getBlogBySlug, getBlogs } from '@/lib/api'
import { absoluteUrl } from '@/lib/site'
import { calculateReadTime } from '@/lib/utils'
import { constructMetadata } from '@/lib/seo'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import dynamic from 'next/dynamic'

type AlertType = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION'

const CodeBlock = dynamic(() => import('@/components/ui/code-block').then(mod => mod.CodeBlock))
const MermaidDiagram = dynamic(() => import('@/components/ui/mermaid-diagram').then(mod => mod.MermaidDiagram))

interface PageProps {
  params: Promise<{ slug: string }>
}

function HorizontalRule() {
  return (
    <div className="relative my-16" role="separator">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 text-muted-foreground/20 font-heading text-sm tracking-[0.3em] select-none">
          &#x2666; &#x2666; &#x2666;
        </span>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs
    .filter((b) => b.content)
    .map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) return { title: 'Blog Not Found' }

  const blogUrl = absoluteUrl(`/blog/${blog.slug}`)
  return constructMetadata({
    title: `${blog.title} | Ashikur Rahman Puspo`,
    description: blog.excerpt,
    url: blogUrl,
    type: 'article',
    publishedTime: blog.publishedAt,
    keywords: [
      ...blog.tags.split(',').map((t) => t.trim()),
      'Technical Blog',
      'Backend Engineering',
    ],
  })
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const wordCount = blog.content?.split(/\s+/).length || 0
  const readTime = blog.content ? calculateReadTime(blog.content) : 0

  const tags = typeof blog.tags === 'string' ? blog.tags.split(',').map(t => t.trim()) : []

  return (
    <main className="min-h-screen blog-bg selection:bg-blue-500/20">
      <BlogPostingSchema blog={blog} url={absoluteUrl(`/blog/${blog.slug}`)} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: blog.title, item: `/blog/${blog.slug}` },
        ]}
      />
      <BlogProgress />

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30 supports-[backdrop-filter]:bg-background/70">
        <div className="container max-w-4xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
          <span className="text-xs text-muted-foreground/60 hidden md:block truncate flex-1 text-right min-w-0 font-medium">
            {blog.title}
          </span>
        </div>
      </nav>

      <article className="container max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-16 md:pb-24">

      <header className="max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/8 text-primary text-xs font-semibold rounded-full border border-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading leading-[1.15] tracking-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span suppressHydrationWarning className="font-mono text-xs tracking-wide uppercase text-muted-foreground/70">
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="text-muted-foreground/30" aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime} min read
            </span>
            <span className="text-muted-foreground/30" aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {wordCount.toLocaleString()} words
            </span>
          </div>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-blog dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-0 max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ ...props }) => (
                  <h2
                    className="mt-14 mb-6 scroll-mt-24 text-foreground font-heading text-2xl md:text-3xl border-b border-border/15 pb-3"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="mt-10 mb-4 scroll-mt-24 text-foreground/90 font-heading text-xl md:text-2xl"
                    {...props}
                  />
                ),
                hr: () => <HorizontalRule />,
                blockquote: ({ children, ...props }) => {
                  const childrenArray = React.Children.toArray(children)
                  const firstChild = childrenArray[0]

                  const getAlertMatch = (text: string) => text.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s?/i)

                  if (React.isValidElement(firstChild)) {
                    const element = firstChild as React.ReactElement<{ children?: React.ReactNode }>
                    if (element.props.children) {
                      const pChildren = React.Children.toArray(element.props.children)
                      const firstText = pChildren[0]
                      if (typeof firstText === 'string') {
                        const match = getAlertMatch(firstText)
                        if (match) {
                          const type = match[1].toUpperCase()
                          const remainingText = firstText.replace(match[0], '')
                          const newPChildren = [...pChildren]
                          newPChildren[0] = remainingText
                          const newFirstChild = React.cloneElement(firstChild as React.ReactElement, {}, newPChildren)
                          return (
                            <Alert type={type as AlertType} title={type}>
                              {[newFirstChild, ...childrenArray.slice(1)]}
                            </Alert>
                          )
                        }
                      }
                    }
                  }

                  if (typeof firstChild === 'string') {
                    const match = getAlertMatch(firstChild)
                    if (match) {
                      const type = match[1].toUpperCase()
                      const remainingText = firstChild.replace(match[0], '')
                      return (
                        <Alert type={type as AlertType} title={type}>
                          {remainingText}
                          {childrenArray.slice(1)}
                        </Alert>
                      )
                    }
                  }

                  return (
                    <blockquote
                      className="border-l-[3px] border-primary/30 pl-6 py-3 pr-4 my-8 bg-primary/[0.02] rounded-r-xl italic text-foreground/80 leading-relaxed"
                      {...props}
                    >
                      {children}
                    </blockquote>
                  )
                },
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-10 rounded-xl border border-border/40 shadow-sm bg-card/30">
                    <table className="w-full text-sm text-left" {...props} />
                  </div>
                ),
                thead: ({ ...props }) => (
                  <thead className="bg-muted/40 text-muted-foreground text-xs font-semibold uppercase tracking-wider" {...props} />
                ),
                th: ({ ...props }) => (
                  <th className="p-4 font-semibold border-b border-border/30 whitespace-nowrap" {...props} />
                ),
                td: ({ ...props }) => (
                  <td className="p-4 border-b border-border/10 last:border-0 align-top" {...props} />
                ),
                tr: ({ ...props }) => (
                  <tr className="hover:bg-muted/10 transition-colors even:bg-muted/[0.03]" {...props} />
                ),
                pre: ({ children }) => <>{children}</>,
                code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
                  const match = /language-(\w+)/.exec(className || '')
                  const isInline = !match && !String(children).includes('\n')

                  if (isInline) {
                    return (
                      <code
                        className="bg-muted/40 rounded-md px-1.5 py-0.5 text-sm font-mono text-[var(--inline-code)] border border-border/20"
                        style={{ '--inline-code': 'hsl(var(--primary))' } as React.CSSProperties}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }

                  if (match && match[1] === 'mermaid') {
                    return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
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
        </div>

        <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-border/30">
          <div className="glass rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">Enjoyed this article?</h3>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto leading-relaxed">
              Check out my projects or get in touch if you&apos;d like to discuss backend engineering, system design, or collaboration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/#projects">View Projects</Link>
              </Button>
              <Button asChild className="rounded-xl">
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
