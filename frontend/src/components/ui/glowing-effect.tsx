import { cn } from "@/lib/utils"

interface GlowingEffectProps {
  className?: string
  disabled?: boolean
  borderWidth?: number
}

const GlowingEffect = ({
  className,
  disabled = false,
  borderWidth = 2,
}: GlowingEffectProps) => {
  if (disabled) return null

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="h-full w-full rounded-[inherit]"
        style={{
          padding: borderWidth,
          background:
            "conic-gradient(from 0deg, #10b981, #34d399, #059669, #34d399, #10b981)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </div>
  )
}

GlowingEffect.displayName = "GlowingEffect"

export { GlowingEffect }
