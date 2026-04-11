'use client'

const clients = [
  { id: 'str',      label: 'Short-Term Rentals',              teaser: 'Fast turnovers, consistency, no surprises' },
  { id: 'property', label: 'Property Management / Buildings', teaser: 'Multi-unit coordination, reliability across properties' },
  { id: 'offices',  label: 'Offices & Clinics',               teaser: 'Hygiene, consistency, minimal disruption' },
  { id: 'homes',    label: 'Apartments / Homes',              teaser: 'Trust, comfort, detail' },
]

export default function ClientSelector() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="bg-off-white py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy text-center mb-8">
          What kind of space do you need help with?
        </h2>
        <div className="flex flex-col gap-3">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => scrollTo(c.id)}
              className="group flex items-center justify-between w-full bg-white border border-light-gray rounded-lg px-5 py-4 text-left transition-all duration-200 hover:border-brand-blue hover:shadow-sm"
            >
              <span className="font-semibold text-navy text-base">{c.label}</span>
              <span className="text-sm text-gray-400 group-hover:text-brand-blue transition-colors hidden sm:block">
                {c.teaser} →
              </span>
              <span className="text-gray-400 group-hover:text-brand-blue transition-colors sm:hidden">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
