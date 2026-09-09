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
        const Component = ({ children, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => {
          const restProps = { ...props }
          delete restProps.whileTap
          delete restProps.whileHover
          delete restProps.whileInView
          delete restProps.animate
          delete restProps.initial
          delete restProps.exit
          delete restProps.transition
          delete restProps.viewport
          const Tag = prop as keyof React.JSX.IntrinsicElements
          return <Tag {...(restProps as Record<string, unknown>)}>{children}</Tag>
        }
        return Component
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => true,
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useSpring: (v: unknown) => v,
  useTransform: (v: unknown, _in: unknown, out: Array<unknown>) => out ? out[0] : v,
}))
