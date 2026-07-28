import Script from "next/script"

interface AdsterraPopunderProps {
  enabled?: boolean
}

export function AdsterraPopunder({ enabled = true }: AdsterraPopunderProps) {
  if (!enabled) return null

  return (
    <Script
      id="adsterra-popunder"
      src="https://pl30581252.effectivecpmnetwork.com/50/99/fe/5099feda8c8a88596b433fc62be99732.js"
      strategy="afterInteractive"
    />
  )
}
