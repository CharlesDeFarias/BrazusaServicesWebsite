import type { JSX } from 'react'

const badges = [
  'Fully insured',
  'Family-owned & operated',
  'Serving Greater Boston since 1994',
  'Residential + commercial',
  'No surprises, ever',
  'Fast, flexible communication',
]

export default function TrustStrip(): JSX.Element {
  return (
    <div
      className="bg-white border-b py-3.5 overflow-hidden"
      style={{ borderColor: 'var(--color-light-gray)' }}
    >
      <div className="flex marquee-track whitespace-nowrap">
        {[...badges, ...badges].map((b, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 mx-8 text-xs font-medium flex-shrink-0"
            style={{ color: 'var(--color-navy)', letterSpacing: '0.04em' }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--color-brand-gold)' }}
            />
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}
