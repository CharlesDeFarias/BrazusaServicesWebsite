import { describe, it, expect, vi } from 'vitest'

const mockSend = vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null })

// Mock the resend module before importing our code
vi.mock('resend', () => {
  return {
    Resend: class {
      emails = { send: mockSend }
    },
  }
})

import { sendQuoteNotification, sendNewsletterConfirmation } from '@/lib/integrations/resend'

const mockConfig = {
  clientId: 'brazusa-cleaning' as const,
  notificationEmail: 'owner@example.com',
  airtable: { baseId: 'app123', quoteTable: 'Quote Requests', newsletterTable: 'Newsletter' },
  googleSheets: { spreadsheetId: 'sheet123', quoteSheet: 'Quote Requests', newsletterSheet: 'Newsletter' },
}

const mockQuote = {
  clientId: 'brazusa-cleaning' as const,
  name: 'Jane Smith',
  contact: 'jane@example.com',
  contactMethod: 'email' as const,
  spaceType: 'apartment',
  outcome: 'contact' as const,
}

describe('sendQuoteNotification', () => {
  it('calls resend.emails.send with the owner email', async () => {
    mockSend.mockClear()
    await sendQuoteNotification(mockQuote, mockConfig)
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'owner@example.com' })
    )
  })

  it('includes name and contact in the email text', async () => {
    mockSend.mockClear()
    await sendQuoteNotification(mockQuote, mockConfig)
    const call = mockSend.mock.calls[0][0]
    expect(call.text).toContain('Jane Smith')
    expect(call.text).toContain('jane@example.com')
  })
})

describe('sendNewsletterConfirmation', () => {
  it('calls resend.emails.send with the subscriber email', async () => {
    mockSend.mockClear()
    await sendNewsletterConfirmation('subscriber@example.com')
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'subscriber@example.com' })
    )
  })
})
