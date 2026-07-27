'use client'

import { useState } from 'react'
import type { ConfirmStatus } from '@/lib/ops/opsfeed'

export interface LineData {
  key: string
  date: string
  desc: string
  amount: number
  building?: string
  initialStatus: ConfirmStatus
  initialNote: string
  initialBy: string
}
export interface LineGroup {
  heading: string
  lines: LineData[]
}

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/** Invoice line list with per-line confirm/flag/note AND multi-select batch actions. Used by both
 * the unconfirmed section (grouped by client, building label) and a client's invoice (by property). */
export function InvoiceLineGroups({ groups }: { groups: LineGroup[] }) {
  const all = groups.flatMap((g) => g.lines)
  const [status, setStatus] = useState<Record<string, ConfirmStatus>>(
    Object.fromEntries(all.map((l) => [l.key, l.initialStatus]))
  )
  const [notes, setNotes] = useState<Record<string, string>>(
    Object.fromEntries(all.map((l) => [l.key, l.initialNote]))
  )
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)

  async function post(key: string, next: ConfirmStatus, note: string) {
    const res = await fetch('/api/ops/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, status: next, note }),
    })
    if (!res.ok) throw new Error('failed')
  }

  async function one(key: string, next: ConfirmStatus, note = notes[key] ?? '') {
    setSaving(true)
    try {
      await post(key, next, note)
      setStatus((s) => ({ ...s, [key]: next }))
      setNotes((n) => ({ ...n, [key]: note }))
    } catch {
      /* ignore; user can retry */
    } finally {
      setSaving(false)
    }
  }

  async function batch(next: ConfirmStatus) {
    const keys = [...selected]
    if (keys.length === 0) return
    setSaving(true)
    try {
      await Promise.all(keys.map((k) => post(k, next, notes[k] ?? '')))
      setStatus((s) => ({ ...s, ...Object.fromEntries(keys.map((k) => [k, next])) }))
      setSelected(new Set())
    } catch {
      /* partial; leave selection */
    } finally {
      setSaving(false)
    }
  }

  function toggle(key: string) {
    setSelected((prev) => {
      const n = new Set(prev)
      n.has(key) ? n.delete(key) : n.add(key)
      return n
    })
  }
  function toggleGroup(keys: string[], on: boolean) {
    setSelected((prev) => {
      const n = new Set(prev)
      keys.forEach((k) => (on ? n.add(k) : n.delete(k)))
      return n
    })
  }

  const pill = (st: ConfirmStatus) =>
    st === 'confirmed'
      ? 'border-green-500/30 bg-green-500/15 text-green-300'
      : st === 'flagged'
        ? 'border-amber-400/30 bg-amber-400/15 text-amber-300'
        : 'border-white-10 bg-white-5 text-white-45'

  return (
    <div className="space-y-4 pb-16">
      {groups.map((g) => {
        const keys = g.lines.map((l) => l.key)
        const allSel = keys.every((k) => selected.has(k))
        return (
          <div key={g.heading}>
            <div className="mb-1 flex items-center gap-2">
              <input
                type="checkbox"
                checked={allSel}
                onChange={(e) => toggleGroup(keys, e.target.checked)}
                className="h-4 w-4 accent-brand-gold"
                aria-label={`select all ${g.heading}`}
              />
              <h3 className="text-sm font-medium text-white">{g.heading}</h3>
            </div>
            <div className="divide-y divide-white-10 rounded-lg border border-white-10">
              {g.lines.map((l, i) => {
                const st = status[l.key]
                let prevB: string | undefined
                if (i > 0) prevB = g.lines[i - 1].building
                const showB = l.building && l.building !== prevB
                return (
                  <div key={l.key} className="space-y-1 px-3 py-2 text-sm">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={selected.has(l.key)}
                        onChange={() => toggle(l.key)}
                        className="mt-1 h-4 w-4 shrink-0 accent-brand-gold"
                        aria-label={`select ${l.desc}`}
                      />
                      <span className="whitespace-nowrap text-white-35">{l.date}</span>
                      <span className="flex-1">
                        {showB && (
                          <span className="mr-1 rounded bg-white-10 px-1 text-[11px] uppercase tracking-wide text-white-45">
                            {l.building}
                          </span>
                        )}
                        <span className="text-white-70">{l.desc}</span>
                      </span>
                      <span
                        className={`shrink-0 rounded border px-1.5 text-[11px] uppercase ${pill(st)}`}
                      >
                        {st}
                      </span>
                      <span className="whitespace-nowrap">{money(l.amount)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pl-6 text-[11px]">
                      <button
                        type="button"
                        disabled={saving || st === 'confirmed'}
                        onClick={() => one(l.key, 'confirmed')}
                        className="rounded border border-green-500/25 px-1.5 py-0.5 text-green-300 hover:bg-green-500/10 disabled:opacity-40"
                      >
                        ✓ Confirm
                      </button>
                      <button
                        type="button"
                        disabled={saving || st === 'flagged'}
                        onClick={() => one(l.key, 'flagged')}
                        className="rounded border border-amber-400/25 px-1.5 py-0.5 text-amber-300 hover:bg-amber-400/10 disabled:opacity-40"
                      >
                        ⚑ Flag
                      </button>
                      {editing === l.key ? (
                        <span className="flex items-center gap-1">
                          <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="note…"
                            className="w-36 rounded border border-white-10 bg-navy px-1.5 py-0.5 text-white outline-none focus:border-brand-gold/40"
                          />
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => {
                              void one(l.key, st === 'pending' ? 'flagged' : st, draft)
                              setEditing(null)
                            }}
                            className="rounded border border-brand-gold/30 px-1.5 py-0.5 text-brand-gold hover:bg-brand-gold/10"
                          >
                            Save
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setDraft(notes[l.key] ?? '')
                            setEditing(l.key)
                          }}
                          className="rounded border border-white-10 px-1.5 py-0.5 text-white-45 hover:bg-white-5"
                        >
                          {notes[l.key] ? 'Note ✎' : '+ Note'}
                        </button>
                      )}
                      {notes[l.key] && editing !== l.key && (
                        <span className="italic text-white-40">“{notes[l.key]}”</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* floating batch action bar */}
      {selected.size > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white-10 bg-navy/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-white">{selected.size} selected</span>
            <button
              type="button"
              disabled={saving}
              onClick={() => batch('confirmed')}
              className="rounded-md border border-green-500/40 bg-green-500/15 px-3 py-1.5 font-medium text-green-300 disabled:opacity-50"
            >
              ✓ Confirm selected
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => batch('flagged')}
              className="rounded-md border border-amber-400/40 bg-amber-400/15 px-3 py-1.5 font-medium text-amber-300 disabled:opacity-50"
            >
              ⚑ Flag selected
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="rounded-md border border-white-15 px-3 py-1.5 text-white-60"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
