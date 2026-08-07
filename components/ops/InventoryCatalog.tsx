'use client'

import { useMemo, useState } from 'react'
import type { CatalogItem } from '@/lib/ops/opsfeed'

const SHORT: Record<string, string> = {
  'Prentiss House': 'Prentiss',
  '94 Charles': '94 Charles',
  '304 Newbury': '304 Newb',
  '58 Burbank': '58 Burbank',
  '80 Dorchester': '80 Dot',
  '30 W Broadway': '30 Webro',
}

function norm(s: string): 'in' | 'low' | 'out' | 'none' {
  const t = (s ?? '').toLowerCase()
  if (t.startsWith('out')) return 'out'
  if (t.startsWith('low')) return 'low'
  if (t.startsWith('in')) return 'in'
  return 'none'
}

/** Read-only supply + linen catalog (seeded from the Thatch workbook), one row per item with
 *  per-building stock. Client-side filters: kind, needs-attention, building, and name search. */
export function InventoryCatalog({ items, buildings }: { items: CatalogItem[]; buildings: string[] }) {
  const [kind, setKind] = useState<'all' | 'supply' | 'linen'>('all')
  const [attn, setAttn] = useState(false) // only Low / Out
  const [bld, setBld] = useState<string>('all')
  const [q, setQ] = useState('')

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase()
    return items.filter((it) => {
      if (kind !== 'all' && it.kind !== kind) return false
      if (query && !`${it.name} ${it.pt} ${it.vendor} ${it.description}`.toLowerCase().includes(query))
        return false
      const cols = bld === 'all' ? buildings : [bld]
      if (attn && !cols.some((b) => ['low', 'out'].includes(norm(it.stock[b] ?? '')))) return false
      if (bld !== 'all' && norm(it.stock[bld] ?? '') === 'none' && !attn) {
        // when filtered to one building, hide items that building doesn't stock (unless searching)
        if (!query) return false
      }
      return true
    })
  }, [items, kind, attn, bld, q, buildings])

  const cols = bld === 'all' ? buildings : [bld]

  const cell = (s: string) => {
    const n = norm(s)
    if (n === 'out') return <span className="rounded bg-red-400/15 px-1.5 py-0.5 text-[11px] font-medium text-red-300">Out</span>
    if (n === 'low') return <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-[11px] font-medium text-amber-300">Low</span>
    if (n === 'in') return <span className="text-green-400/70" title="In stock">✓</span>
    return <span className="text-white-20" title="not stocked here">—</span>
  }

  const pill = (on: boolean) =>
    `rounded border px-2 py-0.5 text-xs transition-colors ${
      on ? 'border-brand-gold/40 bg-brand-gold/10 text-brand-gold' : 'border-white-10 text-white-45 hover:text-white-70'
    }`

  const lowOut = items.reduce(
    (n, it) => n + buildings.filter((b) => ['low', 'out'].includes(norm(it.stock[b] ?? ''))).length,
    0
  )

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => setKind('all')} className={pill(kind === 'all')}>All</button>
        <button type="button" onClick={() => setKind('supply')} className={pill(kind === 'supply')}>Supplies</button>
        <button type="button" onClick={() => setKind('linen')} className={pill(kind === 'linen')}>Linen</button>
        <span className="mx-1 text-white-15">·</span>
        <button type="button" onClick={() => setAttn((v) => !v)} className={pill(attn)}>
          Needs attention{lowOut > 0 && ` (${lowOut})`}
        </button>
        <select
          value={bld}
          onChange={(e) => setBld(e.target.value)}
          className="rounded border border-white-10 bg-navy px-2 py-0.5 text-xs text-white-70 outline-none"
          aria-label="building filter"
        >
          <option value="all">All buildings</option>
          {buildings.map((b) => (
            <option key={b} value={b}>{SHORT[b] ?? b}</option>
          ))}
        </select>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search item…"
          className="ml-auto w-40 rounded border border-white-10 bg-navy px-2 py-0.5 text-xs text-white outline-none focus:border-brand-gold/40"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-white-10">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-white-5 text-white-40">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Item</th>
              {cols.map((b) => (
                <th key={b} className="px-2 py-2 text-center font-medium whitespace-nowrap">{SHORT[b] ?? b}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white-10">
            {shown.map((it, i) => (
              <tr key={i} className="align-top">
                <td className="px-3 py-2">
                  <div className="font-medium text-white-80">{it.name}</div>
                  <div className="text-[11px] text-white-35">
                    {[it.pt, it.vendor, it.description].filter(Boolean).join(' · ')}
                  </div>
                </td>
                {cols.map((b) => (
                  <td key={b} className="px-2 py-2 text-center">{cell(it.stock[b] ?? '')}</td>
                ))}
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={cols.length + 1} className="px-3 py-6 text-center text-sm text-white-40">
                  No items match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-white-35">
        {shown.length} of {items.length} items · ✓ in stock · <span className="text-amber-300">Low</span> ·{' '}
        <span className="text-red-300">Out</span> · — not stocked there
      </p>
    </div>
  )
}
