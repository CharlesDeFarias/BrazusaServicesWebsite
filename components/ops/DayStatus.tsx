'use client'

import { useState } from 'react'

/** Per-day planning-status control: 3 toggle flags + editable cleaner assignments.
 * Any signed-in user can toggle (dad taps "Roster", Charles sets the rest). Posts full state. */
export function DayStatus({
  date,
  initial,
}: {
  date: string
  initial: {
    rosterConfirmed: boolean
    scheduleSent: boolean
    cleanersNotified: boolean
    assignments: string
  }
}) {
  const [roster, setRoster] = useState(initial.rosterConfirmed)
  const [sent, setSent] = useState(initial.scheduleSent)
  const [notified, setNotified] = useState(initial.cleanersNotified)
  const [assignments, setAssignments] = useState(initial.assignments)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initial.assignments)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)

  async function save(next: {
    rosterConfirmed: boolean
    scheduleSent: boolean
    cleanersNotified: boolean
    assignments: string
  }) {
    setSaving(true)
    setFailed(false)
    try {
      const res = await fetch('/api/ops/daymeta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, ...next }),
      })
      if (!res.ok) throw new Error('failed')
    } catch {
      setFailed(true)
    } finally {
      setSaving(false)
    }
  }

  const state = () => ({
    rosterConfirmed: roster,
    scheduleSent: sent,
    cleanersNotified: notified,
    assignments,
  })

  function toggle(field: 'roster' | 'sent' | 'notified') {
    const next = {
      rosterConfirmed: field === 'roster' ? !roster : roster,
      scheduleSent: field === 'sent' ? !sent : sent,
      cleanersNotified: field === 'notified' ? !notified : notified,
      assignments,
    }
    if (field === 'roster') setRoster(next.rosterConfirmed)
    if (field === 'sent') setSent(next.scheduleSent)
    if (field === 'notified') setNotified(next.cleanersNotified)
    void save(next)
  }

  const pill = (on: boolean, onColor: string) =>
    `rounded border px-1.5 py-0.5 transition-colors disabled:opacity-40 ${
      on ? onColor : 'border-white-10 bg-white-5 text-white-40'
    }`

  return (
    <div className="space-y-1.5 text-[11px]">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          disabled={saving}
          onClick={() => toggle('roster')}
          className={pill(roster, 'border-green-500/30 bg-green-500/15 text-green-300')}
        >
          {roster ? '✓ Roster confirmed' : 'Roster confirmed?'}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => toggle('sent')}
          className={pill(sent, 'border-sky-400/30 bg-sky-400/15 text-sky-300')}
        >
          {sent ? '✓ Schedule sent' : 'Schedule sent?'}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => toggle('notified')}
          className={pill(notified, 'border-green-500/30 bg-green-500/15 text-green-300')}
        >
          {notified ? '✓ Cleaners notified' : 'Cleaners notified?'}
        </button>
        {failed && <span className="text-red-300">save failed</span>}
      </div>

      <div className="flex items-start gap-1.5">
        <span className="pt-0.5 uppercase tracking-wide text-white-35">Assign</span>
        {editing ? (
          <span className="flex flex-1 items-start gap-1">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder="who goes where — e.g. Fredd+Sandra: Broadway, Dorchester · Dorinha: Prentiss"
              className="flex-1 rounded border border-white-10 bg-navy px-1.5 py-1 text-white outline-none focus:border-brand-gold/40"
            />
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setAssignments(draft)
                setEditing(false)
                void save({ ...state(), assignments: draft })
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
              setDraft(assignments)
              setEditing(true)
            }}
            className="flex-1 text-left text-white-70 hover:text-white"
          >
            {assignments || <span className="text-white-35 italic">+ add assignments</span>}
          </button>
        )}
      </div>
    </div>
  )
}
