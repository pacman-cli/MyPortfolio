"use client"

import { BLUR_DATA_URL } from '@/lib/blur'
import { Code2, GraduationCap, Rocket } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ABOUT_CARDS = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: 'The Scholar',
    content: 'Computer Science & Engineering student at United International University, focused on building clean, scalable, and efficient software systems.',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'The Builder',
    content: 'Full-Stack Developer specializing in Spring Boot, Next.js, and MySQL. Passionate about solving complex problems and creating high-impact applications.',
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: 'The Visionary',
    content: 'Exploring Docker, Cloud Architecture, and Microservices. Building software that is functional, elegant, and user-friendly.',
  },
]

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio Cards */}
          <div className="space-y-5 order-2 md:order-1">
            {ABOUT_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-1.5 tracking-tight">{card.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{card.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link
                href="/about-me"
                className="text-emerald-400 font-semibold text-sm hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
              >
                Read full bio &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Right: Portrait + Stats */}
          <div className="relative order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl"
            >
              <Image
                src="/profile.webp"
                alt="MD Ashikur Rahman Puspo"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className="text-2xl font-bold text-emerald-400">2023</div>
                <div className="text-xs text-zinc-500 mt-1">Started Journey</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className="text-2xl font-bold text-emerald-400">10+</div>
                <div className="text-xs text-zinc-500 mt-1">Projects Built</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
