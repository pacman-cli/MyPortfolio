import { GraduationCap, Cpu, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ABOUT_HIGHLIGHTS = [
  {
    title: 'Computer Science & Engineering',
    institution: 'United International University',
    icon: GraduationCap,
    description: 'Focus on backend design, database architecture, and object-oriented paradigms.',
  },
  {
    title: 'Backend Systems Engineer',
    institution: 'Spring Boot & Microservices',
    icon: Cpu,
    description: 'Expertise in RESTful APIs, JPA/Hibernate, query optimization, and Docker containerization.',
  },
]

export const About = () => {
  return (
    <section id="about" className="py-16 border-b border-border/50 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8 flex flex-col gap-8">
          <div className="space-y-4">
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase font-semibold">
              02 // BACKGROUND
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground uppercase">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Software Engineer specialized in backend development. Architecting resilient server-side systems, robust data pipelines, and scalable APIs using Java, Spring Boot, and PostgreSQL.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {ABOUT_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <item.icon className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                <div className="text-[10px] font-mono text-muted-foreground uppercase">{item.institution}</div>
              </div>
            ))}
          </div>

          <Link
            href="/about-me"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-emerald-700 transition-colors"
          >
            Read Full Biography <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6 text-sm">
          <div className="border-l border-border pl-6 space-y-1">
            <div className="font-bold">Location</div>
            <div className="text-muted-foreground">Dhaka, Bangladesh</div>
          </div>
          <div className="border-l border-border pl-6 space-y-1">
            <div className="font-bold">Status</div>
            <div className="text-emerald-700 font-bold uppercase text-[11px]">Ready for Impact</div>
          </div>
        </div>
      </div>
    </section>
  )
}
