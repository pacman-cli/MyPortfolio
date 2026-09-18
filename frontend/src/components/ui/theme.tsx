"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const themeIcons = { light: Sun, dark: Moon, system: Monitor }
const themeLabels = { light: "Light theme", dark: "Dark theme", system: "System theme" }

type ThemeType = "light" | "dark" | "system"

export function Theme({
  size = "sm",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const themes: ThemeType[] = ["light", "dark", "system"]

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  if (!isMounted) return null

  return (
    <div className={cn("inline-flex items-center rounded-lg border p-1 border-border bg-muted", className)} role="group" aria-label="Select theme">
      {themes.map((t) => {
        const Icon = themeIcons[t]
        const isSelected = theme === t
        return (
          <button
            key={t}
            type="button"
            aria-label={themeLabels[t]}
            aria-pressed={isSelected}
            onClick={() => setTheme(t)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all cursor-pointer",
              size === "sm" ? "h-6 px-2" : size === "md" ? "h-7 px-3" : "h-8 px-4",
              isSelected ? "bg-background text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={size === "sm" ? 12 : size === "md" ? 14 : 16} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
