'use client'

import { useState } from 'react'

export default function NewsletterCTA() {
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async () => {
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
      setError("Something went wrong — please try calling us at 781-686-7189.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
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
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-shrink-0 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy disabled:opacity-50"
          style={{ background: '#2DAAE1', borderLeft: '2px solid rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}
        >
          {loading ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      <input
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Also by text (optional): 617-555-0123"
        className="w-full px-3 py-2 text-sm focus:outline-none text-white placeholder:text-white/25"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      {error && <p className="text-xs" style={{ color: '#E07070' }}>{error}</p>}
    </div>
  )
}
