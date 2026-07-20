'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OpsLoginPage() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const res = await fetch('/api/ops/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    }).catch(() => null)
    setBusy(false)
    if (res?.ok) {
      router.push('/ops/forecast')
      router.refresh()
    } else {
      setError('Invalid passcode')
    }
  }

  return (
    <main className="grain min-h-screen flex items-center justify-center bg-navy px-6">
      <div className="w-full max-w-xs">
        {/* gold hairline caps the card — the brand signature */}
        <div className="h-0.5 w-full bg-brand-gold" />
        <form onSubmit={submit} className="space-y-5 bg-off-white px-7 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5">
              <span className="text-lg font-bold tracking-[0.03em] text-navy [font-family:var(--font-ibm-plex-sans)]">
                Brazusa
              </span>
              <span className="border-l-2 border-brand-gold px-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Ops
              </span>
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-warm-gray-dark">
              Internal operations
            </p>
          </div>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            className="w-full border border-navy-15 bg-white px-4 py-3 text-center tracking-widest text-navy placeholder:text-warm-gray focus:border-brand-gold focus:outline-none"
          />
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy || passcode.length === 0}
            className="w-full border-l-2 border-brand-gold bg-navy py-3 font-medium tracking-[0.05em] text-white transition-opacity hover:opacity-85 disabled:opacity-40"
          >
            {busy ? '…' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
