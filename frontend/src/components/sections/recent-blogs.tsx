"use client"

import { Reveal } from '@/components/ui/reveal'
import { Blog } from '@/types'
import { ArrowUpRight, PenTool } from 'lucide-react'
import Link from 'next/link'

interface RecentBlogsProps {
    blogs: Blog[]
}

const BlogRow = ({ blog }: { blog: Blog }) => {
    return (
        <Link href={`/blog/${blog.slug}`} className="block group">
            <article className="flex flex-col md:flex-row gap-6 md:items-start py-8 border-b border-border/40 group-hover:bg-muted/30 transition-colors duration-300 px-6 -mx-6 rounded-lg">
                <div className="md:w-32 flex-shrink-0 pt-1">
                    <span className="text-sm font-mono text-muted-foreground/60 block">
                        {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>

                <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
                        {blog.excerpt}
                    </p>
                </div>

                <div className="md:w-12 flex justify-end pt-1">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
            </article>
        </Link>
    )
}

export const RecentBlogs = ({ blogs = [] }: RecentBlogsProps) => {
    // Determine which blogs to show.
    // Ensure we have at least a few items for the list to look good.
    // If we only have 1 (the real one), that's fine, but the list design scales better.
    const displayBlogs = blogs.length > 0 ? blogs.slice(0, 5) : []

    if (displayBlogs.length === 0) return null

    return (
        <section id="blogs" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <Reveal width="100%">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                <PenTool className="w-8 h-8 text-primary" />
                                Recent articles
                            </h2>
                            <p className="text-muted-foreground max-w-md">
                                Thoughts on software engineering, system design, and the technologies I use.
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                            Read all articles
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </Reveal>

                <div className="border-t border-border/40">
                    <Reveal delay={0.2}>
                        <div className="flex flex-col">
                            {displayBlogs.map(blog => (
                                <BlogRow key={blog.slug} blog={blog} />
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

