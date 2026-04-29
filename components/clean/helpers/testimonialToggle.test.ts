import { describe, it, expect } from 'vitest'
import { toggleCategory } from './testimonialToggle'

describe('testimonialToggle', () => {
  it('opens a category when none is open', () => {
    expect(toggleCategory(null, 'str')).toBe('str')
  })

  it('closes the open category when clicking it again', () => {
    expect(toggleCategory('str', 'str')).toBeNull()
  })

  it('switches from one category to another', () => {
    expect(toggleCategory('str', 'property')).toBe('property')
  })

  it('opens any valid category from null', () => {
    expect(toggleCategory(null, 'offices')).toBe('offices')
    expect(toggleCategory(null, 'homes')).toBe('homes')
    expect(toggleCategory(null, 'other')).toBe('other')
  })
})
