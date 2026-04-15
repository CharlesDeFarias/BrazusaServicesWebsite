'use client'

import { useState } from 'react'

export default function NewsletterCTA() {
  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = () => {
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setError('')
    console.log({ email, phone })
    setSubmitted(true)
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
          className="flex-shrink-0 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
          style={{ background: '#2DAAE1', borderLeft: '2px solid rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}
        >
          Subscribe
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
