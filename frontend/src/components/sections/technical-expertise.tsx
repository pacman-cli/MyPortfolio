"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import React, { useRef } from "react"
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from "@/lib/data/skills"

const SkillChip = ({ skill }: { skill: SkillItem }) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-all duration-200 cursor-default"
    >
      <span className="text-sm opacity-80">{skill.icon}</span>
      <span className="text-xs font-medium">{skill.name}</span>
    </div>
  )
}

const CategoryCard = ({ category }: { category: SkillCategory }) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 shrink-0">
          {React.cloneElement(category.icon as React.ReactElement<{ className?: string }>, {
            className: cn("w-5 h-5 text-emerald-400")
          })}
        </div>
        <div>
          <h3 className="text-base font-bold text-zinc-100 tracking-tight">
            {category.title}
          </h3>
          <p className="text-xs text-zinc-500">
            {category.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  )
}

export const TechnicalExpertise = () => {
  return (
    <section id="technical-expertise" className="py-24 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
            Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Technical Expertise
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-lg">
            Engineering toolkit, architecture patterns, and specialized capabilities.
          </p>
        </div>

        {/* 2-column grid of category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
