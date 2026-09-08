import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Navbar } from "@/components/navbar"

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("Navbar Component", () => {
  it("renders brand logo and main nav links", () => {
    render(<Navbar />)
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Projects")).toBeInTheDocument()
  })
})
