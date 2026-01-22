"use client";

import { Reveal } from '@/components/ui/reveal';
import Image from 'next/image';
import { GraduationCap, Code2, Rocket, Zap, Calendar, Award } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
             {/* Photo Column - Order 1 on mobile (visual), but standard flow: Text then Photo? 
                 User request: "Photo moves above the text on small screens".
                 So Photo first in DOM for mobile, or use flex-col-reverse?
                 "Photo moves above text" -> Photo is top. So Photo DOM first.
             */}
            <div className="relative order-1 md:order-2">
               {/* Profile Image Container */}
              <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-card border-2 border-border/50 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="/profile.jpg" 
                  alt="MD. Ashikur Rahman PUSPO" 
                  width={500} 
                  height={600}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

              {/* Milestones / Stats - Optional clean visualization */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-xl border border-border/50 shadow-sm text-center">
                      <div className="text-2xl font-bold text-primary">2023</div>
                      <div className="text-xs text-muted-foreground">Started Journey</div>
                  </div>
                  <div className="p-4 bg-background rounded-xl border border-border/50 shadow-sm text-center">
                      <div className="text-2xl font-bold text-primary">10+</div>
                      <div className="text-xs text-muted-foreground">Projects Built</div>
                  </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-8 order-2 md:order-1">
              {/* Who I Am */}
              <Reveal delay={0.1}>
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-sm hover:border-blue-500/20 transition-colors">
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                              <GraduationCap className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold mb-2">The Scholar</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                  I’m a <span className="font-semibold text-foreground">Computer Science & Engineering student</span> at 
                                  <span className="text-primary font-medium"> United International University</span>, 
                                  driven by a passion for building clean, scalable, and efficient software systems.
                              </p>
                          </div>
                      </div>
                  </div>
              </Reveal>

              {/* What I Do */}
              <Reveal delay={0.2}>
                   <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-sm hover:border-cyan-500/20 transition-colors">
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl">
                              <Code2 className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold mb-2">The Builder</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                  I specialize in <span className="font-semibold text-foreground">Full-Stack Development</span> using 
                                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 font-bold"> Next.js</span>, 
                                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 font-bold"> Spring Boot</span>, and 
                                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-bold"> MySQL</span>. 
                                  I love solving complex problems and creating applications with real-world impact.
                              </p>
                          </div>
                      </div>
                  </div>
              </Reveal>

              {/* Mindset */}
              <Reveal delay={0.3}>
                   <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-sm hover:border-purple-500/20 transition-colors">
                      <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                              <Rocket className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold mb-2">The Visionary</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                  I’m constantly exploring technologies like <span className="font-medium text-foreground">Docker</span> and <span className="font-medium text-foreground">Cloud Architecture</span>. 
                                  My goal is to build software that is not only functional but also <span className="italic">elegant and user-friendly</span>.
                              </p>
                          </div>
                      </div>
                  </div>
              </Reveal>

              {/* Current Focus */}
              <Reveal delay={0.4}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 rounded-full border border-yellow-500/20 text-sm font-medium">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Current Focus: Advanced Data Structures & Microservices</span>
                  </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
