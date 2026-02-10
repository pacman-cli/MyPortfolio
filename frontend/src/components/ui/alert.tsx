import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle, Info, XCircle, Zap } from 'lucide-react'

type AlertType = 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION'

interface AlertProps {
  type: AlertType
  title?: string
  children: React.ReactNode
}

const ALERT_CONFIG: Record<AlertType, { icon: React.ElementType, color: string, bg: string, border: string, titleColor: string }> = {
  NOTE: {
    icon: Info,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900",
    titleColor: "text-blue-800 dark:text-blue-300"
  },
  TIP: {
    icon: Zap,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900",
    titleColor: "text-emerald-800 dark:text-emerald-300"
  },
  IMPORTANT: {
    icon: CheckCircle,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50/50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-900",
    titleColor: "text-purple-800 dark:text-purple-300"
  },
  WARNING: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50/50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900",
    titleColor: "text-amber-800 dark:text-amber-300"
  },
  CAUTION: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50/50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-900",
    titleColor: "text-red-800 dark:text-red-300"
  }
}

export const Alert = ({ type, title, children }: AlertProps) => {
  const config = ALERT_CONFIG[type] || ALERT_CONFIG.NOTE
  const Icon = config.icon

  return (
    <div className={cn(
      "my-6 p-4 rounded-xl border flex gap-4 overflow-hidden",
      config.bg,
      config.border
    )}>
      <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.color)} />
      <div className="flex-1 min-w-0">
        <h5 className={cn("font-semibold mb-1", config.titleColor)}>
          {title || type}
        </h5>
        <div className="text-sm text-foreground/90 leading-relaxed [&>p:last-child]:mb-0 [&>p]:mb-2">
          {children}
        </div>
      </div>
    </div>
  )
}
