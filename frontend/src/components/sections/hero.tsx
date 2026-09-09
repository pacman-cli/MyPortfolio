"use client"

import { SocialHeroLinks } from '@/components/ui/social-links'
import { Button } from '@/components/ui/button'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-28 pb-16 md:pt-36 md:pb-24"
            aria-labelledby="hero-heading"
        >
            {/* Soft Ambient Radial Spotlight */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full" />
                <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
                {/* Availability Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-8"
                >
                    <AvailabilityBadge label="Available for Backend & Full-Stack Roles" />
                </motion.div>

                {/* Giant Clear Statement Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <h1
                        id="hero-heading"
                        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.08]"
                    >
                        Building Scalable Backend Systems & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Modern Web Apps</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
                >
                    Hi, I&apos;m <strong className="text-zinc-200 font-semibold">MD Ashikur Rahman Puspo</strong>. I architect resilient Spring Boot microservices, high-performance APIs, and modern Next.js user interfaces.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02]"
                    >
                        <Link href="/#projects" className="flex items-center gap-2">
                            Explore Work <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full px-8 py-6 text-base transition-all duration-300"
                    >
                        <Link href="/#contact">
                            Get in Touch
                        </Link>
                    </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <SocialHeroLinks />
                </motion.div>
            </div>
        </section>
    )
}
