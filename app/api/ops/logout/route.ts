import { NextResponse } from 'next/server'
import { OPS_COOKIE } from '@/lib/ops/auth'

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true })
  response.cookies.set(OPS_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return response
}
