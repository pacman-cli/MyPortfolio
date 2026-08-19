"use client"

import { cn } from "@/lib/utils"
import { motion, useInView, Variants } from "framer-motion"
import React, { useRef } from "react"
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from "@/lib/data/skills"

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

const smoothEase = [0.16, 1, 0.3, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
  }
}

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
}

const chipsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02
    }
  }
}

// ============================================================================
// SKILL CHIP COMPONENT
// ============================================================================

const SkillChip = ({ skill }: { skill: SkillItem }) => {
  const isLightText = skill.name === "Next.js" || skill.name === "Vercel" || skill.name === "Notion"

  return (
    <motion.div
      variants={chipVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex items-center gap-2 px-3 py-1.5",
        "bg-secondary/10 hover:bg-secondary/20 dark:bg-secondary/5 dark:hover:bg-secondary/15",
        "border border-border/40 hover:border-border/80",
        "rounded-lg transition-all duration-200 cursor-default"
      )}
    >
      {/* Icon */}
      <span className={cn(
        "text-base opacity-80 group-hover:opacity-100 transition-opacity duration-200",
        isLightText && "dark:brightness-125 brightness-75"
      )}>
        {skill.icon}
      </span>

      {/* Skill Name */}
      <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
        {skill.name}
      </span>
    </motion.div>
  )
}

// ============================================================================
// CATEGORY ROW COMPONENT
// ============================================================================

const CategoryRow = ({ category }: { category: SkillCategory }) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={containerRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "group/category flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-2xl",
        "bg-card/25 dark:bg-card/5 backdrop-blur-md",
        "border border-border/40 hover:border-border/80",
        "shadow-sm hover:shadow-md transition-all duration-300"
      )}
    >
      {/* Header section - Left aligned on desktop */}
      <div className="flex items-center gap-4 min-w-[240px]">
        <div className="p-3 rounded-xl bg-secondary/10 dark:bg-secondary/5 border border-border/40 shrink-0">
          {React.cloneElement(category.icon as React.ReactElement<{ className?: string }>, {
            className: cn("w-5 h-5 transition-transform duration-300 group-hover/category:scale-105", category.color)
          })}
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground/90 transition-colors">
            {category.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Skills Grid section - Right aligned on desktop */}
      <motion.div
        variants={chipsContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap gap-2 md:justify-end flex-1"
      >
        {category.skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

export const TechnicalExpertise = () => {
  return (
    <section
      id="technical-expertise"
      className="py-20 md:py-28 bg-background/50 relative overflow-hidden scroll-mt-20"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.02),transparent_50%)]" />

      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
          >
            Technical Expertise
          </motion.h2>
          <div className="w-12 h-1 bg-border mx-auto rounded-full mb-5" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed"
          >
            My engineering toolkit, architecture patterns, and specialized capabilities.
          </motion.p>
        </div>

        {/* Categories List - stacked in one column */}
        <div className="flex flex-col gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
