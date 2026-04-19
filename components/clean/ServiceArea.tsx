import type { JSX } from 'react'

interface ServiceAreaProps {
  onQuoteClick: () => void
}

const bostonNeighborhoods = [
  'Back Bay', 'Beacon Hill', 'South End', 'North End',
  'Seaport / Innovation District', 'Downtown / Financial District',
  'Charlestown', 'East Boston', 'South Boston',
  'Dorchester', 'Roxbury', 'Jamaica Plain',
  'Fenway / Kenmore', 'Allston / Brighton',
  'West Roxbury', 'Roslindale', 'Hyde Park',
  'Mission Hill', 'Mattapan',
]

const greaterBostonTowns = [
  'Cambridge', 'Somerville', 'Brookline', 'Newton',
  'Waltham', 'Watertown', 'Arlington', 'Belmont',
  'Lexington', 'Medford', 'Malden', 'Quincy',
  'Dedham', 'Needham', 'Wellesley', 'Natick',
  'Weston', 'Milton', 'Norwood',
]

const chipStyle = {
  border: '1px solid var(--color-light-gray)',
  color: 'var(--color-warm-gray-darkest)',
  background: 'var(--color-off-white)',
  fontFamily: 'var(--font-syne)',
}

export default function ServiceArea({ onQuoteClick }: ServiceAreaProps): JSX.Element {
  return (
    <section
      id="service-area"
      className="grain bg-off-white py-14 px-6 overflow-hidden"
      style={{ borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{
        background: 'radial-gradient(circle at top right, var(--color-gold-5) 0%, transparent 70%)',
      }} />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-4 leading-snug" style={{ fontWeight: 300 }}>
            Greater Boston &amp;<br />surrounding areas
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-warm-gray-dark)' }}>
            We serve apartments, high-rises, offices, and multi-unit properties across the metro area. Not sure if you&apos;re in range? Just ask — we&apos;re flexible.
          </p>
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium text-navy pb-0.5 hover:opacity-60 transition-opacity"
            style={{ borderBottom: '1px solid var(--color-navy)' }}
          >
            Check if we cover your area →
          </button>
        </div>

        <div className="space-y-6">
          {/* Greater Boston towns */}
          <div>
            <p
              className="text-xs uppercase mb-3"
              style={{ color: 'var(--color-warm-gray-light)', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
            >
              Greater Boston towns
            </p>
            <div className="flex flex-wrap gap-2">
              {greaterBostonTowns.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full" style={chipStyle}>
                  {t}
                </span>
              ))}
              <span
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ border: '1px dashed var(--color-light-gray)', color: 'var(--color-warm-gray-light)', fontFamily: 'var(--font-syne)' }}
              >
                + more
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--color-light-gray)' }} />

          {/* Boston neighborhoods */}
          <div>
            <p
              className="text-xs uppercase mb-3"
              style={{ color: 'var(--color-warm-gray-light)', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
            >
              Boston neighborhoods
            </p>
            <div className="flex flex-wrap gap-2">
              {bostonNeighborhoods.map((n) => (
                <span key={n} className="text-xs px-3 py-1.5 rounded-full" style={chipStyle}>
                  {n}
                </span>
              ))}
              <span
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ border: '1px dashed var(--color-light-gray)', color: 'var(--color-warm-gray-light)', fontFamily: 'var(--font-syne)' }}
              >
                + more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
