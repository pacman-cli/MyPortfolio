"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Mail, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiDocker, SiPostgresql, SiPython, SiSpringboot } from 'react-icons/si'

export default function ResumePage() {

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }



  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-24 pb-16 px-4 md:px-8 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto print:max-w-none">

        {/* Actions Bar - Hidden in Print */}
        <div className="flex justify-end mb-6 print:hidden">
          <Button
            asChild
            variant="outline"
            className="gap-2"
          >
            <a href="https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ" target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </Button>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 print:space-y-4"
        >
          {/* Header Section */}
          <div className="print:block">
            <Card className="p-8 border-l-4 border-l-emerald-500 shadow-lg dark:bg-slate-900/50 backdrop-blur print:border-0 print:shadow-none print:p-0 print:bg-transparent">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 print:text-black print:text-2xl">
                    MD. ASHIKUR RAHMAN PUSPO
                  </h1>
                  <p className="text-lg md:text-xl text-emerald-600 dark:text-emerald-400 font-medium mb-4 print:text-black print:text-lg">
                    Backend Developer | System Architect | Database Specialist
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 print:text-black print:gap-2 print:text-xs">
                    <a href="mailto:puspopuspo520@gmail.com" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                      <Mail className="w-4 h-4 print:w-3 print:h-3" /> puspopuspo520@gmail.com
                    </a>
                    <a href="tel:+8801990866142" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                      <Phone className="w-4 h-4 print:w-3 print:h-3" /> +880 1990866142
                    </a>
                    <a href="https://puspo.online" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                      <ExternalLink className="w-4 h-4 print:w-3 print:h-3" /> puspo.online
                    </a>
                  </div>
                  <div className="flex gap-4 mt-4 print:mt-2">
                    <a href="https://linkedin.com/in/iampuspo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-500 hover:text-white transition-all print:bg-transparent print:p-0 print:text-black">
                      <FaLinkedin className="w-5 h-5 print:hidden" />
                      <span className="hidden print:inline text-xs underline">linkedin.com/in/iampuspo</span>
                      {/* Screen only icon view */}
                      <span className="print:hidden sr-only">LinkedIn</span>
                    </a>
                    <a href="https://github.com/pacman-cli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-900 hover:text-white transition-all print:bg-transparent print:p-0 print:text-black">
                      <FaGithub className="w-5 h-5 print:hidden" />
                      <span className="hidden print:inline text-xs underline">github.com/pacman-cli</span>
                      {/* Screen only icon view */}
                      <span className="print:hidden sr-only">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary Section */}
          <div className="print:block">
            <Card className="p-8 shadow-sm dark:bg-slate-900/30 print:border-0 print:shadow-none print:p-0 print:bg-transparent">
              <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-slate-900 dark:text-white print:text-black print:border-black print:mb-2 print:text-lg">
                Professional Summary
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed print:text-black print:text-sm">
                Results-driven Backend Engineer with strong expertise in <strong className="text-emerald-600 dark:text-emerald-400 print:text-black">Spring Boot</strong>,
                <strong className="text-emerald-600 dark:text-emerald-400 print:text-black"> microservices architecture</strong>, and
                <strong className="text-emerald-600 dark:text-emerald-400 print:text-black"> cloud deployment</strong>.
                Proven track record of architecting 8+ production-grade systems handling 10K+ concurrent users.
                Skilled in database optimization with 35-40% performance improvement and designing secure authentication systems.
                Passionate about building scalable, maintainable, and cost-efficient backend architectures using Java, PostgreSQL, and AWS.
              </p>
            </Card>
          </div>

          {/* Technical Skills - Grid Layout */}
          {/* In print, we probably want a list instead of grid cards to save space, or simple minimal grid */}
          <div className="print:block">
            <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-slate-900 dark:text-white print:text-black print:border-black print:mb-2 print:text-lg">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
              <SkillCard
                category="Programming Languages"
                skills={["Java", "Python", "C++"]}
                icon={<SiPython />}
              />
              <SkillCard
                category="Backend Frameworks"
                skills={["Spring Boot", "Spring Security", "Spring AI", "REST APIs", "Microservices"]}
                icon={<SiSpringboot />}
              />
              <SkillCard
                category="Databases & Caching"
                skills={["PostgreSQL", "MySQL", "Redis", "Query Optimization"]}
                icon={<SiPostgresql />}
              />
              <SkillCard
                category="DevOps & Infrastructure"
                skills={["Docker", "AWS EC2", "Azure", "CI/CD Pipelines", "Linux"]}
                icon={<SiDocker />}
              />
            </div>
          </div>


          {/* Experience Section - Vertical Stack */}
          <div className="print:block">
            <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-slate-900 dark:text-white print:text-black print:border-black print:mb-2 print:text-lg">
              Professional Experience
            </h2>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-8 pl-8 py-2 print:border-l print:ml-0 print:pl-4 print:space-y-4">
              <div className="relative">
                {/* Bullet Node */}
                <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-slate-950 bg-emerald-500 print:hidden" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 print:mb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white print:text-black print:text-base">Backend Developer & Project Lead</h3>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full w-fit print:bg-transparent print:text-black print:p-0 print:text-xs">2023 – Present</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium print:text-black print:mb-1 print:text-sm">University Projects | Dhaka, Bangladesh</p>

                <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-outside ml-4 print:text-black print:text-sm print:space-y-1">
                  <li>Architected and delivered <strong>8 backend systems</strong> using Spring Boot, serving <strong>10K+ concurrent users</strong> with PostgreSQL, Redis, and Docker on AWS EC2.</li>
                  <li>Optimized database queries by <strong>35-40%</strong>, successfully reducing API response times from <strong>2s to 500ms</strong> through strategic indexing and caching mechanisms.</li>
                  <li>Designed and implemented microservices architecture featuring REST APIs with <strong>JWT-based authentication</strong> and RBAC.</li>
                  <li>Deployed dockerized applications establishing <strong>CI/CD pipelines</strong> and automated testing, achieving <strong>80%+ code coverage</strong>.</li>
                  <li>Mentored junior developers on best practices and conducted peer code reviews.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          {/* Grid view in print is okay if minimal */}
          <div className="print:block print:break-before-page">
            <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-slate-900 dark:text-white print:text-black print:border-black print:mb-2 print:text-lg">
              Key Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:gap-4">
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

          {/* Education */}
          <div className="print:block">
            <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 border-0 print:p-0 print:bg-transparent">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white print:text-black print:mb-2 print:text-lg">Education</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="font-bold text-lg print:text-base">B.Sc. in Computer Science & Engineering</h3>
                  <p className="text-slate-600 dark:text-slate-400 print:text-black print:text-sm">United International University, Dhaka</p>
                </div>
                <span className="mt-2 md:mt-0 px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded text-sm font-medium print:bg-transparent print:p-0 print:text-black print:text-xs">Expected 2027</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 print:text-black">
                <strong>Coursework:</strong> Database Systems, Software Engineering, Data Structures, Microservices Architecture
              </p>
            </Card>
          </div>

        </motion.div>
      </div>
    </main>
  )
}

