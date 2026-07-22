import { listAll, listAllCached, OPS_TABLES, type AirtableRecord } from './airtable'

/**
 * Forecast builder - TypeScript port of BrazusaOps airtable_forecast.py (validated vs
 * posted forecasts). Tasks in range + unit-level check-in marks derived by matching each
 * task's Unit + date against Reservations (the Check-in checkbox on Tasks is deprecated).
 * Property/unit names all come from Airtable at runtime - nothing hardcoded.
 */

export interface ForecastUnit {
  label: string
  kind: 'dep' | 'mid' | 'restock' | 'linen' | 'ca' | 'other'
  checkin: boolean
}

export interface ForecastGroup {
  property: string
  /** Street address for non-Thatch resident groups (Thatch groups are already named by building). */
  address?: string
  units: ForecastUnit[]
}

/**
 * A scheduled clean that is actually a stay EXTENSION (the same guest checks out and back in
 * the same day — the platform split one long stay into back-to-back reservations). No turnover,
 * so no clean is needed. Held OUT of the main forecast and listed as a removable note.
 */
export interface ForecastExtension {
  property: string
  unit: string
  guest: string
  until: string // YYYY-MM-DD the guest actually leaves (0 if unknown)
}

export interface ForecastDay {
  date: string // YYYY-MM-DD
  groups: ForecastGroup[]
  /** Cleans auto-held because they look like stay extensions; verify then remove. */
  extensions?: ForecastExtension[]
}

function first(v: unknown): string | null {
  return Array.isArray(v) && v.length ? String(v[0]) : null
}

export function typeShort(name: string): ForecastUnit['kind'] {
  const n = name.toLowerCase()
  if (n.includes('departure')) return 'dep'
  if (n.includes('mid')) return 'mid'
  if (n.includes('restock')) return 'restock'
  if (n.includes('linen')) return 'linen'
  if (n.includes('common')) return 'ca'
  return 'other'
}

/** "6 Prentiss St 10 (Guest)" -> "10"; "... Rm 07" -> "7"; common areas -> "CA". */
export function unitLabel(unitText: string, kind: ForecastUnit['kind']): string {
  const base = unitText.replace(/\s*\([^)]*\)\s*$/, '').trim()
  const low = base.toLowerCase()
  if (kind === 'ca' || low.includes('common area')) return 'CA'
  const rm = /\brm\s*0*(\d+)/i.exec(base)
  if (rm) return rm[1]
  const parts = base.split(/\s+/)
  return parts[parts.length - 1] || base
}

export function unitSortKey(label: string): [number, number, string] {
  const m = /^(\d+)/.exec(label)
  return m ? [0, parseInt(m[1], 10), label] : [1, 0, label]
}

