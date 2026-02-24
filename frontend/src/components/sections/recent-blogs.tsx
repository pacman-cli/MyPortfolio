"use client"

import { Reveal } from '@/components/ui/reveal'
import { Blog } from '@/types'
import { ArrowUpRight, PenTool } from 'lucide-react'
import Link from 'next/link'

interface RecentBlogsProps {
    blogs: Blog[]
}

import Image from 'next/image'

const BlogRow = ({ blog }: { blog: Blog }) => {
    const isExternal = !!blog.externalUrl
    const Wrapper = isExternal ? 'a' : Link
    const href = isExternal ? blog.externalUrl! : `/blog/${blog.slug}`
    const target = isExternal ? '_blank' : undefined
    const rel = isExternal ? 'noopener noreferrer' : undefined

    return (
        <Wrapper href={href} target={target} rel={rel} className="block group">
            <article className="flex flex-col md:flex-row gap-6 md:items-start py-8 border-b border-border/40 group-hover:bg-muted/30 transition-colors duration-300 px-6 -mx-6 rounded-lg relative">

                {/* Mobile: Image at top, Desktop: Hidden */}
                {blog.imageUrl && (
                    <div className="md:hidden w-full aspect-video relative rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                        <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover" />
                    </div>
                )}

                {/* Left: Meta info */}
                <div className="md:w-32 flex-shrink-0 pt-1 flex md:flex-col justify-between md:justify-start items-center md:items-start">
                    <span suppressHydrationWarning className="text-sm font-mono text-muted-foreground/60 block">
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            timeZone: 'UTC',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                    {isExternal && (
                        <span className="inline-flex items-center gap-1 md:mt-2 text-[10px] font-medium text-blue-500 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-full">
                            LinkedIn
                        </span>
                    )}
                </div>

                {/* Middle: Content */}
                <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-6 md:pr-0">
                        {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
                        {blog.excerpt}
                    </p>
                </div>

                {/* Right: Desktop Image & Icon */}
                <div className="flex items-start gap-4 flex-shrink-0">
                    {blog.imageUrl && (
                        <div className="hidden md:block w-32 h-20 relative rounded-md overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                            <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover" />
                        </div>
                    )}
                    <div className="absolute top-8 right-6 md:static md:w-12 flex justify-end md:pt-1">
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                </div>

            </article>
        </Wrapper>
    )
}

export const RecentBlogs = ({ blogs = [] }: RecentBlogsProps) => {
    // Determine which blogs to show.
    // Ensure we have at least a few items for the list to look good.
    // If we only have 1 (the real one), that's fine, but the list design scales better.
    const displayBlogs = blogs.length > 0 ? blogs.slice(0, 5) : []

    if (displayBlogs.length === 0) return null

    return (
        <section id="blogs" className="py-16 md:py-24 bg-background relative overflow-hidden">
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

