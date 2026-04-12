'use client'

import { useState, useRef } from 'react'

export default function QuickContact() {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSend = () => {
    if (!message.trim()) return
    console.log({ name, message })
    setSent(true)
    setTimeout(() => { setSent(false); setMessage(''); setName('') }, 4000)
  }

  const inputStyle = (field: string) => ({
    background: '#F8F4EE',
    border: `1px solid ${focused === field ? '#C49A44' : '#D8D0C6'}`,
    transition: 'border-color 0.15s',
  })

  return (
    <section className="bg-off-white py-14 px-6" style={{ borderTop: '1px solid #D8D0C6' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* Left: contact info + Google Business */}
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-2 leading-snug" style={{ fontWeight: 300 }}>
            Reach us directly
          </h2>
          <p className="text-sm mb-8" style={{ color: '#9B9288' }}>
            We respond quickly — usually same day.
          </p>

          <div className="space-y-4 mb-8">
            <a
              href="tel:7816867189"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-navy"
                style={{ background: 'rgba(11,29,46,0.07)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14.5 11.5c0 .28-.06.55-.19.8-.13.26-.3.5-.52.7-.37.33-.77.49-1.19.49-.3 0-.63-.07-.98-.22-.35-.15-.7-.35-1.04-.6-.36-.26-.7-.54-1.02-.85-.32-.32-.6-.65-.85-1-.25-.35-.45-.7-.6-1.05-.15-.35-.22-.68-.22-.99 0-.3.06-.59.18-.86.12-.27.31-.52.56-.74.3-.27.64-.4.99-.4.14 0 .28.03.4.09.13.06.25.15.34.28l1.17 1.65c.09.13.16.25.2.36.05.11.07.21.07.31 0 .12-.03.24-.1.36-.06.12-.15.24-.26.36l-.35.36c-.05.05-.07.11-.07.18 0 .03.01.07.02.1.02.03.04.06.05.09.17.31.36.6.57.87.22.27.45.53.7.77.26.26.53.5.82.72.28.22.57.42.87.59.03.01.06.03.1.04.04.01.07.01.11.01.08 0 .14-.03.19-.08l.35-.34c.12-.12.24-.21.36-.27.12-.06.24-.09.37-.09.09 0 .19.02.3.06.11.04.23.11.36.21L14.2 10.6c.13.1.22.21.28.34.05.12.08.25.02.56z" fill="currentColor" className="text-navy group-hover:text-white transition-colors"/>
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#B0A89E' }}>Call or Text</p>
                <p className="font-medium text-navy group-hover:underline underline-offset-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  781-686-7189
                </p>
              </div>
            </a>

            <a
              href="mailto:info@brazusa.com"
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-navy"
                style={{ background: 'rgba(11,29,46,0.07)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4z" stroke="currentColor" strokeWidth="1.2" className="text-navy group-hover:text-white transition-colors"/>
                  <path d="M2 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-navy group-hover:text-white transition-colors"/>
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#B0A89E' }}>Email</p>
                <p className="font-medium text-navy group-hover:underline underline-offset-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  info@brazusa.com
                </p>
              </div>
            </a>
          </div>

          {/* Google Business card */}
          <a
            href="https://maps.app.goo.gl/gvJ4MmpuShUocGB3A"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200 hover:shadow-md"
            style={{ border: '1px solid #D8D0C6', background: 'white' }}
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg"
              style={{ background: '#F8F4EE' }}>
              {/* Google G icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.31z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.75-5.59-4.12H1.08v2.6A10 10 0 0 0 10 20z" fill="#34A853"/>
                <path d="M4.41 11.91A6 6 0 0 1 4.1 10c0-.67.11-1.32.31-1.91V5.5H1.08A10.01 10.01 0 0 0 0 10c0 1.61.39 3.14 1.08 4.5l3.33-2.59z" fill="#FBBC05"/>
                <path d="M10 3.97c1.47 0 2.79.5 3.83 1.5l2.87-2.87C14.96.89 12.7 0 10 0A10 10 0 0 0 1.08 5.5l3.33 2.58C5.2 5.72 7.4 3.97 10 3.97z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#B0A89E' }}>Google Business</p>
              <p className="font-medium text-navy text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
                View our profile &amp; reviews
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="#C49A44" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right: quick message form */}
        <div>
          <h3 className="italic text-2xl text-navy mb-1 leading-snug" style={{ fontWeight: 300 }}>
            Send a quick message
          </h3>
          <p className="text-sm mb-6" style={{ color: '#9B9288' }}>
            No forms, no commitments — just a note.
          </p>

          {sent ? (
            <div className="py-10 text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(196,154,68,0.12)' }}>
                <span style={{ color: '#C49A44', fontSize: '1.1rem' }}>✓</span>
              </div>
              <p className="font-medium text-navy mb-1">Message received!</p>
              <p className="text-sm" style={{ color: '#9B9288' }}>We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: '#9B9288' }}>
                  Your name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="First name is fine"
                  className="w-full rounded-none px-4 py-2.5 text-sm focus:outline-none"
                  style={inputStyle('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: '#9B9288' }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="What's on your mind? We'll respond quickly."
                  rows={4}
                  className="w-full rounded-none px-4 py-2.5 text-sm focus:outline-none resize-none"
                  style={inputStyle('msg')}
                  onFocus={() => setFocused('msg')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy disabled:opacity-40"
                style={{ background: '#0B1D2E', borderLeft: '2px solid #C49A44' }}
              >
                Send Message
              </button>
              <p className="text-xs" style={{ color: '#B0A89E' }}>
                Or call / text us at{' '}
                <a href="tel:7816867189" className="underline underline-offset-2 hover:text-navy transition-colors">
                  781-686-7189
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
