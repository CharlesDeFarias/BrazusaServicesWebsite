import type { JSX } from 'react'

const items = [
  'Work Confirmed',
  'Issues Flagged Early',
  'Structured Communication',
  'Fully Insured & Documented',
  'Same Team Every Visit',
  '30+ Years in Boston',
  'Scope Adapts to Your Needs',
  '24/7 Availability',
  'No Oversight Required',
]

export default function TrustStrip(): JSX.Element {
  return (
    <div
      className="bg-off-white overflow-hidden"
      style={{
        borderTop: '1px solid rgba(11,29,46,0.08)', /* no token: intentional — between navy-5 and navy-10 */
        borderBottom: '1px solid rgba(11,29,46,0.08)', /* no token: intentional — between navy-5 and navy-10 */
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
              color: 'var(--color-navy-60)',
              textTransform: 'uppercase',
            }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--color-brand-gold)' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
