"use client"

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Mail, Phone } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiDocker, SiPostgresql, SiPython, SiSpringboot } from 'react-icons/si'
import React from 'react'

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-16 px-4 md:px-8 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto print:max-w-none">

        {/* Actions Bar - Hidden in Print */}
        <div className="flex justify-end mb-6 print:hidden">
          <Button
            asChild
            variant="outline"
            className="gap-2 border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full"
          >
            <a href="https://drive.google.com/uc?export=download&id=1kdsPhac4EReNEXJU6WfuNg9RPe4d2FvJ" target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 print:space-y-4"
        >
          {/* Header Section */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 print:border-0 print:p-0 print:bg-transparent">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100 mb-2 print:text-black print:text-2xl">
                  MD. ASHIKUR RAHMAN PUSPO
                </h1>
                <p className="text-lg md:text-xl text-emerald-400 font-medium mb-4 print:text-black print:text-lg">
                  Backend Developer | System Architect | Database Specialist
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400 print:text-black print:gap-2 print:text-xs">
                  <a href="mailto:puspopuspo520@gmail.com" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                    <Mail className="w-4 h-4" /> puspopuspo520@gmail.com
                  </a>
                  <a href="tel:+8801990866142" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                    <Phone className="w-4 h-4" /> +880 1990866142
                  </a>
                  <a href="https://www.puspo.online" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                    <ExternalLink className="w-4 h-4" /> www.puspo.online
                  </a>
                </div>
                <div className="flex gap-3 mt-4 print:mt-2">
                  <a href="https://linkedin.com/in/iampuspo" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 transition-all">
                    <FaLinkedin className="w-4 h-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href="https://github.com/pacman-cli" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 transition-all">
                    <FaGithub className="w-4 h-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href="https://www.instagram.com/iampuspoo/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-zinc-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-zinc-400 transition-all">
                    <FaInstagram className="w-4 h-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 print:border-0 print:p-0 print:bg-transparent">
            <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3 mb-4 tracking-tight print:text-black print:border-black">
              Professional Summary
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base print:text-black">
              Results-driven Backend Engineer with strong expertise in <strong className="text-zinc-200">Spring Boot</strong>, <strong className="text-zinc-200">microservices architecture</strong>, and <strong className="text-zinc-200">cloud deployment</strong>. Proven track record of architecting 8+ production-grade systems handling 10K+ concurrent users. Skilled in database optimization with 35-40% performance improvement and designing secure authentication systems.
            </p>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3 mb-4 tracking-tight print:text-black print:border-black">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
              <SkillCard category="Languages" skills={["Java", "Python", "C++"]} icon={<SiPython />} />
              <SkillCard category="Backend Frameworks" skills={["Spring Boot", "Spring Security", "Spring AI", "REST APIs", "Microservices"]} icon={<SiSpringboot />} />
              <SkillCard category="Databases & Caching" skills={["PostgreSQL", "MySQL", "Redis", "Query Optimization"]} icon={<SiPostgresql />} />
              <SkillCard category="DevOps & Infrastructure" skills={["Docker", "AWS EC2", "Azure", "CI/CD Pipelines", "Linux"]} icon={<SiDocker />} />
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3 mb-4 tracking-tight print:text-black print:border-black">
              Professional Experience
            </h2>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 print:border-0 print:p-0 print:bg-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold text-zinc-100 print:text-black">Backend Developer & Project Lead</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit">2023 – Present</span>
              </div>
              <p className="text-xs text-zinc-500 mb-4 font-mono">University Projects | Dhaka, Bangladesh</p>

              <ul className="space-y-2 text-zinc-400 text-sm list-disc list-outside ml-4 print:text-black">
                <li>Architected and delivered <strong className="text-zinc-200">8 backend systems</strong> using Spring Boot, serving <strong className="text-zinc-200">10K+ concurrent users</strong> with PostgreSQL, Redis, and Docker on AWS EC2.</li>
                <li>Optimized database queries by <strong className="text-zinc-200">35-40%</strong>, successfully reducing API response times from <strong className="text-zinc-200">2s to 500ms</strong> through strategic indexing and caching mechanisms.</li>
                <li>Designed and implemented microservices architecture featuring REST APIs with <strong className="text-zinc-200">JWT-based authentication</strong> and RBAC.</li>
                <li>Deployed dockerized applications establishing <strong className="text-zinc-200">CI/CD pipelines</strong> and automated testing, achieving <strong className="text-zinc-200">80%+ code coverage</strong>.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3 mb-4 tracking-tight print:text-black print:border-black">
              Key Projects
            </h2>
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
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
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 print:border-0 print:p-0 print:bg-transparent">
            <h2 className="text-xl font-bold text-zinc-100 mb-3 tracking-tight print:text-black">Education</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="font-bold text-base text-zinc-100 print:text-black">B.Sc. in Computer Science & Engineering</h3>
                <p className="text-zinc-400 text-sm print:text-black">United International University, Dhaka</p>
              </div>
              <span className="mt-2 md:mt-0 text-xs font-mono text-zinc-500">Expected 2027</span>
            </div>
          </div>

        </motion.div>
      </div>
    </main>
  )
}

function SkillCard({ category, skills, icon }: { category: string; skills: string[]; icon: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 print:border print:p-3 print:bg-transparent">
      <div className="flex items-center gap-2.5 mb-3 text-emerald-400 print:text-black">
        <span className="text-lg print:hidden">{icon}</span>
        <h3 className="font-bold text-zinc-100 text-sm tracking-tight print:text-black">{category}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span key={skill} className="px-2.5 py-1 bg-zinc-950/80 border border-zinc-800 text-zinc-300 text-xs rounded-full print:bg-transparent print:border print:text-black">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ title, subtitle, tech, description }: { title: string; subtitle: string; tech: string[]; description: string }) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between print:border print:p-3 print:bg-transparent">
      <div>
        <h3 className="font-bold text-base text-zinc-100 tracking-tight mb-0.5 print:text-black">{title}</h3>
        <p className="text-xs text-emerald-400 font-medium mb-3 print:text-black">{subtitle}</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 print:text-black">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60 print:border-t">
        {tech.map((t) => (
          <span key={t} className="text-[10px] uppercase font-mono tracking-wider font-semibold text-zinc-500 print:text-black">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
