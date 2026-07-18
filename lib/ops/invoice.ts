import { listAll, OPS_TABLES, type AirtableRecord } from './airtable'

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

export function buildInvoiceData(
  tasks: AirtableRecord[],
  contactNames: Map<string, string>,
  propertyNames: Map<string, string>,
  templateNames: Map<string, string>,
  clientSub: string,
  month: string
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

  for (const t of sorted) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    if (!inPeriod(date)) continue
    const billing = (Array.isArray(f['Billing Contact']) ? (f['Billing Contact'] as string[]) : [])
      .map((id) => contactNames.get(id) ?? '')
    const match = billing.find((b) => b.toLowerCase().includes(clientSub.toLowerCase()))
    if (!match) continue
    client = client ?? match

    const property = propertyNames.get(first(f['Property']) ?? '') ?? 'Other'
    const desc =
      templateNames.get(first(f['Template']) ?? '') ??
      `${String(f['Unit (Text)'] ?? '').trim()}`.trim() ??
      'Task'
    const amount = Number(f['Base Price'] ?? 0) || 0
    const note = String(f['Invoice Note'] ?? '')
    if (!byProp.has(property)) byProp.set(property, [])
    byProp.get(property)!.push({ date, desc, amount, note })
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
}

export function listBillableClients(
  tasks: AirtableRecord[],
  contactNames: Map<string, string>,
  month: string
): BillableClient[] {
  const agg = new Map<string, { taskCount: number; total: number }>()
  const range = month.includes('..') ? month.split('..') : null
  for (const t of tasks) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    if (range ? date < range[0] || date > range[1] : !date.startsWith(month)) continue
    for (const id of Array.isArray(f['Billing Contact']) ? (f['Billing Contact'] as string[]) : []) {
      const name = contactNames.get(id) ?? 'Unknown'
      const cur = agg.get(name) ?? { taskCount: 0, total: 0 }
      cur.taskCount += 1
      cur.total += Number(f['Base Price'] ?? 0) || 0
      agg.set(name, cur)
    }
  }
  return [...agg.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.total - a.total)
}

export async function fetchMonthTasks(month: string): Promise<{
  tasks: AirtableRecord[]
  contactNames: Map<string, string>
  propertyNames: Map<string, string>
  templateNames: Map<string, string>
}> {
  const [lo, hi] = month.includes('..')
    ? month.split('..')
    : [`${month}-01`, `${month}-31`]
  const [tasks, contacts, props, templates] = await Promise.all([
    listAll(OPS_TABLES.tasks, {
      filterByFormula: `AND({Scheduled Date (Text)}>='${lo}',{Scheduled Date (Text)}<='${hi}')`,
    }),
    listAll(OPS_TABLES.contacts),
    listAll(OPS_TABLES.properties),
    listAll(OPS_TABLES.pricingTemplates),
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
  }
}
