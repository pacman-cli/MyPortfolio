import Link from 'next/link'

const ABOUT_HIGHLIGHTS = [
  {
    title: 'Computer Science & Engineering',
    institution: 'United International University',
    description: 'Specializing in backend system design, database architecture, and object-oriented paradigms.',
  },
  {
    title: 'Backend Systems Engineer',
    institution: 'Spring Boot & Microservices',
    description: 'Architecting RESTful APIs, securing endpoints, optimizing JPA/Hibernate queries, and containerizing with Docker.',
  },
]

export const About = () => {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-6">
          <div className="border-b border-border/80 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 flex flex-col gap-6">
              <p className="text-base text-foreground leading-relaxed">
                I am a Software Engineer centered on backend development. My focus is engineering resilient server-side architectures, robust data pipelines, and clean API boundaries using Java, Spring Boot, and relational databases.
              </p>

              <div className="space-y-4">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <span className="text-xs font-mono text-muted-foreground">{item.institution}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  href="/about-me"
                  className="text-xs font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                >
                  Read full biography &rarr;
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <div className="p-3 rounded-md border border-border bg-card text-center">
                <div className="text-sm font-bold text-foreground">Java / Spring</div>
                <div className="text-[10px] font-mono text-muted-foreground">Core Focus</div>
              </div>
              <div className="p-3 rounded-md border border-border bg-card text-center">
                <div className="text-sm font-bold text-foreground">Dhaka, BD</div>
                <div className="text-[10px] font-mono text-muted-foreground">Location</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
