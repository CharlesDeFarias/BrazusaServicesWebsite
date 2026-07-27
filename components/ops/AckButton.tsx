'use client'

import { useState } from 'react'

/** A checkmark that marks a flag done (e.g. the payroll pay-week alert). Posts to /api/ops/flag. */
export function AckButton({
  flagKey,
  initialDone,
  label = 'Mark done',
  doneLabel = '✓ Done',
}: {
  flagKey: string
  initialDone: boolean
  label?: string
  doneLabel?: string
}) {
  const [done, setDone] = useState(initialDone)
  const [saving, setSaving] = useState(false)

  async function toggle() {
    const next = !done
    setSaving(true)
    try {
      const res = await fetch('/api/ops/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: flagKey, value: next ? 'true' : 'false' }),
      })
      if (res.ok) setDone(next)
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
        done
          ? 'border-green-500/30 bg-green-500/15 text-green-300'
          : 'border-white-15 bg-white-5 text-white-70 hover:bg-white-10'
      }`}
    >
      {done ? doneLabel : label}
    </button>
  )
}
