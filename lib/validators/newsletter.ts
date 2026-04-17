import type { ValidationResult } from '@/lib/types'

export type NewsletterFormData = {
  clientId: string
  email: string
  phone?: string
}

export function validateNewsletter(data: unknown): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }

  const newsletterCandidate = data as Record<string, unknown>

  if (!newsletterCandidate.clientId || typeof newsletterCandidate.clientId !== 'string') {
    return { valid: false, error: 'clientId is required' }
  }

  if (!newsletterCandidate.email || typeof newsletterCandidate.email !== 'string') {
    return { valid: false, error: 'email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newsletterCandidate.email)) {
    return { valid: false, error: 'email is invalid' }
  }

  return { valid: true }
}
