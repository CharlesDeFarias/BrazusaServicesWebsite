import type { JSX } from 'react'

const keyPoints = [
  'A consistent team that knows your space',
  'Clear communication, fast responses, and real follow-through',
  'Systems for quality, not just good intentions',
  'Flexible enough to adapt to different types of clients and situations',
  'Built to scale without losing control',
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
            className="italic text-3xl md:text-4xl text-navy mb-6 leading-snug"
            style={{ fontWeight: 300 }}
          >
            A different kind of cleaning company
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--color-warm-gray-darker)' }}>
            <p>Most cleaning companies fall into one of two categories.</p>
            <p>
              You either get a big company that&apos;s structured but hard to deal with,
              or a small team that does good work but breaks down once things get busy.
            </p>
            <p>We built something in between.</p>
            <p>
              We&apos;re still a family business. The same people have been doing this for decades.
              But we&apos;ve layered systems, communication, and structure on top of that experience.
            </p>
            <p>
              So you don&apos;t have to chase us for updates, repeat instructions, or fix the same problems over and over.
            </p>
            <p className="font-medium" style={{ color: 'var(--color-navy)' }}>
              We handle our side properly.
            </p>
          </div>
        </div>

        <div className="lg:pt-2">
          <p
            className="text-xs uppercase mb-5"
            style={{ color: 'var(--color-warm-gray-light)', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
          >
            What this means for you
          </p>
          <ul className="space-y-3">
            {keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-warm-gray-darker)' }}>
                <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-brand-gold)' }}>→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
