/**
 * Read-only Airtable access for the ops layer.
 * Uses a SEPARATE, scoped token (read-only, ops base only) - never the form-handler token.
 *   BRAZUSA_OPS_AIRTABLE_TOKEN, BRAZUSA_OPS_AIRTABLE_BASE_ID
 * This module only ever GETs. No write path by design (mirrors BrazusaOps airtable_api.py).
 */

const API = 'https://api.airtable.com/v0'

export const OPS_TABLES = {
  tasks: 'tblYo3WqgZ5pMdlKZ',
  reservations: 'tblByfYL0UNDKIUgk',
  taskTypes: 'tblH1t0aGRRI4ZgKV',
  properties: 'tblopT6NuQAiHs2cw',
  pricingTemplates: 'tblVBwVxfyHbTM49x',
  contacts: 'tbluaPVd6ZA24Exjn',
} as const

export interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
}

export async function listAll(
  table: string,
  params: Record<string, string> = {}
): Promise<AirtableRecord[]> {
  const baseId = process.env.BRAZUSA_OPS_AIRTABLE_BASE_ID
  const token = process.env.BRAZUSA_OPS_AIRTABLE_TOKEN
  if (!baseId || !token) throw new Error('Ops Airtable env not configured')

  const records: AirtableRecord[] = []
  let offset: string | undefined
  do {
    const qs = new URLSearchParams({ ...params, pageSize: '100' })
    if (offset) qs.set('offset', offset)
    const res = await fetch(`${API}/${baseId}/${table}?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Airtable ops read failed: ${res.status}`)
    const json = (await res.json()) as { records: AirtableRecord[]; offset?: string }
    records.push(...json.records)
    offset = json.offset
  } while (offset)
  return records
}
