import { google } from 'googleapis'

/**
 * Payroll data for the ops layer. The local BrazusaOps payroll engine (which reads the
 * WhatsApp punches on Charles's machine) pushes computed results into a private Google
 * Sheet; this module reads them back. Transport sheet (env OPS_PAYROLL_SHEET_ID) tab
 * "payroll" rows: [type, key, pushed_at, json]
 *   type = "day" | "week";  key = YYYY-MM-DD (day) or week-start Monday (week)
 * Latest pushed_at wins per (type,key). No pay data ever lives in this repo.
 */

export interface PayrollDayRow {
  worker: string
  hours: number
  pay: number
}

export interface PayrollDay {
  date: string
  rows: PayrollDayRow[]
  total: number
  anomalies: { worker: string; detail: string }[]
}

export interface PayrollWeekLine {
  payee: string
  hours: number
  sessions: number
  pay: number
}

export interface PayrollWeek {
  weekStart: string
  lines: PayrollWeekLine[]
  total: number
  anomalies: { worker: string; date: string; detail: string }[]
  pushedAt: string
}

type RawRow = string[]

export function latestPerKey(rows: RawRow[]): Map<string, { pushedAt: string; json: string }> {
  const out = new Map<string, { pushedAt: string; json: string }>()
  for (const r of rows) {
    const [type, key, pushedAt, json] = r
    if (!type || !key || !json) continue
    const mapKey = `${type}|${key}`
    const existing = out.get(mapKey)
    if (!existing || (pushedAt ?? '') > existing.pushedAt) {
      out.set(mapKey, { pushedAt: pushedAt ?? '', json })
    }
  }
  return out
}

function getAuth() {
  const keyJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

async function readRows(): Promise<RawRow[]> {
  // Dev/local fallback: OPS_PAYROLL_FILE points at a JSON file of rows (same shape as the
  // sheet). Lets the page run with real engine output before the transport sheet exists.
  const filePath = process.env.OPS_PAYROLL_FILE
  if (filePath) {
    const { readFile } = await import('fs/promises')
    return JSON.parse(await readFile(filePath, 'utf-8')) as RawRow[]
  }
  const spreadsheetId = process.env.OPS_PAYROLL_SHEET_ID
  if (!spreadsheetId) throw new Error('Payroll feed not configured')
  const sheets = google.sheets({ version: 'v4', auth: getAuth() })
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'payroll!A:D' })
  return (res.data.values ?? []) as RawRow[]
}

export async function readPayrollFeed(): Promise<{ weeks: PayrollWeek[]; days: PayrollDay[] }> {
  const rows = await readRows()
  const latest = latestPerKey(rows)

  const weeks: PayrollWeek[] = []
  const days: PayrollDay[] = []
  for (const [mapKey, { pushedAt, json }] of latest) {
    const [type, key] = mapKey.split('|')
    try {
      const data = JSON.parse(json)
      if (type === 'week') weeks.push({ ...data, weekStart: key, pushedAt })
      if (type === 'day') days.push({ ...data, date: key })
    } catch {
      // skip malformed rows rather than failing the page
    }
  }
  weeks.sort((a, b) => b.weekStart.localeCompare(a.weekStart))
  days.sort((a, b) => b.date.localeCompare(a.date))
  return { weeks, days }
}
