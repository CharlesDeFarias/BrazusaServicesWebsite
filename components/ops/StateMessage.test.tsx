import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { EmptyState, ErrorState } from './StateMessage'

describe('EmptyState', () => {
  it('renders the existing standalone empty-state classes', () => {
    expect(renderToStaticMarkup(<EmptyState>Nothing scheduled.</EmptyState>)).toBe(
      '<p class="text-warm-gray-dark text-sm">Nothing scheduled.</p>'
    )
  })

  it('renders the existing contained empty-state classes', () => {
    expect(renderToStaticMarkup(<EmptyState contained>No billable tasks.</EmptyState>)).toBe(
      '<p class="px-3 py-3 text-warm-gray-dark text-sm">No billable tasks.</p>'
    )
  })
})

describe('ErrorState', () => {
  it('renders the existing error classes', () => {
    expect(renderToStaticMarkup(<ErrorState>Could not load Airtable.</ErrorState>)).toBe(
      '<p class="text-red-600 text-sm">Could not load Airtable.</p>'
    )
  })

  it('renders the existing payroll warning classes', () => {
    expect(renderToStaticMarkup(<ErrorState tone="warning">Feed unavailable.</ErrorState>)).toBe(
      '<p class="text-amber-700 text-sm">Feed unavailable.</p>'
    )
  })
})
