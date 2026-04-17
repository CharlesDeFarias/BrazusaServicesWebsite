import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('globals.css design system', () => {
  const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf-8')

  it('defines warm gray variables', () => {
    expect(css).toContain('--color-warm-gray-light')
    expect(css).toContain('--color-warm-gray:')
    expect(css).toContain('--color-warm-gray-dark')
    expect(css).toContain('--color-warm-gray-darker')
    expect(css).toContain('--color-warm-gray-darkest')
    expect(css).toContain('--color-linen-dark')
  })

  it('defines rgba overlay variables', () => {
    expect(css).toContain('--color-navy-subtle')
    expect(css).toContain('--color-navy-dim')
    expect(css).toContain('--color-navy-muted')
    expect(css).toContain('--color-white-faint')
    expect(css).toContain('--color-white-mid')
  })

  it('uses CSS variables in body instead of hardcoded hex', () => {
    expect(css).not.toContain('background-color: #F2EDE6')
    expect(css).not.toContain('color: #0B1D2E')
  })
})
