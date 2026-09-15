import { Button } from '@/components/ui/button'
import { Download, ExternalLink, Mail, Phone } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { EmailOff } from '@/components/seo/email-off'
import { constructMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = constructMetadata({
  title: 'Resume | MD Ashikur Rahman Puspo',
  description: 'Professional resume of Ashikur Rahman Puspo — Backend Engineer specializing in Spring Boot, microservices architecture, and cloud systems.',
  url: absoluteUrl('/resume'),
})

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16 px-4 md:px-8 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto print:max-w-none">
        <div className="flex justify-end mb-6 print:hidden">
          <Button
            asChild
            variant="outline"
            className="gap-2 border-border bg-card hover:bg-muted text-foreground rounded-md text-xs font-mono"
          >
            <a href="https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ" target="_blank" rel="noopener noreferrer">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </a>
          </Button>
        </div>

        <div className="space-y-6 print:space-y-4">
          <div className="p-6 rounded-lg border border-border bg-card/50 print:border-0 print:p-0 print:bg-transparent">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1 print:text-black">
                  MD. ASHIKUR RAHMAN PUSPO
                </h1>
                <p className="text-xs font-mono text-muted-foreground mb-4 print:text-black">
                  Backend Developer | System Architect | Database Specialist
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground print:text-black">
                  <EmailOff>
                    <a href="mailto:hello@puspo.online" data-cfemail="false" className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <Mail className="w-3.5 h-3.5" /> hello@puspo.online
                    </a>
                  </EmailOff>
                  <a href="tel:+8801990866142" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Phone className="w-3.5 h-3.5" /> +880 1990866142
                  </a>
                  <a href="https://www.puspo.online" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> www.puspo.online
                  </a>
                </div>
                <div className="flex gap-3 mt-4 print:mt-2">
                  <a href="https://linkedin.com/in/iampuspo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FaLinkedin className="w-4 h-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href="https://github.com/pacman-cli" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FaGithub className="w-4 h-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href="https://www.instagram.com/iampuspoo/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FaInstagram className="w-4 h-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50 print:border-0 print:p-0 print:bg-transparent">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3 print:text-black">
              Professional Summary
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed print:text-black">
              Results-driven Backend Engineer with expertise in <strong className="text-foreground font-semibold">Spring Boot</strong>, <strong className="text-foreground font-semibold">microservices architecture</strong>, and <strong className="text-foreground font-semibold">cloud deployment</strong>. Skilled in database query optimization with 35-40% latency reductions and designing secure RBAC authentication systems.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3 print:text-black">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2">
              <SkillCard category="Languages" skills={["Java", "Python", "C++"]} />
              <SkillCard category="Backend Frameworks" skills={["Spring Boot", "Spring Security", "Spring AI", "REST APIs", "Microservices"]} />
              <SkillCard category="Databases & Caching" skills={["PostgreSQL", "MySQL", "Redis", "Query Optimization"]} />
              <SkillCard category="DevOps & Infrastructure" skills={["Docker", "AWS EC2", "Azure", "CI/CD Pipelines", "Linux"]} />
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3 print:text-black">
              Professional Experience
            </h2>

            <div className="p-5 rounded-lg border border-border bg-card/50 print:border-0 print:p-0 print:bg-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h3 className="text-sm font-semibold text-foreground print:text-black">Backend Developer & Project Lead</h3>
                <span className="text-xs font-mono text-muted-foreground">2023 – Present</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 font-mono">University Projects | Dhaka, Bangladesh</p>

              <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-outside ml-4 print:text-black">
                <li>Architected 8 backend systems using Spring Boot, serving 10K+ concurrent users with PostgreSQL, Redis, and Docker on AWS EC2.</li>
                <li>Optimized database queries by 35-40%, reducing API response times from 2s to 500ms through strategic indexing.</li>
                <li>Designed microservices featuring REST APIs with JWT-based authentication and RBAC.</li>
                <li>Deployed dockerized applications with CI/CD pipelines achieving 80%+ code coverage.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3 print:text-black">
              Key Projects
            </h2>
            <div className="grid gap-3 md:grid-cols-2 print:grid-cols-2">
              <ProjectCard
                title="StayMate"
                subtitle="Hostel Booking Platform"
                tech={["Spring Boot", "PostgreSQL", "Redis", "AWS"]}
                description="Built scalable REST API achieving 45% faster queries. Implemented property filtering, secure payments, and real-time syncing."
              />
              <ProjectCard
                title="AI Customer Support"
                subtitle="Chatbot & Ticket System"
                tech={["Spring Boot", "Spring AI", "OpenAI", "PostgreSQL"]}
                description="Integrated OpenAI for intelligent responses with fallback to human tickets. Analytics dashboard for resolution rates."
              />
              <ProjectCard
                title="Hospital Management"
                subtitle="Patient System"
                tech={["Spring Boot", "MySQL", "JWT", "RBAC"]}
                description="Complex appointment scheduling and billing with RBAC. Automated doctor availability logic and email notifications."
              />
              <ProjectCard
                title="Expense Tracker"
                subtitle="Personal Finance App"
                tech={["Spring Boot", "PostgreSQL", "JWT"]}
                description="Transaction CRUD, analytics, and budget alerts with <100ms response time. Recurring transaction automation."
              />
            </div>
          </div>

          <div className="p-5 rounded-lg border border-border bg-card/50 print:border-0 print:p-0 print:bg-transparent">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 print:text-black">Education</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="font-semibold text-sm text-foreground print:text-black">B.Sc. in Computer Science & Engineering</h3>
                <p className="text-xs text-muted-foreground print:text-black">United International University, Dhaka</p>
              </div>
              <span className="mt-2 md:mt-0 text-xs font-mono text-muted-foreground">Expected 2027</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function SkillCard({ category, skills }: { category: string; skills: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card/50 print:border print:p-3 print:bg-transparent">
      <h3 className="font-semibold text-foreground text-xs mb-2 tracking-tight print:text-black">{category}</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span key={skill} className="px-2 py-0.5 bg-muted text-foreground text-xs font-mono rounded border border-border/50 print:bg-transparent print:border print:text-black">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ title, subtitle, tech, description }: { title: string; subtitle: string; tech: string[]; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card/50 flex flex-col justify-between print:border print:p-3 print:bg-transparent">
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-0.5 print:text-black">{title}</h3>
        <p className="text-[11px] text-muted-foreground font-mono mb-2 print:text-black">{subtitle}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 print:text-black">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 pt-2 border-t border-border/50 print:border-t">
        {tech.map((t) => (
          <span key={t} className="text-[10px] font-mono text-muted-foreground print:text-black">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
