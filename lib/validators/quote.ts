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

  const d = data as Record<string, unknown>

  if (!d.clientId || typeof d.clientId !== 'string') {
    return { valid: false, error: 'clientId is required' }
  }
  if (!d.name || typeof d.name !== 'string' || d.name.trim() === '') {
    return { valid: false, error: 'name is required' }
  }
  if (!d.contact || typeof d.contact !== 'string' || d.contact.trim() === '') {
    return { valid: false, error: 'contact is required' }
  }
  if (!VALID_CONTACT_METHODS.includes(d.contactMethod as ContactMethod)) {
    return { valid: false, error: 'contactMethod must be phone, sms, or email' }
  }
  if (!d.spaceType || typeof d.spaceType !== 'string') {
    return { valid: false, error: 'spaceType is required' }
  }
  if (!VALID_SPACE_TYPES.includes(d.spaceType as string)) {
    return { valid: false, error: 'spaceType must be apartment, str, office, property, or other' }
  }
  if (!VALID_OUTCOMES.includes(d.outcome as Outcome)) {
    return { valid: false, error: 'outcome must be contact, quote, or schedule' }
  }

  return { valid: true }
}
