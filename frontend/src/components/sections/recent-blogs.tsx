'use client'

import React, { useState, useRef, useCallback } from 'react'
import type { Blog } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import {
  CursorFloatingPreview,
  type PreviewItem,
} from '@/components/showcase/cursor-floating-preview'

interface RecentBlogsProps {
  blogs: Blog[]
}

export const RecentBlogs: React.FC<RecentBlogsProps> = ({ blogs = [] }) => {
  const displayBlogs = blogs.length > 0 ? blogs.slice(0, 5) : []

  const [hoveredTarget, setHoveredTarget] = useState<PreviewItem | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(
    (blog: Blog, e: React.MouseEvent) => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      const x = e.clientX
      const y = e.clientY
      setCursorPosition({ x, y })

      const isExternal = Boolean(blog.externalUrl)
      const url = isExternal ? blog.externalUrl! : `/blog/${blog.slug}`
      let domain = 'puspo.online'
      if (isExternal) {
        try {
          domain = new URL(url).hostname
        } catch {
          domain = 'external'
        }
      }

      const item: PreviewItem = {
        id: blog.slug,
        title: blog.title,
        shortTitle: blog.title,
        description: blog.excerpt,
        url,
        displayDomain: domain,
        canEmbed: !isExternal,
      }

      hoverTimerRef.current = setTimeout(() => {
        setHoveredTarget(item)
      }, 200)
    },
    []
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setHoveredTarget(null)
  }, [])

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
              const isExternal = Boolean(blog.externalUrl)
              const href = isExternal ? blog.externalUrl! : `/blog/${blog.slug}`
              const target = isExternal ? '_blank' : undefined
              const rel = isExternal ? 'noopener noreferrer' : undefined

              return (
                <Link
                  key={blog.slug}
                  href={href}
                  target={target}
                  rel={rel}
                  data-testid={`blog-row-${blog.slug}`}
                  onMouseEnter={(e) => handleMouseEnter(blog, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="p-4 rounded-lg border border-border bg-card/50 flex items-start justify-between gap-4 hover:border-foreground/30 transition-colors group block cursor-pointer"
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

      {/* Floating live preview following cursor */}
      <CursorFloatingPreview
        target={hoveredTarget}
        cursorPosition={cursorPosition}
        isVisible={Boolean(hoveredTarget)}
      />
    </section>
  )
}
