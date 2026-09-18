import Link from 'next/link'
import { Terminal, GraduationCap, Cpu, MapPin, ArrowRight } from 'lucide-react'

const ABOUT_HIGHLIGHTS = [
  {
    title: 'Computer Science & Engineering',
    institution: 'United International University',
    icon: GraduationCap,
    description: 'Specializing in backend system design, database architecture, and object-oriented paradigms.',
  },
  {
    title: 'Backend Systems Engineer',
    institution: 'Spring Boot & Microservices',
    icon: Cpu,
    description: 'Architecting RESTful APIs, securing endpoints, optimizing JPA/Hibernate queries, and containerizing with Docker.',
  },
]

export const About = () => {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-8">

          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-emerald-800 dark:text-emerald-300 font-bold uppercase">
                02 // BACKGROUND
              </span>
              <span className="h-3 w-px bg-border/80" aria-hidden="true" />
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                About Me
              </h2>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
              SYS.BIO // ARCHITECTURE
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-stretch">

            {/* Left Column: Narrative & Highlights */}
            <div className="md:col-span-8 flex flex-col justify-between gap-6">

              {/* Primary Philosophy Callout */}
              <div className="relative p-5 rounded-lg border border-border/80 bg-card/60 backdrop-blur-xs space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-[10px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>ENGINEERING PERSPECTIVE</span>
                </div>
                <p className="text-sm sm:text-base text-foreground leading-relaxed font-normal">
                  I am a Software Engineer centered on backend development. My focus is engineering resilient server-side architectures, robust data pipelines, and clean API boundaries using Java, Spring Boot, and relational databases.
                </p>
              </div>

              {/* Highlights Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {ABOUT_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="group p-4 rounded-lg border border-border/80 bg-card/40 hover:bg-card hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between gap-3 shadow-2xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground font-medium">
                            {item.institution}
                          </span>
                        </div>
                        <h3 className="text-xs font-mono font-bold text-foreground tracking-tight uppercase group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Read Full Bio Link */}
              <div>
                <Link
                  href="/about-me"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-foreground uppercase tracking-wider hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group"
                >
                  <span>Read Full Biography</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-700 dark:text-emerald-300" />
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural Telemetry Cards */}
            <div className="md:col-span-4 flex flex-col gap-3 justify-between">

              <div className="p-4 rounded-lg border border-border/80 bg-card/60 backdrop-blur-xs flex flex-col gap-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                  <span>CORE FOCUS</span>
                </div>
                <div className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  JAVA / SPRING BOOT
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Microservices &amp; REST APIs
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border/80 bg-card/60 backdrop-blur-xs flex flex-col gap-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300" />
                  <span>LOCATION</span>
                </div>
                <div className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  DHAKA, BANGLADESH
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  UTC +6 &bull; Remote Available
                </div>
              </div>

              <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold uppercase">
                  <span>STATUS</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-xs font-mono font-bold text-foreground uppercase">
                  READY FOR IMPACT
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Available for full-time backend engineering roles.
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

