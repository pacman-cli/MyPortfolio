"use client"

import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'

const sections = [
  {
    title: 'Who is MD Ashikur Rahman Puspo?',
    content: [
      'I am MD Ashikur Rahman Puspo, a passionate Software Engineer and Backend Developer based in Dhaka, Bangladesh. Currently completing my degree in Computer Science & Engineering at United International University, I have dedicated myself to mastering the art of building robust, scalable digital systems.',
      'My journey began with a curiosity for how things work under the hood. This led me to specialize as a Backend Developer, where I architect logic, manage databases, and ensure secure data flow for complex applications.',
    ],
  },
  {
    title: 'Professional Background',
    content: [
      'As a software engineer, I focus on creating high-performance systems using Spring Boot and modern cloud technologies. As a dedicated Spring Boot Developer, I build solutions that are not just functional but also maintainable and efficient.',
      'I have experience integrating complex services, from payment gateways to real-time communication protocols. My work emphasizes Clean Architecture, Domain-Driven Design (DDD), and DevOps practices.',
    ],
  },
  {
    title: 'What I Do',
    list: [
      'Backend Development: Architecting RESTful APIs and Microservices as a Software Engineer and Spring Boot Developer.',
      'Database Management: Designing optimized schemas for PostgreSQL and MySQL.',
      'DevOps & Cloud: Deploying applications using Docker, Kubernetes, and AWS.',
      'System Design: focusing on scalability, security, and performance.',
    ],
  },
]

export const AboutContent = () => {
  return (
    <>
      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, ...SPRING_FADE_UP }}
          viewport={{ once: true, margin: '-40px' }}
          className="group"
        >
          <div className="glass glass-hover rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="accent-bar-left" />
            <h2 className="text-2xl font-bold mb-4 text-foreground tracking-tight">{section.title}</h2>
            {section.content?.map((p, j) => (
              <p key={j} className="text-muted-foreground/80 leading-7 mb-4 last:mb-0">{p}</p>
            ))}
            {section.list && (
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground/80 leading-7">
                {section.list.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </>
  )
}
