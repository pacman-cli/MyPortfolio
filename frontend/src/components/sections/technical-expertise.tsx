"use client"

import { cn } from "@/lib/utils"
import { motion, useInView, useScroll, useSpring, useTransform, Variants } from "framer-motion"
import React, { useRef } from "react"
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from "@/lib/data/skills"

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

const snappySpring = { type: "spring", stiffness: 380, damping: 28 } as const
const smoothEase = [0.16, 1, 0.3, 1] as const

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: snappySpring
  }
}

const nodeVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
}

const textContainerVariants: Variants = {
  hidden: { opacity: 0, x: 15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

const chipsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1
    }
  }
}

// ============================================================================
// SKILL CHIP COMPONENT
// ============================================================================

const SkillChip = ({ skill, categoryColor }: { skill: SkillItem; categoryColor: string }) => {
  const isLightText = skill.name === "Next.js" || skill.name === "Vercel" || skill.name === "Notion"

  return (
    <motion.div
      variants={chipVariants}
      whileHover={{
        y: -3,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={cn(
        "group relative flex items-center gap-2.5 px-3 py-1.5",
        "bg-secondary/20 dark:bg-secondary/10 hover:bg-secondary/40",
        "border border-border/40 hover:border-border/80",
        "rounded-xl transition-all duration-300 cursor-default",
        "backdrop-blur-[2px]"
      )}
    >
      {/* Dynamic Hover Glow based on Category Color */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none",
          categoryColor.replace('text-', 'bg-')
        )}
      />

      {/* Icon with micro-rotation on hover */}
      <motion.span 
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "text-lg opacity-85 group-hover:opacity-100 transition-opacity duration-300",
          isLightText && "dark:brightness-125 brightness-75"
        )}
      >
        {skill.icon}
      </motion.span>

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
  const isInView = useInView(containerRef, { once: true, amount: 0.25 })

  // Extract Tailwind color base (e.g. text-blue-500 -> blue-500)
  const colorBase = category.color.replace('text-', '')

  return (
    <div ref={containerRef} className="relative pl-14 md:pl-24 py-4 md:py-6 group/category">
      
      {/* Glowing Category Orb */}
      <motion.div
        variants={nodeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn(
          "absolute left-[9px] md:left-[29px] top-6 md:top-8 -translate-x-1/2 z-10",
          "w-9 h-9 md:w-12 md:h-12 rounded-full",
          "flex items-center justify-center border bg-background shadow-sm",
          "transition-colors duration-500",
          isInView ? category.borderColor : "border-border/60"
        )}
        style={{
          boxShadow: isInView ? `0 0 20px rgba(var(--primary-rgb), 0.05)` : undefined
        }}
      >
        {/* Soft Ambient aura around category circle */}
        {isInView && (
          <div 
            className={cn(
              "absolute inset-0 rounded-full blur-md opacity-15 -z-10 animate-pulse",
              `bg-${colorBase}`
            )} 
            style={{ backgroundColor: `currentColor`, color: `var(--category-color)` }}
          />
        )}

        <div className="w-full h-full rounded-full flex items-center justify-center bg-card/50 backdrop-blur-md">
          {React.cloneElement(category.icon as React.ReactElement<{ className?: string }>, {
            className: cn("w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover/category:scale-110", category.color)
          })}
        </div>
      </motion.div>

      {/* Horizontal connector link */}
      <div 
        className={cn(
          "absolute left-[9px] md:left-[29px] top-10 md:top-14 h-[1px] -z-10",
          "bg-gradient-to-r from-border/80 to-transparent",
          "w-6 md:w-12 transition-all duration-700",
          isInView ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Category Content */}
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90 group-hover/category:text-foreground transition-colors">
            {category.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">
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
              categoryColor={category.color} 
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
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Spring-smoothed scroll scale for timeline line
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const pathScale = useTransform(smoothProgress, [0, 0.85], [0, 1])

  return (
    <section
      ref={containerRef}
      id="technical-expertise"
      className="py-20 md:py-28 bg-background/50 relative overflow-hidden"
    >
      {/* Background radial accent grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.03),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.02),transparent_50%)]" />

      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            Technical Expertise
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed"
          >
            My engineering toolkit, architecture patterns, and specialized capabilities.
          </motion.p>
        </div>

        {/* Timeline Content */}
        <div className="relative">
          
          {/* Base Background Track Line */}
          <div className="absolute left-[9px] md:left-[29px] top-0 bottom-0 w-0.5 bg-border/20 dark:bg-border/10 rounded-full" />

          {/* Active Colored Progress Line */}
          <motion.div
            style={{ scaleY: pathScale, transformOrigin: "top" }}
            className="absolute left-[9px] md:left-[29px] top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full z-0 will-change-transform"
          />

          {/* Categories */}
          <div className="space-y-4 pb-8">
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
