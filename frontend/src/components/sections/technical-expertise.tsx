import { SKILL_CATEGORIES } from "@/lib/data/skills"

export const TechnicalExpertise = () => {
  return (
    <section id="technical-expertise" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Capabilities & Technical Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="p-5 rounded-lg border border-border bg-card/50 flex flex-col gap-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {category.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-muted/60 text-foreground border border-border/50"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
