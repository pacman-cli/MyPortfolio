"use client"

import { cn } from "@/lib/utils"
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import React, { useRef } from "react"
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from "@/lib/data/skills"

const SkillChip = ({ skill, index }: { skill: SkillItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "backOut"
      }}
      whileHover={{
        scale: 1.05,
        y: -4,
        boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)"
      }}
      className={cn(
        "group relative flex items-center gap-2 px-2.5 py-1.5",
        "bg-secondary/40 hover:bg-secondary/60",
        "border border-border/50 hover:border-primary/30",
        "rounded-xl transition-all duration-300 cursor-default",
        "backdrop-blur-sm"
      )}
    >
      <span className={cn(
        "text-xl filter grayscale group-hover:grayscale-0 transition-all duration-300",
        "opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transform transition-transform"
      )}>
        {skill.icon}
      </span>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
        {skill.name}
      </span>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

const CategoryNode = ({ category }: { category: SkillCategory }) => {
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, {
    margin: "-20% 0px -20% 0px",
    once: false
  })

  return (
    <div ref={nodeRef} className="relative pl-12 md:pl-20 py-1 md:py-2">
      {/* Node Marker on the Path */}
      <div
        className={cn(
          "absolute left-[9px] md:left-[29px] top-8 md:top-10 -translate-x-1/2 z-10",
          "w-10 h-10 md:w-14 md:h-14 rounded-full",
          "flex items-center justify-center",
          "border-4 bg-background transition-all duration-500",
          isInView
            ? cn(category.borderColor, "scale-110 shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)]")
            : "border-border/50 scale-100 grayscale"
        )}
      >
        <div className={cn(
          "w-full h-full rounded-full flex items-center justify-center",
          "bg-secondary/50 backdrop-blur-md transition-colors duration-500",
          isInView ? category.color : "text-muted-foreground"
        )}>
          {React.cloneElement(category.icon as React.ReactElement<{ className?: string }>, {
            className: cn("w-4 h-4 md:w-6 md:h-6 transition-transform duration-500", isInView ? "scale-110" : "scale-100")
          })}
        </div>
      </div>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col gap-2 mb-2">
          <h3 className={cn(
            "text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
            isInView ? "text-foreground" : "text-muted-foreground"
          )}>
            {category.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            {category.subtitle}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-1.5">
          {category.skills.map((skill, skIndex) => (
            <SkillChip key={skill.name} skill={skill} index={skIndex} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export const TechnicalExpertise = () => {
  const containerRef = useRef<HTMLElement>(null)

  // Scroll progress for the vertical path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Start drawing the path when top of section hits bottom of viewport
  const pathHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  const smoothPathHeight = useSpring(pathHeight, {
    stiffness: 50,
    damping: 20
  })

  return (
    <section
      ref={containerRef}
      id="technical-expertise"
      className="py-8 md:py-12 bg-background/50 relative overflow-hidden"
    >
      {/* Background decoration (optional) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05),transparent_40%)]" />

      {/* Container */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            Technical Expertise
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 mx-auto rounded-full mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base"
          >
            My engineering toolkit, architecture patterns, and specialized capabilities.
          </motion.p>
        </div>

        {/* Vertical Timeline Path Layout */}
        <div className="relative">

          {/* The Vertical Path Line (Background) */}
          <div className="absolute left-[9px] md:left-[29px] top-0 bottom-0 w-1 bg-secondary/30 rounded-full" />

          {/* The Active Path Line (Animated) */}
          <motion.div
            style={{ height: smoothPathHeight }}
            className="absolute left-[9px] md:left-[29px] top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full origin-top z-0"
          />

          {/* Categories */}
          <div className="space-y-2 md:space-y-4 pb-8">
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
