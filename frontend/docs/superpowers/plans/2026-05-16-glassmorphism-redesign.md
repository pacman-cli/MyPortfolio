# Glassmorphism & Animation Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply subtle glassmorphism cards, simplify animations, and refine typography across 7 targets (about section, certifications, featured projects, blog, projects page, about-me page, case study page).

**Architecture:** Add two utility classes to `globals.css`, then apply them consistently across 9 component files. Three new client components for pages that need scroll-triggered animations (project-list, about-content, section-reveal). No layout changes, no data model changes, no new packages.

**Tech Stack:** Tailwind CSS utility classes, framer-motion `whileInView`, Next.js App Router (server + client components)

---

### Task 1: Add glass utilities to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add .glass and .glass-hover utilities**

```css
/* Add after @keyframes float block, before @layer base */
.glass {
  background: hsl(var(--card) / 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid hsl(var(--border) / 0.3);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.04);
}

.glass-hover {
  transition: all 0.3s ease;
}
.glass-hover:hover {
  background: hsl(var(--card) / 0.6);
  border-color: hsl(var(--primary) / 0.2);
  box-shadow: 0 4px 12px 0 hsl(var(--primary) / 0.05);
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

---

### Task 2: Simplify About section — remove continuous animations, apply glass

**Files:**
- Modify: `src/components/sections/about.tsx`

- [ ] **Step 1: Replace entire file content**

```tsx
"use client"

import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'
import { BLUR_DATA_URL } from '@/lib/blur'
import { Code2, GraduationCap, Rocket, Zap } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 18,
    },
  },
}

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
            {/* Portrait Column */}
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

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: 'spring' as const, stiffness: 100, damping: 18 }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-xl text-center"
                >
                  <div className="text-2xl font-bold text-primary">2023</div>
                  <div className="text-xs text-muted-foreground/60">Started Journey</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, type: 'spring' as const, stiffness: 100, damping: 18 }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-xl text-center"
                >
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground/60">Projects Built</div>
                </motion.div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6 order-2 md:order-1">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6" />,
                  iconClass: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
                  title: "The Scholar",
                  content: <>I&apos;m a <span className="font-semibold text-foreground">Computer Science & Engineering student</span> at <span className="text-primary font-medium">United International University</span>, driven by a passion for building clean, scalable, and efficient software systems.</>
                },
                {
                  icon: <Code2 className="w-6 h-6" />,
                  iconClass: "bg-primary/10 text-primary",
                  title: "The Builder",
                  content: <>I specialize in <span className="font-semibold text-foreground">Full-Stack Development</span> using <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 font-bold">Next.js</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 font-bold">Spring Boot</span>, and <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 font-bold">MySQL</span>. I love solving complex problems and creating applications with real-world impact.</>
                },
                {
                  icon: <Rocket className="w-6 h-6" />,
                  iconClass: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
                  title: "The Visionary",
                  content: <>I&apos;m constantly exploring technologies like <span className="font-medium text-foreground">Docker</span> and <span className="font-medium text-foreground">Cloud Architecture</span>. My goal is to build software that is not only functional but also <span className="italic">elegant and user-friendly</span>.</>
                }
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

---

### Task 3: Redesign Certifications — remove GlowingEffect, apply glass

**Files:**
- Modify: `src/components/sections/certifications.tsx`

- [ ] **Step 1: Replace CertificationRow with glass card pattern**

Remove the `GlowingEffect` import and the outer glow wrapper. Replace the card inner div's `bg-background` with `glass glass-hover`. Add left accent bar.

```tsx
const CertificationRow = ({ cert, index }: { cert: Certification; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring' as const, stiffness: 100, damping: 18 }}
      viewport={{ once: true }}
      className="list-none group"
    >
      <div className="glass glass-hover rounded-xl overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-top" />
        <div className="flex flex-col md:flex-row gap-4 p-4 md:px-6 md:py-5 md:items-start">
          <div className="w-12 pt-1 hidden md:block">
            <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-primary transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-tight md:text-2xl md:leading-[1.875rem] text-foreground group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">
              {cert.issuer} &middot; Issued {cert.date}
            </p>
            {cert.skills && cert.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {cert.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-xs font-medium glass rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 md:pt-1 self-start md:self-auto mt-4 md:mt-0 relative z-10">
            <Link
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all flex items-center gap-2 group/btn"
              aria-label={`View ${cert.title} credential`}
            >
              <span className="text-sm font-medium pr-1 md:hidden">View Credential</span>
              <span className="text-sm font-medium pr-1 hidden md:inline-block opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover/btn:translate-x-0">View Credential</span>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.li>
  )
}
```

