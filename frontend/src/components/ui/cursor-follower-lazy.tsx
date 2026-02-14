"use client"

import dynamic from "next/dynamic"

const CursorFollower = dynamic(
  () => import("@/components/ui/cursor-follower").then((mod) => ({ default: mod.CursorFollower })),
  { ssr: false }
)

export const LazyCursorFollower = () => <CursorFollower />
