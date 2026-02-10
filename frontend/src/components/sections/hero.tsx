"use client"

import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { SiDocker, SiNextdotjs, SiSpringboot, SiX } from "react-icons/si"
import { HeroAvatar } from './hero-avatar'

export const Hero = () => {
    // Respect user's motion preferences for accessibility
    const prefersReducedMotion = useReducedMotion()

    // Animation variants that respect reduced motion
    const fadeInUp = {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        animate: { opacity: 1, y: 0 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08
            }
        }
    }

    const staggerItem = {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
        animate: { opacity: 1, y: 0 }
    }

    return (
        <section
            className="min-h-[100dvh] relative flex items-start lg:items-center justify-center overflow-hidden bg-[#F5F9F7] dark:bg-[#020817] pt-[80px] lg:pt-20 transition-colors duration-300"
            aria-labelledby="hero-heading"
        >
            {/* Background Atmosphere - Deep, Calm, Engineered */}
            <div className="absolute inset-0 w-full h-full overflow-visible -z-10">
                {/* 1. Ambient Glows - Very Subtle */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-gradient-to-br from-emerald-100/30 to-teal-100/30 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-full blur-[100px] lg:blur-[130px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-gradient-to-tr from-green-100/30 to-cyan-100/30 dark:from-green-900/10 dark:to-cyan-900/10 rounded-full blur-[100px] lg:blur-[130px]" />

                {/* 2. Circuit/Grid Pattern - Visually Weighting the Left Side */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-100 dark:opacity-80"
                    style={{
                        maskImage: 'radial-gradient(circle at 15% 40%, black 20%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle at 15% 40%, black 20%, transparent 70%)'
                    }}
                />
            </div>

            {/* Main Container */}
            <div className="container px-4 md:px-6 mx-auto relative z-10 w-full max-w-7xl">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">

                    {/* LEFT SIDE: Narrative & Story */}
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 md:space-y-8">

                        {/* 0. Status Badge - Monzim Style (Green Pill) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Available for opportunities
                        </motion.div>

                        {/* 1. Headline - Cleaner, Larger, Focused */}
                        <div className="space-y-4 relative w-full">
                            <motion.h1
                                id="hero-heading"
                                {...fadeInUp}
                                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                className="text-4xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
                            >
                                <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-500 dark:text-slate-400 mb-2">Hello, I&apos;m</span>
                                <span className="relative inline-block transition-colors duration-300 hover:text-emerald-500 cursor-default font-serif italic">
                                    Puspo
                                </span>
                            </motion.h1>
                            <motion.h2
                                {...fadeInUp}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-300"
                            >
                                Backend Engineer & <span className="text-emerald-600 dark:text-emerald-400">Software Developer</span>
                            </motion.h2>
                        </div>

                        {/* 2. Sub-headline */}
                        <motion.p
                            {...fadeInUp}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed mx-auto lg:mx-0"
                        >
                            Building scalable infrastructure and high-performance systems. Specializing in <strong className="text-slate-900 dark:text-slate-200">Spring Boot</strong> and cloud platforms like <strong className="text-slate-900 dark:text-slate-200">AWS</strong>.
                        </motion.p>

                        {/* 3. Tech Chips - Simplified */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="flex flex-wrap justify-center lg:justify-start gap-3"
                        >
                            <TechChip icon={<SiSpringboot />} label="Spring Boot" variants={staggerItem} />
                            <TechChip icon={<SiNextdotjs />} label="Next.js" variants={staggerItem} />
                            <TechChip icon={<SiDocker />} label="Cloud Native" variants={staggerItem} />
                        </motion.div>

                        {/* 4. CTAs - Primary Green, Secondary Outline */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
                        >
                            <Button
                                className="w-full sm:w-auto rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-12 px-8 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                                asChild
                            >
                                <Link href="#contact">Get in Touch</Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full sm:w-auto rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium h-12 px-8 transition-all hover:scale-105"
                                asChild
                            >
                                <Link href="#projects">View Projects</Link>
                            </Button>

                            <div className="flex gap-3 sm:ml-4 items-center mt-4 sm:mt-0">
                                <SocialLink href="https://github.com/pacman-cli" icon={<Github className="h-5 w-5" />} label="GitHub" />
                                <SocialLink href="https://www.linkedin.com/in/iampuspo/" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
                                <SocialLink href="https://x.com/iam_puspo" icon={<SiX className="h-4 w-4" />} label="X" />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: System Architecture Optimization */}
                    <div className="relative w-full flex justify-center items-center">
                        {/* Responsive scaling for mobile to ensure panel fits */}
                        <div className="w-full flex justify-center items-center scale-100 sm:scale-100 md:scale-100 lg:scale-100 xl:scale-110 transition-transform duration-500 origin-center pl-0 lg:pl-10 pt-0 sm:pt-0">
                            <HeroAvatar />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

// ===== Helper Components with Proper TypeScript Types =====

interface TechChipProps {
    icon: React.ReactNode
    label: string
    variants?: {
        initial?: { opacity?: number; y?: number }
        animate?: { opacity?: number; y?: number }
    }
}

const TechChip = ({ icon, label, variants }: TechChipProps) => (
    <motion.div
        variants={variants}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-full text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default whitespace-nowrap"
    >
        <span className="text-base sm:text-lg">{icon}</span>
        {label}
    </motion.div>
)

interface SocialLinkProps {
    href: string
    icon: React.ReactNode
    label: string
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-3 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-full transition-all duration-200 hover:scale-110 hover:-rotate-6 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
    >
        {icon}
    </Link>
)



