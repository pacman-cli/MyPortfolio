"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { SectionDivider } from '@/components/ui/section-divider'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/v1/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/50">
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    aria-required="true"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    aria-required="true"
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    aria-required="true"
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div aria-live="polite" className="text-center">
                  {status === 'error' && (
                    <p className="text-sm text-red-500 mb-2" role="alert">Failed to send message. Please try again.</p>
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
                </div>
              </form>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
