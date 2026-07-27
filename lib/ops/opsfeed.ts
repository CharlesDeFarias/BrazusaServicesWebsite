import { google, type sheets_v4 } from 'googleapis'
import { unstable_cache } from 'next/cache'

/**
 * Reads the local-published ops feed tabs from the ops Google Sheet:
 *   breezeway  [captured_at, json]            - most recent raw Breezeway capture
 *   reconcile  [generated_at, window, report] - most recent A1 discrepancy report
 * Latest row wins. Same sheet as payroll (OPS_SHEET_ID, falling back to OPS_PAYROLL_SHEET_ID).
 */

// Reuse one Sheets client across requests: building GoogleAuth + fetching a token per read was
// adding a round-trip to every page. The client caches its own access token internally.
let _sheets: sheets_v4.Sheets | null = null
function sheetsClient(): sheets_v4.Sheets {
  if (_sheets) return _sheets
  const keyJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  _sheets = google.sheets({ version: 'v4', auth })
  return _sheets
}

function sheetId(): string {
  const id = process.env.OPS_SHEET_ID ?? process.env.OPS_PAYROLL_SHEET_ID
  if (!id) throw new Error('OPS_SHEET_ID / OPS_PAYROLL_SHEET_ID not configured')
  return id
}

async function readTabRaw(range: string): Promise<string[][]> {
  const res = await sheetsClient().spreadsheets.values.get({ spreadsheetId: sheetId(), range })
  return (res.data.values ?? []) as string[][]
}

/**
 * Cached tab read. Repeat loads within `ttl` seconds are instant. Pass ttl <= 0 for a fresh read
 * (used for the confirmations tab, so dad's just-saved confirm/flag shows on the next page load).
 */