Also remove the unused `GlowingEffect` import at the top and remove the glow wrapper `<div>` from `CertificationRow` — the outer `motion.li` no longer needs the `rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3` wrapper div.

Remove these imports:
- `import { GlowingEffect } from '@/components/ui/glowing-effect'`

- [ ] **Step 2: Verify build**

Run: `npm run build`

---

### Task 4: Apply glass to SelectedWork + RecentBlogs

**Files:**
- Modify: `src/components/sections/selected-work.tsx`
- Modify: `src/components/sections/recent-blogs.tsx`

- [ ] **Step 1: In selected-work.tsx, replace hover bg with glass**

In the inner `.relative` div of `ProjectRow`, change:
```tsx
className="relative rounded-lg hover:bg-muted/30 transition-colors duration-300 overflow-hidden"
```
to:
```tsx
className="relative glass glass-hover rounded-xl overflow-hidden"
```

Remove the outer `border-b border-border/40 last:border-0` from the parent `motion.div`'s className — keep only `group relative transition-all duration-300 hover:shadow-sm hover:shadow-primary/5`.

- [ ] **Step 2: In recent-blogs.tsx, replace card bg with glass**

In the `BlogRow` component, find the article element:
```tsx
<article className="relative rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 transition-all duration-300 hover:shadow-sm hover:shadow-primary/5 hover:border-primary/20 overflow-hidden">
```

Replace with:
```tsx
<article className="relative glass glass-hover rounded-xl overflow-hidden">
```

- [ ] **Step 3: Verify build**

Run: `npm run build`

---

### Task 5: Apply glass to blog-list

**Files:**
- Modify: `src/app/blog/_components/blog-list.tsx`

- [ ] **Step 1: Replace card classes with glass**

Find the article element inside `BlogList`:
```tsx
<article className="group relative rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 overflow-hidden">
```

Replace with:
```tsx
<article className="group glass glass-hover rounded-xl overflow-hidden">
```

- [ ] **Step 2: Verify build**

Run: `npm run build`

---

### Task 6: Create project-list client component + update projects page

**Files:**
- Create: `src/app/projects/_components/project-list.tsx`
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Create _components directory**

```bash
mkdir -p src/app/projects/_components
```

- [ ] **Step 2: Create project-list.tsx**

