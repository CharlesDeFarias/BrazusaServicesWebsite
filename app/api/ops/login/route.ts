import { NextRequest, NextResponse } from 'next/server'
import { userForPasscode, createSessionValue, OPS_COOKIE } from '@/lib/ops/auth'
import { log } from '@/lib/helpers/logger'

// Best-effort brute-force throttle (per serverless instance): 10 failures / 10 min / IP.
const failures = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_FAILURES = 10

function throttled(ip: string): boolean {
  const entry = failures.get(ip)
  if (!entry || Date.now() > entry.resetAt) return false
  return entry.count >= MAX_FAILURES
}

function recordFailure(ip: string): void {
  const entry = failures.get(ip)
  if (!entry || Date.now() > entry.resetAt) {
    failures.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS })
  } else {
    entry.count += 1
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (throttled(ip)) {
    return NextResponse.json({ success: false, error: 'Too many attempts' }, { status: 429 })
  }
  const body = await request.json().catch(() => null)
  const passcode = typeof body?.passcode === 'string' ? body.passcode.trim() : ''

  if (!passcode) {
    return NextResponse.json({ success: false, error: 'Passcode required' }, { status: 400 })
  }

  const user = userForPasscode(passcode)
  if (!user) {
    recordFailure(ip)
    log.warn('ops_login_failed', { length: passcode.length })
    return NextResponse.json({ success: false, error: 'Invalid passcode' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true, user })
  response.cookies.set(OPS_COOKIE, createSessionValue(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  })
  log.info('ops_login_success', { user })
  return response
}
