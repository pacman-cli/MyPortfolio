import { ArrowUpRight } from 'lucide-react'
import type { Blog } from '@/types'
import { calculateReadTime } from '@/lib/utils'
import Link from 'next/link'

export const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="space-y-3">
      {blogs.map((blog) => {
        const readTime = blog.content ? calculateReadTime(blog.content) : 3
        const tags = blog.tags ? blog.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
        const isExternal = !blog.content && !!blog.externalUrl

        return (
          <article key={blog.id}>
            <Link
              href={blog.content ? `/blog/${blog.slug}` : blog.externalUrl || '#'}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="p-5 rounded-lg border border-border bg-card/50 flex items-start justify-between gap-4 hover:border-foreground/30 transition-colors group block"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span suppressHydrationWarning>
                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      timeZone: 'UTC',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span>&middot;</span>
                  <span>{readTime} min read</span>
                  {isExternal && (
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      External
                    </span>
                  )}
                </div>

                <h2 className="text-base font-semibold text-foreground group-hover:underline underline-offset-4">
                  {blog.title}
                </h2>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0 mt-1 transition-colors" />
            </Link>
          </article>
        )
      })}
    </div>
  )
}
