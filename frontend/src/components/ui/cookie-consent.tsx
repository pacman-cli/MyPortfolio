"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./button"

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent")
    if (hasConsented) return

    // Defer showing consent until after initial LCP calculation and main-thread idle
    const show = () => setShowConsent(true)

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => {
          setTimeout(show, 2500)
        },
        { timeout: 4000 }
      )
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle)
        }
      }
    } else {
      const timer = setTimeout(show, 3500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!showConsent) return
    const dialog = dialogRef.current
    if (!dialog) return

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showConsent])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 md:max-w-md animate-hero-fade"
    >
      <div className="bg-background/95 border border-border shadow-2xl p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We use cookies to analyze site traffic and enhance your experience. By accepting, you consent to our use of cookies.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleAccept} className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold">
            Accept All
          </Button>
          <Button onClick={handleDecline} variant="outline" className="w-full sm:w-auto">
            Decline Essential
          </Button>
        </div>
      </div>
    </div>
  )
}
