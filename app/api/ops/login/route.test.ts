import { describe, it, expect, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from './route'

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/ops/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/ops/login', () => {
  beforeEach(() => {
    process.env.OPS_SESSION_SECRET = 'test-secret'
    process.env.OPS_PASSCODES = 'charles:1234,vitor:5678'
  })

  it('rejects missing passcode', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('rejects invalid passcode', async () => {
    const res = await POST(makeRequest({ passcode: 'nope' }))
    expect(res.status).toBe(401)
  })

  it('accepts a valid passcode and sets the session cookie', async () => {
    const res = await POST(makeRequest({ passcode: '1234' }))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.user).toBe('charles')
    const setCookie = res.headers.get('set-cookie') ?? ''
    expect(setCookie).toContain('ops_session=')
    expect(setCookie.toLowerCase()).toContain('httponly')
  })

  it('rejects invalid JSON body', async () => {
    const req = new NextRequest('http://localhost/api/ops/login', {
      method: 'POST',
      body: 'not json',
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
