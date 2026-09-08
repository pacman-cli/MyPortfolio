import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { SelectedWork } from "@/components/sections/selected-work"

describe("SelectedWork Section", () => {
  it("renders section heading", () => {
    render(<SelectedWork projects={[]} />)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })
})
