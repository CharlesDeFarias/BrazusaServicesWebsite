import { google } from 'googleapis'

/**
 * Reads the local-published ops feed tabs from the ops Google Sheet:
 *   breezeway  [captured_at, json]            - most recent raw Breezeway capture
 *   reconcile  [generated_at, window, report] - most recent A1 discrepancy report
 * Latest row wins. Same sheet as payroll (OPS_SHEET_ID, falling back to OPS_PAYROLL_SHEET_ID).
 */

function getAuth() {
  const keyJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

function sheetId(): string {
  const id = process.env.OPS_SHEET_ID ?? process.env.OPS_PAYROLL_SHEET_ID
  if (!id) throw new Error('OPS_SHEET_ID / OPS_PAYROLL_SHEET_ID not configured')
  return id
}

async function readTab(range: string): Promise<string[][]> {
  const sheets = google.sheets({ version: 'v4', auth: getAuth() })
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId(), range })
  return (res.data.values ?? []) as string[][]
}

export type BreezewayTask = [name: string, date: string, title: string]

export interface BreezewayFeed {
  capturedAt: string
  tasks: BreezewayTask[]
  reservationCount: number
  raw: string
}

export async function latestBreezeway(): Promise<BreezewayFeed | null> {
  const rows = await readTab('breezeway!A:B')
  if (rows.length === 0) return null
  const [capturedAt, json] = rows[rows.length - 1]
  try {
    const d = JSON.parse(json)
    return {
      capturedAt: capturedAt ?? '',
      tasks: (d.tasks ?? []) as BreezewayTask[],
      reservationCount: (d.resv ?? []).length,
      raw: json,
    }
  } catch {
    return null
  }
}

export interface ReconcileFeed {
  generatedAt: string
  window: string
  report: string
}

export async function latestReconcile(): Promise<ReconcileFeed | null> {
  const rows = await readTab('reconcile!A:C')
  if (rows.length === 0) return null
  const [generatedAt, window, report] = rows[rows.length - 1]
  return { generatedAt: generatedAt ?? '', window: window ?? '', report: report ?? '' }
}

/**
 * Per-day schedule notes, editable by Charles/Clara in the ops sheet `schedule` tab
 * (rows [date, note]). The employee assignments come from Airtable; only the freeform
 * per-day note lives here. Last row per date wins (edit-in-place or append both work).
 * Returns an empty map if the tab doesn't exist yet.
 */
export async function scheduleNotes(): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  let rows: string[][]
  try {
    rows = await readTab('schedule!A:B')
  } catch {
    return map // tab not created yet
  }
  for (const [date, note] of rows) {
    if (date && /^\d{4}-\d{2}-\d{2}/.test(date)) map.set(date.slice(0, 10), note ?? '')
  }
  return map
}

export interface ResidentSheetInfo {
  code: string
  notes: string
}

/**
 * Per-resident door code + notes, editable in the ops sheet `residents` tab
 * (rows [resident, door_code, notes]). Keyed by lowercased resident name.
 * Address/phone come from Airtable; only the code + free-text notes live here.
 */
export async function residentInfo(): Promise<Map<string, ResidentSheetInfo>> {
  const map = new Map<string, ResidentSheetInfo>()
  let rows: string[][]
  try {
    rows = await readTab('residents!A:C')
  } catch {
    return map // tab not created yet
  }
  for (const [resident, code, notes] of rows) {
    const key = (resident ?? '').trim().toLowerCase()
    if (!key || key === 'resident') continue // skip blanks + header
    map.set(key, { code: (code ?? '').trim(), notes: (notes ?? '').trim() })
  }
  return map
}
