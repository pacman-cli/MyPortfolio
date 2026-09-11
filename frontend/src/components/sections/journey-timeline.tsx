"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Code, Cpu, Database, GraduationCap, Settings } from 'lucide-react'
import React from 'react'

interface Milestone {
  id: string
  type: 'work' | 'education' | 'leadership'
  role: string
  organization: string
  period: string
  description: string
  skills: string[]
  icon: React.ReactNode
}

const milestones: Milestone[] = [
  {
    id: 'uiu-degree',
    type: 'education',
    role: 'B.Sc. in Computer Science & Engineering',
    organization: 'United International University',
    period: '2022 – Present',
    description: 'Focused on full-stack development, algorithms, and system design. Active in tech communities and academic leadership.',
    skills: ['Algorithms', 'System Design', 'Full-Stack Development'],
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 'electronics-lab',
    type: 'leadership',
    role: 'Project Leader – Electronics Lab',
    organization: 'UIU (5th Semester)',
    period: '5th Semester',
    description: 'Led hardware prototyping projects, coordinating team efforts for electronic circuit design and embedded systems integration.',
    skills: ['Electronics', 'Team Leadership', 'Prototyping'],
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: 'dbms-lab',
    type: 'leadership',
    role: 'Project Leader – DBMS Lab',
    organization: 'UIU (6th Semester)',
    period: '6th Semester',
    description: 'Directed database design projects, implementing efficient query optimization and schema architecture.',
    skills: ['Database Design', 'SQL', 'Query Optimization'],
    icon: <Database className="w-4 h-4" />,
  },
  {
    id: 'software-lab',
    type: 'leadership',
    role: 'Team Leader – Software Lab',
    organization: 'UIU (9th Semester)',
    period: '9th Semester',
    description: 'Spearheaded collaborative software development projects, implementing agile methodologies and code review practices.',
    skills: ['Agile', 'Code Review', 'Project Management'],
    icon: <Code className="w-4 h-4" />,
  },
  {
    id: 'microcontroller-lab',
    type: 'leadership',
    role: 'Project Leader – Microprocessor & Microcontroller Lab',
    organization: 'UIU (9th Semester)',
    period: '9th Semester',
    description: 'Led embedded systems projects involving ARM processors and sensor integration for IoT applications.',
    skills: ['Embedded Systems', 'ARM', 'IoT'],
    icon: <Settings className="w-4 h-4" />,
  },
]

const TYPE_COLORS: Record<string, string> = {
  education: 'text-blue-400 bg-blue-500/10',
  leadership: 'text-emerald-400 bg-emerald-500/10',
  work: 'text-amber-400 bg-amber-500/10',
}

const TimelineItem = ({ milestone, index }: { milestone: Milestone; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative flex gap-6"
    >
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800",
          TYPE_COLORS[milestone.type] || TYPE_COLORS.work
        )}>
          {milestone.icon}
        </div>
        {index < milestones.length - 1 && (
          <div className="w-px flex-1 bg-zinc-800/80 mt-2" />
        )}
      </div>

      {/* Content Card */}
      <div className="pb-10 flex-1">
        <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono text-zinc-500">{milestone.period}</span>
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
              TYPE_COLORS[milestone.type] || TYPE_COLORS.work
            )}>
              {milestone.type}
            </span>
          </div>

          <h3 className="text-base font-bold text-zinc-100 tracking-tight mb-1">
            {milestone.role}
          </h3>
          <p className="text-sm text-emerald-400 font-medium mb-3">
            {milestone.organization}
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            {milestone.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {milestone.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const JourneyTimeline = () => {
  return (
    <section
      id="experience"
      className="py-24 md:py-32 scroll-mt-20"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Experience
          </span>
          <h2 id="journey-heading" className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            My Journey
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-lg">
            A path of continuous learning, leadership, and building impactful engineering solutions.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Career timeline">
          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