```tsx
"use client"

import type { Project } from '@/types'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { FaJava } from 'react-icons/fa'
import { SiDocker, SiMysql, SiNextdotjs, SiPython, SiReact, SiSpringboot, SiTailwindcss, SiTypescript } from 'react-icons/si'

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('next')) return <SiNextdotjs className="w-3.5 h-3.5" />
  if (t.includes('react')) return <SiReact className="w-3.5 h-3.5" />
  if (t.includes('spring')) return <SiSpringboot className="w-3.5 h-3.5" />
  if (t.includes('mysql')) return <SiMysql className="w-3.5 h-3.5" />
  if (t.includes('docker')) return <SiDocker className="w-3.5 h-3.5" />
  if (t.includes('typescript')) return <SiTypescript className="w-3.5 h-3.5" />
  if (t.includes('tailwind')) return <SiTailwindcss className="w-3.5 h-3.5" />
  if (t.includes('python')) return <SiPython className="w-3.5 h-3.5" />
  if (t.includes('java') && !t.includes('javascript')) return <FaJava className="w-3.5 h-3.5" />
  return null
}

const techIconColors: Record<string, string> = {
  next: 'group-hover:text-white',
  react: 'group-hover:text-cyan-400',
  spring: 'group-hover:text-green-400',
  mysql: 'group-hover:text-blue-400',
  docker: 'group-hover:text-blue-500',
  typescript: 'group-hover:text-blue-500',
  tailwind: 'group-hover:text-cyan-400',
  python: 'group-hover:text-yellow-400',
  java: 'group-hover:text-orange-500',
}

const getTechIconColor = (tech: string) => {
  const t = tech.toLowerCase()
  for (const [key, val] of Object.entries(techIconColors)) {
    if (t.includes(key)) return val
  }
  return 'group-hover:text-foreground'
}

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </div>
  )
}

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring' as const, stiffness: 100, damping: 18 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="glass glass-hover rounded-xl overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-top" />

        <div className="flex flex-col md:flex-row gap-4 p-4 md:px-6 md:py-5 md:items-start">
          <div className="w-12 pt-1">
            <motion.span
              className="font-mono text-xs text-muted-foreground/40 group-hover:text-emerald-500 transition-colors inline-block"
              animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
              transition={{ type: 'spring' as const, stiffness: 200, damping: 12 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors hover:underline tracking-tight"
              >
                {project.name}
              </Link>
              {project.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-600 uppercase tracking-wide">
                  Featured
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs text-muted-foreground/60 flex items-center gap-1.5 transition-colors duration-300 ${getTechIconColor(tech)}`}
                >
                  <span className="transition-colors duration-300">{getTechIcon(tech)}</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:pt-1 self-start md:self-auto mt-4 md:mt-0">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              aria-label={`GitHub repo for ${project.name}`}
            >
              <Github className="w-5 h-5" />
            </Link>
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 rounded-full transition-all"
                aria-label={`Live demo for ${project.name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm font-medium text-muted-foreground hover:text-emerald-500 transition-colors whitespace-nowrap"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 3: Update projects/page.tsx**

Replace the entire `<div className="border-t border-border/40">...</div>` project list section. Remove that block and replace with:

```tsx
        {/* Project List */}
        <ProjectList projects={projects} />
```

Add the import at the top:
```tsx
import { ProjectList } from './_components/project-list'
```

Also update the header to add the icon container with glass:
```tsx
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <Folder className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
                  All Projects
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
                A collection of projects reflecting my passion for backend architecture, full-stack engineering, and system design.
              </p>
            </div>
          </div>
```

Remove the old inline project mapping code and the local `getTechIcon` function (now in the client component).

- [ ] **Step 4: Verify build**

Run: `npm run build`

---

### Task 7: Create about-content client component + update about-me page

**Files:**
- Create: `src/app/about-me/_components/about-content.tsx`
- Modify: `src/app/about-me/page.tsx`

- [ ] **Step 1: Create _components directory**

```bash
mkdir -p src/app/about-me/_components
```

- [ ] **Step 2: Create about-content.tsx**

```tsx
"use client"

import { motion } from 'framer-motion'

const sections = [
  {
    title: "Who is MD Ashikur Rahman Puspo?",
    content: [
      `I am MD Ashikur Rahman Puspo, a passionate Software Engineer and Backend Developer based in Dhaka, Bangladesh. Currently completing my degree in Computer Science & Engineering at United International University, I have dedicated myself to mastering the art of building robust, scalable digital systems.`,
      `My journey began with a curiosity for how things work under the hood. This led me to specialize as a Backend Developer, where I architect logic, manage databases, and ensure secure data flow for complex applications.`,
    ],
  },
  {
    title: "Professional Background",
    content: [
      `As a software engineer, I focus on creating high-performance systems using Spring Boot and modern cloud technologies. As a dedicated Spring Boot Developer, I build solutions that are not just functional but also maintainable and efficient.`,
      `I have experience integrating complex services, from payment gateways to real-time communication protocols. My work emphasizes Clean Architecture, Domain-Driven Design (DDD), and DevOps practices.`,
    ],
  },
  {
    title: "What I Do",
    list: [
      "Backend Development: Architecting RESTful APIs and Microservices as a Software Engineer and Spring Boot Developer.",
      "Database Management: Designing optimized schemas for PostgreSQL and MySQL.",
      "DevOps & Cloud: Deploying applications using Docker, Kubernetes, and AWS.",
      "System Design: focusing on scalability, security, and performance.",
    ],
  },
]

export const AboutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, type: 'spring' as const, stiffness: 100, damping: 18 }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="glass glass-hover rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-top" />
            <h2 className="text-2xl font-bold mb-4 text-foreground tracking-tight">{section.title}</h2>
            {section.content?.map((p, j) => (
              <p key={j} className="text-muted-foreground/80 leading-7 mb-4 last:mb-0">{p}</p>
            ))}
            {section.list && (
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground/80 leading-7">
                {section.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </>
  )
}
```

- [ ] **Step 3: Update about-me/page.tsx**

Replace the entire `<div className="md:col-span-2 space-y-8 ...">` block with:

```tsx
          {/* Main Text */}
          <div className="md:col-span-2 space-y-6">
            <AboutContent />
          </div>
```

Add import:
```tsx
import { AboutContent } from './_components/about-content'
```

Also update the sidebar connect card to use glass:
```tsx
            <div className="glass rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg tracking-tight">Connect</h3>
              <div className="flex flex-col gap-2.5">
                <a href="https://github.com/pacman-cli" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">GitHub</a>
                <a href="https://www.linkedin.com/in/iampuspo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">LinkedIn</a>
                <a href="https://leetcode.com/u/pacman-cli/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">LeetCode</a>
                <a href="https://www.instagram.com/iampuspoo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Instagram</a>
                <a href="https://www.facebook.com/pacman.puspo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Facebook</a>
                <a href="https://www.youtube.com/@springCraftDev" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">YouTube</a>
                <a href="https://x.com/iam_puspo" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">X (Twitter)</a>
                <a href="https://www.threads.net/@pacman.puspo" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Threads</a>
                <a href="mailto:puspopuspo520@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm">Email</a>
              </div>
            </div>
```

And update the image container:
```tsx
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-border/30 shadow-lg glass">
```

Remove the old inline HTML sections that are now in `AboutContent`.

- [ ] **Step 4: Verify build**

Run: `npm run build`

---

### Task 8: Enhance case study page — apply glass, add section reveal

**Files:**
- Create: `src/components/ui/section-reveal.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create section-reveal client component**

```tsx
"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export const SectionReveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring' as const, stiffness: 100, damping: 18 }}
    viewport={{ once: true, margin: '-40px' }}
    className={className}
  >
    {children}
  </motion.div>
)
```

- [ ] **Step 2: Update case study page**

Add import at top:
```tsx
import { SectionReveal } from '@/components/ui/section-reveal'
```

Replace section wrappers with glass:

Problem statement block:
```tsx
{project.problemStatement && (
  <SectionReveal>
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
        <Target className="w-6 h-6 text-red-500" />
        Problem Statement
      </h2>
      <div className="glass border-red-500/10 rounded-xl p-6">
        <p className="text-muted-foreground/80 leading-relaxed">{project.problemStatement}</p>
      </div>
    </section>
  </SectionReveal>
)}
```

Tech stack section:
```tsx
<SectionReveal delay={0.1}>
  <section>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
      <Wrench className="w-6 h-6 text-blue-500" />
      Tech Stack
    </h2>
    <div className="flex flex-wrap gap-3">
      {project.techStack.map((tech) => (
        <span key={tech} className="glass rounded-lg px-4 py-2 text-sm font-medium">{tech}</span>
      ))}
    </div>
  </section>
</SectionReveal>
```

Challenges & Solutions section:
```tsx
{project.challenges && project.challenges.length > 0 && (
  <SectionReveal delay={0.2}>
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        Challenges & Solutions
      </h2>
      <div className="space-y-4">
        {project.challenges.map((challenge, i) => (
          <div key={i} className="glass rounded-xl p-6 space-y-3">
            <div>
              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">Challenge {i + 1}</span>
              <p className="text-foreground font-medium mt-1">{challenge}</p>
            </div>
            {project.solutions && project.solutions[i] && (
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Solution</span>
                <p className="text-muted-foreground/80 mt-1">{project.solutions[i]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  </SectionReveal>
)}
```

Results section:
```tsx
{project.results && project.results.length > 0 && (
  <SectionReveal delay={0.3}>
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 tracking-tight">
        <CheckCircle className="w-6 h-6 text-emerald-500" />
        Results
      </h2>
      <div className="glass border-emerald-500/10 rounded-xl p-6">
        <ul className="space-y-3">
          {project.results.map((result, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground/80">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              {result}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </SectionReveal>
)}
```

Fallback section:
```tsx
{!hasCaseStudy && (
  <SectionReveal>
    <div className="text-center py-16 glass rounded-2xl">
      <p className="text-muted-foreground/80 mb-4">Detailed case study coming soon.</p>
      <Link href={project.githubUrl} ...>
```

Bottom CTA:
```tsx
<SectionReveal delay={0.1}>
  <div className="glass rounded-2xl p-8 text-center border-emerald-500/10">
    ...
  </div>
</SectionReveal>
```

Also update tech stack badges in the article header:
```tsx
{project.techStack.map((tech) => (
  <span key={tech} className="glass rounded-full px-3 py-1 text-xs font-medium">
    {tech}
  </span>
))}
<span className="glass rounded-full px-3 py-1 text-xs font-medium capitalize">
  {project.category}
</span>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
