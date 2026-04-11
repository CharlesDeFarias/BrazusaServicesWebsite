'use client'

import { useState, useRef } from 'react'

type FormStep = 'base' | 'detailed'
type Outcome  = 'contact' | 'quote' | 'schedule'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const inputCls = 'w-full border border-light-gray rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brand-blue transition-colors'
const labelCls = 'block text-sm font-medium text-navy mb-1.5'

export default function QuoteDrawer({ isOpen, onClose }: QuoteDrawerProps) {
  const [step, setStep]           = useState<FormStep>('base')
  const [submitted, setSubmitted] = useState(false)

  // Shared fields
  const [name, setName]                   = useState('')
  const [contact, setContact]             = useState('')
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [spaceType, setSpaceType]         = useState('')
  const [notes, setNotes]                 = useState('')
  const [outcome, setOutcome]             = useState<Outcome>('contact')

  // Detailed-only fields
  const [rooms, setRooms]           = useState('')
  const [bathrooms, setBathrooms]   = useState('')
  const [cleanLevel, setCleanLevel] = useState('')
  const [frequency, setFrequency]   = useState('')
  const [focusAreas, setFocusAreas] = useState('')
  const [files, setFiles]           = useState<File[]>([])

  // Scheduling fields
  const [address, setAddress]             = useState('')
  const [preferredDays, setPreferredDays] = useState<string[]>([])
  const [timeOfDay, setTimeOfDay]         = useState('')

  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const toggleDay = (day: string) =>
    setPreferredDays((p) => p.includes(day) ? p.filter((d) => d !== day) : [...p, day])

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) {
      setError('Please add your name and a way to reach you.')
      return
    }
    setError('')
    console.log({
      name, contact, contactMethod, spaceType, notes, outcome,
      ...(step === 'detailed' && { rooms, bathrooms, cleanLevel, frequency, focusAreas, files }),
      ...(outcome === 'schedule' && { address, preferredDays, timeOfDay }),
    })
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    // reset after close animation
    setTimeout(() => {
      setSubmitted(false)
      setStep('base')
      setError('')
    }, 300)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.45)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <div className="max-w-lg mx-auto px-6 py-6">
          {/* Handle bar */}
          <div className="w-10 h-1 bg-light-gray rounded-full mx-auto mb-5" />

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3
              className="text-xl text-navy"
              style={{ fontFamily: 'var(--font-dm-serif, Georgia, serif)', fontWeight: 400 }}
            >
              {submitted ? 'Thanks!' : step === 'base' ? 'Get a Quote' : 'Tell us more'}
            </h3>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Success */}
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-brand-green text-2xl">✓</span>
              </div>
              <p className="text-navy font-medium mb-2">We&apos;ll be in touch shortly.</p>
              <p className="text-sm text-gray-500">If you need us sooner, call or text us directly.</p>
            </div>
          ) : (
            <>
              {/* ── Base fields (always shown) ── */}
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Name <span className="text-brand-red">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className={inputCls} placeholder="Your name" />
                </div>

                <div>
                  <label className={labelCls}>Phone or Email <span className="text-brand-red">*</span></label>
                  <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                    className={inputCls} placeholder="Phone number or email address" />
                </div>

                <div>
                  <label className={labelCls}>Preferred contact method</label>
                  <div className="flex gap-5">
                    {(['phone', 'email'] as const).map((m) => (
                      <label key={m} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="radio" name="contactMethod" value={m} checked={contactMethod === m}
                          onChange={() => setContactMethod(m)} className="accent-brand-blue" />
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Type of space</label>
                  <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}
                    className={inputCls}>
                    <option value="">Select...</option>
                    <option value="apartment">Apartment / Home</option>
                    <option value="str">Short-Term Rental</option>
                    <option value="office">Office / Clinic</option>
                    <option value="property">Property / Building</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Notes or questions</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    className={`${inputCls} resize-none`} rows={3}
                    placeholder="Anything relevant — no detail too small" />
                </div>

                <div>
                  <label className={labelCls}>What are you looking for?</label>
                  <div className="space-y-2.5">
                    {([
                      { value: 'contact' as Outcome, label: 'Just contact me' },
                      { value: 'quote'   as Outcome, label: "I'd like a rough quote" },
                      { value: 'schedule'as Outcome, label: "I'd like to schedule an estimate" },
                    ]).map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                        <input type="radio" name="outcome" value={opt.value} checked={outcome === opt.value}
                          onChange={() => setOutcome(opt.value)} className="accent-brand-blue" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Scheduling fields */}
                {outcome === 'schedule' && (
                  <div className="bg-off-white border border-light-gray rounded-lg p-4 space-y-4">
                    <p className="text-sm font-medium text-navy">Scheduling details</p>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Address or neighborhood</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                        className={inputCls} placeholder="e.g. South End, Boston" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Preferred days</label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                          <button key={day} type="button" onClick={() => toggleDay(day)}
                            className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                              preferredDays.includes(day)
                                ? 'bg-brand-blue text-white border-brand-blue'
                                : 'border-light-gray text-gray-600 hover:border-brand-blue bg-white'
                            }`}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Preferred time of day</label>
                      <div className="flex gap-5">
                        {['Morning', 'Afternoon', 'Evening'].map((t) => (
                          <label key={t} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                            <input type="radio" name="timeOfDay" value={t} checked={timeOfDay === t}
                              onChange={() => setTimeOfDay(t)} className="accent-brand-blue" />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Detailed fields ── */}
              {step === 'detailed' && (
                <div className="space-y-4 mt-5 pt-5 border-t border-light-gray">
                  <div>
                    <label className={labelCls}>Number of rooms</label>
                    <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)}
                      className={inputCls} placeholder="e.g. 3 bedrooms" />
                  </div>
                  <div>
                    <label className={labelCls}>Number of bathrooms</label>
                    <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}
                      className={inputCls} placeholder="e.g. 2" />
                  </div>
                  <div>
                    <label className={labelCls}>Level of cleaning needed</label>
                    <select value={cleanLevel} onChange={(e) => setCleanLevel(e.target.value)}
                      className={inputCls}>
                      <option value="">Select...</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Frequency</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                      className={inputCls}>
                      <option value="">Select...</option>
                      <option value="one-time">One-time</option>
                      <option value="recurring">Recurring</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Areas or tasks to focus on</label>
                    <textarea value={focusAreas} onChange={(e) => setFocusAreas(e.target.value)}
                      className={`${inputCls} resize-none`} rows={3}
                      placeholder="e.g. kitchen and bathrooms only, or just deep clean the oven" />
                  </div>
                  <div>
                    <label className={labelCls}>Photos or videos (optional)</label>
                    <input ref={fileRef} type="file" multiple
                      onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                      className="hidden" />
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="w-full border border-dashed border-light-gray rounded-md px-4 py-3.5 text-sm text-gray-400 hover:border-brand-blue hover:text-brand-blue transition-colors bg-off-white">
                      Click to upload — any file type welcome
                    </button>
                    {files.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {files.map((f, i) => (
                          <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                            <span className="text-brand-blue">↑</span> {f.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button type="button" onClick={() => setStep('base')}
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    ← Back to simple form
                  </button>
                </div>
              )}

              {/* Expand to detailed */}
              {step === 'base' && (
                <button type="button" onClick={() => setStep('detailed')}
                  className="block text-sm text-brand-blue hover:underline underline-offset-4 mt-4">
                  Want a more accurate virtual quote? Tell us more →
                </button>
              )}

              {error && <p className="text-sm text-brand-red mt-4">{error}</p>}

              <button onClick={handleSubmit}
                className="w-full bg-brand-blue text-white py-3.5 rounded-md font-medium hover:opacity-90 transition-opacity mt-6">
                Submit Request
              </button>

              <p className="text-xs text-center text-gray-400 mt-3">
                Prefer to talk?{' '}
                <a href="tel:+1" className="underline underline-offset-2 hover:text-gray-600 transition-colors">
                  Call or text us directly.
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
