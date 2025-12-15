"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, X, Tag, BookOpen } from 'lucide-react';
import axios from 'axios';
import { Blog } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export const RecentBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [visibleCount, setVisibleCount] = useState(3);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/v1/blogs');
                if (response.data && Array.isArray(response.data)) {
                    // Sort by newest
                    const sorted = response.data.sort((a: Blog, b: Blog) => 
                        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                    );
                    setBlogs(sorted);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };
        fetchBlogs();
    }, []);

    const loadMore = () => {
        setVisibleCount(prev => prev + 3);
    };



    return (
        <section id="blogs" className="py-20 bg-background relative">
             {/* Background Blob equivalent to styles in Skills */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <Reveal width="100%">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                            Technical deep dives, tutorials, and thoughts on software architecture.
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-6 max-w-5xl mx-auto mb-12">
                    {blogs.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-muted-foreground animate-pulse">Loading amazing insights...</p>
                        </div>
                    ) : (
                        blogs.slice(0, visibleCount).map((blog, index) => (
                            <Reveal key={blog.id} delay={index * 0.1}>
                                <div 
                                    className="bg-muted/30 rounded-2xl p-8 border border-border/50 hover:border-blue-500/30 transition-colors group cursor-pointer"
                                    onClick={() => setSelectedBlog(blog)}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {/* Icon & Title - Matches Skills Left Column */}
                                        <div className="flex items-center gap-4 md:w-1/3 w-full self-start">
                                                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shadow-sm shrink-0">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">
                                                    {blog.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(blog.publishedAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        5 min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content & Tags - Matches Skills Right Column */}
                                        <div className="flex-1 w-full">
                                            <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-none mb-4 leading-relaxed">
                                                {blog.excerpt}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    {blog.tags && (typeof blog.tags === 'string' ? blog.tags.split(',') : []).slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[10px] px-2.5 py-1 bg-background border border-border/50 rounded-full font-medium text-muted-foreground hover:border-primary/30 transition-colors">
                                                            #{tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                                <div className="flex items-center text-primary font-medium text-sm group-hover:underline whitespace-nowrap ml-4">
                                                    Read <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))
                    )}
                </div>
            </div>

            {/* Blog Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedBlog(null)}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-border/50 overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 md:p-8 border-b border-border/50 flex justify-between items-start bg-muted/20">
                                <div>
                                    <div className="flex gap-3 mb-4">
                                        {selectedBlog.tags && (typeof selectedBlog.tags === 'string' ? selectedBlog.tags.split(',') : []).map(tag => (
                                            <span key={tag} className="text-xs px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedBlog.title}</h2>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(selectedBlog.publishedAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            5 min read
                                        </span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={() => setSelectedBlog(null)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="p-6 md:p-8 overflow-y-auto prose dark:prose-invert max-w-none">
                                <ReactMarkdown>
                                    {selectedBlog.content}
                                </ReactMarkdown>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
