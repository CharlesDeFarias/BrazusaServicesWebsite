'use client'

import { useState } from 'react'

/** One-tap "confirm the whole week's rosters" — sets rosterConfirmed on every day at once
 * (rosters tend to be finalized together), preserving each day's other daymeta fields. */
export function WeekRosterButton({
  days,
}: {
  days: {
    date: string
    rosterConfirmed: boolean
    scheduleSent: boolean
    cleanersNotified: boolean
    assignments: string
  }[]
}) {
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)

  const allConfirmed = days.length > 0 && days.every((d) => d.rosterConfirmed)

  async function confirmWeek() {
    setSaving(true)
    setFailed(false)
    try {
      const results = await Promise.all(
        days
          .filter((d) => !d.rosterConfirmed)
          .map((d) =>
            fetch('/api/ops/daymeta', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                date: d.date,
                rosterConfirmed: true,
                scheduleSent: d.scheduleSent,
                cleanersNotified: d.cleanersNotified,
                assignments: d.assignments,
              }),
            })
          )
      )
      if (results.some((r) => !r.ok)) throw new Error('partial')
      setDone(true)
    } catch {
      setFailed(true)
    } finally {
      setSaving(false)
    }
  }

  const settled = done || allConfirmed
  return (
    <button
      type="button"
      onClick={confirmWeek}
      disabled={saving || settled}
      className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
        settled
          ? 'border-green-500/30 bg-green-500/15 text-green-300'
          : 'border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10'
      }`}
    >
      {settled ? '✓ Week roster confirmed' : saving ? 'Saving…' : 'Confirm roster — whole week'}
      {failed && <span className="ml-2 text-red-300">retry</span>}
    </button>
  )
}
