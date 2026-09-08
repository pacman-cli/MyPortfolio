import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock Next.js dynamic import
vi.mock('next/dynamic', () => ({
  default: () => {
    const Component: React.FC<Record<string, unknown>> = () => {
      // Very simple mock that just returns a div for dynamic components
      return null
    }
    return Component
  },
}))

// Mock IntersectionObserver
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
}

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        const Component = ({ children, whileTap, whileHover, animate, initial, exit, transition, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => {
          const Tag = prop as keyof React.JSX.IntrinsicElements
          return <Tag {...(props as Record<string, unknown>)}>{children}</Tag>
        }
        return Component
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => true,
}))
