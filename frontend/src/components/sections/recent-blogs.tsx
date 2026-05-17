"use client"

import { Reveal } from '@/components/ui/reveal'
import { Blog } from '@/types'
import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { ArrowUpRight, PenTool } from 'lucide-react'
import Link from 'next/link'
import { BLUR_DATA_URL } from '@/lib/blur'
import Image from 'next/image'

interface RecentBlogsProps {
    blogs: Blog[]
}

const BlogRow = ({ blog, index }: { blog: Blog; index: number }) => {
    const isExternal = !!blog.externalUrl
    const Wrapper = isExternal ? 'a' : Link
    const href = isExternal ? blog.externalUrl! : `/blog/${blog.slug}`
    const target = isExternal ? '_blank' : undefined
    const rel = isExternal ? 'noopener noreferrer' : undefined

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.06,
                ...SPRING_FADE_UP,
            }}
            viewport={{ once: true, margin: '-30px' }}
        >
            <Wrapper href={href} target={target} rel={rel} className="block group">
                    <article className="relative glass glass-hover rounded-xl overflow-hidden">
                    <div className="accent-bar-left" />

                    <div className="flex flex-col md:flex-row gap-6 md:items-start p-6 relative">
                        {blog.imageUrl && (
                            <div className="md:hidden w-full aspect-video relative rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                                <Image
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    placeholder="blur"
                                    blurDataURL={BLUR_DATA_URL}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        )}

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

                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-6 md:pr-0">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
                                {blog.excerpt}
                            </p>
                        </div>

                        <div className="flex items-start gap-4 flex-shrink-0">
                            {blog.imageUrl && (
                                <div className="hidden md:block w-32 h-20 relative rounded-md overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                                    <Image
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        placeholder="blur"
                                        blurDataURL={BLUR_DATA_URL}
                                        sizes="128px"
                                    />
                                </div>
                            )}
                            <div className="absolute top-8 right-6 md:static md:w-12 flex justify-end md:pt-1">
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>
                        </div>
                    </div>
                </article>
            </Wrapper>
        </motion.div>
    )
}

export const RecentBlogs = ({ blogs = [] }: RecentBlogsProps) => {
    const displayBlogs = blogs.length > 0 ? blogs.slice(0, 5) : []

    if (displayBlogs.length === 0) return null

    return (
        <section id="blogs" className="py-16 md:py-20 bg-background relative overflow-hidden">
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

                <div className="space-y-4">
                    {displayBlogs.map((blog, index) => (
                        <BlogRow key={blog.slug} blog={blog} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
