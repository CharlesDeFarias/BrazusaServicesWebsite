import { describe, it, expect } from 'vitest'
import { validateNewsletter } from '@/lib/validators/newsletter'

describe('validateNewsletter', () => {
  it('returns valid for a minimal valid submission', () => {
    const result = validateNewsletter({
      clientId: 'brazusa-cleaning',
      email: 'test@example.com',
    })
    expect(result.valid).toBe(true)
  })

  it('returns valid when optional phone is included', () => {
    const result = validateNewsletter({
      clientId: 'brazusa-cleaning',
      email: 'test@example.com',
      phone: '617-555-0123',
    })
    expect(result.valid).toBe(true)
  })

  it('returns invalid when clientId is missing', () => {
    const result = validateNewsletter({ email: 'test@example.com' })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/clientId/)
  })

  it('returns invalid when email is missing', () => {
    const result = validateNewsletter({ clientId: 'brazusa-cleaning' })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/email/)
  })

  it('returns invalid when email is malformed', () => {
    const result = validateNewsletter({
      clientId: 'brazusa-cleaning',
      email: 'not-an-email',
    })
    expect(result.valid).toBe(false)
    if (!result.valid) expect(result.error).toMatch(/invalid/)
  })

  it('returns invalid for null input', () => {
    const result = validateNewsletter(null)
    expect(result.valid).toBe(false)
  })
})
