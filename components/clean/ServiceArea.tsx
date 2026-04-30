import type { JSX } from 'react'

interface ServiceAreaProps {
  onQuoteClick: () => void
}

const bostonNeighborhoods = [
  'Back Bay', 'Beacon Hill', 'South End', 'North End',
  'Downtown', 'Chinatown', 'Seaport', 'Fenway',
  'Kenmore', 'Mission Hill', 'Roxbury', 'Dorchester',
  'South Boston', 'East Boston', 'Charlestown', 'Jamaica Plain',
  'West Roxbury', 'Roslindale', 'Hyde Park', 'Brighton',
  'Allston',
]

const greaterBostonTowns = [
  'Brookline', 'Cambridge', 'Somerville', 'Medford',
  'Malden', 'Everett', 'Chelsea', 'Revere',
  'Winthrop', 'Quincy', 'Milton', 'Braintree',
  'Weymouth', 'Dedham', 'Newton', 'Watertown',
  'Waltham', 'Belmont', 'Arlington', 'Lexington',
  'Woburn', 'Burlington', 'Winchester', 'Needham',
  'Wellesley', 'Natick', 'Framingham', 'Norwood',
  'Westwood', 'Canton', 'Randolph',
]

const chipStyle = {
  border: '1px solid var(--color-light-gray)',
  background: 'var(--color-off-white)',
  fontFamily: 'var(--font-syne)',
}

export default function ServiceArea({ onQuoteClick }: ServiceAreaProps): JSX.Element {
  return (
    <section
      id="service-area"
      className="grain py-10 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-off-white), var(--color-linen))', borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl text-navy mb-4 leading-snug">
            Greater Boston &amp; surrounding areas
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-warm-gray-dark">
            {"We serve apartments, high-rises, offices, and multi-unit properties across the metro area. Not sure if you're in range? Just ask — we're flexible."}
          </p>
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium text-navy pb-0.5 hover:opacity-60 transition-opacity"
            style={{ borderBottom: '1px solid var(--color-navy)' }}
          >
            Check if we cover your area &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Greater Boston towns */}
          <div>
            <p
              className="text-xs uppercase mb-3 text-warm-gray"
              style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
            >
              Greater Boston towns
            </p>
            <div className="flex flex-wrap gap-2">
              {greaterBostonTowns.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full text-warm-gray-darkest" style={chipStyle}>
                  {t}
                </span>
              ))}
              <span
                className="text-xs px-3 py-1.5 rounded-full text-warm-gray-light"
                style={{ border: '1px dashed var(--color-light-gray)', fontFamily: 'var(--font-syne)' }}
              >
                + more
              </span>
            </div>
          </div>

          {/* Boston neighborhoods */}
          <div>
            <p
              className="text-xs uppercase mb-3 text-warm-gray"
              style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
            >
              Boston neighborhoods
            </p>
            <div className="flex flex-wrap gap-2">
              {bostonNeighborhoods.map((n) => (
                <span key={n} className="text-xs px-3 py-1.5 rounded-full text-warm-gray-darkest" style={chipStyle}>
                  {n}
                </span>
              ))}
              <span
                className="text-xs px-3 py-1.5 rounded-full text-warm-gray-light"
                style={{ border: '1px dashed var(--color-light-gray)', fontFamily: 'var(--font-syne)' }}
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
