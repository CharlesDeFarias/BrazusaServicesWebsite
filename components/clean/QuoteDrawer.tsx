'use client'

import { useState, useRef, useEffect } from 'react'

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
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'white',
}

const inputFocusStyle = { borderColor: 'rgba(196,154,68,0.6)' }
const labelCls = 'block text-xs font-medium mb-1.5 uppercase tracking-wider'

export default function QuoteDrawer({ isOpen, onClose, defaultSpaceType }: QuoteDrawerProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [submitted, setSubmitted]     = useState(false)

  const [name, setName]                   = useState('')
  const [contact, setContact]             = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('phone')
  const [spaceType, setSpaceType]         = useState('')
  const [notes, setNotes]                 = useState('')
  const [outcome, setOutcome]             = useState<Outcome>('contact')
  const [baseFiles, setBaseFiles]         = useState<File[]>([])

  const [rooms, setRooms]           = useState('')
  const [bathrooms, setBathrooms]   = useState('')
  const [cleanLevel, setCleanLevel] = useState('')
  const [frequency, setFrequency]   = useState('')
  const [focusAreas, setFocusAreas] = useState('')

  const [address, setAddress]             = useState('')
  const [preferredDays, setPreferredDays] = useState<string[]>([])
  const [timeOfDay, setTimeOfDay]         = useState('')

  const [error, setError]           = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const baseFileRef = useRef<HTMLInputElement>(null)

  // Pre-fill spaceType when drawer opens with a default
  useEffect(() => {
    if (isOpen && defaultSpaceType) {
      setSpaceType(defaultSpaceType)
    }
  }, [isOpen, defaultSpaceType])

  const toggleDay = (day: string) =>
    setPreferredDays((p) => p.includes(day) ? p.filter((d) => d !== day) : [...p, day])

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) {
      setError('Please add your name and a way to reach you.')
      return
    }
    setError('')
    console.log({
      name, contact, contactMethod, spaceType, notes, outcome, baseFiles,
      ...(detailsOpen && { rooms, bathrooms, cleanLevel, frequency, focusAreas }),
      ...(outcome === 'schedule' && { address, preferredDays, timeOfDay }),
    })
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setDetailsOpen(false)
      setError('')
    }, 300)
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
        style={{ background: 'rgba(0,0,0,0.6)', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{
          background: '#0B1D2E',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-lg mx-auto px-6 py-6">

          {/* Handle bar */}
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: '#C49A44' }} />

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3
              className="text-xl text-white italic"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
            >
              {submitted ? 'Thanks!' : 'Get a Free Quote'}
            </h3>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center text-xl leading-none transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              ×
            </button>
          </div>

          {/* Success */}
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(196,154,68,0.12)' }}>
                <span className="text-xl" style={{ color: '#C49A44' }}>✓</span>
              </div>
              <p className="text-white font-medium mb-2">We&apos;ll be in touch shortly.</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                If you need us sooner, call or text{' '}
                <a href="tel:7816867189" className="underline underline-offset-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  781-686-7189
                </a>
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Name <span style={{ color: '#C49A44' }}>*</span>
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
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Phone or Email <span style={{ color: '#C49A44' }}>*</span>
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
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Preferred contact</label>
                  <div className="flex gap-2">
                    {(['phone', 'sms', 'email'] as ContactMethod[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setContactMethod(m)}
                        className="flex-1 py-2 text-xs font-medium transition-all duration-150"
                        style={{
                          background: contactMethod === m ? '#C49A44' : 'transparent',
                          color: contactMethod === m ? '#0B1D2E' : 'rgba(255,255,255,0.5)',
                          border: `1px solid ${contactMethod === m ? '#C49A44' : 'rgba(255,255,255,0.15)'}`,
                        }}
                      >
                        {contactMethodLabels[m]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── "Tell us more" expandable — moved above space type ── */}
                <button
                  type="button"
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 transition-all duration-200 text-left"
                  style={{
                    background: detailsOpen ? 'rgba(196,154,68,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${detailsOpen ? 'rgba(196,154,68,0.35)' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: detailsOpen ? 'rgba(196,154,68,0.2)' : 'rgba(255,255,255,0.06)' }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1v11M1 6.5h11" stroke={detailsOpen ? '#C49A44' : 'rgba(255,255,255,0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: detailsOpen ? '#C49A44' : 'rgba(255,255,255,0.75)' }}>
                        Add details for a more accurate quote
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Rooms, frequency, focus areas, photos
                      </p>
                    </div>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: detailsOpen ? 'rotate(180deg)' : 'none' }}
                  >
                    <path d="M3 5l4 4 4-4" stroke={detailsOpen ? '#C49A44' : 'rgba(255,255,255,0.35)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Expandable detail fields */}
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: detailsOpen ? '600px' : '0',
                    opacity: detailsOpen ? 1 : 0,
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="space-y-4 pt-1 pb-2">
                    <div>
                      <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Number of rooms</label>
                      <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)}
                        className={inputCls} placeholder="e.g. 3 bedrooms"
                        style={getInputStyle('rooms')} onFocus={() => setFocusedField('rooms')} onBlur={() => setFocusedField(null)} />
                    </div>
                    <div>
                      <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Number of bathrooms</label>
                      <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}
                        className={inputCls} placeholder="e.g. 2"
                        style={getInputStyle('bathrooms')} onFocus={() => setFocusedField('bathrooms')} onBlur={() => setFocusedField(null)} />
                    </div>
                    <div>
                      <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Level of cleaning needed</label>
                      <select value={cleanLevel} onChange={(e) => setCleanLevel(e.target.value)}
                        className={inputCls} style={{ ...getInputStyle('cleanLevel'), appearance: 'none' }}
                        onFocus={() => setFocusedField('cleanLevel')} onBlur={() => setFocusedField(null)}>
                        <option value="" style={{ background: '#0B1D2E' }}>Select...</option>
                        <option value="light" style={{ background: '#0B1D2E' }}>Light</option>
                        <option value="moderate" style={{ background: '#0B1D2E' }}>Moderate</option>
                        <option value="heavy" style={{ background: '#0B1D2E' }}>Heavy</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Frequency</label>
                      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                        className={inputCls} style={{ ...getInputStyle('frequency'), appearance: 'none' }}
                        onFocus={() => setFocusedField('frequency')} onBlur={() => setFocusedField(null)}>
                        <option value="" style={{ background: '#0B1D2E' }}>Select...</option>
                        <option value="one-time" style={{ background: '#0B1D2E' }}>One-time</option>
                        <option value="recurring" style={{ background: '#0B1D2E' }}>Recurring</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Areas or tasks to focus on</label>
                      <textarea value={focusAreas} onChange={(e) => setFocusAreas(e.target.value)}
                        className={`${inputCls} resize-none`} rows={3}
                        placeholder="e.g. kitchen and bathrooms only"
                        style={getInputStyle('focus')} onFocus={() => setFocusedField('focus')} onBlur={() => setFocusedField(null)} />
                    </div>
                  </div>
                </div>

                {/* Space type */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Type of space</label>
                  <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}
                    className={inputCls}
                    style={{ ...getInputStyle('space'), appearance: 'none' }}
                    onFocus={() => setFocusedField('space')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="" style={{ background: '#0B1D2E' }}>Select...</option>
                    <option value="apartment" style={{ background: '#0B1D2E' }}>Apartment / Home</option>
                    <option value="str" style={{ background: '#0B1D2E' }}>Short-Term Rental</option>
                    <option value="office" style={{ background: '#0B1D2E' }}>Office / Clinic</option>
                    <option value="property" style={{ background: '#0B1D2E' }}>Property / Building</option>
                    <option value="other" style={{ background: '#0B1D2E' }}>Other — we&apos;ll figure it out</option>
                  </select>
                  {spaceType === 'other' && (
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      We&apos;re adaptable and can grow to any size. If we&apos;re not the right fit, we have connections with other companies that may serve you better.
                    </p>
                  )}
                </div>

                {/* Notes + file upload */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>Notes or questions</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    className={`${inputCls} resize-none`} rows={3}
                    placeholder="Anything relevant — no detail too small"
                    style={getInputStyle('notes')}
                    onFocus={() => setFocusedField('notes')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {/* File upload inline below textarea */}
                  <input ref={baseFileRef} type="file" multiple
                    onChange={(e) => setBaseFiles(Array.from(e.target.files ?? []))}
                    className="hidden" />
                  <button type="button" onClick={() => baseFileRef.current?.click()}
                    className="w-full mt-2 px-4 py-2.5 text-xs transition-colors text-center"
                    style={{
                      background: 'transparent',
                      border: '1px dashed rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.3)',
                    }}>
                    Attach photos or files (optional)
                  </button>
                  {baseFiles.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {baseFiles.map((f, i) => (
                        <li key={i} className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          <span style={{ color: '#C49A44' }}>↑</span> {f.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* What are you looking for */}
                <div>
                  <label className={labelCls} style={{ color: 'rgba(255,255,255,0.45)' }}>What are you looking for?</label>
                  <div className="space-y-2.5">
                    {([
                      { value: 'contact'  as Outcome, label: 'Just contact me' },
                      { value: 'quote'    as Outcome, label: "I'd like a rough quote" },
                      { value: 'schedule' as Outcome, label: "I'd like to schedule an estimate" },
                    ]).map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        <input type="radio" name="outcome" value={opt.value} checked={outcome === opt.value}
                          onChange={() => setOutcome(opt.value)} className="accent-brand-gold" />
                        {opt.label}
                      </label>
                    ))}
                  </div>

                  {/* Nudge for rough quote */}
                  {outcome === 'quote' && (
                    <div className="mt-3 px-3.5 py-3 flex items-start gap-2.5"
                      style={{ background: 'rgba(196,154,68,0.07)', border: '1px solid rgba(196,154,68,0.2)' }}>
                      <span style={{ color: '#C49A44', fontSize: '0.85rem', lineHeight: 1.4 }}>ℹ</span>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        For a more accurate quote, expand <span style={{ color: '#C49A44' }}>Add details</span> above and fill in rooms, frequency, and focus areas.
                      </p>
                    </div>
                  )}
                </div>

                {/* Scheduling fields */}
                {outcome === 'schedule' && (
                  <div className="rounded-none p-4 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: '#C49A44' }}>Scheduling details</p>
                    <div>
                      <label className="block text-xs mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>Address or neighborhood</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                        className={inputCls} placeholder="e.g. South End, Boston"
                        style={getInputStyle('address')}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-2 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>Preferred days</label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                          <button key={day} type="button" onClick={() => toggleDay(day)}
                            className="px-3 py-1 text-xs transition-all duration-150"
                            style={{
                              background: preferredDays.includes(day) ? '#C49A44' : 'transparent',
                              color: preferredDays.includes(day) ? '#0B1D2E' : 'rgba(255,255,255,0.5)',
                              border: `1px solid ${preferredDays.includes(day) ? '#C49A44' : 'rgba(255,255,255,0.15)'}`,
                            }}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-2 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>Time of day</label>
                      <div className="flex gap-5">
                        {['Morning', 'Afternoon', 'Evening'].map((t) => (
                          <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.65)' }}>
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

              {error && <p className="text-sm mt-4" style={{ color: '#E07070' }}>{error}</p>}

              <button
                onClick={handleSubmit}
                className="w-full py-3.5 font-medium text-sm mt-6 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
                style={{ background: '#2DAAE1', borderLeft: '2px solid rgba(255,255,255,0.25)' }}
              >
                Submit Free Request
              </button>

              <p className="text-xs text-center mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Prefer to talk?{' '}
                <a href="tel:7816867189" className="underline underline-offset-2 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  781-686-7189
                </a>
                {' · '}
                <a href="mailto:info@brazusa.com" className="underline underline-offset-2 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
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
