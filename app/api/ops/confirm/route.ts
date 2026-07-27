import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { google } from 'googleapis'
import { OPS_COOKIE, verifySessionValue } from '@/lib/ops/auth'

/**
 * Appends an invoice line-item confirmation to the ops sheet `confirmations` tab
 * (key | status | note | by | at). Append-only; the reader takes the latest row per key.
 * Requires a valid ops session. Uses the service account with write scope.
 */
const VALID = new Set(['confirmed', 'flagged', 'pending'])

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

  let body: { key?: string; status?: string; note?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const key = String(body.key ?? '').trim()
  const status = String(body.status ?? '').trim().toLowerCase()
  const note = String(body.note ?? '').slice(0, 500)
  if (!key || !VALID.has(status)) {
    return NextResponse.json({ error: 'key and a valid status are required' }, { status: 400 })
  }

  const at = new Date().toISOString()
  try {
    const sheets = google.sheets({ version: 'v4', auth: writeAuth() })
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId(),
      range: 'confirmations!A:E',
      valueInputOption: 'RAW',
      requestBody: { values: [[key, status, note, user, at]] },
    })
  } catch {
    return NextResponse.json({ error: 'could not save' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, status, note, by: user, at })
}
