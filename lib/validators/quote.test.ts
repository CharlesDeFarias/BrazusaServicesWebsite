import { describe, it, expect } from 'vitest'
import { validateQuote } from '@/lib/validators/quote'

const validBase = {
  clientId: 'brazusa-cleaning',
  name: 'Jane Smith',
  contact: 'jane@example.com',
  contactMethod: 'email',
  spaceType: 'apartment',
  outcome: 'contact',
}

describe('validateQuote', () => {
  it('returns valid for a minimal valid submission', () => {
    const result = validateQuote(validBase)
    expect(result.valid).toBe(true)
  })

  it('returns valid with all optional fields present', () => {
    const result = validateQuote({
      ...validBase,
      rooms: '2',
      bathrooms: '1',
      cleanLevel: 'moderate',
      frequency: 'recurring',
      focusAreas: 'kitchen',
      notes: 'key under mat',
      outcome: 'schedule',
      address: 'South End, Boston',
      preferredDays: ['Mon', 'Wed'],
      timeOfDay: 'Morning',
    })
    expect(result.valid).toBe(true)
  })

  it('returns invalid when clientId is missing', () => {
    const result = validateQuote({ ...validBase, clientId: undefined })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/clientId/)
  })

  it('returns invalid when name is empty string', () => {
    const result = validateQuote({ ...validBase, name: '   ' })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/name/)
  })

  it('returns invalid when contact is missing', () => {
    const result = validateQuote({ ...validBase, contact: '' })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/contact/)
  })

  it('returns invalid for unknown contactMethod', () => {
    const result = validateQuote({ ...validBase, contactMethod: 'fax' })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/contactMethod/)
  })

  it('returns invalid for unknown outcome', () => {
    const result = validateQuote({ ...validBase, outcome: 'maybe' })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/outcome/)
  })

  it('returns invalid for null input', () => {
    const result = validateQuote(null)
    expect(result.valid).toBe(false)
  })
})
