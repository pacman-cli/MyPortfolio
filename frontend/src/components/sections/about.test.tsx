import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { About } from "@/components/sections/about"

describe("About Section Component", () => {
  it("renders section heading", () => {
    render(<About />)
    expect(screen.getByRole("heading", { level: 2, name: /about me/i })).toBeInTheDocument()
  })
})
