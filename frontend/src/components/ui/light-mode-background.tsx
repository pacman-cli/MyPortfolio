"use client"

export const LightModeBackground = () => {
  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden dark:hidden" aria-hidden="true">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-[15%] -right-[5%] w-[60%] h-[60%] bg-gradient-to-tl from-emerald-200/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-300/20 rounded-full blur-2xl" />
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-teal-200/20 rounded-full blur-2xl" />
    </div>
  )
}
