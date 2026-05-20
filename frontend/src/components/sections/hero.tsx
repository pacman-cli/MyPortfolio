"use client"

import { SocialHeroLinks } from '@/components/ui/social-links'
import { Button } from '@/components/ui/button'
import { AvailabilityBadge } from '@/components/ui/availability-badge'
import { ScrambleRole } from '@/components/ui/scramble-text'
import { ScrollProgressBar } from '@/components/ui/animations'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { SiDocker, SiNextdotjs, SiSpringboot } from "react-icons/si"
import { BLUR_DATA_URL } from '@/lib/blur'
import { ArrowRight, FolderGit2 } from 'lucide-react'

const HeroPortraitPanel = dynamic(
    () => import('./hero-portrait-panel').then(mod => mod.HeroPortraitPanel),
    { ssr: true, loading: () => (
        <div className="hidden md:block h-full min-h-[420px] rounded-[1.75rem] bg-emerald-500/5 animate-pulse lg:rounded-none" />
    ) }
)

export const Hero = () => {
    const prefersReducedMotion = useReducedMotion()

    return (
        <section
            className="relative min-h-[100svh] overflow-hidden bg-background pt-24 lg:pt-0"
            aria-labelledby="hero-heading"
        >
            {!prefersReducedMotion && <ScrollProgressBar />}

            {/* Background Atmosphere */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(45,212,191,0.08),transparent_30%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background)/0.94)_55%,hsl(var(--background))_100%)]" />
                <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />
                <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.028)_1px,transparent_1px)] bg-[size:36px_36px]"
                    style={{
                        maskImage: 'linear-gradient(90deg, black 0%, black 48%, transparent 78%)',
                        WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 48%, transparent 78%)'
                    }}
                />
                <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(currentColor_0.7px,transparent_0.7px)] [background-size:12px_12px] text-foreground" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
                <div className="grid min-h-[calc(100svh-6rem)] items-center gap-8 py-8 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.78fr)] md:gap-8 md:py-14 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-0 lg:py-0">

                    {/* Mobile Portrait — rendered before text on small screens */}
                    <div className="relative mx-auto h-[315px] w-full max-w-[430px] overflow-hidden rounded-[1.5rem] border border-emerald-400/15 bg-slate-950/40 shadow-2xl shadow-emerald-950/20 md:hidden">
                        <Image
                            src="/profile.jpg"
                            alt="MD Ashikur Rahman Puspo - Backend Developer"
                            fill
                            priority
                            className="object-cover object-[52%_45%]"
                            sizes="92vw"
                            quality={90}
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background)/0.82)_0%,transparent_46%),radial-gradient(circle_at_72%_24%,rgba(16,185,129,0.16),transparent_34%)]" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-emerald-100 backdrop-blur-md">
                            Backend systems + cloud delivery
                        </div>
                    </div>

                    {/* LEFT CONTENT */}
                    <div className="relative flex flex-col items-center justify-center text-center md:items-start md:text-left lg:col-span-7 lg:min-h-[100svh] lg:justify-center lg:pr-12 xl:pr-20">
                        <div className="absolute left-0 top-1/2 hidden h-[62vh] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-emerald-400/35 to-transparent lg:block" aria-hidden="true" />
                        <div className="w-full max-w-[680px] lg:pl-8 xl:pl-10">

                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mb-5 lg:mb-6"
                        >
                            <AvailabilityBadge label="1+ Years Experience" />
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="w-full mb-4"
                        >
                            <h1
                                id="hero-heading"
                                className="font-heading text-[2.55rem] font-black leading-[1.02] tracking-normal text-foreground sm:text-5xl md:text-[3.3rem] lg:text-[4.25rem] xl:text-[4.85rem]"
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    className="mb-3 block text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground sm:text-base lg:mb-4"
                                >
                                    Hello, I&apos;m
                                </motion.span>
                                <span className="mx-auto block max-w-[12ch] bg-[linear-gradient(115deg,hsl(var(--foreground))_0%,rgb(16,185,129)_44%,rgb(45,212,191)_100%)] bg-clip-text text-transparent drop-shadow-[0_18px_54px_rgba(16,185,129,0.16)] md:mx-0 md:max-w-[11ch]">
                                    MD Ashikur Rahman Puspo
                                </span>
                            </h1>
                        </motion.div>

                        {/* Role Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mb-5 w-full lg:mb-6"
                        >
                            <ScrambleRole />
                        </motion.div>

                        {/* Sub-headline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mb-6 max-w-[58ch] text-sm leading-7 text-muted-foreground sm:text-base lg:mb-7 lg:text-lg lg:leading-8"
                        >
                            Building scalable infrastructure and high-performance systems.
                            Specializing in <strong className="text-foreground font-semibold">Spring Boot</strong> and cloud platforms like <strong className="text-foreground font-semibold">AWS</strong>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mb-6 grid w-full max-w-[560px] grid-cols-3 overflow-hidden rounded-2xl border border-emerald-400/15 bg-background/55 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-slate-950/35 lg:mb-7"
                        >
                            <HeroMetric value="1+" label="Year Experience" />
                            <HeroMetric value="20+" label="Projects" />
                            <HeroMetric value="🇧🇩" label="Dhaka Based" />
                        </motion.div>

                        {/* Tech Chips */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mb-7 flex flex-wrap justify-center gap-2.5 md:justify-start lg:mb-8"
                        >
                            <TechChip icon={<SiSpringboot />} label="Spring Boot" delay={0.7} />
                            <TechChip icon={<SiNextdotjs />} label="Next.js" delay={0.75} />
                            <TechChip icon={<SiDocker />} label="Cloud Native" delay={0.8} />
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
                        >
                            <Button
                                className="group h-12 w-full min-w-[172px] rounded-full bg-emerald-500 px-7 font-semibold text-white shadow-[0_16px_38px_rgba(16,185,129,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_18px_45px_rgba(16,185,129,0.3)] focus-visible:ring-emerald-400 sm:w-auto"
                                asChild
                            >
                                <Link href="#contact">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-12 w-full min-w-[156px] rounded-full border-emerald-400/20 bg-background/55 px-6 font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/45 hover:bg-emerald-400/10 focus-visible:ring-emerald-400 sm:w-auto"
                                asChild
                            >
                                <Link href="#projects">
                                    <FolderGit2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                    View Projects
                                </Link>
                            </Button>

                            <SocialHeroLinks className="mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:ml-3 sm:mt-0 sm:justify-start" />
                        </motion.div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Portrait panel */}
                    <div className="relative hidden h-[min(680px,calc(100svh-8rem))] md:block lg:col-span-5 lg:h-full lg:min-h-[100svh]">
                        <HeroPortraitPanel />
                    </div>
                </div>
            </div>
        </section>
    )
}

const HeroMetric = React.memo(({ value, label }: { value: string; label: string }) => (
    <div className="border-r border-emerald-400/15 px-3 py-3 text-center last:border-r-0 md:px-4 md:text-left">
        <div className="font-heading text-lg font-black leading-none text-foreground sm:text-xl">{value}</div>
        <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.7rem]">
            {label}
        </div>
    </div>
))

const TechChip = ({ icon, label, delay = 0 }: {
    icon: ReactNode
    label: string
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex cursor-default items-center gap-2 rounded-full border border-emerald-400/15 bg-background/50 px-3.5 py-2 text-xs font-semibold text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-colors duration-200 hover:border-emerald-400/35 hover:text-foreground sm:text-sm"
    >
        <span className="text-base text-emerald-500 dark:text-emerald-400">{icon}</span>
        {label}
    </motion.div>
)
