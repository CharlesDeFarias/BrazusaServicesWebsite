import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { saveQuoteToAirtable, saveNewsletterToAirtable } from '@/lib/integrations/airtable'

const mockConfig = {
  clientId: 'brazusa-cleaning' as const,
  notificationEmail: 'owner@example.com',
  airtable: { baseId: 'appABC123', quoteTable: 'Quote Requests', newsletterTable: 'Newsletter' },
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

describe('saveQuoteToAirtable', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubEnv('AIRTABLE_API_TOKEN', 'test-token')
  })

  it('POSTs to the correct Airtable endpoint', async () => {
    await saveQuoteToAirtable(mockQuote, mockConfig)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('appABC123/Quote%20Requests'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('includes the name in the request body', async () => {
    await saveQuoteToAirtable(mockQuote, mockConfig)
    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.fields.Name).toBe('Jane Smith')
  })

  it('throws when Airtable returns a non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 422, text: async () => 'Unprocessable' })
    await expect(saveQuoteToAirtable(mockQuote, mockConfig)).rejects.toThrow('Airtable error')
  })
})

describe('saveNewsletterToAirtable', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    vi.stubEnv('AIRTABLE_API_TOKEN', 'test-token')
  })

  it('POSTs to the Newsletter table', async () => {
    await saveNewsletterToAirtable({ clientId: 'brazusa-cleaning', email: 'sub@example.com' }, mockConfig)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('Newsletter'),
      expect.objectContaining({ method: 'POST' })
    )
  })
})
