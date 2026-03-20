import { Footer } from '@/components/footer'
import { constructMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = constructMetadata({
  title: 'About MD Ashikur Rahman Puspo | Backend Developer & Software Engineer',
  description: 'Learn about MD Ashikur Rahman Puspo — a Backend Developer specializing in Spring Boot, Java, MySQL, Docker, and Cloud Architecture. Discover his journey, skills, and professional background.',
  url: 'https://www.puspo.online/about-me',
  keywords: [
    'About Puspo',
    'MD Ashikur Rahman Puspo',
    'Backend Developer Bangladesh',
    'Software Engineer',
    'Spring Boot Developer',
  ],
})

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header Section */}
        <section className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-emerald-600 dark:text-emerald-400">MD Ashikur Rahman Puspo</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Computer Science Student, Backend Developer, and Software Engineer.
          </p>
        </section>

        {/* Narrative Content */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Main Text */}
          <div className="md:col-span-2 space-y-8 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Who is MD Ashikur Rahman Puspo?</h2>
              <p>
                I am <strong>MD Ashikur Rahman Puspo</strong>, a passionate Software Engineer and Backend Developer based in Dhaka, Bangladesh.
                Currently completing my degree in Computer Science & Engineering at United International University, I have dedicated myself to mastering the art of building robust, scalable digital systems.
              </p>
              <p className="mt-4">
                My journey began with a curiosity for how things work under the hood. This led me to specialize as a <strong>Backend Developer</strong>,
                where I architect logic, manage databases, and ensure secure data flow for complex applications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Professional Background</h2>
              <p>
                As a software engineer, I focus on creating high-performance systems using <strong>Spring Boot</strong> and modern cloud technologies. As a dedicated <strong>Spring Boot Developer</strong>, I build solutions that are not just functional but also maintainable and efficient.
              </p>
              <p className="mt-4">
                I have experience integrating complex services, from payment gateways to real-time communication protocols.
                My work emphasizes <strong>Clean Architecture</strong>, <strong>Domain-Driven Design (DDD)</strong>, and <strong>DevOps</strong> practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">What I Do</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Backend Development:</strong> Architecting RESTful APIs and Microservices as a Software Engineer and Spring Boot Developer.</li>
                <li><strong>Database Management:</strong> Designing optimized schemas for PostgreSQL and MySQL.</li>
                <li><strong>DevOps & Cloud:</strong> Deploying applications using Docker, Kubernetes, and AWS.</li>
                <li><strong>System Design:</strong> focusing on scalability, security, and performance.</li>
              </ul>
            </section>
          </div>

          {/* Sidebar / Image */}
          <div className="space-y-8">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <Image
                src="/profile.jpg"
                alt="MD Ashikur Rahman Puspo - Backend Developer"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
                quality={75}
              />
            </div>

            <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-4">Connect with MD Ashikur Rahman Puspo</h3>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/pacman-cli" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">GitHub</a>
                <a href="https://www.linkedin.com/in/iampuspo/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">LinkedIn</a>
                <a href="mailto:puspopuspo520@gmail.com" className="text-emerald-600 hover:underline">Email</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
