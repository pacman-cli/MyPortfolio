"use client"

import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import { Download, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { SiDocker, SiMysql, SiNextdotjs, SiReact, SiSpringboot } from "react-icons/si"
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
            className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#F5F9F7] dark:bg-[#020817] pt-28 lg:pt-20 transition-colors duration-300"
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
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* LEFT SIDE: Narrative & Story */}
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 lg:space-y-10">

                        {/* 1. Headline - Framed & Glowing - Mobile Optimized */}
                        <div className="space-y-3 md:space-y-4 relative w-full">
                            {/* Subtle underlying glow for headline area */}
                            <div className="absolute -inset-x-8 -inset-y-8 bg-emerald-500/5 dark:bg-emerald-500/5 blur-3xl rounded-full opacity-50 pointer-events-none lg:block hidden" />

                            <motion.h1
                                id="hero-heading"
                                {...fadeInUp}
                                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                                className="relative text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100 leading-[1.15] sm:leading-[1.1] lg:leading-[1.1]"
                            >
                                <span className="block sm:inline">Designing & Engineering</span>
                                <span className="relative inline-block mt-1 lg:mt-0">
                                    {/* Text Highlights */}
                                    <span className="absolute -inset-2 bg-emerald-400/20 dark:bg-emerald-500/10 blur-xl rounded-full opacity-70" />
                                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 pb-1">
                                        Digital Systems
                                    </span>
                                </span>
                                <span className="block sm:inline"> That Perform.</span>
                            </motion.h1>
                        </div>

                        {/* 2. Sub-headline - Readable & Calm */}
                        <motion.p
                            {...fadeInUp}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0 px-2 sm:px-0"
                        >
                            I build secure, scalable, high-performance web applications from idea to production using modern architecture.
                        </motion.p>

                        {/* 3. Tech Chips - Staggered Animation */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-[300px] sm:max-w-none mx-auto lg:mx-0"
                        >
                            <TechChip icon={<SiNextdotjs />} label="Next.js" variants={staggerItem} />
                            <TechChip icon={<SiReact />} label="React" variants={staggerItem} />
                            <TechChip icon={<SiSpringboot />} label="Spring Boot" variants={staggerItem} />
                            <TechChip icon={<SiDocker />} label="Docker" variants={staggerItem} />
                            <TechChip icon={<SiMysql />} label="MySQL" variants={staggerItem} />
                        </motion.div>

                        {/* 4. CTAs - Enhanced Hover Effects */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 pt-2 w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto rounded-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/30 h-12 sm:h-14 px-8 text-sm sm:text-base font-semibold"
                                asChild
                            >
                                <Link href="#projects">View Projects</Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto rounded-full bg-white dark:bg-[#0A120F] border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] h-12 sm:h-14 px-8 font-semibold"
                                asChild
                            >
                                <Link href="https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ" target="_blank">
                                    <Download className="mr-2 h-4 w-4" /> Resume
                                </Link>
                            </Button>

                            <div className="flex gap-4 sm:ml-4 sm:border-l sm:pl-6 border-slate-200 dark:border-slate-800 mt-2 sm:mt-0 items-center justify-center w-full sm:w-auto">
                                <SocialLink href="https://github.com/pacman-cli" icon={<Github className="h-5 w-5" />} label="GitHub Profile" />
                                <SocialLink href="https://www.linkedin.com/in/iampuspo/" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn Profile" />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: System Architecture Optimization */}
                    <div className="relative w-full flex justify-center items-center">
                        {/* Responsive scaling for mobile to ensure panel fits */}
                        <div className="w-full flex justify-center items-center scale-100 sm:scale-100 md:scale-100 lg:scale-100 xl:scale-110 transition-transform duration-500 origin-center pl-0 lg:pl-10 pt-10 sm:pt-0">
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
        className="p-2 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-full transition-all duration-200 hover:scale-110 hover:-rotate-6"
    >
        {icon}
    </Link>
)



