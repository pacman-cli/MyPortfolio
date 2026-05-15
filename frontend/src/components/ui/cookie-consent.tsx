"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./button"

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      // Small delay to not immediately pop up on load
      const timer = setTimeout(() => setShowConsent(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 md:max-w-md"
        >
          <div className="bg-background/95 backdrop-blur-lg border border-border shadow-2xl p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to analyze site traffic and enhance your experience. By accepting, you consent to our use of cookies.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleAccept} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white">
                Accept All
              </Button>
              <Button onClick={handleDecline} variant="outline" className="w-full sm:w-auto">
                Decline Essential
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
