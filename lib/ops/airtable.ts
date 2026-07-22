/**
 * Read-only Airtable access for the ops layer.
 * Uses a SEPARATE, scoped token (read-only, ops base only) - never the form-handler token.
 *   BRAZUSA_OPS_AIRTABLE_TOKEN, BRAZUSA_OPS_AIRTABLE_BASE_ID
 * This module only ever GETs. No write path by design (mirrors BrazusaOps airtable_api.py).
 */

import { unstable_cache } from 'next/cache'

const API = 'https://api.airtable.com/v0'

export const OPS_TABLES = {
  tasks: 'tblYo3WqgZ5pMdlKZ',
  reservations: 'tblByfYL0UNDKIUgk',
  taskTypes: 'tblH1t0aGRRI4ZgKV',
  properties: 'tblopT6NuQAiHs2cw',
  pricingTemplates: 'tblVBwVxfyHbTM49x',
  contacts: 'tbluaPVd6ZA24Exjn',
  scheduling: 'tblG10OCjQLfIgR4Z',
  staff: 'tblfq8wmcqCa33hhs',
  units: 'tblu7El0RiiNT5uDy',
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

/**
 * Cached listAll. The ops pages are force-dynamic (per-user auth) but the Airtable data is
 * Vitor-populated and lags anyway, so caching the paginated read for a few seconds/minutes
 * makes repeat loads instant instead of re-paginating whole tables every time.
 * Reference tables (contacts/properties/types/units) change rarely -> long TTL; tasks/reservations
 * briefly -> short TTL. Keyed by (table, params) so each date range caches independently.
 */
export function listAllCached(
  table: string,
  params: Record<string, string> = {},
  revalidate = 60
): Promise<AirtableRecord[]> {
  return unstable_cache(() => listAll(table, params), ['airtable', table, JSON.stringify(params)], {
    revalidate,
  })()
}
