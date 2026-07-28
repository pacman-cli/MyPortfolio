"use client"

import type { Certification } from '@/types'
import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { Award, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'

// Temporary mock data until provided by the user
const CERTIFICATIONS: Certification[] = [
  {
    id: "1",
    title: "Learn React by Building the Simplest App from Scratch",
    issuer: "Udemy",
    date: "Feb 2026",
    url: "https://www.udemy.com/certificate/UC-ad330d08-2182-4321-a72d-b5ae376745e1/",
    skills: ["React.js", "Chakra UI"]
  },
  {
    id: "2",
    title: "Amazon Elastic Container Service (AWS ECS)",
    issuer: "KodeKloud",
    date: "Feb 2026",
    url: "https://learn.kodekloud.com/user/certificate/d7a2b4b9-98fa-4bfe-986b-34f3164603f6",
    skills: ["Load Balancing", "Amazon ECS"]
  },
  {
    id: "3",
    title: "Crash Course: Docker For Absolute Beginners",
    issuer: "KodeKloud",
    date: "Feb 2026",
    url: "https://learn.kodekloud.com/certificate/00a496c6-3546-4e40-9a4b-1a9804fdfc06",
    skills: ["Docker"]
  },
  {
    id: "4",
    title: "Introducing MLOps: From Model Development to Deployment",
    issuer: "Udemy",
    date: "Feb 2026",
    url: "https://www.udemy.com/certificate/UC-e57c7656-2723-4dd4-8736-b270e8a80351/",
    skills: ["MLOps", "Python", "Model Training", "Data Processing", "Kubernetes"]
  },
  {
    id: "5",
    title: "Web Development And Javascript Bootcamp",
    issuer: "Udemy",
    date: "Jan 2026",
    url: "https://www.udemy.com/certificate/UC-e6f0f349-3ccf-444a-9a50-4d6af1e890c4/",
    skills: ["Web Development", "JavaScript"]
  },
]

const CertificationRow = memo(({ cert, index }: { cert: Certification; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, ...SPRING_FADE_UP }}
      viewport={{ once: true }}
      className="list-none group"
    >
      <div className="glass glass-hover rounded-xl overflow-hidden relative">
        <div className="accent-bar-left" />

        <div className="flex flex-col md:flex-row gap-4 p-4 md:px-6 md:py-5 md:items-start">
          <div className="w-12 pt-1 hidden md:block">
            <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-primary transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-tight md:text-2xl md:leading-[1.875rem] text-foreground group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground/80 max-w-2xl leading-relaxed">
              {cert.issuer} &middot; Issued {cert.date}
            </p>

            {cert.skills && cert.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {cert.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-xs font-medium glass rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:pt-1 self-start md:self-auto mt-4 md:mt-0 relative z-10">
            <Link
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all flex items-center gap-2 group/btn"
              aria-label={`View ${cert.title} credential`}
            >
              <span className="text-sm font-medium pr-1 md:hidden">View Credential</span>
              <span className="text-sm font-medium pr-1 hidden md:inline-block opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover/btn:translate-x-0">View Credential</span>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.li>
  )
})
CertificationRow.displayName = 'CertificationRow'


export const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-16 md:py-20 bg-background relative"
      aria-labelledby="certifications-heading"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 id="certifications-heading" className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Licenses & Certifications
            </h2>
            <p className="text-muted-foreground max-w-md">
              A collection of my professional certifications, continuous learning, and verified credentials.
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationRow key={cert.id} cert={cert} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
