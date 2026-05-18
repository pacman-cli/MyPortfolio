"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { Loader2, Send, MapPin, Mail, ArrowUpRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { SocialHeroLinks } from '@/components/ui/social-links'
import { siteConfig } from '@/lib/site'

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      ...SPRING_FADE_UP,
    },
  }),
}

const fieldSchemas = {
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
}

const contactSchema = z.object(fieldSchemas)

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>

export const Contact = () => {
  const prefersReducedMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validateField = (field: keyof typeof formData, value: string) => {
    const result = fieldSchemas[field].safeParse(value)
    return result.success ? '' : result.error.issues[0]?.message ?? ''
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
    }
  }

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = contactSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      setTouched({ name: true, email: true, message: true })
      return
    }

    setStatus('submitting')
    setErrors({})

    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTouched({})
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-background to-blue-50/50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/10" />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-20 -left-32 w-96 h-96 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl"
              whileInView={{ x: [0, 30, 0], y: [0, -20, 0] }}
              viewport={{ once: false, margin: '200px' }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-300/15 dark:bg-blue-500/10 rounded-full blur-3xl"
              whileInView={{ x: [0, -25, 0], y: [0, 15, 0] }}
              viewport={{ once: false, margin: '200px' }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl"
              whileInView={{ scale: [1, 1.2, 1] }}
              viewport={{ once: false, margin: '200px' }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING_FADE_UP}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ...SPRING_FADE_UP }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for opportunities
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Let&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
              connect
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left side — info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={SPRING_FADE_UP}
          >
            {/* Contact info cards */}
            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-emerald-300/50 dark:hover:border-emerald-700/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{siteConfig.email}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-4">Find me on</p>
              <SocialHeroLinks className="flex flex-wrap gap-3" />
            </div>

            {/* Decorative quote */}
            <motion.div
              className="hidden lg:block p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/10 border border-emerald-200/30 dark:border-emerald-800/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, ...SPRING_FADE_UP }}
            >
              <Sparkles className="w-5 h-5 text-emerald-500 mb-3" />
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;The best way to predict the future is to create it.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">— Abraham Lincoln</p>
            </motion.div>
          </motion.div>

          {/* Right side — form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, ...SPRING_FADE_UP }}
          >
            <div className="relative p-8 md:p-10 rounded-3xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-xl shadow-emerald-500/5">
              {/* Subtle gradient border glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-200/20 via-transparent to-blue-200/20 dark:from-emerald-500/10 dark:via-transparent dark:to-blue-500/10 -z-10 blur-sm" />

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="space-y-2" custom={0} variants={fieldVariants}>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Your name"
                    className={cn(
                      'h-12 rounded-xl bg-muted/50 border-border/50 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300',
                      errors.name && 'border-destructive focus-visible:ring-destructive'
                    )}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive" role="alert">
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                <motion.div className="space-y-2" custom={1} variants={fieldVariants}>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="you@example.com"
                    className={cn(
                      'h-12 rounded-xl bg-muted/50 border-border/50 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300',
                      errors.email && 'border-destructive focus-visible:ring-destructive'
                    )}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive" role="alert">
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div className="space-y-2" custom={2} variants={fieldVariants}>
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={cn(
                      'resize-none rounded-xl bg-muted/50 border-border/50 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300',
                      errors.message && 'border-destructive focus-visible:ring-destructive'
                    )}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive" role="alert">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.div custom={3} variants={fieldVariants} aria-live="polite">
                  {status === 'error' && (
                    <p className="text-sm text-destructive mb-3" role="alert">
                      Failed to send message. Please try again.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                    className={cn(
                      'w-full h-12 rounded-xl text-base font-semibold transition-all duration-500',
                      status === 'success'
                        ? 'bg-emerald-500 hover:bg-emerald-500'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]'
                    )}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : status === 'success' ? (
                      'Message Sent!'
                    ) : status === 'error' ? (
                      'Failed to Send'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
