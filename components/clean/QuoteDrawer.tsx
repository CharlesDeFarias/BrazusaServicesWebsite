'use client'

import { type JSX, useState, useEffect } from 'react'

type ContactMethod = 'phone' | 'sms' | 'email'
type Outcome = 'contact' | 'quote' | 'schedule'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
  defaultSpaceType?: string
}

const inputCls = [
  'w-full rounded-none px-4 py-2.5 text-sm focus:outline-none transition-colors',
  'text-white placeholder:text-white/30',
].join(' ')

const inputStyle = {
  background: 'var(--color-white-5)',
  border: '1px solid var(--color-white-10)',
  color: 'white',
}

const inputFocusStyle = { borderColor: 'var(--color-gold-60)' }
const labelCls = 'block text-xs font-medium mb-1.5 uppercase tracking-wider'

export default function QuoteDrawer({ isOpen, onClose, defaultSpaceType }: QuoteDrawerProps): JSX.Element {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [submitted, setSubmitted]     = useState(false)

  const [name, setName]                   = useState('')
  const [contact, setContact]             = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('phone')
  const [spaceType, setSpaceType]         = useState('')
  const [notes, setNotes]                 = useState('')
  const [outcome, setOutcome]             = useState<Outcome>('contact')

  const [rooms, setRooms]           = useState('')
  const [bathrooms, setBathrooms]   = useState('')
  const [cleanLevel, setCleanLevel] = useState('')
  const [frequency, setFrequency]   = useState('')
  const [focusAreas, setFocusAreas] = useState('')

  const [address, setAddress]             = useState('')
  const [preferredDays, setPreferredDays] = useState<string[]>([])
  const [timeOfDay, setTimeOfDay]         = useState('')

  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Pre-fill spaceType when drawer opens with a default
  useEffect(() => {
    if (isOpen && defaultSpaceType) {
      setSpaceType(defaultSpaceType)
    }
  }, [isOpen, defaultSpaceType])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape key closes without clearing form data
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const toggleDay = (day: string): void =>
    setPreferredDays((p) => p.includes(day) ? p.filter((d) => d !== day) : [...p, day])

  const handleSubmit = async (): Promise<void> => {
    if (!name.trim() || !contact.trim()) {
      setError('Please add your name and a way to reach you.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: 'brazusa-cleaning',
          name: name.trim(),
          contact: contact.trim(),
          contactMethod,
          spaceType,
          notes,
          outcome,
          ...(detailsOpen && { rooms, bathrooms, cleanLevel, frequency, focusAreas }),
          ...(outcome === 'schedule' && { address, preferredDays, timeOfDay }),
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      setError("Something went wrong \u2014 please call or text us at 781-686-7189.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = (): void => {
    setDetailsOpen(false)
    setSubmitted(false)
    setName('')
    setContact('')
    setContactMethod('phone')
    setSpaceType('')
    setNotes('')
    setOutcome('contact')
    setRooms('')
    setBathrooms('')
    setCleanLevel('')
    setFrequency('')
    setFocusAreas('')
    setAddress('')
    setPreferredDays([])
    setTimeOfDay('')
    setError('')
    setLoading(false)
    setFocusedField(null)
  }

  // Only reset form state after a successful submit — preserve data on all other closes
  const handleClose = (): void => {
    onClose()
    if (submitted) {
      setTimeout(() => {
        resetForm()
      }, 300)
    }
  }

  const getInputStyle = (field: string) => ({
    ...inputStyle,
    ...(focusedField === field ? inputFocusStyle : {}),
  })

  const contactMethodLabels: Record<ContactMethod, string> = {
    phone: 'Phone call',
    sms: 'Text (SMS)',
    email: 'Email',
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.6)' /* no token: intentional — black overlay */, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{
          background: 'var(--color-navy)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          borderTop: '1px solid var(--color-white-10)',
        }}
      >
        <div className="max-w-lg mx-auto px-6 py-6">

          {/* Handle bar */}
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--color-brand-gold)' }} />

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3
              className="text-xl text-white"
            >
              {submitted ? 'Thanks!' : 'Get a Quote'}
            </h3>
            <button
              onClick={handleClose}
              className="w-11 h-11 flex items-center justify-center text-xl leading-none transition-colors text-white-35"
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-white-70)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-white-35)')}
            >
              ×
            </button>
          </div>

          {/* Success */}
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--color-gold-10)' }}>
                <span className="text-xl text-brand-gold">✓</span>
              </div>
              <p className="text-white font-medium mb-2">We&apos;ll be in touch shortly.</p>
              <p className="text-sm text-white-40">
                If you need us sooner, call or text{' '}
                <a href="tel:7816867189" className="underline underline-offset-2 text-white-60">
                  781-686-7189
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label className={`${labelCls} text-white-45`}>
                    Name <span className="text-brand-gold">*</span>
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className={inputCls} placeholder="Your name"
                    style={getInputStyle('name')}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Contact info */}
                <div>
                  <label className={`${labelCls} text-white-45`}>
                    Phone or Email <span className="text-brand-gold">*</span>
                  </label>
                  <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                    className={inputCls} placeholder="Phone number or email address"
                    style={getInputStyle('contact')}
                    onFocus={() => setFocusedField('contact')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Contact method — 3 options */}
                <div>
                  <label className={`${labelCls} text-white-45`}>Preferred contact</label>
                  <div className="flex gap-2">
                    {(['phone', 'sms', 'email'] as ContactMethod[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setContactMethod(m)}
                        className="flex-1 min-h-[44px] py-2 text-xs font-medium transition-all duration-150"
                        style={{
                          background: contactMethod === m ? 'var(--color-brand-gold)' : 'transparent',
                          color: contactMethod === m ? 'var(--color-navy)' : 'var(--color-white-50)',
                          border: `1px solid ${contactMethod === m ? 'var(--color-brand-gold)' : 'var(--color-white-15)'}`,
                        }}
                      >
                        {contactMethodLabels[m]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── "Tell us more" expandable ── */}
                <button
                  type="button"
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 transition-all duration-200 text-left"
                  style={{
                    background: detailsOpen ? 'var(--color-gold-10)' : 'var(--color-white-5)',
                    border: `1px solid ${detailsOpen ? 'rgba(196,154,68,0.35)' /* no token: intentional */ : 'var(--color-white-10)'}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: detailsOpen ? 'rgba(196,154,68,0.2)' /* no token: intentional */ : 'var(--color-white-5)' }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1v11M1 6.5h11" stroke={detailsOpen ? 'var(--color-brand-gold)' : 'var(--color-white-40)'} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: detailsOpen ? 'var(--color-brand-gold)' : 'rgba(255,255,255,0.75)' /* no token: intentional */ }}>
                        Add details for a more accurate quote
                      </p>
                      <p className="text-xs mt-0.5 text-white-35">
                        Rooms, frequency, focus areas
                      </p>
                    </div>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: detailsOpen ? 'rotate(180deg)' : 'none' }}
                  >
                    <path d="M3 5l4 4 4-4" stroke={detailsOpen ? 'var(--color-brand-gold)' : 'var(--color-white-35)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Expandable detail fields — grid trick for true-height animation */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: detailsOpen ? '1fr' : '0fr',
                    opacity: detailsOpen ? 1 : 0,
                    transition: 'grid-template-rows 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div className="space-y-4 pt-1 pb-2">
                      <div>
                        <label className={`${labelCls} text-white-45`}>Number of rooms</label>
                        <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)}
                          className={inputCls} placeholder="e.g. 3 bedrooms"
                          style={getInputStyle('rooms')} onFocus={() => setFocusedField('rooms')} onBlur={() => setFocusedField(null)} />
                      </div>
                      <div>
                        <label className={`${labelCls} text-white-45`}>Number of bathrooms</label>
                        <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}
                          className={inputCls} placeholder="e.g. 2"
                          style={getInputStyle('bathrooms')} onFocus={() => setFocusedField('bathrooms')} onBlur={() => setFocusedField(null)} />
                      </div>
                      <div>
                        <label className={`${labelCls} text-white-45`}>Level of cleaning needed</label>
                        <select value={cleanLevel} onChange={(e) => setCleanLevel(e.target.value)}
                          className={inputCls} style={{ ...getInputStyle('cleanLevel'), appearance: 'none' }}
                          onFocus={() => setFocusedField('cleanLevel')} onBlur={() => setFocusedField(null)}>
                          <option value="" style={{ background: 'var(--color-navy)' }}>Select...</option>
                          <option value="light" style={{ background: 'var(--color-navy)' }}>Light</option>
                          <option value="moderate" style={{ background: 'var(--color-navy)' }}>Moderate</option>
                          <option value="heavy" style={{ background: 'var(--color-navy)' }}>Heavy</option>
                        </select>
                      </div>
                      <div>
                        <label className={`${labelCls} text-white-45`}>Frequency</label>
                        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                          className={inputCls} style={{ ...getInputStyle('frequency'), appearance: 'none' }}
                          onFocus={() => setFocusedField('frequency')} onBlur={() => setFocusedField(null)}>
                          <option value="" style={{ background: 'var(--color-navy)' }}>Select...</option>
                          <option value="one-time" style={{ background: 'var(--color-navy)' }}>One-time</option>
                          <option value="recurring" style={{ background: 'var(--color-navy)' }}>Recurring</option>
                        </select>
                      </div>
                      <div>
                        <label className={`${labelCls} text-white-45`}>Areas or tasks to focus on</label>
                        <textarea value={focusAreas} onChange={(e) => setFocusAreas(e.target.value)}
                          className={`${inputCls} resize-none`} rows={3}
                          placeholder="e.g. kitchen and bathrooms only"
                          style={getInputStyle('focus')} onFocus={() => setFocusedField('focus')} onBlur={() => setFocusedField(null)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Space type */}
                <div>
                  <label className={`${labelCls} text-white-45`}>Type of space</label>
                  <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}
                    className={inputCls}
                    style={{ ...getInputStyle('space'), appearance: 'none' }}
                    onFocus={() => setFocusedField('space')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="" style={{ background: 'var(--color-navy)' }}>Select...</option>
                    <option value="apartment" style={{ background: 'var(--color-navy)' }}>Apartment / Home</option>
                    <option value="str" style={{ background: 'var(--color-navy)' }}>Short-Term Rental</option>
                    <option value="office" style={{ background: 'var(--color-navy)' }}>Office / Clinic</option>
                    <option value="property" style={{ background: 'var(--color-navy)' }}>Property / Building</option>
                    <option value="other" style={{ background: 'var(--color-navy)' }}>
                      {"Other \u2014 we'll figure it out"}
                    </option>
                  </select>
                  {spaceType === 'other' && (
                    <p className="text-xs mt-2 leading-relaxed text-white-40">
                      We&apos;re adaptable and can grow to any size. If we&apos;re not the right fit, we have connections with other companies that may serve you better.
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className={`${labelCls} text-white-45`}>Notes or questions</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    className={`${inputCls} resize-none`} rows={3}
                    placeholder={'Anything relevant \u2014 no detail too small'}
                    style={getInputStyle('notes')}
                    onFocus={() => setFocusedField('notes')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <p className="mt-2 text-xs leading-relaxed text-white-35">
                    If photos would help, mention that here and we&apos;ll tell you the best way to send them.
                  </p>
                </div>

                {/* What are you looking for */}
                <div>
                  <label className={`${labelCls} text-white-45`}>What are you looking for?</label>
                  <div className="space-y-2.5">
                    {([
                      { value: 'contact'  as Outcome, label: 'Just contact me' },
                      { value: 'quote'    as Outcome, label: "I'd like a rough quote" },
                      { value: 'schedule' as Outcome, label: "I'd like to schedule an estimate" },
                    ]).map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.65)' /* no token: intentional */ }}>
                        <input type="radio" name="outcome" value={opt.value} checked={outcome === opt.value}
                          onChange={() => setOutcome(opt.value)} className="accent-brand-gold" />
                        {opt.label}
                      </label>
                    ))}
                  </div>

                  {outcome === 'quote' && (
                    <div className="mt-3 px-3.5 py-3 flex items-start gap-2.5"
                      style={{ background: 'var(--color-gold-5)', border: '1px solid rgba(196,154,68,0.2)' /* no token: intentional */ }}>
                      <span className="text-brand-gold" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>ℹ</span>
                      <p className="text-xs leading-relaxed text-white-55">
                        For a more accurate quote, expand <span className="text-brand-gold">Add details</span> above and fill in rooms, frequency, and focus areas.
                      </p>
                    </div>
                  )}
                </div>

                {/* Scheduling fields */}
                {outcome === 'schedule' && (
                  <div className="rounded-none p-4 space-y-4" style={{ background: 'var(--color-white-5)', border: '1px solid var(--color-white-10)' }}>
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-gold">Scheduling details</p>
                    <div>
                      <label className="block text-xs mb-1.5 uppercase tracking-wider text-white-35">Address or neighborhood</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                        className={inputCls} placeholder="e.g. South End, Boston"
                        style={getInputStyle('address')}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-2 uppercase tracking-wider text-white-35">Preferred days</label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                          <button key={day} type="button" onClick={() => toggleDay(day)}
                            className="px-3 py-2 min-h-[44px] text-xs transition-all duration-150"
                            style={{
                              background: preferredDays.includes(day) ? 'var(--color-brand-gold)' : 'transparent',
                              color: preferredDays.includes(day) ? 'var(--color-navy)' : 'var(--color-white-50)',
                              border: `1px solid ${preferredDays.includes(day) ? 'var(--color-brand-gold)' : 'var(--color-white-15)'}`,
                            }}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-2 uppercase tracking-wider text-white-35">Time of day</label>
                      <div className="flex gap-5">
                        {['Morning', 'Afternoon', 'Evening'].map((t) => (
                          <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.65)' /* no token: intentional */ }}>
                            <input type="radio" name="timeOfDay" value={t} checked={timeOfDay === t}
                              onChange={() => setTimeOfDay(t)} className="accent-brand-gold" />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && <p className="text-sm mt-4 text-error">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3.5 font-medium text-sm mt-6 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy disabled:opacity-50"
                style={{ background: 'var(--color-brand-blue)', borderLeft: '2px solid var(--color-white-25)' }}
              >
                {loading ? 'Sending\u2026' : 'Send Request'}
              </button>

              <p className="text-xs text-center mt-2.5 text-white-40">
                We&apos;ll respond within a few hours, usually sooner.
              </p>

              <p className="text-xs text-center mt-3 text-white-50">
                Prefer to talk?{' '}
                <a href="tel:7816867189" className="underline underline-offset-2 transition-colors text-white-70">
                  781-686-7189
                </a>
                {' · '}
                <a href="mailto:info@brazusa.com" className="underline underline-offset-2 transition-colors text-white-70">
                  info@brazusa.com
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
