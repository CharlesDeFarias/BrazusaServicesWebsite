import type { JSX } from 'react'

const steps = [
  {
    n: '01',
    label: 'You reach out',
    detail: 'Simple message or full breakdown — either works.',
  },
  {
    n: '02',
    label: 'We respond quickly',
    detail: 'Usually same day, often within hours.',
  },
  {
    n: '03',
    label: 'Quote or a few quick questions',
    detail: "We'll price it or ask what we need to get it right.",
  },
  {
    n: '04',
    label: 'We schedule and get started',
    detail: 'Straightforward from here.',
  },
]

export default function HowItWorks(): JSX.Element {
  return (
    <section
      className="py-14 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-linen), var(--color-off-white))', borderTop: '1px solid var(--color-light-gray)' }}
    >
      {/* no token: intentional — 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto relative">
        <h2
          className="italic text-3xl md:text-4xl text-navy mb-10 leading-snug"
          style={{ fontWeight: 300 }}
        >
          How it works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold tabular-nums"
                style={{ color: 'var(--color-brand-gold)', fontFamily: 'var(--font-syne)' }}
              >
                {step.n}
              </span>
              <div className="w-5 h-px" style={{ background: 'var(--color-brand-gold)' }} />
              <p className="font-medium text-navy text-sm">{step.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-warm-gray)' }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex items-start gap-3 px-5 py-4 text-sm"
          style={{ background: 'var(--color-linen)', border: '1px solid var(--color-linen-dark)' }}
        >
          <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-brand-gold)' }}>→</span>
          <p style={{ color: 'var(--color-warm-gray-darker)' }}>
            If something is different from what we expected, we&apos;ll tell you before starting.{' '}
            <span className="font-medium text-navy">No surprises.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
