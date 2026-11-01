import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ResourcesPage from './page'
import { AI_RESOURCES } from '@/data/ai-resources'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/resources',
}))

describe('Resources Page Integration Tests', () => {
  it('renders all category tabs and filters items accurately when clicked', () => {
    render(<ResourcesPage />)

    const allTab = screen.getByRole('button', { name: /^All/i })
    const llmTab = screen.getByRole('button', { name: /Free LLM APIs/i })
    const gpuTab = screen.getByRole('button', { name: /GPU Compute/i })
    const programsTab = screen.getByRole('button', {
      name: /Student & Startup Programs/i,
    })
    const codingTab = screen.getByRole('button', {
      name: /Coding Assistants/i,
    })

    // Verify all category tabs are rendered
    expect(allTab).toBeInTheDocument()
    expect(llmTab).toBeInTheDocument()
    expect(gpuTab).toBeInTheDocument()
    expect(programsTab).toBeInTheDocument()
    expect(codingTab).toBeInTheDocument()

    // Initially "All" is active
    expect(allTab).toHaveAttribute('aria-pressed', 'true')
    expect(llmTab).toHaveAttribute('aria-pressed', 'false')

    // Filter by Coding Assistants
    fireEvent.click(codingTab)
    expect(codingTab).toHaveAttribute('aria-pressed', 'true')
    expect(allTab).toHaveAttribute('aria-pressed', 'false')

    const codingCount = AI_RESOURCES.filter(
      (r) => r.category === 'coding-assistants'
    ).length
    expect(
      screen.getByText(`Showing ${codingCount} of ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
    expect(screen.getByText('GitHub Copilot Free')).toBeInTheDocument()
    expect(screen.queryByText('Google Gemini API')).not.toBeInTheDocument()

    // Filter by Free LLM APIs
    fireEvent.click(llmTab)
    expect(llmTab).toHaveAttribute('aria-pressed', 'true')
    expect(codingTab).toHaveAttribute('aria-pressed', 'false')

    const llmCount = AI_RESOURCES.filter((r) => r.category === 'llm-apis').length
    expect(
      screen.getByText(`Showing ${llmCount} of ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.queryByText('GitHub Copilot Free')).not.toBeInTheDocument()

    // Filter by GPU Compute
    fireEvent.click(gpuTab)
    expect(gpuTab).toHaveAttribute('aria-pressed', 'true')
    const gpuCount = AI_RESOURCES.filter(
      (r) => r.category === 'gpu-compute'
    ).length
    expect(
      screen.getByText(`Showing ${gpuCount} of ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
    expect(screen.queryByText('Google Gemini API')).not.toBeInTheDocument()

    // Filter by Student & Startup Programs
    fireEvent.click(programsTab)
    expect(programsTab).toHaveAttribute('aria-pressed', 'true')
    const programsCount = AI_RESOURCES.filter(
      (r) => r.category === 'programs-startups'
    ).length
    expect(
      screen.getByText(
        `Showing ${programsCount} of ${AI_RESOURCES.length} resources`
      )
    ).toBeInTheDocument()
    expect(screen.queryByText('Google Gemini API')).not.toBeInTheDocument()

    // Switch back to "All"
    fireEvent.click(allTab)
    expect(allTab).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByText(`Showing ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
  })

  it('filters items accurately using search query and allows clearing', () => {
    render(<ResourcesPage />)

    const searchInput = screen.getByRole('textbox', {
      name: /search free developer resources/i,
    })

    // Search by resource name
    fireEvent.change(searchInput, { target: { value: 'Gemini' } })
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.queryByText('GitHub Copilot Free')).not.toBeInTheDocument()

    // Verify counter shows subset
    expect(screen.getByText(/Showing \d+ of \d+ resources/i)).toBeInTheDocument()

    // Clear search using the clear button
    const clearButton = screen.getByRole('button', {
      name: /clear search query/i,
    })
    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton)

    // All resources restored
    expect(
      screen.getByText(`Showing ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
    expect(screen.getByText('GitHub Copilot Free')).toBeInTheDocument()
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
  })

  it('toggles "No Credit Card Required" filter correctly', () => {
    render(<ResourcesPage />)

    const noCcToggle = screen.getByRole('button', {
      name: /no credit card required/i,
    })

    // Initially false
    expect(noCcToggle).toHaveAttribute('aria-pressed', 'false')

    // Click to enable No Credit Card filter
    fireEvent.click(noCcToggle)
    expect(noCcToggle).toHaveAttribute('aria-pressed', 'true')

    const noCcTotal = AI_RESOURCES.filter((r) => r.noCreditCard).length
    expect(
      screen.getByText(`Showing ${noCcTotal} of ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()

    // Every rendered resource card should have the No CC badge
    const noCcBadges = screen.getAllByTitle('No credit card required for signup')
    expect(noCcBadges.length).toBeGreaterThan(0)

    // Items that require a credit card should not be visible
    const itemsRequiringCc = AI_RESOURCES.filter((r) => !r.noCreditCard)
    if (itemsRequiringCc.length > 0) {
      expect(screen.queryByText(itemsRequiringCc[0].name)).not.toBeInTheDocument()
    }

    // Toggle off
    fireEvent.click(noCcToggle)
    expect(noCcToggle).toHaveAttribute('aria-pressed', 'false')
    expect(
      screen.getByText(`Showing ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
  })

  it('renders empty search state when no resources match and resets filters', () => {
    render(<ResourcesPage />)

    const searchInput = screen.getByRole('textbox', {
      name: /search free developer resources/i,
    })

    // Search query with no matches
    fireEvent.change(searchInput, {
      target: { value: 'nonexistent-query-xyz-12345' },
    })

    // Empty state message and graphic
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /no resources match your filters/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/We couldn't find any resources matching your search query/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`Showing 0 of ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()

    // Reset button in empty state
    const resetFiltersButton = screen.getByRole('button', {
      name: /reset all filters/i,
    })
    expect(resetFiltersButton).toBeInTheDocument()

    fireEvent.click(resetFiltersButton)

    // All resources should be restored
    expect(
      screen.getByText(`Showing ${AI_RESOURCES.length} resources`)
    ).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })

  it('ensures direct links have target="_blank" and rel="noopener noreferrer" attributes', () => {
    render(<ResourcesPage />)

    // Fetch claim / access links
    const claimLinks = screen.getAllByRole('link', {
      name: /access or claim free tier/i,
    })

    expect(claimLinks.length).toBeGreaterThan(0)

    // Verify first 10 links have target="_blank", rel="noopener noreferrer", and valid https URL
    claimLinks.slice(0, 10).forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//)
    })
  })
})