export function buildForecastData(
  tasks: AirtableRecord[],
  reservations: AirtableRecord[],
  taskTypes: Map<string, string>,
  propertyNames: Map<string, string>,
  dates: string[],
  contactNames: Map<string, string> = new Map()
): ForecastDay[] {
  const arrivals = new Set<string>()
  // For extension detection: a same-guest check-in on a unit -> that reservation's check-out.
  const checkinCheckout = new Map<string, string>() // `${unitId}|${ci}|${guest}` -> checkout date
  const checkouts: { u: string; date: string; guest: string }[] = []
  for (const r of reservations) {
    const ci = String(r.fields['Check-in'] ?? '').slice(0, 10)
    const co = String(r.fields['Check-out'] ?? '').slice(0, 10)
    const guest = String(r.fields['Name'] ?? '').trim()
    const units = Array.isArray(r.fields['Unit']) ? (r.fields['Unit'] as string[]) : []
    for (const u of units) {
      if (ci) {
        arrivals.add(`${u}|${ci}`)
        if (guest) checkinCheckout.set(`${u}|${ci}|${guest}`, co)
      }
      if (co && guest) checkouts.push({ u, date: co, guest })
    }
  }
  // An EXTENSION checkout: a guest checks out of a unit on date D and the SAME guest has a
  // check-in to that unit on D (back-to-back split reservation) -> no real turnover.
  const extensions = new Map<string, ForecastExtension>() // `${unitId}|${date}`
  for (const { u, date, guest } of checkouts) {
    const key = `${u}|${date}|${guest}`
    if (checkinCheckout.has(key)) {
      extensions.set(`${u}|${date}`, { property: '', unit: '', guest, until: checkinCheckout.get(key) || '' })
    }
  }

  const wanted = new Set(dates)
  const byDay = new Map<string, Map<string, ForecastUnit[]>>()
  const extByDay = new Map<string, ForecastExtension[]>()
  const addrByGroup = new Map<string, string>() // `${date}|${label}` -> street address (non-Thatch)

  for (const t of tasks) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    if (!wanted.has(date)) continue
    const typeName = taskTypes.get(first(f['Task Type']) ?? '') ?? ''
    const kind = typeShort(typeName)
    const property = propertyNames.get(first(f['Property']) ?? '') ?? 'Other'
    // Group label: Thatch units by property (building); non-Thatch by the RESIDENT we
    // clean for (Jaime, Elizabeth…), never the management company. Falls back to property.
    const contact = (field: string) =>
      (Array.isArray(f[field]) ? (f[field] as string[]) : [])
        .map((id) => contactNames.get(id) ?? '')
        .filter((n) => n && n.toLowerCase() !== 'unknown')
    const isThatch = contact('Billing Contact').some((b) => b.toLowerCase().includes('thatch'))
    const groupLabel = isThatch ? property : contact('Resident Contact')[0] || property
    // Non-Thatch groups are named by resident, so keep the street address for reference.
    if (!isThatch && groupLabel !== property) addrByGroup.set(`${date}|${groupLabel}`, property)
    const unitId = first(f['Unit'])
    const checkin = unitId ? arrivals.has(`${unitId}|${date}`) : false
    const label = unitLabel(String(f['Unit (Text)'] ?? ''), kind)

    // Stay extension (same guest continues): hold it out of the main list, note it instead.
    const ext = unitId ? extensions.get(`${unitId}|${date}`) : undefined
    if (ext) {
      if (!extByDay.has(date)) extByDay.set(date, [])
      const list = extByDay.get(date)!
      if (!list.some((e) => e.property === groupLabel && e.unit === label)) {
        list.push({ property: groupLabel, unit: label, guest: ext.guest, until: ext.until })
      }
      continue
    }

    if (!byDay.has(date)) byDay.set(date, new Map())
    const groups = byDay.get(date)!
    if (!groups.has(groupLabel)) groups.set(groupLabel, [])
    groups.get(groupLabel)!.push({ label, kind, checkin })
  }

  return dates
    .filter((d) => byDay.has(d) || extByDay.has(d))
    .map((date) => ({
      date,
      extensions: extByDay.get(date),
      groups: [...(byDay.get(date)?.entries() ?? [])]
        .map(([property, units]) => {
          // Dedupe: CA/Restock/Linen collapse to one line; unit lines dedupe on exact
          // (label,kind,checkin) - Airtable imports occasionally create duplicate Task
          // rows and the forecast should not repeat them.
          const seen = new Set<string>()
          const deduped: ForecastUnit[] = []
          for (const u of units.sort((a, b) => {
            const [ax, ay, az] = unitSortKey(a.label)
            const [bx, by, bz] = unitSortKey(b.label)
            return ax - bx || ay - by || az.localeCompare(bz)
          })) {
            const dedupeKey = ['ca', 'restock', 'linen'].includes(u.kind)
              ? u.kind
              : `${u.label}|${u.kind}|${u.checkin}`
            if (seen.has(dedupeKey)) continue
            seen.add(dedupeKey)
            deduped.push(u)
          }
          return { property, address: addrByGroup.get(`${date}|${property}`), units: deduped }
        })
        .sort((a, b) => a.property.localeCompare(b.property)),
    }))
}

