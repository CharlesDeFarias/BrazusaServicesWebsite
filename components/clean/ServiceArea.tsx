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
  border: '1px solid #D8D0C6',
  color: '#5A5451',
  background: '#F2EDE6',
  fontFamily: 'var(--font-syne)',
}

export default function ServiceArea({ onQuoteClick }: ServiceAreaProps) {
  return (
    <section
      id="service-area"
      className="bg-white py-14 px-6"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-4 leading-snug" style={{ fontWeight: 300 }}>
            Greater Boston &amp;<br />surrounding areas
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#7A7470' }}>
            We serve apartments, high-rises, offices, and multi-unit properties across the metro area. Not sure if you&apos;re in range? Just ask — we&apos;re flexible.
          </p>
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium text-navy pb-0.5 hover:opacity-60 transition-opacity"
            style={{ borderBottom: '1px solid #0B1D2E' }}
          >
            Check if we cover your area →
          </button>
        </div>

        <div className="space-y-6">
          {/* Greater Boston towns */}
          <div>
            <p
              className="text-xs uppercase mb-3"
              style={{ color: '#B0A89E', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
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
                style={{ border: '1px dashed #D8D0C6', color: '#B0A89E', fontFamily: 'var(--font-syne)' }}
              >
                + more
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#D8D0C6' }} />

          {/* Boston neighborhoods */}
          <div>
            <p
              className="text-xs uppercase mb-3"
              style={{ color: '#B0A89E', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
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
                style={{ border: '1px dashed #D8D0C6', color: '#B0A89E', fontFamily: 'var(--font-syne)' }}
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
