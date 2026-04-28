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
      className="py-16 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-linen), var(--color-off-white))', borderTop: '1px solid var(--color-light-gray)' }}
    >
      {/* no token: intentional — 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-14 items-start relative">

        <div>
          <h2
            className="text-3xl md:text-4xl text-navy mb-6 leading-snug"
          >
            Built for operators, not oversight
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-warm-gray-darker">
            <p>Most cleaning services fall into two categories.</p>
            <p>Small independent teams are affordable, but inconsistent. You end up managing them more than you should.</p>
            <p>Large vendors have structure, but little flexibility. You become just another account.</p>
            <p>Brazusa sits between those two.</p>
            <p>You get a consistent team that understands your space. You also get structure, communication, and accountability.</p>
            <p>The work gets done, confirmed, and communicated without requiring your oversight.</p>
          </div>
        </div>

        <div className="lg:pt-2">
          <p
            className="text-xs uppercase mb-5 text-warm-gray-light"
            style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
          >
            What this means for you
          </p>
          <ul className="space-y-3">
            {keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-warm-gray-darker">
                <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-navy-40)' }}>→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
