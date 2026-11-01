import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ResourcesPage, { metadata } from './page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/resources',
}))

describe('Resources Page', () => {
  it('exports valid metadata for SEO with expected title and description', () => {
    expect(metadata.title).toContain('Free AI Developer Resources')
    expect(metadata.description).toContain('95+ free LLM APIs')
  })

  it('renders page header, metrics strip, and the interactive resources hub', () => {
    render(<ResourcesPage />)

    // Heading
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Free AI Developer Resources & APIs/i,
      })
    ).toBeInTheDocument()

    // Metrics strip
    expect(screen.getByText(/Total Resources/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Free LLM APIs/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/GPU Compute/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/No CC Needed/i)).toBeInTheDocument()

    // Architecture Guide
    expect(
      screen.getByText(/The Zero-Dollar Production AI Stack/i)
    ).toBeInTheDocument()
  })
})
