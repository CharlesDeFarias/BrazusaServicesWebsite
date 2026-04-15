import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/integrations/resend', () => ({
  sendQuoteNotification: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('@/lib/integrations/airtable', () => ({
  saveQuoteToAirtable: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('@/lib/integrations/google-sheets', () => ({
  saveQuoteToSheets: vi.fn().mockResolvedValue(undefined),
}))

import { POST } from '@/app/api/quote/route'
import { sendQuoteNotification } from '@/lib/integrations/resend'

const validQuote = {
  clientId: 'brazusa-cleaning',
  name: 'Jane Smith',
  contact: 'jane@example.com',
  contactMethod: 'email',
  spaceType: 'apartment',
  outcome: 'contact',
}

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/quote', () => {
  it('returns 200 for a valid submission', async () => {
    const res = await POST(makeRequest(validQuote))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ ...validQuote, name: '' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 for an unknown clientId', async () => {
    const res = await POST(makeRequest({ ...validQuote, clientId: 'unknown' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for an invalid contactMethod', async () => {
    const res = await POST(makeRequest({ ...validQuote, contactMethod: 'fax' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for malformed JSON', async () => {
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 when an integration throws', async () => {
    vi.mocked(sendQuoteNotification).mockRejectedValueOnce(new Error('Resend down'))
    const res = await POST(makeRequest(validQuote))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})
