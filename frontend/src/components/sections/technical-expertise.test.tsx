import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { TechnicalExpertise } from "@/components/sections/technical-expertise"

describe("TechnicalExpertise Section Component", () => {
  it("renders section heading", () => {
    render(<TechnicalExpertise />)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })
})
