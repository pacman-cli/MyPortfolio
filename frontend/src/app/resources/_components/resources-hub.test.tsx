import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ResourcesHub } from './resources-hub'
import type { AIResourceItem } from '@/data/ai-resources'

const MOCK_RESOURCES: AIResourceItem[] = [
  {
    id: 'gemini-api',
    name: 'Google Gemini API',
    category: 'llm-apis',
    summary: 'Generous free tier for Gemini 2.0 Flash with 15 RPM and 1,500 RPD.',
    freeTierDetails: '1,500 requests per day at $0.',
    models: ['Gemini 2.0 Flash', 'Gemini 1.5 Pro'],
    signupUrl: 'https://aistudio.google.com/',
    noCreditCard: true,
    bestUseCases: 'Multimodal apps and structured outputs.',
    tags: ['Multimodal', 'LLM API', 'Long Context', 'No Credit Card'],
  },
  {
    id: 'modal-gpu',
    name: 'Modal Serverless GPU',
    category: 'gpu-compute',
    summary: 'Run Python containers on cloud GPUs with $30/month free tier.',
    freeTierDetails: '$30/month recurring compute credits.',
    hardware: ['A100', 'H100', 'T4', 'A10G'],
    signupUrl: 'https://modal.com/',
    noCreditCard: false,
    bestUseCases: 'Serverless batch inference and fine-tuning.',
    tags: ['GPU Compute', 'Serverless', 'Python'],
  },
  {
    id: 'github-student-pack',
    name: 'GitHub Student Pack',
    category: 'programs-startups',
    summary: 'Massive student benefits including free Copilot, Azure, and DO.',
    freeTierDetails: 'Over $1,000 in software tools and credits.',
    benefits: ['Free GitHub Copilot', '$100 Azure credits'],
    eligibility: 'Enrolled students with academic email or ID.',
    signupUrl: 'https://education.github.com/pack',
    noCreditCard: true,
    bestUseCases: 'All-in-one student developer pack.',
    tags: ['Student Program', 'Free Tools', 'Copilot'],
  },
  {
    id: 'codeium-assistant',
    name: 'Codeium',
    category: 'coding-assistants',
    summary: 'Unlimited fast AI code completions in any IDE.',
    freeTierDetails: 'Free unlimited code autocomplete for individuals.',
    supportedIdes: ['VS Code', 'JetBrains', 'Neovim'],
    models: ['Codeium Proprietary'],
    signupUrl: 'https://codeium.com/',
    noCreditCard: true,
    bestUseCases: 'Best free alternative to paid Copilot.',
    tags: ['Coding Assistant', 'Autocomplete', 'No Credit Card'],
  },
]

