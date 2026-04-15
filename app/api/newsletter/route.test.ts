import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/integrations/resend', () => ({
  sendNewsletterConfirmation: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('@/lib/integrations/airtable', () => ({
  saveNewsletterToAirtable: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('@/lib/integrations/google-sheets', () => ({
  saveNewsletterToSheets: vi.fn().mockResolvedValue(undefined),
}))

import { POST } from '@/app/api/newsletter/route'
import { sendNewsletterConfirmation } from '@/lib/integrations/resend'

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/newsletter', () => {
  it('returns 200 for a valid submission', async () => {
    const res = await POST(makeRequest({ clientId: 'brazusa-cleaning', email: 'sub@example.com' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ clientId: 'brazusa-cleaning' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 for an unknown clientId', async () => {
    const res = await POST(makeRequest({ clientId: 'unknown-client', email: 'sub@example.com' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 for malformed JSON', async () => {
    const req = new NextRequest('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 when an integration throws', async () => {
    vi.mocked(sendNewsletterConfirmation).mockRejectedValueOnce(new Error('Resend down'))
    const res = await POST(makeRequest({ clientId: 'brazusa-cleaning', email: 'sub@example.com' }))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})
