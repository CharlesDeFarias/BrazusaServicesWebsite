import { listAll, listAllCached, OPS_TABLES, type AirtableRecord } from './airtable'
import { priceOverrides, lineKey, type PriceOverride } from './opsfeed'

/**
 * Invoice builder - TypeScript port of BrazusaOps tools/invoicing/invoice.py
 * (validated against Vitor's real June PDFs: GMS $910, Patrick $700, Thatch $44,252).
 * Line description = Pricing Template "Template Name"; amount = Task "Base Price";
 * grouped by Property Name. All names resolve from Airtable at runtime.
 */

export interface InvoiceLine {
  date: string
  desc: string
  amount: number
  note: string
  key: string // stable per-line id for confirmations (see lineKey)
}

export interface Invoice {
  client: string
  month: string // YYYY-MM
  byProperty: { property: string; lines: InvoiceLine[]; subtotal: number }[]
  taskCount: number
  total: number
}

function first(v: unknown): string | null {
  return Array.isArray(v) && v.length ? String(v[0]) : null
}

/**
 * Some billing contacts are the same client under different names. GMS management's
 * contact is Alondra, so both "GMS…" and "Alondra…" bill under one client: GMS.
 */
export function canonicalClient(name: string): string {
  const k = name.trim().toLowerCase()
  if (k.includes('gms') || k.includes('alondra')) return 'GMS'
  return name.trim()
}

/**
 * Task types Vitor does NOT bill to the client: internal/operational upkeep (month-end common-area
 * "Operational Tasks", "Linens Organization & Inventory", linen/storage management). They carry a
 * Base Price in Airtable but never appear on his invoices, so including them over-bills (July 2026:
 * $1,200 of phantom Thatch charges). Billable = Departure / Standard / Mid-Stay / Restock.
 */
const NON_BILLABLE = ['operational task', 'linens organization', 'linen organization',
  'linen management', 'storage closet']
export function isBillableDesc(desc: string): boolean {
  const d = (desc ?? '').toLowerCase()
  return !NON_BILLABLE.some((x) => d.includes(x))
}

/**
 * Apply the standalone price-override layer: if an active override's unit_match is a substring
 * of the task's Unit (Text) and the task date >= effective_from, use its price instead of the
 * Base Price. Longest match wins (most specific). Mirrors tools/overrides.py::price_for.
 */
export function overridePrice(
  unitText: string,
  date: string,
  base: number,
  overrides: PriceOverride[]
): number {
  const d = (date ?? '').slice(0, 10)
  let best: PriceOverride | null = null
  for (const o of overrides) {
    if ((unitText ?? '').toLowerCase().includes(o.unitMatch.toLowerCase()) && d >= o.effectiveFrom) {
      if (!best || o.unitMatch.length > best.unitMatch.length) best = o
    }
  }
  return best ? best.newPrice : base
}

export function buildInvoiceData(
  tasks: AirtableRecord[],
  contactNames: Map<string, string>,
  propertyNames: Map<string, string>,
  templateNames: Map<string, string>,
  clientSub: string,
  month: string,
  overrides: PriceOverride[] = []
): Invoice | null {
  let client: string | null = null
  const byProp = new Map<string, InvoiceLine[]>()

  const sorted = [...tasks].sort((a, b) =>
    String(a.fields['Scheduled Date'] ?? '').localeCompare(String(b.fields['Scheduled Date'] ?? ''))
  )
  // month may be "YYYY-MM" (calendar month) or "YYYY-MM-DD..YYYY-MM-DD" (inclusive range,
  // used for weekly invoices confirmed in Group B).
  const range = month.includes('..') ? month.split('..') : null
  const inPeriod = (date: string) =>
    range ? date >= range[0] && date <= range[1] : date.startsWith(month)

  // DEDUPE: Airtable holds duplicate task rows (its Unique Key formula errors out, so
  // re-imports aren't caught). Billing each row double-charges the client. One clean =
  // (Unit, date, Template, desc, note); a genuinely different clean differs in desc/type.
  const seen = new Set<string>()
  for (const t of sorted) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    if (!inPeriod(date)) continue
    const billing = (Array.isArray(f['Billing Contact']) ? (f['Billing Contact'] as string[]) : [])
      .map((id) => contactNames.get(id) ?? '')
    const target = canonicalClient(clientSub).toLowerCase()
    const match = billing.find(
      (b) =>
        canonicalClient(b).toLowerCase() === target ||
        b.toLowerCase().includes(clientSub.toLowerCase())
    )
    if (!match) continue

    const property = propertyNames.get(first(f['Property']) ?? '') ?? 'Other'
    const desc =
      templateNames.get(first(f['Template']) ?? '') ||
      String(f['Unit (Text)'] ?? '').trim() ||
      'Task'
    if (!isBillableDesc(desc)) continue // internal/operational upkeep, not client-billable (matches Vitor)
    const note = String(f['Invoice Note'] ?? '')
    const key = `${first(f['Unit'])}|${date}|${first(f['Template'])}|${desc}|${note}`
    if (seen.has(key)) continue
    seen.add(key)
    client = client ?? canonicalClient(match)
    const amount = overridePrice(
      String(f['Unit (Text)'] ?? ''), date, Number(f['Base Price'] ?? 0) || 0, overrides)
    if (!byProp.has(property)) byProp.set(property, [])
    byProp.get(property)!.push({ date, desc, amount, note, key: lineKey(property, date, desc) })
  }

  if (!client) return null
  const byProperty = [...byProp.entries()].map(([property, lines]) => ({
    property,
    lines,
    subtotal: lines.reduce((s, l) => s + l.amount, 0),
  }))
  const total = byProperty.reduce((s, p) => s + p.subtotal, 0)
  const taskCount = byProperty.reduce((s, p) => s + p.lines.length, 0)
  return { client, month, byProperty, taskCount, total }
}

