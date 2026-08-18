"use client"

import { cn } from "@/lib/utils"
import { motion, useInView, Variants } from "framer-motion"
import React, { useRef } from "react"
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from "@/lib/data/skills"

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

const smoothEase = [0.16, 1, 0.3, 1] as const

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
}

const nodeVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: smoothEase }
  }
}

const textContainerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
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
// CATEGORY NODE COMPONENT
// ============================================================================

const CategoryNode = ({ category }: { category: SkillCategory }) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <div ref={containerRef} className="relative pl-12 md:pl-20 py-6 md:py-8 group/category">
      
      {/* Timeline Circle Badge */}
      <motion.div
        variants={nodeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn(
          "absolute left-[9px] md:left-[19px] top-8 md:top-10 -translate-x-1/2 z-10",
          "w-8 h-8 md:w-10 md:h-10 rounded-full",
          "flex items-center justify-center border bg-background border-border/60"
        )}
      >
        <div className="w-full h-full rounded-full flex items-center justify-center bg-secondary/10 dark:bg-secondary/5">
          {React.cloneElement(category.icon as React.ReactElement<{ className?: string }>, {
            className: cn("w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/category:scale-105", category.color)
          })}
        </div>
      </motion.div>

      {/* Category Content */}
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <div className="flex flex-col gap-0.5 mb-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground/90 group-hover/category:text-foreground transition-colors">
            {category.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {category.subtitle}
          </p>
        </div>

        {/* Skill Chips Grid */}
        <motion.div 
          variants={chipsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-2"
        >
          {category.skills.map((skill) => (
            <SkillChip 
              key={skill.name} 
              skill={skill} 
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

export const TechnicalExpertise = () => {
  return (
    <section
      id="technical-expertise"
      className="py-20 md:py-24 bg-background/50 relative overflow-hidden"
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

        {/* Timeline Content */}
        <div className="relative">
          
          {/* Static Timeline Line */}
          <div className="absolute left-[9px] md:left-[19px] top-0 bottom-0 w-[1px] bg-border/40 dark:bg-border/20 rounded-full" />

          {/* Categories */}
          <div className="space-y-2 pb-6">
            {SKILL_CATEGORIES.map((category) => (
              <CategoryNode
                key={category.id}
                category={category}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