describe('ResourcesHub Component', () => {
  it('renders search input, category tabs, filter toggle, and all resources initially', () => {
    render(<ResourcesHub initialResources={MOCK_RESOURCES} />)

    // Search input
    expect(
      screen.getByPlaceholderText(/Search by name, summary, tags, models/i)
    ).toBeInTheDocument()

    // Category tabs
    expect(screen.getByRole('button', { name: /^All/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Free LLM APIs/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /GPU Compute/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Student & Startup Programs/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Coding Assistants/i })
    ).toBeInTheDocument()

    // No CC Toggle
    expect(
      screen.getByRole('button', { name: /No Credit Card Required/i })
    ).toBeInTheDocument()

    // Active counter
    expect(screen.getByText('Showing 4 resources')).toBeInTheDocument()

    // All resources rendered
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.getByText('Modal Serverless GPU')).toBeInTheDocument()
    expect(screen.getByText('GitHub Student Pack')).toBeInTheDocument()
    expect(screen.getByText('Codeium')).toBeInTheDocument()
  })

  it('filters resources by instant search query across name, summary, tags, and models', () => {
    render(<ResourcesHub initialResources={MOCK_RESOURCES} />)

    const searchInput = screen.getByPlaceholderText(
      /Search by name, summary, tags, models/i
    )

    // Filter by name
    fireEvent.change(searchInput, { target: { value: 'gemini' } })
    expect(screen.getByText('Showing 1 of 4 resources')).toBeInTheDocument()
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.queryByText('Modal Serverless GPU')).not.toBeInTheDocument()

    // Filter by model
    fireEvent.change(searchInput, { target: { value: '1.5 Pro' } })
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.queryByText('Codeium')).not.toBeInTheDocument()

    // Filter by tag
    fireEvent.change(searchInput, { target: { value: 'Autocomplete' } })
    expect(screen.getByText('Codeium')).toBeInTheDocument()
    expect(screen.queryByText('Google Gemini API')).not.toBeInTheDocument()

    // Filter by benefit
    fireEvent.change(searchInput, { target: { value: 'Azure credits' } })
    expect(screen.getByText('GitHub Student Pack')).toBeInTheDocument()
    expect(screen.queryByText('Codeium')).not.toBeInTheDocument()
  })

  it('filters resources by category tabs', () => {
    render(<ResourcesHub initialResources={MOCK_RESOURCES} />)

    // Click 'Free LLM APIs' tab
    const llmTab = screen.getByRole('button', { name: /Free LLM APIs/i })
    fireEvent.click(llmTab)

    expect(screen.getByText('Showing 1 of 4 resources')).toBeInTheDocument()
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.queryByText('Modal Serverless GPU')).not.toBeInTheDocument()

    // Click 'GPU Compute' tab
    const gpuTab = screen.getByRole('button', { name: /GPU Compute/i })
    fireEvent.click(gpuTab)

    expect(screen.getByText('Modal Serverless GPU')).toBeInTheDocument()
    expect(screen.queryByText('Google Gemini API')).not.toBeInTheDocument()

    // Click 'All' tab to restore
    const allTab = screen.getByRole('button', { name: /^All/i })
    fireEvent.click(allTab)
    expect(screen.getByText('Showing 4 resources')).toBeInTheDocument()
  })

  it('filters resources by No Credit Card Required toggle', () => {
    render(<ResourcesHub initialResources={MOCK_RESOURCES} />)

    const noCcButton = screen.getByRole('button', {
      name: /No Credit Card Required/i,
    })

    // Activate No CC filter
    fireEvent.click(noCcButton)

    // Modal requires CC so should be excluded (3 out of 4 remain)
    expect(screen.getByText('Showing 3 of 4 resources')).toBeInTheDocument()
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.getByText('GitHub Student Pack')).toBeInTheDocument()
    expect(screen.getByText('Codeium')).toBeInTheDocument()
    expect(screen.queryByText('Modal Serverless GPU')).not.toBeInTheDocument()

    // Deactivate
    fireEvent.click(noCcButton)
    expect(screen.getByText('Showing 4 resources')).toBeInTheDocument()
    expect(screen.getByText('Modal Serverless GPU')).toBeInTheDocument()
  })

  it('shows empty state with reset button when no items match, and resets properly', () => {
    render(<ResourcesHub initialResources={MOCK_RESOURCES} />)

    const searchInput = screen.getByPlaceholderText(
      /Search by name, summary, tags, models/i
    )
    fireEvent.change(searchInput, { target: { value: 'non-existent-xyz-query' } })

    expect(screen.getByText('No resources match your filters')).toBeInTheDocument()
    expect(screen.getByText('Showing 0 of 4 resources')).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: /Reset All Filters/i })
    fireEvent.click(resetButton)

    // Should restore all resources
    expect(screen.getByText('Showing 4 resources')).toBeInTheDocument()
    expect(screen.getByText('Google Gemini API')).toBeInTheDocument()
    expect(screen.getByText('Modal Serverless GPU')).toBeInTheDocument()
  })

  it('renders rich card details including No CC badge, allocation, tags, and Access button', () => {
    render(<ResourcesHub initialResources={MOCK_RESOURCES} />)

    const geminiCard = screen.getByTestId('resource-card-gemini-api')
    expect(geminiCard).toBeInTheDocument()

    // Badges inside Gemini card
    expect(geminiCard).toHaveTextContent('Free LLM APIs')
    expect(geminiCard).toHaveTextContent('No CC')
    expect(geminiCard).toHaveTextContent('1,500 requests per day at $0.')
    expect(geminiCard).toHaveTextContent('Gemini 2.0 Flash')
    expect(geminiCard).toHaveTextContent('#Multimodal')

    // Access / Claim button with link
    const accessLink = screen.getByLabelText(
      'Access or claim free tier for Google Gemini API'
    )
    expect(accessLink).toHaveAttribute('href', 'https://aistudio.google.com/')
    expect(accessLink).toHaveAttribute('target', '_blank')
  })
})
