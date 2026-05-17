"use client"

import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'
import { BLUR_DATA_URL } from '@/lib/blur'
import { Code2, GraduationCap, Rocket, Zap } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUpVariant, SPRING_FADE_UP } from '@/lib/animations'

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">About Me</h2>
            <SectionDivider />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div className="relative order-1 md:order-2">
              <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-card border-2 border-border/30 shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/profile.jpg"
                  alt="MD Ashikur Rahman Puspo"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ...SPRING_FADE_UP }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-xl text-center"
                >
                  <div className="text-2xl font-bold text-primary">2023</div>
                  <div className="text-xs text-muted-foreground/60">Started Journey</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, ...SPRING_FADE_UP }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-xl text-center"
                >
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground/60">Projects Built</div>
                </motion.div>
              </div>
            </div>

            <div className="space-y-6 order-2 md:order-1">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6" />,
                  iconClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                  title: 'The Scholar',
                  content: <>I&apos;m a <span className="font-semibold text-foreground">Computer Science & Engineering student</span> at <span className="text-primary font-medium">United International University</span>, driven by a passion for building clean, scalable, and efficient software systems.</>,
                },
                {
                  icon: <Code2 className="w-6 h-6" />,
                  iconClass: 'bg-primary/10 text-primary',
                  title: 'The Builder',
                  content: <>I specialize in <span className="font-semibold text-foreground">Full-Stack Development</span> using <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 font-bold">Next.js</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 font-bold">Spring Boot</span>, and <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-bold">MySQL</span>. I love solving complex problems and creating applications with real-world impact.</>,
                },
                {
                  icon: <Rocket className="w-6 h-6" />,
                  iconClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                  title: 'The Visionary',
                  content: <>I&apos;m constantly exploring technologies like <span className="font-medium text-foreground">Docker</span> and <span className="font-medium text-foreground">Cloud Architecture</span>. My goal is to build software that is not only functional but also <span className="italic">elegant and user-friendly</span>.</>,
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariant}
                  custom={i}
                >
                  <div className="glass glass-hover rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${card.iconClass}`}>{card.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 tracking-tight">{card.title}</h3>
                        <p className="text-muted-foreground/80 leading-7">{card.content}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Reveal delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 text-sm font-medium">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Current Focus: Advanced Data Structures & Microservices</span>
                </div>
              </Reveal>

              <div className="pt-2">
                <a href="/about-me" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1">
                  Read full bio &rarr;
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
