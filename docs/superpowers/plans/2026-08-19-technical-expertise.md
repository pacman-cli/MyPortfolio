# Technical Expertise Tabs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Technical Expertise section into a premium, minimalist tabbed interface using Framer Motion shared layout animations.

**Architecture:** Add tab selection state at the top. Wrap the skills grid in `AnimatePresence` and stagger-animate chips of the selected category.

**Tech Stack:** React 19, Next.js, Tailwind CSS, Framer Motion

---

### Task 1: Refactor Technical Expertise Layout

**Files:**
- Modify: `src/components/sections/technical-expertise.tsx`
- Test: `npm run build`

- [ ] **Step 1: Replace implementation of TechnicalExpertise**

Modify `src/components/sections/technical-expertise.tsx` to add category tab state and switch active content:

```tsx
export const TechnicalExpertise = () => {
  const [activeTab, setActiveTab] = React.useState(SKILL_CATEGORIES[0].id)

  const activeCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0]

  return (
    <section
      id="technical-expertise"
      className="py-20 md:py-24 bg-background/50 relative overflow-hidden"
    >
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
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-border/40 pb-6 max-w-2xl mx-auto">
          {SKILL_CATEGORIES.map((category) => {
            const isActive = activeTab === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.title}
                {isActive && (
                  <motion.div
                    layoutId="active-skill-tab"
                    className="absolute inset-0 bg-secondary rounded-lg -z-10"
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
```

- [ ] **Step 2: Clean up unused CategoryNode component**

Remove the `CategoryNode` component definition from `src/components/sections/technical-expertise.tsx` as it is replaced by the tab display.

- [ ] **Step 3: Build the application to verify type correctness**

Run: `npm run build`
Expected: Compiled successfully.

- [ ] **Step 4: Commit the changes**

```bash
git add src/components/sections/technical-expertise.tsx
git commit -m "feat: implement minimal tabs interface for technical expertise"
```