/** Fetch + build for a date range (inclusive ISO dates). */
export async function fetchForecast(dates: string[]): Promise<ForecastDay[]> {
  const lo = dates[0]
  const hi = dates[dates.length - 1]
  // Pull reservations starting up to 10 days before the window, so a stay that CHECKS OUT inside
  // the window (but checked in earlier) is available for extension detection. Extension segments
  // are short (a few nights), so 10 days is plenty and keeps the (heavy) reservation fetch small.
  const resvLo = new Date(`${lo}T00:00:00`)
  resvLo.setDate(resvLo.getDate() - 10)
  const resvLoISO = resvLo.toISOString().slice(0, 10)
  const [tasks, reservations, typeRecs, propRecs, contactRecs] = await Promise.all([
    listAllCached(OPS_TABLES.tasks, {
      filterByFormula: `AND({Scheduled Date (Text)}>='${lo}',{Scheduled Date (Text)}<='${hi}')`,
    }, 60),
    listAllCached(OPS_TABLES.reservations, {
      filterByFormula: `AND({Check-in (Text)}>='${resvLoISO}',{Check-in (Text)}<='${hi}')`,
    }, 60),
    listAllCached(OPS_TABLES.taskTypes, {}, 300),
    listAllCached(OPS_TABLES.properties, {}, 300),
    listAllCached(OPS_TABLES.contacts, {}, 300),
  ])
  const taskTypes = new Map(typeRecs.map((r) => [r.id, String(r.fields['Name'] ?? '')]))
  const propertyNames = new Map(
    propRecs.map((r) => [r.id, String(r.fields['Property Name'] ?? 'Other')])
  )
  const contactNames = new Map(
    contactRecs.map((r) => [r.id, String(r.fields['Name'] ?? r.fields['Full Name'] ?? '')])
  )
  return buildForecastData(tasks, reservations, taskTypes, propertyNames, dates, contactNames)
}

// ---- Compact forecast summary (for the schedule page) --------------------------------
// Per day, per label: how many turnover units have a same-day check-in vs not. Label is the
// property for Thatch units, the client name for non-Thatch. CA/Restock/Linen are excluded.

export interface ForecastSummaryRow {
  label: string
  checkins: number
  total: number
}

export async function fetchForecastSummary(
  dates: string[]
): Promise<Map<string, ForecastSummaryRow[]>> {
  if (dates.length === 0) return new Map()
  const lo = dates[0]
  const hi = dates[dates.length - 1]
  const [tasks, reservations, typeRecs, propRecs, contacts] = await Promise.all([
    listAllCached(OPS_TABLES.tasks, {
      filterByFormula: `AND({Scheduled Date (Text)}>='${lo}',{Scheduled Date (Text)}<='${hi}')`,
    }, 60),
    listAllCached(OPS_TABLES.reservations, {
      filterByFormula: `AND({Check-in (Text)}>='${lo}',{Check-in (Text)}<='${hi}')`,
    }, 60),
    listAllCached(OPS_TABLES.taskTypes, {}, 300),
    listAllCached(OPS_TABLES.properties, {}, 300),
    listAllCached(OPS_TABLES.contacts, {}, 300),
  ])
  const taskTypes = new Map(typeRecs.map((r) => [r.id, String(r.fields['Name'] ?? '')]))
  const propertyNames = new Map(
    propRecs.map((r) => [r.id, String(r.fields['Property Name'] ?? 'Other')])
  )
  const contactNames = new Map(
    contacts.map((r) => [r.id, String(r.fields['Name'] ?? r.fields['Full Name'] ?? '')])
  )
  const arrivals = new Set<string>()
  for (const r of reservations) {
    const ci = String(r.fields['Check-in'] ?? '').slice(0, 10)
    for (const u of Array.isArray(r.fields['Unit']) ? (r.fields['Unit'] as string[]) : [])
      arrivals.add(`${u}|${ci}`)
  }

  const wanted = new Set(dates)
  const byDate = new Map<string, Map<string, { checkins: number; total: number }>>()
  const seen = new Set<string>()
  for (const t of tasks) {
    const f = t.fields
    const date = String(f['Scheduled Date'] ?? '').slice(0, 10)
    if (!wanted.has(date)) continue
    const kind = typeShort(taskTypes.get(first(f['Task Type']) ?? '') ?? '')
    if (kind === 'ca' || kind === 'restock' || kind === 'linen') continue // not turnover units
    const unitId = first(f['Unit'])
    const dedupe = `${unitId}|${date}|${first(f['Template'])}|${String(f['Unit (Text)'] ?? '')}`
    if (seen.has(dedupe)) continue
    seen.add(dedupe)

    const property = propertyNames.get(first(f['Property']) ?? '') ?? 'Other'
    const names = (field: string) =>
      (Array.isArray(f[field]) ? (f[field] as string[]) : [])
        .map((id) => contactNames.get(id) ?? '')
        .filter((n) => n && n.toLowerCase() !== 'unknown')
    const isThatch = names('Billing Contact').some((b) => b.toLowerCase().includes('thatch'))
    // Thatch units label by property; non-Thatch by the RESIDENT we actually clean for
    // (Jaime, Elizabeth, Joe…), never the management company (GMS/Alondra bill/manage them).
    const resident = names('Resident Contact')
    const label = isThatch ? property : resident[0] || property
    const checkin = unitId ? arrivals.has(`${unitId}|${date}`) : false

    if (!byDate.has(date)) byDate.set(date, new Map())
    const m = byDate.get(date)!
    const cur = m.get(label) ?? { checkins: 0, total: 0 }
    cur.total += 1
    if (checkin) cur.checkins += 1
    m.set(label, cur)
  }

  const out = new Map<string, ForecastSummaryRow[]>()
  for (const [date, m] of byDate) {
    out.set(
      date,
      [...m.entries()]
        .map(([label, v]) => ({ label, checkins: v.checkins, total: v.total }))
        .sort((a, b) => a.label.localeCompare(b.label))
    )
  }
  return out
}

