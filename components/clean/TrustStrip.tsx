import type { JSX } from 'react'

const items = [
  'Work Confirmed',
  'Issues Flagged Early',
  'Structured Communication',
  'Fully Insured',
  'Same Team Every Visit',
  '30+ Years in Boston',
]

export default function TrustStrip(): JSX.Element {
  return (
    <div
      className="bg-off-white overflow-hidden"
      style={{
        borderTop: '1px solid rgba(11,29,46,0.08)',
        borderBottom: '1px solid rgba(11,29,46,0.08)',
        padding: '10px 0',
      }}
    >
      <div
        className="flex marquee-track whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 flex-shrink-0"
            style={{
              margin: '0 32px',
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'var(--color-warm-gray-dark)',
              textTransform: 'uppercase',
            }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--color-navy-20)' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
