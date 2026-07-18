import { NextRequest, NextResponse } from 'next/server'
import { userForPasscode, createSessionValue, OPS_COOKIE } from '@/lib/ops/auth'
import { log } from '@/lib/helpers/logger'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => null)
  const passcode = typeof body?.passcode === 'string' ? body.passcode.trim() : ''

  if (!passcode) {
    return NextResponse.json({ success: false, error: 'Passcode required' }, { status: 400 })
  }

  const user = userForPasscode(passcode)
  if (!user) {
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
