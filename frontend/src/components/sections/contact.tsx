"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { SPRING_FADE_UP } from '@/lib/animations'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
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
    <section id="contact" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <SectionDivider />
            <p className="mt-4 text-muted-foreground">
              Have a project in mind? Let&apos;s discuss how we can work together.
            </p>
          </div>
        </Reveal>

        <Reveal width="100%">
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="space-y-2" custom={0} variants={fieldVariants}>
                  <Label htmlFor="name">Name</Label>
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
                    className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive" role="alert">
                      {errors.name}
                    </p>
                  )}
                </motion.div>
                <motion.div className="space-y-2" custom={1} variants={fieldVariants}>
                  <Label htmlFor="email">Email</Label>
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
                    className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive" role="alert">
                      {errors.email}
                    </p>
                  )}
                </motion.div>
                <motion.div className="space-y-2" custom={2} variants={fieldVariants}>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={4}
                    className={cn('resize-none', errors.message && 'border-destructive focus-visible:ring-destructive')}
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

                <motion.div custom={3} variants={fieldVariants} aria-live="polite" className="text-center">
                  {status === 'error' && (
                    <p className="text-sm text-destructive mb-2" role="alert">
                      Failed to send message. Please try again.
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
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
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
