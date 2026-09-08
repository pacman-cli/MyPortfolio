import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('should merge classes correctly', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4')
  })

  it('should handle conditional classes', () => {
    expect(cn('a', true && 'b', false && 'c')).toBe('a b')
  })

  it('merges linear-style background and border classes cleanly', () => {
    expect(cn('bg-zinc-950 border-zinc-800', 'p-4')).toBe('bg-zinc-950 border-zinc-800 p-4')
  })
})
