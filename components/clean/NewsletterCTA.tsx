'use client'

import { type JSX, useState } from 'react'

export default function NewsletterCTA(): JSX.Element {
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (): Promise<void> => {
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: 'brazusa-cleaning', email: email.trim(), phone: phone.trim() || undefined }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      setError("Something went wrong \u2014 please try calling us at 781-686-7189.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p className="text-sm text-white-50">
        You&apos;re on the list. ✓
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-3 py-2 text-sm focus:outline-none text-white placeholder:text-white/30"
          style={{ background: 'var(--color-white-5)', border: '1px solid var(--color-white-10)' }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-shrink-0 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy disabled:opacity-50"
          style={{ background: 'var(--color-brand-blue)', borderLeft: '2px solid var(--color-white-25)', whiteSpace: 'nowrap' }}
        >
          {loading ? 'Sending\u2026' : 'Subscribe'}
        </button>
      </div>
      <input
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Also by text (optional): 617-555-0123"
        className="w-full px-3 py-2 text-sm focus:outline-none text-white placeholder:text-white/25"
        style={{ background: 'var(--color-white-5)', border: '1px solid var(--color-white-10)' }}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}
