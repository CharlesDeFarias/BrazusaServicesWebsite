import type { JSX } from 'react'

const stats = [
  {
    value: '30+ Years',
    subtitle: 'Serving Greater Boston since 1994',
  },
  {
    value: '100% Insured',
    subtitle: 'Registered company with full liability coverage',
  },
  {
    value: '24/7 Availability',
    subtitle: 'Real virtual employees that can speak to you or your clients in any language',
  },
]

export default function TrustStats(): JSX.Element {
  return (
    <section
      id="trust-stats"
      className="grain bg-navy"
      style={{
        borderTop: '1px solid var(--color-white-10)',
        padding: '28px 56px',
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3"
        style={{ maxWidth: '960px', gap: '36px' }}
      >
        {stats.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col items-center text-center"
          >
            <p
              style={{
                fontFamily: 'var(--font-ibm-plex-sans)',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--color-brand-gold)',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </p>
            {/* Gold rule — one gold moment per stat unit */}
            <div
              style={{
                width: '24px',
                height: '1px',
                background: 'var(--color-brand-gold)',
                opacity: 1,
                marginBottom: '8px',
              }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-white-55)',
                lineHeight: 1.4,
                maxWidth: '220px',
              }}
            >
              {stat.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
