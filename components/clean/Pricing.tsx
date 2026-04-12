'use client'

import { useState } from 'react'

const examples = [
  { label: 'Studio apartment (light cleaning)', range: '$X – $Y' },
  { label: '1–2 bedroom apartment (moderate)',  range: '$X – $Y' },
  { label: 'Deep cleaning',                     range: '$X – $Y' },
  { label: 'Short-term rental turnover',        range: '$X – $Y' },
  { label: 'Small office',                      range: '$X – $Y' },
]

const factors = [
  'Size and layout',
  'Level of cleaning needed',
  'Service type',
  'Frequency',
  'Accessibility & timing',
  'Custom requests',
]

const customExamples = [
  "Cleaning only one roommate's half of an apartment",
  'Just kitchens and bathrooms',
  'Tasks you don\'t want to deal with',
  'One-time targeted deep cleans',
]

export default function Pricing() {
  const [showCustom, setShowCustom] = useState(false)

  return (
    <section
      id="pricing"
      className="bg-white py-14 px-6"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">

        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-3" style={{ fontWeight: 300 }}>
            Transparent, flexible pricing
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#7A7470' }}>
            We price based on what the job actually requires. Reference ranges:
          </p>

          <div className="rounded-xl overflow-hidden mb-5" style={{ border: '1px solid #D8D0C6' }}>
            {examples.map((ex, i) => (
              <div
                key={ex.label}
                className="flex justify-between items-center px-5 py-3.5 text-sm"
                style={{
                  borderBottom: i < examples.length - 1 ? '1px solid #D8D0C6' : undefined,
                  background: i % 2 === 0 ? '#F2EDE6' : 'white',
                }}
              >
                <span style={{ color: '#5A5451' }}>{ex.label}</span>
                <span className="font-semibold text-navy tabular-nums ml-6" style={{ fontFamily: 'var(--font-syne)' }}>{ex.range}</span>
              </div>
            ))}
          </div>

          <p className="text-xs mb-5" style={{ color: '#B0A89E' }}>
            Exact quotes vary. If something unexpected comes up on-site, we&apos;ll explain before starting.
          </p>

          {/* Expandable custom section */}
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: '#0B1D2E' }}
          >
            <span
              className="transition-transform duration-200 inline-block"
              style={{ transform: showCustom ? 'rotate(45deg)' : 'none', color: '#C49A44' }}
            >
              +
            </span>
            Custom & partial cleaning options
          </button>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: showCustom ? '300px' : '0', opacity: showCustom ? 1 : 0 }}
          >
            <div className="mt-4 rounded-xl p-5" style={{ background: '#F2EDE6', border: '1px solid #D8D0C6' }}>
              <p className="text-sm font-medium text-navy mb-3">We don&apos;t believe cleaning has to be all-or-nothing:</p>
              <ul className="space-y-2">
                {customExamples.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-sm" style={{ color: '#6B6360' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#C49A44' }}>→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:pt-24">
          <p className="text-xs uppercase mb-4" style={{ color: '#B0A89E', letterSpacing: '0.12em' }}>
            What affects your quote
          </p>
          <ul className="space-y-2.5">
            {factors.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#6B6360' }}>
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C49A44' }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
