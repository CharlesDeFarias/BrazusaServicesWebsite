import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { google } from 'googleapis'
import { OPS_COOKIE, verifySessionValue } from '@/lib/ops/auth'

/** Appends a single key/value flag to the ops sheet `flags` tab (key | value | by | at).
 * Append-only; the reader takes the latest per key. Session-gated. */
function sheetId(): string {
  const id = process.env.OPS_SHEET_ID ?? process.env.OPS_PAYROLL_SHEET_ID
  if (!id) throw new Error('OPS_SHEET_ID / OPS_PAYROLL_SHEET_ID not configured')
  return id
}

function writeAuth() {
  const keyJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function POST(req: Request): Promise<NextResponse> {
  const jar = await cookies()
  const user = verifySessionValue(jar.get(OPS_COOKIE)?.value)
  if (!user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

  let body: { key?: string; value?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const key = String(body.key ?? '').trim()
  const value = String(body.value ?? '').slice(0, 200)
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 })

  try {
    const sheets = google.sheets({ version: 'v4', auth: writeAuth() })
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId(),
      range: 'flags!A:D',
      valueInputOption: 'RAW',
      requestBody: { values: [[key, value, user, new Date().toISOString()]] },
    })
  } catch {
    return NextResponse.json({ error: 'could not save' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, by: user })
}
