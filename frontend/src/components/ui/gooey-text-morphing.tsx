"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const reducedMotion = React.useRef(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches

    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[texts.length - 1] ?? ""
      text1Ref.current.style.opacity = "0%"
      text2Ref.current.textContent = texts[0] ?? ""
      text2Ref.current.style.opacity = "100%"
    }

    if (reducedMotion.current) return

    let textIndex = texts.length - 1
    let time = 0
    let morph = 0
    let cooldown = cooldownTime
    let animationFrameId: number
    let isVisible = true

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

        fraction = 1 - fraction
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      }
    }

    const doCooldown = () => {
      morph = 0
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = ""
        text2Ref.current.style.opacity = "100%"
        text1Ref.current.style.filter = ""
        text1Ref.current.style.opacity = "0%"
      }
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime

      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }

      setMorph(fraction)
    }

    function animate(timestamp: number) {
      if (!isVisible) return

      animationFrameId = requestAnimationFrame(animate)
      const shouldIncrementIndex = cooldown > 0
      const dt = time === 0 ? 0 : (timestamp - time) / 1000
      time = timestamp

      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          time = 0
          animationFrameId = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [texts, morphTime, cooldownTime])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="relative h-full w-full"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 left-0 w-full text-center lg:text-left select-none whitespace-nowrap",
            textClassName
          )}
          aria-hidden="true"
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 left-0 w-full text-center lg:text-left select-none whitespace-nowrap",
            textClassName
          )}
          aria-hidden="true"
        />
        {/* Accessible text for screen readers */}
        <span className="sr-only">{texts.join(', ')}</span>
      </div>
    </div>
  )
}
