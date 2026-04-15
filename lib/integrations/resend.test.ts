import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the resend module before importing our code
vi.mock('resend', () => {
  const mockSend = vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null })
  return {
    Resend: class {
      emails = { send: mockSend }
    },
  }
})

import { sendQuoteNotification, sendNewsletterConfirmation } from '@/lib/integrations/resend'
import { Resend } from 'resend'
import type { VitestMockInstance } from 'vitest'

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
    const instance = new (Resend as any)()
    await sendQuoteNotification(mockQuote, mockConfig)
    expect(instance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'owner@example.com' })
    )
  })

  it('includes name and contact in the email text', async () => {
    const instance = new (Resend as any)()
    await sendQuoteNotification(mockQuote, mockConfig)
    const call = (instance.emails.send as any).mock.calls[0][0]
    expect(call.text).toContain('Jane Smith')
    expect(call.text).toContain('jane@example.com')
  })
})

describe('sendNewsletterConfirmation', () => {
  it('calls resend.emails.send with the subscriber email', async () => {
    const instance = new (Resend as any)()
    await sendNewsletterConfirmation('subscriber@example.com', mockConfig)
    expect(instance.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'subscriber@example.com' })
    )
  })
})