export function dateRange(startISO: string, days: number): string[] {
  const start = new Date(`${startISO}T00:00:00`)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    return d.toISOString().slice(0, 10)
  })
}

// ---- WhatsApp-format rendering (matches the validated house format Vitor posts) ----

const WA_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Provenance note shown UNDER the forecast (never part of the copied WhatsApp text). */
export const FORECAST_SOURCE_NOTE =
  'Check-ins (°) are derived from Reservations. Data is read live from Airtable, which Vitor ' +
  'populates — it can lag same-day Breezeway changes.'

function waUnit(u: ForecastUnit): string {
  if (u.kind === 'ca' || u.label === 'CA') return 'CA'
  if (u.kind === 'restock') return 'Restock'
  if (u.kind === 'linen') return 'Linen'
  if (u.kind === 'mid') return `${u.label} (Mid)`
  return u.checkin ? `*${u.label}°*` : u.label
}

/** Removable trailing note listing held stay-extensions (verify, then delete before/after sending). */
function extNote(day: ForecastDay): string {
  const items = (day.extensions ?? []).map((e) => {
    const tail = e.guest ? ` (${e.guest}${e.until ? ` → ${mmdd(e.until)}` : ''})` : ''
    return `- ${e.property} ${e.unit}${tail}`
  })
  return ['— — —', '⚠️ *Held — likely stay extensions, no clean. Verify + delete:*', ...items].join('\n')
}

function dayBlock(day: ForecastDay): string {
  const d = new Date(`${day.date}T00:00:00`)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const head = `*☀️ ${dd}/${mm} – ${WA_WEEKDAYS[d.getDay()]} 🗓️*`
  const lines = day.groups.map((g) => {
    const name = g.address ? `${g.property} (${g.address})` : g.property
    return `- *${name}*: ${g.units.map(waUnit).join(', ')}`
  })
  const block = [head, ...lines].join('\n')
  return day.extensions?.length ? `${block}\n${extNote(day)}` : block
}

function mmdd(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

export function dayToWhatsApp(day: ForecastDay): string {
  return [`*🗓️ Daily Forecast (${mmdd(day.date)})*`, '*° = same-day check-in*', '', dayBlock(day)].join('\n')
}

export function weekToWhatsApp(days: ForecastDay[]): string {
  if (!days.length) return ''
  const span = `${mmdd(days[0].date)} - ${mmdd(days[days.length - 1].date)}`
  return [`*🗓️ Weekly Forecast (${span})*`, '*° = same-day check-in*', '', days.map(dayBlock).join('\n\n')].join('\n')
}
