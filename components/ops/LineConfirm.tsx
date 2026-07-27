'use client'

import { useState } from 'react'
import type { ConfirmStatus } from '@/lib/ops/opsfeed'

/** Per-invoice-line confirm / flag / note control. Posts to /api/ops/confirm (append-only). */
export function LineConfirm({
  lineKey,
  initialStatus,
  initialNote,
  initialBy,
}: {
  lineKey: string
  initialStatus: ConfirmStatus
  initialNote: string
  initialBy: string
}) {
  const [status, setStatus] = useState<ConfirmStatus>(initialStatus)
  const [note, setNote] = useState(initialNote)
  const [by, setBy] = useState(initialBy)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initialNote)
  const [failed, setFailed] = useState(false)

  async function send(next: ConfirmStatus, nextNote = note) {
    setSaving(true)
    setFailed(false)
    try {
      const res = await fetch('/api/ops/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: lineKey, status: next, note: nextNote }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(j?.error ?? 'failed')
      setStatus(next)
      setNote(nextNote)
      setBy(j.by ?? by)
    } catch {
      setFailed(true)
    } finally {
      setSaving(false)
    }
  }

  const pill =
    status === 'confirmed'
      ? 'bg-green-500/15 text-green-300 border-green-500/25'
      : status === 'flagged'
        ? 'bg-amber-400/15 text-amber-300 border-amber-400/25'
        : 'bg-white-5 text-white-45 border-white-10'

  const btn = 'rounded border px-1.5 py-0.5 transition-colors disabled:opacity-40'

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
      <span className={`rounded border px-1.5 py-0.5 uppercase tracking-wide ${pill}`}>{status}</span>

      <button
        type="button"
        disabled={saving || status === 'confirmed'}
        onClick={() => send('confirmed')}
        className={`${btn} border-green-500/25 text-green-300 hover:bg-green-500/10`}
      >
        ✓ Confirm
      </button>
      <button
        type="button"
        disabled={saving || status === 'flagged'}
        onClick={() => send('flagged')}
        className={`${btn} border-amber-400/25 text-amber-300 hover:bg-amber-400/10`}
      >
        ⚑ Flag
      </button>
      {status !== 'pending' && (
        <button
          type="button"
          disabled={saving}
          onClick={() => send('pending')}
          className={`${btn} border-white-10 text-white-45 hover:bg-white-5`}
        >
          ↺ Reset
        </button>
      )}

      <button
        type="button"
        onClick={() => {
          setDraft(note)
          setEditing((v) => !v)
        }}
        className={`${btn} border-white-10 text-white-45 hover:bg-white-5`}
      >
        {note ? 'Note ✎' : '+ Note'}
      </button>

      {editing && (
        <span className="flex items-center gap-1">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="note…"
            className="w-40 rounded border border-white-10 bg-navy px-1.5 py-0.5 text-white outline-none focus:border-brand-gold/40"
          />
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              void send(status === 'pending' ? 'flagged' : status, draft)
              setEditing(false)
            }}
            className={`${btn} border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10`}
          >
            Save
          </button>
        </span>
      )}

      {note && !editing && <span className="italic text-white-40">“{note}”</span>}
      {by && by !== 'seed' && <span className="text-white-25">· {by}</span>}
      {failed && <span className="text-red-300">save failed</span>}
    </div>
  )
}
