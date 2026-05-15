export const AvailabilityBadge = ({ label = "Available for opportunities" }: { label?: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 shadow-[0_12px_36px_rgba(16,185,129,0.10),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl dark:bg-slate-950/45 dark:text-emerald-300">
    <span className="relative flex h-2 w-2">
      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    <span>{label}</span>
  </span>
)
