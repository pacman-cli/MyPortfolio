import { FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-center pt-20 pb-16 border-b border-border/50"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Editorial Content */}
        <div className="flex flex-col items-start gap-6">
          <div className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase">
            01 // INTRO
          </div>

          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase"
          >
            MD ASHIKUR RAHMAN PUSPO
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Backend Software Engineer building resilient microservices and high-throughput systems with Java & Spring Boot. Focused on performance, clarity, and scalable architecture.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="#projects"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
            >
              Projects
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              <FileText className="w-4 h-4" />
              Resume
            </Link>
          </div>
        </div>

        {/* Minimalist Portrait */}
        <div className="relative aspect-[4/5] w-full max-w-sm rounded-lg overflow-hidden border border-border">
          <Image
            src="/profile.webp"
            alt="MD Ashikur Rahman Puspo"
            fill
            priority
            className="object-cover grayscale contrast-105"
          />
        </div>

      </div>
    </section>
  )
}
