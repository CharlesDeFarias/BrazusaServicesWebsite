'use client'

interface Client {
  id: string
  label: string
  sub: string
  n: string
}

const clients: Client[] = [
  { id: 'str',      label: 'Short-Term Rentals',  sub: 'Fast turnovers, zero surprises',      n: '01' },
  { id: 'property', label: 'Property Management', sub: 'Multi-unit, reliable at scale',       n: '02' },
  { id: 'offices',  label: 'Offices & Clinics',   sub: 'Consistent, minimally disruptive',    n: '03' },
  { id: 'homes',    label: 'Apartments & Homes',  sub: 'Trusted, detail-oriented care',       n: '04' },
]

interface ClientSelectorProps {
  onSelect?: (id: string) => void
}

export default function ClientSelector({ onSelect }: ClientSelectorProps) {
  const handleClick = (id: string) => {
    if (onSelect) {
      onSelect(id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="bg-off-white py-12 px-6" style={{ borderTop: '1px solid #D8D0C6' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="italic text-2xl md:text-3xl text-navy mb-8 text-center"
          style={{ fontWeight: 300 }}
        >
          What kind of space?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              className="group relative overflow-hidden bg-white rounded-xl p-5 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{ border: '1px solid #D8D0C6' }}
            >
              <span
                className="absolute -top-1 -right-1 text-7xl font-bold leading-none pointer-events-none select-none"
                style={{ color: 'rgba(11,29,46,0.04)', fontFamily: 'var(--font-syne)' }}
              >
                {c.n}
              </span>
              <div className="relative">
                <p className="font-semibold text-navy text-sm mb-1">{c.label}</p>
                <p className="text-xs" style={{ color: '#9B9288' }}>{c.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
