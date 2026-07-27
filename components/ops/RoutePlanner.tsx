'use client'

import { useState } from 'react'

/** Shown on the Daily page when no route was posted yet: each scheduled cleaner gets a box for
 * where they go, and a Copy button builds a "Schedule de Hoje" message ready to paste into WhatsApp
 * (which the daily build then auto-detects). */
export function RoutePlanner({ employees }: { employees: string[] }) {
  const [where, setWhere] = useState<Record<string, string>>(
    Object.fromEntries(employees.map((e) => [e, '']))
  )
  const [copied, setCopied] = useState(false)

  const text = () => {
    const body = employees
      .filter((e) => (where[e] ?? '').trim())
      .map((e) => `${e}: ${where[e].trim()}`)
      .join('\n\n')
    return `*Schedule de Hoje*\n\n${body}`
  }

  async function copy() {
    const t = text()
    try {
      await navigator.clipboard.writeText(t)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = t
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const anyFilled = employees.some((e) => (where[e] ?? '').trim())

  return (
    <div className="space-y-2">
      <p className="text-sm text-white-45">
        No route posted yet. Write where each cleaner goes, then copy it to send on WhatsApp.
      </p>
      <div className="space-y-1.5">
        {employees.map((e) => (
          <div key={e} className="flex items-center gap-2">
            <span className="w-24 shrink-0 text-sm font-medium text-white">{e}</span>
            <input
              value={where[e] ?? ''}
              onChange={(ev) => setWhere((w) => ({ ...w, [e]: ev.target.value }))}
              placeholder="where they go — e.g. Broadway, Dorchester"
              className="flex-1 rounded border border-white-10 bg-navy px-2 py-1 text-sm text-white outline-none focus:border-brand-gold/40"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={copy}
        disabled={!anyFilled}
        className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40 ${
          copied
            ? 'border-green-500/30 bg-green-500/15 text-green-300'
            : 'border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10'
        }`}
      >
        {copied ? '✓ Copied — paste into WhatsApp' : 'Copy route for WhatsApp'}
      </button>
    </div>
  )
}
