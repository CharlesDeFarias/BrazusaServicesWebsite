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
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
      <form onSubmit={submit} className="w-full max-w-xs space-y-4">
        <h1 className="text-neutral-100 text-xl font-semibold text-center">Brazusa Ops</h1>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100 text-center tracking-widest focus:outline-none focus:border-neutral-400"
        />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={busy || passcode.length === 0}
          className="w-full rounded-md bg-neutral-100 text-neutral-900 py-3 font-medium disabled:opacity-50"
        >
          {busy ? '...' : 'Enter'}
        </button>
      </form>
    </main>
  )
}
