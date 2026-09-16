export const AvailabilityBadge = ({ label = "Open to Backend & Full-Stack Opportunities" }: { label?: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-mono font-medium tracking-tight text-emerald-800 dark:text-emerald-300 dark:border-emerald-500/30 dark:bg-emerald-500/10">
    <span className="relative flex h-1.5 w-1.5">
      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
    </span>
    <span>{label}</span>
  </span>
)
