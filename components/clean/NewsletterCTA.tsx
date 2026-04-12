'use client'

import { useState } from 'react'

type Medium = 'email' | 'sms'
type Topic = 'promotions' | 'news'

export default function NewsletterCTA() {
  const [medium, setMedium] = useState<Medium>('email')
  const [topics, setTopics] = useState<Topic[]>(['promotions'])
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const toggleTopic = (t: Topic) =>
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const handleSubmit = () => {
    if (!value.trim()) { setError('Please enter your ' + (medium === 'email' ? 'email address' : 'phone number')); return }
    if (topics.length === 0) { setError('Choose at least one topic.'); return }
    setError('')
    console.log({ medium, topics, value })
    setSubmitted(true)
  }

  return (
    <section
      className="grain bg-navy text-white py-14 px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-8 h-px mx-auto mb-6" style={{ background: '#C49A44' }} />
        <h2
          className="italic leading-tight mb-3"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300 }}
        >
          Stay in the loop
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Occasional promotions and cleaning tips. No spam, ever.
        </p>

        {submitted ? (
          <div className="py-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(196,154,68,0.12)' }}>
              <span style={{ color: '#C49A44', fontSize: '1.2rem' }}>✓</span>
            </div>
            <p className="text-white font-medium mb-1">You&apos;re on the list.</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              We&apos;ll reach out via {medium === 'email' ? 'email' : 'text'} for {topics.join(' & ')}.
            </p>
          </div>
        ) : (
          <div className="text-left max-w-md mx-auto space-y-5">

            {/* Medium toggle */}
            <div>
              <p className="text-xs uppercase tracking-wider mb-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                How would you like to hear from us?
              </p>
              <div className="flex gap-2">
                {(['email', 'sms'] as Medium[]).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMedium(m); setValue('') }}
                    className="flex-1 py-2.5 text-sm font-medium transition-all duration-150"
                    style={{
                      background: medium === m ? '#C49A44' : 'transparent',
                      color: medium === m ? '#0B1D2E' : 'rgba(255,255,255,0.5)',
                      border: `1px solid ${medium === m ? '#C49A44' : 'rgba(255,255,255,0.15)'}`,
                    }}
                  >
                    {m === 'email' ? 'Email' : 'Text (SMS)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <p className="text-xs uppercase tracking-wider mb-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                What do you want to receive?
              </p>
              <div className="flex gap-2">
                {([
                  { id: 'promotions' as Topic, label: 'Promotions' },
                  { id: 'news' as Topic, label: 'News & Tips' },
                ]).map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTopic(t.id)}
                    className="flex-1 py-2.5 text-sm font-medium transition-all duration-150"
                    style={{
                      background: topics.includes(t.id) ? 'rgba(196,154,68,0.15)' : 'transparent',
                      color: topics.includes(t.id) ? '#C49A44' : 'rgba(255,255,255,0.5)',
                      border: `1px solid ${topics.includes(t.id) ? 'rgba(196,154,68,0.4)' : 'rgba(255,255,255,0.15)'}`,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div>
              <input
                type={medium === 'email' ? 'email' : 'tel'}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={medium === 'email' ? 'your@email.com' : '617-555-0123'}
                className="w-full px-4 py-2.5 text-sm focus:outline-none text-white placeholder:text-white/30"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            {error && <p className="text-sm" style={{ color: '#E07070' }}>{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
              style={{ background: '#2DAAE1', borderLeft: '2px solid rgba(255,255,255,0.25)' }}
            >
              Subscribe
            </button>

            <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Unsubscribe anytime. We won&apos;t share your info.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
