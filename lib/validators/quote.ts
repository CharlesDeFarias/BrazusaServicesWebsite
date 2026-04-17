import type { ValidationResult } from '@/lib/types'

export type ContactMethod = 'phone' | 'sms' | 'email'
export type Outcome = 'contact' | 'quote' | 'schedule'

export type QuoteFormData = {
  clientId: string
  name: string
  contact: string
  contactMethod: ContactMethod
  spaceType: string
  rooms?: string
  bathrooms?: string
  cleanLevel?: string
  frequency?: string
  focusAreas?: string
  notes?: string
  outcome: Outcome
  address?: string
  preferredDays?: string[]
  timeOfDay?: string
}

const VALID_CONTACT_METHODS: ContactMethod[] = ['phone', 'sms', 'email']
const VALID_OUTCOMES: Outcome[] = ['contact', 'quote', 'schedule']
const VALID_SPACE_TYPES = ['apartment', 'str', 'office', 'property', 'other']

export function validateQuote(data: unknown): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }

  const quoteCandidate = data as Record<string, unknown>

  if (!quoteCandidate.clientId || typeof quoteCandidate.clientId !== 'string') {
    return { valid: false, error: 'clientId is required' }
  }
  if (!quoteCandidate.name || typeof quoteCandidate.name !== 'string' || quoteCandidate.name.trim() === '') {
    return { valid: false, error: 'name is required' }
  }
  if (!quoteCandidate.contact || typeof quoteCandidate.contact !== 'string' || quoteCandidate.contact.trim() === '') {
    return { valid: false, error: 'contact is required' }
  }
  if (!VALID_CONTACT_METHODS.includes(quoteCandidate.contactMethod as ContactMethod)) {
    return { valid: false, error: 'contactMethod must be phone, sms, or email' }
  }
  if (!quoteCandidate.spaceType || typeof quoteCandidate.spaceType !== 'string') {
    return { valid: false, error: 'spaceType is required' }
  }
  if (!VALID_SPACE_TYPES.includes(quoteCandidate.spaceType as string)) {
    return { valid: false, error: 'spaceType must be apartment, str, office, property, or other' }
  }
  if (!VALID_OUTCOMES.includes(quoteCandidate.outcome as Outcome)) {
    return { valid: false, error: 'outcome must be contact, quote, or schedule' }
  }

  return { valid: true }
}
