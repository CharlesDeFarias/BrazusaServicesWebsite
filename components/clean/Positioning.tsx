import type { JSX } from 'react'

const keyPoints = [
  'Completion is confirmed without follow-up',
  'Issues are flagged before they escalate',
  'Status shared via your tools, apps, or preferred method',
  'Standards are applied consistently across visits',
  'Scope adapts without losing structure',
]

export default function Positioning(): JSX.Element {
  return (
    <section
      className="grain bg-navy text-white py-16 px-6 relative overflow-hidden"
      style={{ borderTop: '1px solid var(--color-white-10)' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-14 items-start relative">

        <div>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-px flex-shrink-0" style={{ height: '32px', background: 'var(--color-brand-gold)' }} />
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: 'var(--color-brand-gold)',
                textTransform: 'uppercase',
              }}
            >
              Positioning
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl leading-snug mb-6"
            style={{ color: 'white' }}
          >
            Built for operators, not oversight
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--color-white-60)' }}>
            <p>Most cleaning services fall into two categories.</p>
            <p>Small independent teams are affordable, but inconsistent. You end up managing them more than you should.</p>
            <p>Large vendors have structure, but little flexibility. You become just another account.</p>
            <p>Brazusa sits between those two.</p>
            <p>You get a consistent team that understands your space. You also get structure, communication, and accountability.</p>
            <p>The work gets done, confirmed, and communicated without requiring your oversight.</p>
          </div>
        </div>

        {/* Right card */}
        <div
          className="lg:pt-2 p-7"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span
            className="inline-block mb-5"
            style={{
              background: 'var(--color-brand-gold)',
              color: 'var(--color-navy)',
              padding: '4px 11px',
              fontFamily: 'var(--font-syne)',
              fontSize: '10.5px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            What this means for you
          </span>
          <ul className="space-y-3">
            {keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.78)' }}>
                <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-white-70)' }}>&#8594;</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