function readTab(range: string, ttl = 20): Promise<string[][]> {
  if (ttl <= 0) return readTabRaw(range)
  return unstable_cache(() => readTabRaw(range), ['opsheet', range], { revalidate: ttl })()
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
 * The authoritative daily cleaning list, assembled locally by tools/cleaning_list.py:
 * Breezeway (Thatch, extension-screened) MERGED with Airtable residential, minus cancelled
 * units. This is what the team works from - the live Forecast page reads Airtable, which lags.
 * Row: [generatedAt, json]. Latest row wins.
 */
export interface CleaningUnit { unit: string; kind: string; checkin: boolean; label: string }
export interface CleaningBuilding { building: string; units: CleaningUnit[] }
export interface CleaningResidential { client: string; address: string; task: string }
export interface CleaningListFeed {
  date: string
  generatedAt: string
  route: string // auto-found from Group A "Schedule de Hoje"
  buildings: CleaningBuilding[]
  residential: CleaningResidential[]
  held: { unit: string }[]
  unmatched: { home_id: number; date: string; guest: string }[]
  totals: { cleans: number; checkins: number; thatchCleans: number; residential: number }
  whatsappText: string
}

/** Pure parse of a [generatedAt, json] cleaning-list row. Exported for tests. */
export function parseCleaningListRow(row: string[] | undefined): CleaningListFeed | null {
  if (!row) return null
  const [generatedAt, json] = row
  try {
    const d = JSON.parse(json ?? '')
    return {
      date: d.date ?? '',
      generatedAt: generatedAt ?? d.generatedAt ?? '',
      route: d.route ?? '',
      buildings: (d.buildings ?? []) as CleaningBuilding[],
      residential: (d.residential ?? []) as CleaningResidential[],
      held: (d.held ?? []) as { unit: string }[],
      unmatched: (d.unmatched ?? []) as { home_id: number; date: string; guest: string }[],
      totals: d.totals ?? { cleans: 0, checkins: 0, thatchCleans: 0, residential: 0 },
      whatsappText: d.whatsappText ?? '',
    }
  } catch {
    return null
  }
}

export async function latestCleaningList(): Promise<CleaningListFeed | null> {
  const rows = await readTab('cleaninglist!A:B')
  if (rows.length === 0) return null
  return parseCleaningListRow(rows[rows.length - 1])
}

/**
 * Inventory snapshot pushed by tools/inventory.py (parsing-first: Group A shortage messages ->
 * structured status). `inventory` tab: [generatedAt, json]. Latest row wins.
 */
export interface InvItem { item_id: string; name: string; supplier: string; status: string; category: string }
export interface InvBuilding { building: string; items: InvItem[] }
export interface InvReview { item: string; status: string; sender: string; raw: string; at: string }
export interface InventoryFeed {
  generatedAt: string
  byBuilding: InvBuilding[]
  review: InvReview[]
  reportText: string
  buyList: string
}

export async function latestInventory(): Promise<InventoryFeed | null> {
  const rows = await readTab('inventory!A:B', 60)
  if (rows.length === 0) return null
  const [generatedAt, json] = rows[rows.length - 1]
  try {
    const d = JSON.parse(json ?? '')
    return {
      generatedAt: generatedAt ?? '',
      byBuilding: (d.byBuilding ?? []) as InvBuilding[],
      review: (d.review ?? []) as InvReview[],
      reportText: d.reportText ?? '',
      buyList: d.buyList ?? '',
    }
  } catch {
    return null
  }
}

/**
 * Standalone price-override layer (ops sheet `overrides` tab, cols
 * unit_match | new_price | effective_from | client | active | reason). Corrections that live
 * OUTSIDE Vitor's read-only Airtable; the invoice logic applies them by unit-name match.
 * Mirrors tools/overrides.py. Returns active rows only.
 */
export interface PriceOverride { unitMatch: string; newPrice: number; effectiveFrom: string }

const TRUTHY = new Set(['true', '1', 'yes', 'x', 'checked'])

export async function priceOverrides(): Promise<PriceOverride[]> {
  const rows = await readTab('overrides!A2:F').catch(() => [] as string[][])
  const out: PriceOverride[] = []
  for (const r of rows) {
    const [um, price, eff, , active] = r
    if (!um || !TRUTHY.has(String(active ?? '').trim().toLowerCase())) continue
    const p = Number(price)
    if (!Number.isFinite(p)) continue
    out.push({ unitMatch: um.trim(), newPrice: p, effectiveFrom: String(eff ?? '').slice(0, 10) })
  }
  return out
}

/**
 * Invoice line-item confirmations (ops sheet `confirmations` tab: key | status | note | by | at).
 * A watermark row (key "*confirmed_through*") means every line dated <= that day counts as
 * confirmed without a per-line row. Explicit line rows (dad's confirm/flag clicks, appended by
 * /api/ops/confirm) override the watermark; latest row per key wins. Mirrors tools/confirmations.py.
 */
export type ConfirmStatus = 'confirmed' | 'flagged' | 'pending'
export interface LineConfirmation { status: ConfirmStatus; note: string; by: string; at: string }
export interface ConfirmationsFeed { confirmedThrough: string; byKey: Map<string, LineConfirmation> }

const WATERMARK = '*confirmed_through*'

/** Stable per-line id shared by the invoice builder, the page, and the write API. */
export function lineKey(property: string, date: string, desc: string): string {
  return `${property}||${date}||${desc}`
}

export async function lineConfirmations(): Promise<ConfirmationsFeed> {
  const rows = await readTab('confirmations!A:E', 0).catch(() => [] as string[][]) // fresh: reflects dad's writes
  let confirmedThrough = ''
  const byKey = new Map<string, LineConfirmation>()
  for (const r of rows) {
    const [key, status, note, by, at] = r
    if (!key || key === 'key') continue
    if (key === WATERMARK) {
      confirmedThrough = String(status ?? '').slice(0, 10)
      continue
    }
    const s = String(status ?? '').trim().toLowerCase()
    const st: ConfirmStatus = s === 'confirmed' || s === 'flagged' ? s : 'pending'
    byKey.set(key, { status: st, note: note ?? '', by: by ?? '', at: at ?? '' }) // latest wins
  }
  return { confirmedThrough, byKey }
}

/**
 * Per-day planning status for the merged Forecast+Schedule page (ops sheet `daymeta` tab:
 * date | roster_confirmed | schedule_sent | cleaners_notified | assignments | by | at).
 * Append-only, latest row per date wins. Dad taps "roster confirmed"; Charles sets the rest.
 */
export interface DayMeta {
  date: string
  rosterConfirmed: boolean
  scheduleSent: boolean
  cleanersNotified: boolean
  assignments: string
  by: string
  at: string
}

/**
 * General single-value flags (ops sheet `flags` tab: key | value | by | at), latest per key.
 * Used e.g. for "payroll_done:<monday>" so the Payroll banner can be marked done. Fresh read.
 */
export async function flags(): Promise<Map<string, string>> {
  const rows = await readTab('flags!A:D', 0).catch(() => [] as string[][])
  const out = new Map<string, string>()
  for (const r of rows) {
    const [key, value] = r
    if (!key || key === 'key') continue
    out.set(key, String(value ?? ''))
  }
  return out
}

export async function dayMeta(): Promise<Map<string, DayMeta>> {
  const rows = await readTab('daymeta!A:G', 0).catch(() => [] as string[][]) // fresh: reflects toggles
  const byDate = new Map<string, DayMeta>()
  for (const r of rows) {
    const [date, rc, ss, cn, assignments, by, at] = r
    if (!date || date === 'date') continue
    const t = (v: string | undefined) => TRUTHY.has(String(v ?? '').trim().toLowerCase())
    byDate.set(date, {
      date,
      rosterConfirmed: t(rc),
      scheduleSent: t(ss),
      cleanersNotified: t(cn),
      assignments: assignments ?? '',
      by: by ?? '',
      at: at ?? '',
    })
  }
  return byDate
}

/** Effective status of a line: explicit row wins, else watermark, else pending. */
export function effectiveConfirmation(
  feed: ConfirmationsFeed,
  key: string,
  date: string
): LineConfirmation {
  const explicit = feed.byKey.get(key)
  if (explicit) return explicit
  if (feed.confirmedThrough && date <= feed.confirmedThrough)
    return { status: 'confirmed', note: '', by: 'seed', at: '' }
  return { status: 'pending', note: '', by: '', at: '' }
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

export interface CodeEntry {
  unit: string
  code: string
  notes: string
}

export interface CodeBuilding {
  building: string
  entries: CodeEntry[]
}

/**
 * Door / lockbox codes reference, editable in the ops sheet `codes` tab
 * (rows [building, unit, code, notes]). Grouped by building in sheet order.
 * Seeded from the Thatch main sheet; the ops sheet is now the maintained source.
 */
export async function doorCodes(): Promise<CodeBuilding[]> {
  let rows: string[][]
  try {
    rows = await readTab('codes!A:D')
  } catch {
    return []
  }
  const order: string[] = []
  const byBuilding = new Map<string, CodeEntry[]>()
  for (const [building, unit, code, notes] of rows) {
    const b = (building ?? '').trim()
    if (!b || b.toLowerCase() === 'building') continue // skip header/blanks
    if (!byBuilding.has(b)) {
      byBuilding.set(b, [])
      order.push(b)
    }
    byBuilding.get(b)!.push({
      unit: (unit ?? '').trim(),
      code: (code ?? '').trim(),
      notes: (notes ?? '').trim(),
    })
  }
  return order.map((b) => ({ building: b, entries: byBuilding.get(b)! }))
}
