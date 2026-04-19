import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockAppend = vi.hoisted(() => vi.fn().mockResolvedValue({}))

vi.mock('googleapis', () => {
  return {
    google: {
      auth: {
        GoogleAuth: vi.fn(function() {}),
      },
      sheets: vi.fn().mockReturnValue({
        spreadsheets: {
          values: {
            append: mockAppend,
          },
        },
      }),
    },
  }
})

import { saveQuoteToSheets, saveNewsletterToSheets } from '@/lib/integrations/google-sheets'

const mockConfig = {
  clientId: 'brazusa-cleaning' as const,
  notificationEmail: 'owner@example.com',
  airtable: { baseId: 'app123', quoteTable: 'Quote Requests', newsletterTable: 'Newsletter' },
  googleSheets: { spreadsheetId: 'sheetABC', quoteSheet: 'Quote Requests', newsletterSheet: 'Newsletter' },
}

const mockQuote = {
  clientId: 'brazusa-cleaning' as const,
  name: 'Jane Smith',
  contact: 'jane@example.com',
  contactMethod: 'email' as const,
  spaceType: 'apartment',
  outcome: 'contact' as const,
}

describe('saveQuoteToSheets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAppend.mockClear()
    vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_KEY', Buffer.from(JSON.stringify({
      type: 'service_account',
      client_email: 'test@test.iam.gserviceaccount.com',
      private_key: 'fake-key',
    })).toString('base64'))
  })

  it('calls spreadsheets.values.append with the correct spreadsheetId', async () => {
    await saveQuoteToSheets(mockQuote, mockConfig)
    expect(mockAppend).toHaveBeenCalledWith(
      expect.objectContaining({ spreadsheetId: 'sheetABC' })
    )
  })

  it('includes the name in the appended row values', async () => {
    await saveQuoteToSheets(mockQuote, mockConfig)
    const call = mockAppend.mock.calls[0][0]
    expect(call.requestBody.values[0]).toContain('Jane Smith')
  })
})

describe('saveNewsletterToSheets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAppend.mockClear()
    vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_KEY', Buffer.from(JSON.stringify({
      type: 'service_account',
      client_email: 'test@test.iam.gserviceaccount.com',
      private_key: 'fake-key',
    })).toString('base64'))
  })

  it('appends to the Newsletter sheet', async () => {
    await saveNewsletterToSheets({ clientId: 'brazusa-cleaning', email: 'sub@example.com' }, mockConfig)
    const call = mockAppend.mock.calls[0][0]
    expect(call.range).toContain('Newsletter')
  })
})
