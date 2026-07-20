import { listAll, OPS_TABLES } from './airtable'
import { residentInfo } from './opsfeed'

/**
 * Resident reference for the ops layer: commonly-needed info per resident.
 *   address + unit  = Airtable Units (Property link + Unit number)
 *   phone + email   = Airtable Contacts (the Resident Contact)
 *   door code + notes = ops sheet `residents` tab (human-edited)
 * Thatch units (Resident Contact = "Unknown" / "Live Thatch") are excluded — these are the
 * residential clients we clean directly. Read-only.
 */

export interface ResidentUnit {
  address: string
  unit: string
}

export interface Resident {
  name: string
  units: ResidentUnit[]
  phone: string
  email: string
  code: string
  notes: string
}

function first(v: unknown): string | null {
  return Array.isArray(v) && v.length ? String(v[0]) : null
}

/** "1 Nashua St 4B (Alejandro)" -> "1 Nashua St 4B" (drop the trailing "(resident)"). */
function stripResident(unitName: string): string {
  return unitName.replace(/\s*\([^)]*\)\s*$/, '').trim()
}

export async function fetchResidents(): Promise<Resident[]> {
  const [unitRecs, contactRecs, propRecs] = await Promise.all([
    listAll(OPS_TABLES.units),
    listAll(OPS_TABLES.contacts),
    listAll(OPS_TABLES.properties),
  ])
  const propName = new Map(propRecs.map((r) => [r.id, String(r.fields['Property Name'] ?? '')]))
  const contact = new Map(
    contactRecs.map((r) => [
      r.id,
      {
        name: String(r.fields['Full Name'] ?? ''),
        phone: String(r.fields['Phone'] ?? ''),
        email: String(r.fields['Primary Email'] ?? ''),
      },
    ])
  )
  const sheet = await residentInfo().catch(() => new Map())

  const byResident = new Map<string, Resident>()
  for (const u of unitRecs) {
    const f = u.fields
    const c = contact.get(first(f['Resident Contact']) ?? '')
    const name = c?.name?.trim() ?? ''
    const low = name.toLowerCase()
    if (!name || low === 'unknown' || low.includes('thatch')) continue

    const address =
      propName.get(first(f['Property Name']) ?? '') || stripResident(String(f['Unit Name'] ?? ''))
    const unit = String(f['Unit number'] ?? '').trim()
    const unitEntry: ResidentUnit = { address, unit }

    const existing = byResident.get(name)
    if (existing) {
      if (!existing.units.some((x) => x.address === address && x.unit === unit))
        existing.units.push(unitEntry)
    } else {
      const info = sheet.get(low)
      byResident.set(name, {
        name,
        units: [unitEntry],
        phone: c?.phone ?? '',
        email: c?.email ?? '',
        code: info?.code ?? '',
        notes: info?.notes ?? '',
      })
    }
  }

  return [...byResident.values()].sort((a, b) => a.name.localeCompare(b.name))
}
