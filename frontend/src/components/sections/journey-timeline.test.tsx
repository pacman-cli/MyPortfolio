import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { JourneyTimeline } from "@/components/sections/journey-timeline"

describe("JourneyTimeline Section Component", () => {
  it("renders section heading", () => {
    render(<JourneyTimeline />)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })
})
