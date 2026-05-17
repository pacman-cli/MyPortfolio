"use client"

import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { ArrowRight, Clock } from 'lucide-react'
import type { Blog } from '@/types'
import { calculateReadTime } from '@/lib/utils'
import Link from 'next/link'

const tagStyles: Record<string, string> = {
  java: 'bg-orange-100/80 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  spring: 'bg-green-100/80 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  docker: 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  microservices: 'bg-purple-100/80 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  javascript: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  react: 'bg-cyan-100/80 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  kubernetes: 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  python: 'bg-sky-100/80 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
}

const getTagStyle = (tag: string) => {
  const key = tag.trim().toLowerCase()
  return tagStyles[key] || 'bg-muted/70 text-muted-foreground'
}

export const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="space-y-4">
      {blogs.map((blog, index) => {
        const readTime = blog.content ? calculateReadTime(blog.content) : 3
        const tags = blog.tags ? blog.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
        const isExternal = !blog.content && !!blog.externalUrl

        return (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.06,
              ...SPRING_FADE_UP,
            }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <article className="group glass glass-hover rounded-xl overflow-hidden">
              <div className="accent-bar-left" />

              <Link
                href={blog.content ? `/blog/${blog.slug}` : blog.externalUrl || '#'}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block p-5 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-border/40 ${getTagStyle(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {index === 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                          Latest
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground/60">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {readTime} min read
                      </span>
                      <span suppressHydrationWarning>
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          timeZone: 'UTC',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 shrink-0 self-end md:self-center">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </article>
          </motion.div>
        )
      })}
    </div>
  )
}
