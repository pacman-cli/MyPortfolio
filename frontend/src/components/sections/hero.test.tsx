import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Hero } from "@/components/sections/hero"

describe("Hero Section Component", () => {
  it("renders main title and call to action", () => {
    render(<Hero />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })
})
