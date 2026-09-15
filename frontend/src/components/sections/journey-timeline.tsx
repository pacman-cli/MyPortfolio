interface Milestone {
  id: string
  type: 'work' | 'education' | 'leadership'
  role: string
  organization: string
  period: string
  description: string
  skills: string[]
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
  },
  {
    id: 'software-lab',
    type: 'leadership',
    role: 'Team Leader – Software Lab',
    organization: 'UIU (9th Semester)',
    period: '9th Semester',
    description: 'Spearheaded collaborative software development projects, implementing agile methodologies and code review practices.',
    skills: ['Agile', 'Code Review', 'Project Management'],
  },
  {
    id: 'dbms-lab',
    type: 'leadership',
    role: 'Project Leader – DBMS Lab',
    organization: 'UIU (6th Semester)',
    period: '6th Semester',
    description: 'Directed database design projects, implementing efficient query optimization and schema architecture.',
    skills: ['Database Design', 'SQL', 'Query Optimization'],
  },
  {
    id: 'microcontroller-lab',
    type: 'leadership',
    role: 'Project Leader – Microcontroller Lab',
    organization: 'UIU (9th Semester)',
    period: '9th Semester',
    description: 'Led embedded systems projects involving ARM processors and sensor integration for IoT applications.',
    skills: ['Embedded Systems', 'ARM', 'IoT'],
  },
]

export const JourneyTimeline = () => {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Experience & Academic Journey
            </h2>
          </div>

          <div className="space-y-4">
            {milestones.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-lg border border-border bg-card/50 flex flex-col gap-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {item.organization}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {item.period}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground"
                    >
                      {skill}
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
