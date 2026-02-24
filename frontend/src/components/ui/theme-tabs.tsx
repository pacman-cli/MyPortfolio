import { Theme } from "@/components/ui/theme"

export const ThemeTabs = () => {

  return (
    <div className="flex items-center gap-3">
      {/* We use only the small one to replace existing toggle seamlessly or both for demo */}
      <Theme
        variant="tabs"
        size="sm"
        themes={["light", "dark", "system"]}
      />
    </div>
  )
}
