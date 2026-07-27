import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { google } from 'googleapis'
import { OPS_COOKIE, verifySessionValue } from '@/lib/ops/auth'

/**
 * Appends a per-day planning-status row to the ops sheet `daymeta` tab
 * (date | roster_confirmed | schedule_sent | cleaners_notified | assignments | by | at).
 * Append-only; the reader takes the latest row per date. The client sends the full current
 * state each time (so a single toggle preserves the other fields). Session-gated.
 */
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

  let body: {
    date?: string
    rosterConfirmed?: boolean
    scheduleSent?: boolean
    cleanersNotified?: boolean
    assignments?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  const date = String(body.date ?? '').slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'a valid date is required' }, { status: 400 })
  }
  const b = (v: unknown) => (v ? 'TRUE' : 'FALSE')
  const at = new Date().toISOString()
  try {
    const sheets = google.sheets({ version: 'v4', auth: writeAuth() })
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId(),
      range: 'daymeta!A:G',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            date,
            b(body.rosterConfirmed),
            b(body.scheduleSent),
            b(body.cleanersNotified),
            String(body.assignments ?? '').slice(0, 1000),
            user,
            at,
          ],
        ],
      },
    })
  } catch {
    return NextResponse.json({ error: 'could not save' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, by: user, at })
}
