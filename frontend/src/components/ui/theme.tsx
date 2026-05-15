"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const themeIcons = { light: Sun, dark: Moon, system: Monitor }

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
    <Tabs value={theme} onValueChange={(v) => setTheme(v as ThemeType)} className={cn(className)}>
      <TabsList className="inline-flex items-center rounded-lg border p-1 border-border bg-muted" aria-label="Select theme">
        {themes.map((t) => {
          const Icon = themeIcons[t]
          const isSelected = theme === t
          return (
            <TabsTrigger
              key={t}
              value={t}
              aria-label={`${t.charAt(0).toUpperCase() + t.slice(1)} theme`}
              className={cn(
                "relative inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all cursor-pointer",
                size === "sm" ? "h-6 px-2" : size === "md" ? "h-7 px-3" : "h-8 px-4",
                isSelected && "text-foreground"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="segmented-bg"
                  className="absolute inset-0 rounded-md bg-white dark:bg-slate-800 shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-1">
                <Icon size={size === "sm" ? 12 : size === "md" ? 14 : 16} />
              </div>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