export interface BillableClient {
  name: string
  taskCount: number
  total: number
  firstDate: string
  lastDate: string
}

export function listBillableClients(
  tasks: AirtableRecord[],
  contactNames: Map<string, string>,
  month: string,
  overrides: PriceOverride[] = [],
  templateNames: Map<string, string> = new Map()
): BillableClient[] {
  const agg = new Map<string, { taskCount: number; total: number; firstDate: string; lastDate: string }>()
  const range = month.includes('..') ? month.split('..') : null
  const seen = new Set<string>() // dedupe Airtable duplicate task rows (see buildInvoiceData)
  for (const t of tasks) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    if (range ? date < range[0] || date > range[1] : !date.startsWith(month)) continue
    const desc = templateNames.get(first(f['Template']) ?? '') || String(f['Task Name'] ?? '')
    if (!isBillableDesc(desc)) continue // exclude internal/operational tasks from client totals
    const key = `${first(f['Unit'])}|${date}|${first(f['Template'])}|${String(f['Task Name'] ?? '')}`
    if (seen.has(key)) continue
    seen.add(key)
    const clientsForTask = new Set(
      (Array.isArray(f['Billing Contact']) ? (f['Billing Contact'] as string[]) : []).map((id) =>
        canonicalClient(contactNames.get(id) ?? 'Unknown')
      )
    )
    for (const name of clientsForTask) {
      const cur = agg.get(name) ?? { taskCount: 0, total: 0, firstDate: date, lastDate: date }
      cur.taskCount += 1
      cur.total += overridePrice(
        String(f['Unit (Text)'] ?? ''), date, Number(f['Base Price'] ?? 0) || 0, overrides)
      if (date < cur.firstDate) cur.firstDate = date
      if (date > cur.lastDate) cur.lastDate = date
      agg.set(name, cur)
    }
  }
  return [...agg.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.total - a.total)
}

export interface OpenInvoiceLine {
  client: string
  property: string // = building
  date: string
  desc: string
  amount: number
  note: string
  key: string
}

/**
 * All billable lines across ALL clients in [fromDate, toDate], deduped, with overrides applied
 * and the same `key` as buildInvoiceData. The invoices page filters these by confirmation status
 * to show the "unconfirmed items" section. Range is small (watermark -> today), so the fetch is cheap.
 */
export async function fetchOpenInvoiceLines(fromDate: string, toDate: string): Promise<OpenInvoiceLine[]> {
  const { tasks, contactNames, propertyNames, templateNames, overrides } = await fetchMonthTasks(
    `${fromDate}..${toDate}`
  )
  const sorted = [...tasks].sort((a, b) =>
    String(a.fields['Scheduled Date'] ?? '').localeCompare(String(b.fields['Scheduled Date'] ?? ''))
  )
  const out: OpenInvoiceLine[] = []
  const seen = new Set<string>()
  for (const t of sorted) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    const property = propertyNames.get(first(f['Property']) ?? '') ?? 'Other'
    const desc =
      templateNames.get(first(f['Template']) ?? '') || String(f['Unit (Text)'] ?? '').trim() || 'Task'
    if (!isBillableDesc(desc)) continue // internal/operational upkeep, not client-billable (matches Vitor)
    const note = String(f['Invoice Note'] ?? '')
    const dedupe = `${first(f['Unit'])}|${date}|${first(f['Template'])}|${desc}|${note}`
    if (seen.has(dedupe)) continue
    seen.add(dedupe)
    const amount = overridePrice(
      String(f['Unit (Text)'] ?? ''), date, Number(f['Base Price'] ?? 0) || 0, overrides)
    const key = lineKey(property, date, desc)
    const clients = new Set(
      (Array.isArray(f['Billing Contact']) ? (f['Billing Contact'] as string[]) : []).map((id) =>
        canonicalClient(contactNames.get(id) ?? 'Unknown')
      )
    )
    for (const client of clients) out.push({ client, property, date, desc, amount, note, key })
  }
  return out
}

export async function fetchMonthTasks(month: string): Promise<{
  tasks: AirtableRecord[]
  contactNames: Map<string, string>
  propertyNames: Map<string, string>
  templateNames: Map<string, string>
  overrides: PriceOverride[]
}> {
  const [lo, hi] = month.includes('..')
    ? month.split('..')
    : [`${month}-01`, `${month}-31`]
  const [tasks, contacts, props, templates, overrides] = await Promise.all([
    // Big paginated fetch (~1.4k July rows / ~7s cold) that changes slowly -> cache 10 min so
    // only the first load per window pays it; repeat loads are instant.
    listAllCached(OPS_TABLES.tasks, {
      filterByFormula: `AND({Scheduled Date (Text)}>='${lo}',{Scheduled Date (Text)}<='${hi}')`,
    }, 600),
    listAllCached(OPS_TABLES.contacts, {}, 1800),
    listAllCached(OPS_TABLES.properties, {}, 1800),
    listAllCached(OPS_TABLES.pricingTemplates, {}, 1800),
    priceOverrides(),
  ])
  return {
    tasks,
    contactNames: new Map(
      contacts.map((r) => [r.id, String(r.fields['Name'] ?? r.fields['Full Name'] ?? 'Unknown')])
    ),
    propertyNames: new Map(props.map((r) => [r.id, String(r.fields['Property Name'] ?? 'Other')])),
    templateNames: new Map(
      templates.map((r) => [r.id, String(r.fields['Template Name'] ?? '')])
    ),
    overrides,
  }
}
