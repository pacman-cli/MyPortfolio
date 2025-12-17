"use client";

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Check for keys - fail fast if not configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS keys are missing in env vars.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      await emailjs.send(
        serviceId, 
        templateId, 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Puspo', // Or parameterized
        },
        publicKey
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground">
              Have a project in mind? Let's discuss how we can work together.
            </p>
          </div>
        </Reveal>

        <Reveal width="100%">
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
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
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={status === 'submitting'}>
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
              </form>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
