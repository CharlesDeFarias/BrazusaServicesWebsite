import type { JSX } from 'react'

interface ServicesProps {
  onQuoteClick: () => void
  activeClientId?: string | null
}

const services = [
  {
    name: 'Routine Cleaning',
    desc: 'Consistent maintenance on your schedule',
    clients: ['property', 'offices', 'apartment'],
  },
  {
    name: 'Deep Cleaning',
    desc: 'Top-to-bottom — every detail addressed',
    clients: ['str', 'property', 'offices', 'apartment'],
  },
  {
    name: 'Move-in / Move-out',
    desc: 'Fresh starts and clean exits',
    clients: ['str', 'property', 'apartment'],
  },
  {
    name: 'STR Turnover',
    desc: 'Fast, reliable between-guest turnovers',
    clients: ['str'],
  },
  {
    name: 'Post-construction',
    desc: 'Dust, debris, and detail work after builds',
    clients: ['property', 'offices'],
  },
]

const extendedServices = [
  { name: 'Linen processing', desc: 'Wash, dry, fold, and stage between guests' },
  { name: 'Inventory tracking', desc: 'Supplies, amenities, restocking — documented and managed' },
  { name: 'Closet & storage organization', desc: 'One-time or periodic organization for units and common areas' },
  { name: 'Maintenance coordination', desc: 'Identify and flag issues; coordinate with vendors when needed' },
  { name: 'Minor task handling', desc: 'Light fixture changes, touch-up work, things that fall through the cracks' },
  { name: 'Guest support tasks', desc: 'Check-in prep, early access handling, last-minute requests' },
  { name: 'Key & access management', desc: 'Lockbox coordination, key handoffs, access documentation' },
]

// Map accordion spaceType values → services clients keys
const spaceTypeMap: Record<string, string> = {
  str: 'str',
  property: 'property',
  office: 'offices',
  offices: 'offices',
  apartment: 'apartment',
}

export default function Services({ onQuoteClick, activeClientId }: ServicesProps): JSX.Element {
  const mappedId = activeClientId ? spaceTypeMap[activeClientId] ?? null : null
  const hasFilter = !!mappedId

  return (
    <div>
      <div className="flex items-end gap-6 mb-8">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-white leading-none" style={{ fontWeight: 300 }}>
            What we do
          </h2>
          {!hasFilter && (
            <p
              className="text-xs mt-2 italic"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem' }}
            >
              Select a space type to see what applies to you
            </p>
          )}
          {hasFilter && (
            <p
              className="text-xs mt-2"
              style={{ color: 'rgba(196,154,68,0.9)', fontFamily: 'var(--font-syne)' }}
            >
              Filtered for selected space type
            </p>
          )}
        </div>
        <div className="hidden sm:block flex-1 h-px mb-1" style={{ background: 'rgba(196,154,68,0.25)' }} />
      </div>

      {/* Grid with overflow-hidden container — clips excess borders at all breakpoints */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const isHighlighted = !hasFilter || s.clients.includes(mappedId!)
            return (
              <div
                key={s.name}
                className="group p-7 transition-all duration-300"
                style={{
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  opacity: isHighlighted ? 1 : 0.3,
                  background: isHighlighted && hasFilter ? 'rgba(255,255,255,0.04)' : undefined,
                }}
              >
                <div
                  className="w-5 h-px mb-4 transition-all duration-300 group-hover:w-10"
                  style={{ background: 'var(--color-brand-gold)', opacity: isHighlighted ? 1 : 0.5 }}
                />
                <p className="font-medium text-white text-sm mb-1.5">{s.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Extended / operational services */}
      <div className="mt-8 mb-6">
        <p
          className="text-xs uppercase mb-4"
          style={{ color: 'rgba(196,154,68,0.7)', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
        >
          We can also help with
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {extendedServices.map((s) => (
            <div key={s.name} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 mt-0.5 text-xs" style={{ color: 'var(--color-brand-gold)' }}>→</span>
              <div>
                <span className="text-xs font-medium text-white">{s.name}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}> — {s.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.28)' }}>
          These are add-ons, not packages. Mix and match based on what your operation actually needs.
        </p>
      </div>

      <p className="text-xs mb-8" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Don&apos;t see what you need? We do partial and one-off jobs too — if we can&apos;t help, we&apos;ll point you to someone who can.
      </p>

      <button
        onClick={onQuoteClick}
        className="text-sm font-medium px-6 py-3.5 min-h-[44px] text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
        style={{ background: 'rgba(255,255,255,0.08)', borderLeft: '2px solid var(--color-brand-gold)' }}
      >
        Not sure which service fits? Tell us what you need →
      </button>
    </div>
  )
}
