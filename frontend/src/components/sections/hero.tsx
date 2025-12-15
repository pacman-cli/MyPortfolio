"use client";

import { motion } from 'framer-motion';
import { Download, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Reveal } from '@/components/ui/reveal';

export const Hero = () => {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
  
        <div className="container mx-auto px-6 text-center relative z-10">
            <Reveal width="100%">
              <h2 className="text-sm md:text-base font-semibold text-primary mb-4 tracking-wider uppercase">
                  CSE Student & Full-Stack Developer
              </h2>
            </Reveal>

            <Reveal width="100%" delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Building <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Digital Excellence</span>
              </h1>
            </Reveal>
            
            <Reveal width="100%" delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                I transform complex problems into elegant, scalable solutions using modern technologies like Next.js and Spring Boot.
              </p>
            </Reveal>
  
            <Reveal width="100%" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 text-lg h-12" asChild>
                    <Link href="#projects">
                        View Projects <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-12" asChild>
                    <Link href="/blog">
                        Read Blogs <BookOpen className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full px-8 text-lg h-12">
                  Download Resume <Download className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Reveal>
        </div>
      </section>
    );
  };
