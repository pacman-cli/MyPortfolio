import { Blog } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface RecentBlogsProps {
  blogs: Blog[]
}

export const RecentBlogs = ({ blogs = [] }: RecentBlogsProps) => {
  const displayBlogs = blogs.length > 0 ? blogs.slice(0, 5) : []

  if (displayBlogs.length === 0) return null

  return (
    <section id="blogs" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Technical Writing & Insights
            </h2>
            <Link
              href="/blog"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {displayBlogs.map((blog) => {
              const isExternal = !!blog.externalUrl
              const href = isExternal ? blog.externalUrl! : `/blog/${blog.slug}`
              const target = isExternal ? '_blank' : undefined
              const rel = isExternal ? 'noopener noreferrer' : undefined

              return (
                <Link
                  key={blog.slug}
                  href={href}
                  target={target}
                  rel={rel}
                  className="p-4 rounded-lg border border-border bg-card/50 flex items-start justify-between gap-4 hover:border-foreground/30 transition-colors group block"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-1">
                      <span suppressHydrationWarning>
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          timeZone: 'UTC',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {isExternal && (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          External
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-foreground group-hover:underline underline-offset-4 mb-1">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 mt-1 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
