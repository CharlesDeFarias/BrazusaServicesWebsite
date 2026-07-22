import { listAllCached, OPS_TABLES } from './airtable'
import { scheduleNotes } from './opsfeed'

/**
 * Weekly employee schedule for the ops layer.
 *   employees per day = Airtable "Scheduling" table (Date + linked Staff), source of truth
 *   per-day note      = ops sheet `schedule` tab, editable by a human
 * Both tables are tiny (~40 rows), so we fetch all and filter in JS rather than by formula.
 * Read-only: never writes Airtable.
 */

export interface ScheduleDay {
  date: string
  employees: string[]
  note?: string
}

export async function fetchSchedule(dates: string[]): Promise<ScheduleDay[]> {
  if (dates.length === 0) return []
  const want = new Set(dates)

  const [rows, staff] = await Promise.all([
    listAllCached(OPS_TABLES.scheduling, {}, 120),
    listAllCached(OPS_TABLES.staff, {}, 300),
  ])
  const nameById = new Map(
    staff.map((s) => [s.id, String(s.fields['Full Name'] ?? '').trim()])
  )
  const notes = await scheduleNotes().catch(() => new Map<string, string>())

  const byDate = new Map<string, ScheduleDay>()
  for (const r of rows) {
    const date = String(r.fields['Date'] ?? '').slice(0, 10)
    if (!want.has(date)) continue
    const ids = (r.fields['Staff'] as string[] | undefined) ?? []
    const employees = ids.map((id) => nameById.get(id) || '').filter(Boolean)
    const existing = byDate.get(date)
    if (existing) {
      for (const e of employees) if (!existing.employees.includes(e)) existing.employees.push(e)
    } else {
      byDate.set(date, { date, employees, note: notes.get(date) || undefined })
    }
  }

  // Return in requested order; include any requested date that has a note but no roster row.
  const out: ScheduleDay[] = []
  for (const d of dates) {
    if (byDate.has(d)) out.push(byDate.get(d)!)
    else if (notes.get(d)) out.push({ date: d, employees: [], note: notes.get(d) })
  }
  return out
}
