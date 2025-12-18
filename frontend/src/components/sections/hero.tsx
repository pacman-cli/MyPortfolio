"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Download, Github, Linkedin, Database, Server, Smartphone, Cloud, ArrowDown, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SiNextdotjs, SiReact, SiSpringboot, SiDocker, SiMysql } from "react-icons/si";
import { Reveal } from '@/components/ui/reveal';

export const Hero = () => {
    // Respect user's motion preferences for accessibility
    const prefersReducedMotion = useReducedMotion();
    
    // Animation variants that respect reduced motion
    const fadeInUp = {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        animate: { opacity: 1, y: 0 }
    };
    
    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08
            }
        }
    };
    
    const staggerItem = {
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
        animate: { opacity: 1, y: 0 }
    };

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
                                <Link href="/resume.pdf" target="_blank">
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
                    <div className="relative w-full">
                        {/* 1. Mobile Vertical Stack (Visible < LG) */}
                        <div className="flex lg:hidden flex-col items-center gap-4 py-8 w-full max-w-[320px] mx-auto">
                             <MobileNode 
                                icon={<Smartphone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />} 
                                label="Frontend" 
                                tech="Next.js"
                                delay={0.2}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                            <div className="h-6 w-px bg-gradient-to-b from-slate-200 to-slate-200 dark:from-slate-800 dark:to-slate-800 relative">
                                <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-emerald-500" />
                            </div>
                            <MobileNode 
                                icon={<Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />} 
                                label="Backend API" 
                                tech="Spring Boot"
                                delay={0.4}
                                main
                                prefersReducedMotion={prefersReducedMotion}
                            />
                             <div className="h-6 w-px bg-gradient-to-b from-slate-200 to-slate-200 dark:from-slate-800 dark:to-slate-800 relative">
                                <ArrowDown className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                            </div>
                             <div className="flex gap-4 w-full justify-center">
                                <MobileNode 
                                    icon={<Database className="w-5 h-5 text-slate-600 dark:text-slate-400" />} 
                                    label="DB" 
                                    tech="MySQL"
                                    delay={0.6}
                                    small
                                    prefersReducedMotion={prefersReducedMotion}
                                />
                                <MobileNode 
                                    icon={<Cloud className="w-5 h-5 text-slate-600 dark:text-slate-400" />} 
                                    label="Cloud" 
                                    tech="Docker"
                                    delay={0.8}
                                    small
                                    prefersReducedMotion={prefersReducedMotion}
                                />
                            </div>
                        </div>

                        {/* 2. Desktop Floating Diagram (Visible >= LG) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block h-[600px] w-full"
                        >
                            {/* Interactive Architecture Diagram */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-[500px]">
                                    
                                    {/* Connection Lines (SVG) */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" role="presentation" aria-hidden="true">
                                        {/* Frontend to Backend */}
                                        <AnimatedLine x1="20%" y1="50%" x2="50%" y2="50%" delay={0} prefersReducedMotion={prefersReducedMotion} />
                                        {/* Backend to DB */}
                                        <AnimatedLine x1="50%" y1="50%" x2="80%" y2="30%" delay={1} prefersReducedMotion={prefersReducedMotion} />
                                        {/* Backend to Cloud */}
                                        <AnimatedLine x1="50%" y1="50%" x2="80%" y2="70%" delay={1.5} prefersReducedMotion={prefersReducedMotion} />
                                    </svg>

                                    {/* Nodes */}
                                    <ArchitectureNode 
                                        icon={<Smartphone className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />} 
                                        label="Frontend" 
                                        tech="Next.js"
                                        x="20%" y="50%" 
                                        delay={0.5}
                                        prefersReducedMotion={prefersReducedMotion}
                                    />

                                    <ArchitectureNode 
                                        icon={<Server className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />} 
                                        label="Backend API" 
                                        tech="Spring Boot"
                                        x="50%" y="50%" 
                                        delay={0.7}
                                        main
                                        prefersReducedMotion={prefersReducedMotion}
                                    />

                                    <ArchitectureNode 
                                        icon={<Database className="w-8 h-8 text-slate-600 dark:text-slate-400" />} 
                                        label="Database" 
                                        tech="MySQL / Redis"
                                        x="80%" y="30%" 
                                        delay={0.9}
                                        prefersReducedMotion={prefersReducedMotion}
                                    />

                                    <ArchitectureNode 
                                        icon={<Cloud className="w-8 h-8 text-slate-600 dark:text-slate-400" />} 
                                        label="Infrastructure" 
                                        tech="Docker / AWS"
                                        x="80%" y="70%" 
                                        delay={1.1}
                                        prefersReducedMotion={prefersReducedMotion}
                                    />

                                    {/* System Status - Green */}
                                    <motion.div 
                                        animate={prefersReducedMotion ? {} : { y: [-10, 10, -10] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-10 right-20 p-4 bg-white/60 dark:bg-slate-900/60 rounded-2xl shadow-xl shadow-emerald-500/5 border border-emerald-100/50 dark:border-emerald-900/30 backdrop-blur-md z-20"
                                    >
                                        <div className="flex gap-2 items-center text-xs font-bold text-slate-700 dark:text-slate-200">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
                                            <span>System Nominal</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Latency &lt; 50ms</div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// ===== Helper Components with Proper TypeScript Types =====

interface TechChipProps {
    icon: React.ReactNode;
    label: string;
    variants?: {
        initial?: { opacity?: number; y?: number };
        animate?: { opacity?: number; y?: number };
    };
}

const TechChip = ({ icon, label, variants }: TechChipProps) => (
    <motion.div 
        variants={variants}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-full text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default whitespace-nowrap"
    >
        <span className="text-base sm:text-lg">{icon}</span>
        {label}
    </motion.div>
);

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
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
);

interface MobileNodeProps {
    icon: React.ReactNode;
    label: string;
    tech: string;
    delay: number;
    main?: boolean;
    small?: boolean;
    prefersReducedMotion?: boolean | null;
}

const MobileNode = ({ icon, label, tech, delay, main = false, small = false, prefersReducedMotion }: MobileNodeProps) => (
    <motion.div 
         initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay }}
         className={`flex items-center gap-3 p-3 rounded-xl border bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm justify-center
             ${main ? 'border-emerald-200 dark:border-emerald-900 shadow-emerald-100 dark:shadow-emerald-900/20 w-48' : 'border-slate-100 dark:border-slate-800'}
             ${small ? 'w-36 text-xs' : 'w-48'}
         `}
    >
        <div className={`p-2 rounded-lg ${main ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-50 dark:bg-slate-800'}`}>
            {icon}
        </div>
        <div className="text-left">
            <div className={`font-bold ${small ? 'text-xs' : 'text-sm'} ${main ? 'text-emerald-900 dark:text-emerald-100' : 'text-slate-800 dark:text-slate-200'}`}>{label}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{tech}</div>
        </div>
    </motion.div>
);

interface ArchitectureNodeProps {
    icon: React.ReactNode;
    label: string;
    tech: string;
    x: string;
    y: string;
    delay: number;
    main?: boolean;
    prefersReducedMotion?: boolean | null;
}

const ArchitectureNode = ({ icon, label, tech, x, y, delay, main = false, prefersReducedMotion }: ArchitectureNodeProps) => (
    <motion.div 
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl border bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl flex flex-col items-center gap-2 z-10 w-40 text-center
            ${main ? 'border-emerald-500/30 dark:border-emerald-500/30 shadow-emerald-500/10 dark:shadow-emerald-900/40 scale-110' : 'border-slate-100 dark:border-slate-800 shadow-slate-200/50 dark:shadow-black/50'}
        `}
        style={{ left: x, top: y }}
    >
        <div className={`p-3 rounded-xl ${main ? 'bg-emerald-50 dark:bg-emerald-950/30 shadow-inner' : 'bg-slate-50 dark:bg-slate-800'}`}>
            {icon}
        </div>
        <div>
            <div className={`font-bold text-sm ${main ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>{label}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{tech}</div>
        </div>
    </motion.div>
);

interface AnimatedLineProps {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    delay: number;
    prefersReducedMotion?: boolean | null;
}

const AnimatedLine = ({ x1, y1, x2, y2, delay, prefersReducedMotion }: AnimatedLineProps) => {
    return (
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
        >
            {/* Base Line */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Moving Packet - Green Tone (only animate if motion allowed) */}
            {!prefersReducedMotion && (
                <motion.circle r="3" className="fill-emerald-400 dark:fill-emerald-500">
                    <animate 
                        attributeName="cx" 
                        from={x1} to={x2} 
                        dur="3s" 
                        repeatCount="indefinite"
                    />
                    <animate 
                        attributeName="cy" 
                        from={y1} to={y2} 
                        dur="3s" 
                        repeatCount="indefinite"
                    />
                </motion.circle>
            )}
        </motion.g>
    );
};

