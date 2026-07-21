import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Ops-layer auth: per-person passcodes -> signed httpOnly session cookie.
 * No database, no new dependencies. Users/passcodes live in env:
 *   OPS_PASSCODES="jr:code1,sr:code2,vitor:code3,clara:code4"  (name:code, comma-separated)
 *   OPS_SESSION_SECRET=<random string, signs the cookie>
 * Session cookie value: "<user>.<expiresMs>.<hmac>"
 */

export const OPS_COOKIE = 'ops_session'
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

function secret(): string {
  const s = process.env.OPS_SESSION_SECRET
  if (!s) throw new Error('OPS_SESSION_SECRET not configured')
  return s
}

export function parsePasscodes(raw: string | undefined): Map<string, string> {
  const map = new Map<string, string>()
  for (const pair of (raw ?? '').split(',')) {
    const [user, code] = pair.split(':').map((s) => s.trim())
    if (user && code) map.set(code, user)
  }
  return map
}

export function userForPasscode(passcode: string): string | null {
  return parsePasscodes(process.env.OPS_PASSCODES).get(passcode) ?? null
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex')
}

export function createSessionValue(user: string, now = Date.now()): string {
  const expires = now + SESSION_TTL_MS
  const payload = `${user}.${expires}`
  return `${payload}.${sign(payload)}`
}

export function verifySessionValue(value: string | undefined, now = Date.now()): string | null {
  if (!value) return null
  const lastDot = value.lastIndexOf('.')
  if (lastDot < 0) return null
  const payload = value.slice(0, lastDot)
  const sig = value.slice(lastDot + 1)
  const expected = sign(payload)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  const [user, expiresStr] = payload.split('.')
  if (!user || !expiresStr) return null
  if (now > Number(expiresStr)) return null
  return user
}

/** Call at the top of every /ops page & layout. Redirects to login when unauthenticated. */
export async function requireUser(): Promise<string> {
  const jar = await cookies()
  const user = verifySessionValue(jar.get(OPS_COOKIE)?.value)
  if (!user) redirect('/ops/login')
  return user
}
