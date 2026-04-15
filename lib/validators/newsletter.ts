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

  const d = data as Record<string, unknown>

  if (!d.clientId || typeof d.clientId !== 'string') {
    return { valid: false, error: 'clientId is required' }
  }

  if (!d.email || typeof d.email !== 'string') {
    return { valid: false, error: 'email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(d.email)) {
    return { valid: false, error: 'email is invalid' }
  }

  return { valid: true }
}
