import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Home from "@/app/page"

vi.mock("@/lib/api", () => ({
  getBlogSummaries: async () => [],
}))

vi.mock("@/lib/projects", () => ({
  getProjects: async () => [],
}))

describe("Home Page Component", () => {
  it("renders main container element", async () => {
    const Component = await Home()
    render(Component)
    expect(screen.getByRole("main")).toBeInTheDocument()
  })
})
