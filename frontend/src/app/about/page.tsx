import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Puspo | Backend Engineer & Software Developer',
  description: 'Learn about Puspo (MD. Ashikur Rahman), a Backend Engineer specializing in Spring Boot, Go, and Cloud Architecture. Discover his journey, skills, and professional background.',
  openGraph: {
    title: 'About Puspo | Backend Engineer',
    description: 'Who is Puspo? A dedicated software engineer building scalable backend systems.',
    url: 'https://puspo.online/about',
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header Section */}
        <section className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-emerald-600 dark:text-emerald-400">Puspo</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Computer Science Student, Backend Engineer, and Problem Solver.
          </p>
        </section>

        {/* Narrative Content */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Main Text */}
          <div className="md:col-span-2 space-y-8 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Who is Puspo?</h2>
              <p>
                I am <strong>MD. Ashikur Rahman (known professionally as Puspo)</strong>, a passionate Software Developer and Backend Engineer based in Dhaka, Bangladesh.
                Currently completing my degree in Computer Science & Engineering at United International University, I have dedicated myself to mastering the art of building robust, scalable digital systems.
              </p>
              <p className="mt-4">
                My journey began with a curiosity for how things work under the hood. This led me to specialize in <strong>Backend Engineering</strong>,
                where I architect logic, manage databases, and ensure secure data flow for complex applications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Professional Background</h2>
              <p>
                As a software developer, I focus on creating high-performance systems using <strong>Spring Boot (Java)</strong>, <strong>Go (Golang)</strong>, and modern cloud technologies.
                I build solutions that are not just functional but also maintainable and efficient.
              </p>
              <p className="mt-4">
                I have experience integrating complex services, from payment gateways (Stripe, SSLCommerz) to real-time communication protocols (WebSocket).
                My work emphasizes <strong>Clean Architecture</strong>, <strong>Domain-Driven Design (DDD)</strong>, and <strong>DevOps</strong> practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">What I Do</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Backend Development:</strong> Architecting RESTful APIs and Microservices with Spring Boot and Go.</li>
                <li><strong>Database Management:</strong> Designing optimized schemas for PostgreSQL and MySQL.</li>
                <li><strong>DevOps & Cloud:</strong> Deploying applications using Docker, Kubernetes, and AWS.</li>
                <li><strong>System Design:</strong> focusing on scalability, security, and performance optimization.</li>
              </ul>
            </section>
          </div>

          {/* Sidebar / Image */}
          <div className="space-y-8">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <Image
                src="/profile.jpg"
                alt="MD. Ashikur Rahman Puspo - Backend Engineer"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-4">Connect with Puspo</h3>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/pacman-cli" className="text-emerald-600 hover:underline">GitHub Profile</a>
                <a href="https://www.linkedin.com/in/iampuspo/" className="text-emerald-600 hover:underline">LinkedIn Profile</a>
                <a href="mailto:puspopuspo520@gmail.com" className="text-emerald-600 hover:underline">puspopuspo520@gmail.com</a>
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
