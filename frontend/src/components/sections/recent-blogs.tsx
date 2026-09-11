"use client"

import { Blog } from '@/types'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'

interface RecentBlogsProps {
    blogs: Blog[]
}

const BlogCard = memo(({ blog, index }: { blog: Blog; index: number }) => {
    const isExternal = !!blog.externalUrl
    const Wrapper = isExternal ? 'a' : Link
    const href = isExternal ? blog.externalUrl! : `/blog/${blog.slug}`
    const target = isExternal ? '_blank' : undefined
    const rel = isExternal ? 'noopener noreferrer' : undefined

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Wrapper href={href} target={target} rel={rel} className="block group">
                <article className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span suppressHydrationWarning className="text-xs font-mono text-zinc-500">
                                    {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                        timeZone: 'UTC',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                {isExternal && (
                                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-full">
                                        LinkedIn
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2 tracking-tight">
                                {blog.title}
                            </h3>

                            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                                {blog.excerpt}
                            </p>
                        </div>

                        <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                    </div>
                </article>
            </Wrapper>
        </motion.div>
    )
})
BlogCard.displayName = 'BlogCard'

export const RecentBlogs = ({ blogs = [] }: RecentBlogsProps) => {
    const displayBlogs = blogs.length > 0 ? blogs.slice(0, 5) : []

    if (displayBlogs.length === 0) return null

    return (
        <section id="blogs" className="py-24 md:py-32 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
                            Writing
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                            Recent Articles
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 group"
                    >
                        Read all articles
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {displayBlogs.map((blog, index) => (
                        <BlogCard key={blog.slug} blog={blog} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
