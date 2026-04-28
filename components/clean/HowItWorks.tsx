import type { JSX } from 'react'

const steps = [
  { n: '01', label: 'Reach out', detail: 'Tell us about your space and needs' },
  { n: '02', label: 'We respond', detail: 'We ask the right questions and clarify scope' },
  { n: '03', label: 'Clear plan', detail: 'You get a defined scope and pricing' },
  { n: '04', label: 'Work begins', detail: 'Service starts on the agreed schedule' },
  { n: '05', label: 'Work is confirmed', detail: 'You\'re told when things are completed' },
  { n: '06', label: 'Issues are handled', detail: 'Anything off is flagged and addressed' },
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
          className="text-3xl md:text-4xl text-navy mb-10 leading-snug"
        >
          How it works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          {steps.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <span
                className="text-xs font-semibold tabular-nums text-brand-gold"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {step.n}
              </span>
              <div className="w-5 h-px" style={{ background: 'var(--color-navy-20)' }} />
              <p className="font-medium text-navy text-sm">{step.label}</p>
              <p className="text-xs leading-relaxed text-warm-gray">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex items-start gap-3 px-5 py-4 text-sm"
          style={{ background: 'var(--color-linen)', border: '1px solid var(--color-linen-dark)' }}
        >
          <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-navy-40)' }}>→</span>
          <p className="text-warm-gray-darker">
            No surprises. Scope and expectations are clear upfront. If something changes, it&apos;s discussed
            before it becomes a problem.
          </p>
        </div>
      </div>
    </section>
  )
}
