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
        <form onSubmit={submit} className="space-y-5 border-x border-b border-white-10 bg-white-5 px-7 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5">
              <span className="text-lg font-bold tracking-[0.03em] text-white [font-family:var(--font-ibm-plex-sans)]">
                Brazusa
              </span>
              <span className="border-l-2 border-brand-gold px-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Ops
              </span>
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white-40">
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
            className="w-full border border-white-15 bg-white-5 px-4 py-3 text-center tracking-widest text-white placeholder:text-white-40 focus:border-brand-gold focus:outline-none [color-scheme:dark]"
          />
          {error && <p className="text-center text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={busy || passcode.length === 0}
            className="w-full bg-brand-gold py-3 font-semibold tracking-[0.05em] text-navy transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy ? '…' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