// Helper Components

function SkillCard({ category, skills, icon }: { category: string, skills: string[], icon: React.ReactNode }) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow dark:bg-slate-900/40 print:shadow-none print:border print:border-gray-300 print:p-3 print:bg-transparent">
      {/* Hide colorful icon in print */}
      <div className="flex items-center gap-3 mb-3 text-emerald-600 dark:text-emerald-500 print:text-black print:mb-1">
        <span className="text-xl print:hidden">{icon}</span>
        <h3 className="font-semibold text-slate-900 dark:text-white print:text-black print:text-sm">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md print:bg-transparent print:border print:border-gray-200 print:text-black print:px-1 print:py-0">
            {skill}
          </span>
        ))}
      </div>
    </Card>
  )
}

function ProjectCard({ title, subtitle, tech, description }: { title: string, subtitle: string, tech: string[], description: string }) {
  return (
    <Card className="p-5 flex flex-col h-full hover:border-emerald-500/50 transition-colors dark:bg-slate-900/40 print:shadow-none print:border print:border-gray-300 print:p-3 print:bg-transparent">
      <div className="mb-3 print:mb-1">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white print:text-black print:text-base">{title}</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium print:text-black print:text-xs">{subtitle}</p>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow print:text-black print:mb-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 print:border-t print:border-gray-200 print:pt-2">
        {tech.map(t => (
          <span key={t} className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 print:text-black">
            {t}
          </span>
        ))}
      </div>
    </Card>
  )
}
