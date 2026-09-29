'use client'

import { type JSX, useState, useEffect } from 'react'

type ContactMethod = 'phone' | 'sms' | 'email'

interface CondoDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const inputCls = [
  'w-full rounded-none px-4 py-2.5 text-sm focus:outline-none transition-colors',
  'text-white placeholder:text-white/30',
].join(' ')

const labelCls = 'block text-xs font-medium mb-1.5 uppercase tracking-wider text-white-45'

const ROLES = ['Board member', 'Property manager', 'Building resident', 'Other'] as const

export default function CondoDrawer({ isOpen, onClose }: CondoDrawerProps): JSX.Element {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('phone')
  const [role, setRole] = useState('')
  const [building, setBuilding] = useState('')
  const [units, setUnits] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [website, setWebsite] = useState('') // honeypot: humans never see or fill this

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const getInputStyle = (field: string) => ({
    background: 'var(--color-white-5)',
    border: `1px solid ${focusedField === field ? 'var(--color-gold-60, rgba(196,154,68,0.6))' : 'var(--color-white-10)'}`,
    color: 'white',
  })

  const handleSubmit = async (): Promise<void> => {
    if (!name.trim() || !contact.trim()) {
      setError('Please add your name and a way to reach you.')
      return
    }
    setError('')
    setLoading(true)

    const structured = [
      'CONDO PAGE LEAD',
      role && `Role: ${role}`,
      building && `Building: ${building}`,
      units && `Approx. units: ${units}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean).join(' | ')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: 'brazusa-cleaning',
          name: name.trim(),
          contact: contact.trim(),
          contactMethod,
          spaceType: 'property',
          outcome: 'contact',
          address: building.trim() || undefined,
          notes: structured,
          website,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong — please call or text us at 781-686-7189.')
    } finally {
      setLoading(false)
    }
  }

  const resetAndClose = (): void => {
    setSubmitted(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.5)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 60,
        }}
      />
      {/* Drawer */}
      <div
        className="fixed left-0 right-0 bottom-0 transition-transform duration-300 overflow-y-auto"
        style={{
          background: 'var(--color-navy)',
          transform: isOpen ? 'translateY(0)' : 'translateY(105%)',
          maxHeight: '88vh',
          zIndex: 61,
          borderTop: '2px solid var(--color-brand-gold)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Request a proposal"
      >
        <div className="mx-auto px-6 py-7" style={{ maxWidth: '560px' }}>
          {submitted ? (
            <div className="text-center py-10">
              <p className="mb-3" style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '22px', fontWeight: 700, color: '#FFFFFF' }}>
                Got it. We&apos;ll be in touch.
              </p>
              <p className="text-sm mb-8" style={{ color: 'var(--color-white-60)' }}>
                A real person will reach out, usually the same day. Sooner if you call:{' '}
                <a href="tel:7816867189" className="underline" style={{ color: 'var(--color-brand-gold)' }}>781-686-7189</a>
              </p>
              <button
                onClick={resetAndClose}
                className="text-sm font-semibold px-8 py-3.5 cursor-pointer text-navy"
                style={{ background: 'var(--color-brand-gold)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '22px', fontWeight: 700, color: '#FFFFFF' }}>
                  Request a proposal
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="cursor-pointer text-2xl leading-none px-2"
                  style={{ color: 'var(--color-white-40)' }}
                >
                  &times;
                </button>
              </div>

              {/* Honeypot: hidden from humans, bots fill it and get silently dropped */}
              <div aria-hidden style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>

              <div className="mb-4">
                <label className={labelCls}>Name *</label>
                <input
                  className={inputCls}
                  style={getInputStyle('name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div className="mb-4">
                <label className={labelCls}>Phone or email *</label>
                <input
                  className={inputCls}
                  style={getInputStyle('contact')}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  onFocus={() => setFocusedField('contact')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Best way to reach you"
                  autoComplete="tel"
                />
              </div>

              <div className="mb-4">
                <label className={labelCls}>Preferred contact</label>
                <div className="grid grid-cols-3 gap-2">
                  {([['phone', 'Phone call'], ['sms', 'Text (SMS)'], ['email', 'Email']] as [ContactMethod, string][]).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setContactMethod(value)}
                      className="text-xs py-2.5 cursor-pointer transition-colors"
                      style={{
                        background: contactMethod === value ? 'var(--color-brand-gold)' : 'var(--color-white-5)',
                        color: contactMethod === value ? 'var(--color-navy)' : 'var(--color-white-60)',
                        border: `1px solid ${contactMethod === value ? 'var(--color-brand-gold)' : 'var(--color-white-10)'}`,
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className={labelCls}>Your role</label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(role === r ? '' : r)}
                      className="text-xs py-2.5 cursor-pointer transition-colors"
                      style={{
                        background: role === r ? 'var(--color-brand-gold)' : 'var(--color-white-5)',
                        color: role === r ? 'var(--color-navy)' : 'var(--color-white-60)',
                        border: `1px solid ${role === r ? 'var(--color-brand-gold)' : 'var(--color-white-10)'}`,
                        fontWeight: 600,
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_130px] gap-4 mb-4">
                <div>
                  <label className={labelCls}>Building address</label>
                  <input
                    className={inputCls}
                    style={getInputStyle('building')}
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    onFocus={() => setFocusedField('building')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Street & neighborhood is enough"
                    autoComplete="street-address"
                  />
                </div>
                <div>
                  <label className={labelCls}>Approx. units</label>
                  <input
                    className={inputCls}
                    style={getInputStyle('units')}
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    onFocus={() => setFocusedField('units')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. 24"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className={labelCls}>Anything else</label>
                <textarea
                  className={inputCls}
                  style={{ ...getInputStyle('notes'), minHeight: '72px', resize: 'vertical' }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onFocus={() => setFocusedField('notes')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Current vendor, pain points, timing..."
                />
              </div>

              {error && (
                <p className="text-sm mb-4" style={{ color: 'var(--color-brand-red, #D62828)' }}>{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full text-sm font-semibold py-4 min-h-[52px] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 text-navy"
                style={{ background: 'var(--color-brand-gold)' }}
              >
                {loading ? 'Sending…' : 'Send request'}
              </button>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--color-white-40)' }}>
                Prefer to talk? <a href="tel:7816867189" className="underline">781-686-7189</a> &middot; info@brazusa.com
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
