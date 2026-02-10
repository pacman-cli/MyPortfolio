"use client"

import { Reveal } from '@/components/ui/reveal'
import { Blog } from '@/types'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

interface RecentBlogsProps {
    blogs: Blog[]
}

export const RecentBlogs = ({ blogs = [] }: RecentBlogsProps) => {
    // We only want to show the specific featured blog
    const featuredBlog = blogs.find(b => b.slug === 'microservices-spring-boot-architecture') || blogs[0]

    if (!featuredBlog) return null

    return (
        <section id="blogs" className="py-24 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <Reveal width="100%">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Latest Insights</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
                        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Deep dives into software architecture, engineering patterns, and lessons from building production systems.
                        </p>
                    </div>
                </Reveal>

                <div className="max-w-2xl mx-auto">
                    <Reveal delay={0.2}>
                        <Link href={`/blog/${featuredBlog.slug}`} className="block group">
                            <article className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                                <div className="p-6 md:p-10">
                                    {/* Meta Header */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground mb-6">
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            <Tag className="w-3.5 h-3.5" />
                                            Featured Guide
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredBlog.publishedAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            10 min read
                                        </span>
                                    </div>

                                    {/* Title & Excerpt */}
                                    <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-blue-500 transition-colors leading-tight">
                                        {featuredBlog.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        {featuredBlog.excerpt}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {featuredBlog.tags && (typeof featuredBlog.tags === 'string' ? featuredBlog.tags.split(',') : []).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 bg-secondary/50 border border-border/50 rounded-lg text-xs font-medium text-secondary-foreground"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                        Read Article
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                </div>

                                {/* Decorative Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </article>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

