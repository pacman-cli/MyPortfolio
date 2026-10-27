// src/components/showcase/blocked-embed-card.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlockedEmbedCard } from './blocked-embed-card'
import { SHOWCASE_PROJECTS } from '@/data/showcase-projects'

describe('BlockedEmbedCard UI Previews', () => {
  const devforge = SHOWCASE_PROJECTS.find((p) => p.id === 'devforge')!
  const staymate = SHOWCASE_PROJECTS.find((p) => p.id === 'stay-mate')!
  const expenseTracker = SHOWCASE_PROJECTS.find((p) => p.id === 'expense-tracker')!
  const shelfToTales = SHOWCASE_PROJECTS.find((p) => p.id === 'shelf-to-tales')!

  it('renders DevForge developer tools studio preview', () => {
    render(<BlockedEmbedCard project={devforge} />)
    expect(screen.getByText('DevForge Studio')).toBeDefined()
    expect(screen.getByText('JSON Formatter')).toBeDefined()
    expect(screen.getByText('Valid JSON')).toBeDefined()
    const launchLink = screen.getByRole('link', {
      name: new RegExp(`Launch ${devforge.shortTitle}`, 'i'),
    })
    expect(launchLink.getAttribute('href')).toBe('https://devforge.puspo.online')
  })

  it('renders StayMate roommate and rental housing preview', () => {
    render(<BlockedEmbedCard project={staymate} />)
    expect(screen.getByText('StayMate')).toBeDefined()
    expect(screen.getByText(/Master Bed w\/ Balcony/i)).toBeDefined()
    expect(screen.getByText(/Cozy Studio Flat/i)).toBeDefined()
    expect(screen.getByText(/Roommate Compatibility AI/i)).toBeDefined()
    const launchLink = screen.getByRole('link', {
      name: new RegExp(`Launch ${staymate.shortTitle}`, 'i'),
    })
    expect(launchLink.getAttribute('href')).toBe(staymate.url)
  })

  it('renders Expense Tracker personal finance dashboard preview', () => {
    render(<BlockedEmbedCard project={expenseTracker} />)
    expect(screen.getByText('TakaTrack')).toBeDefined()
    expect(screen.getByText('$14,850.00')).toBeDefined()
    expect(screen.getByText(/Savings Target: Emergency Fund/i)).toBeDefined()
    const launchLink = screen.getByRole('link', {
      name: new RegExp(`Launch ${expenseTracker.shortTitle}`, 'i'),
    })
    expect(launchLink.getAttribute('href')).toBe(expenseTracker.url)
  })

  it('renders Shelf to Tales bookstore and reading catalog preview', () => {
    render(<BlockedEmbedCard project={shelfToTales} />)
    expect(screen.getByText('ShelfToTales')).toBeDefined()
    expect(screen.getByText(/Designing Systems/i)).toBeDefined()
    expect(screen.getByText(/Clean Codecraft/i)).toBeDefined()
    const launchLink = screen.getByRole('link', {
      name: new RegExp(`Launch ${shelfToTales.shortTitle}`, 'i'),
    })
    expect(launchLink.getAttribute('href')).toBe(shelfToTales.url)
  })
})
