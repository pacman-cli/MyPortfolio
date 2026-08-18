"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence, Variants } from "framer-motion"
import React, { useState } from "react"
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
        "text-base opacity-85 group-hover:opacity-100 transition-opacity duration-200",
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
// MAIN SECTION COMPONENT
// ============================================================================

export const TechnicalExpertise = () => {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id)

  const activeCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0]

  return (
    <section
      id="technical-expertise"
      className="py-20 md:py-24 bg-background/50 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.02),transparent_50%)]" />

      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
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

        {/* Dynamic Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-border/40 pb-6 max-w-2xl mx-auto">
          {SKILL_CATEGORIES.map((category) => {
            const isActive = activeTab === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none",
                  isActive ? "text-primary-foreground dark:text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="relative z-10">{category.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-skill-tab"
                    className="absolute inset-0 bg-secondary rounded-lg z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Dynamic Skills Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: smoothEase }}
            className="bg-card/25 border border-border/40 rounded-2xl p-6 md:p-8 backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 mb-6">
              <h3 className="text-xl font-semibold tracking-tight text-foreground/95">
                {activeCategory.subtitle}
              </h3>
            </div>

            <motion.div
              variants={chipsContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2.5"
            >
              {activeCategory.skills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
