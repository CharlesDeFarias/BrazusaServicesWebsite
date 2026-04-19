import { type JSX, useEffect, useState } from 'react'

type ServiceClientKey = 'str' | 'property' | 'offices' | 'apartment'
type ServiceFilterKey = 'all' | ServiceClientKey

interface ServiceDefinition {
  name: string
  clients: ServiceClientKey[]
  descriptions: Record<ServiceClientKey, string>
}

interface ExtendedServiceDefinition {
  name: string
  clients: ServiceClientKey[]
  descriptions: Partial<Record<ServiceClientKey, string>>
  defaultDescription: string
}

interface ServicesProps {
  onQuoteClick: () => void
  activeClientId?: string | null
}

const filterOptions: { label: string; value: ServiceFilterKey }[] = [
  { label: 'All', value: 'all' },
  { label: 'STR', value: 'str' },
  { label: 'Property', value: 'property' },
  { label: 'Offices', value: 'offices' },
  { label: 'Homes', value: 'apartment' },
]

export const serviceDefinitions: ServiceDefinition[] = [
  {
    name: 'Routine Cleaning',
    clients: ['property', 'offices', 'apartment'],
    descriptions: {
      property: 'Reliable recurring cleaning across units, common areas, and shared building needs.',
      offices: 'Consistent scheduled cleaning that keeps workspaces ready without constant follow-up.',
      apartment: 'Steady upkeep for homes and apartments on the schedule that makes sense for you.',
      str: 'Routine maintenance between heavier resets when a short-term rental needs baseline support.',
    },
  },
  {
    name: 'Deep Cleaning',
    clients: ['str', 'property', 'offices', 'apartment'],
    descriptions: {
      str: 'Full reset work before listings, after guest wear, or when standards slipped.',
      property: 'Top-to-bottom detail work for units, turnovers, and problem spaces that need more than maintenance.',
      offices: 'Detail-focused cleaning for offices, clinics, and shared spaces that need a full refresh.',
      apartment: 'A thorough reset for homes and apartments when regular cleaning is not enough.',
    },
  },
  {
    name: 'Move-in / Move-out',
    clients: ['str', 'property', 'apartment'],
    descriptions: {
      str: 'Listing-ready resets between guest cycles, owner stays, or seasonal transitions.',
      property: 'Move-in ready, move-out documented cleaning for landlords, buildings, and managed units.',
      offices: 'Transition cleaning for office suites, small relocations, and handoff situations.',
      apartment: 'Fresh starts and clean exits for apartments, homes, and roommate turnover situations.',
    },
  },
  {
    name: 'STR Turnover',
    clients: ['str'],
    descriptions: {
      str: 'Fast, reliable between-guest turnovers with the consistency reviews depend on.',
      property: 'Turnover-style coordination when furnished building units need hospitality-level timing.',
      offices: 'Quick reset support when commercial spaces need fast turnaround between occupants or events.',
      apartment: 'High-speed reset work when a furnished unit needs to be guest-ready again quickly.',
    },
  },
  {
    name: 'Post-construction',
    clients: ['property', 'offices'],
    descriptions: {
      str: 'Detailed cleanup after renovation work before a unit can safely go back online.',
      property: 'Dust, debris, and detail work after building projects, renovations, and contractor handoff.',
      offices: 'Construction cleanup for offices, clinics, and tenant improvements before reopening.',
      apartment: 'Post-renovation cleanup when a home or apartment needs to feel livable again fast.',
    },
  },
]

const extendedServiceDefinitions: ExtendedServiceDefinition[] = [
  {
    name: 'Linen processing',
    clients: ['str', 'property'],
    descriptions: {
      str: 'Wash, dry, fold, and stage linens so turnovers stay smooth.',
      property: 'Coordinate linen flow across furnished units or repeated turnovers.',
    },
    defaultDescription: 'Linen handling when the operation needs more than cleaning alone.',
  },
  {
    name: 'Inventory tracking',
    clients: ['str', 'property'],
    descriptions: {
      str: 'Track supplies, amenities, and restocking issues before guests feel them.',
      property: 'Monitor supplies across units so managers are not discovering shortages late.',
    },
    defaultDescription: 'Supply visibility and restocking support where it meaningfully reduces oversight.',
  },
  {
    name: 'Closet & storage organization',
    clients: ['str', 'property', 'apartment'],
    descriptions: {
      str: 'Keep owner closets, supply storage, and backstock organized between stays.',
      property: 'Standardize storage across units and shared supply areas.',
      apartment: 'One-time or periodic organization for homes and apartments that need order restored.',
    },
    defaultDescription: 'Storage organization when clutter or inconsistency is getting in the way.',
  },
  {
    name: 'Maintenance coordination',
    clients: ['str', 'property', 'offices'],
    descriptions: {
      str: 'Flag issues fast and coordinate the small fixes that protect guest experience.',
      property: 'Spot problems early and coordinate with building vendors before they compound.',
      offices: 'Surface issues clearly so commercial spaces stay functional without surprises.',
    },
    defaultDescription: 'Issue spotting and coordination support when cleaning alone is not enough.',
  },
  {
    name: 'Minor task handling',
    clients: ['str', 'property', 'offices', 'apartment'],
    descriptions: {
      str: 'Handle the small things that would otherwise break a guest-ready setup.',
      property: 'Take care of light tasks that tend to fall through between vendors.',
      offices: 'Resolve small facility issues before they become another management thread.',
      apartment: 'Help with small practical tasks that are easier to bundle into the visit.',
    },
    defaultDescription: 'Light practical tasks that fit naturally into a broader service visit.',
  },
  {
    name: 'Guest support tasks',
    clients: ['str'],
    descriptions: {
      str: 'Support the guest-facing details that make a short-term rental operation feel controlled.',
    },
    defaultDescription: 'Operational support for spaces that need more coordination than standard cleaning.',
  },
  {
    name: 'Key & access management',
    clients: ['str', 'property', 'offices'],
    descriptions: {
      str: 'Coordinate keys, lockboxes, and access so turnovers do not bottleneck.',
      property: 'Keep access logistics documented across units, staff, and vendors.',
      offices: 'Support after-hours entry, keys, and access documentation cleanly.',
    },
    defaultDescription: 'Access coordination when timing and handoff reliability matter.',
  },
]

const spaceTypeMap: Record<string, ServiceClientKey> = {
  str: 'str',
  property: 'property',
  office: 'offices',
  offices: 'offices',
  apartment: 'apartment',
  homes: 'apartment',
}

export function getServicesForClient(clientKey: ServiceClientKey): string[] {
  return serviceDefinitions
    .filter((serviceDefinition) => serviceDefinition.clients.includes(clientKey))
    .map((serviceDefinition) => serviceDefinition.name)
}

function getClientKeyFromActiveId(activeClientId?: string | null): ServiceFilterKey {
  if (!activeClientId) return 'all'
  return spaceTypeMap[activeClientId] ?? 'all'
}

function getExtendedDescription(
  extendedServiceDefinition: ExtendedServiceDefinition,
  selectedFilter: ServiceFilterKey
): string {
  if (selectedFilter === 'all') {
    return extendedServiceDefinition.defaultDescription
  }

  return extendedServiceDefinition.descriptions[selectedFilter] ?? extendedServiceDefinition.defaultDescription
}

export default function Services({ onQuoteClick, activeClientId }: ServicesProps): JSX.Element {
  const selectedFromAccordion = getClientKeyFromActiveId(activeClientId)
  const [selectedFilter, setSelectedFilter] = useState<ServiceFilterKey>(selectedFromAccordion)

  useEffect(() => {
    setSelectedFilter(selectedFromAccordion)
  }, [selectedFromAccordion])

  const hasFilter = selectedFilter !== 'all'

  return (
    <section
      id="services"
      className="grain bg-navy text-white px-6 py-14"
      style={{ borderTop: '1px solid var(--color-white-10)', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="italic text-3xl md:text-4xl text-white leading-none" style={{ fontWeight: 300 }}>
              What we actually do
            </h2>
            <p
              className="text-xs mt-2"
              style={{ color: hasFilter ? 'var(--color-gold-90)' : 'var(--color-white-35)', fontFamily: hasFilter ? 'var(--font-syne)' : 'var(--font-cormorant)', fontSize: hasFilter ? '0.75rem' : '0.9rem' }}
            >
              {hasFilter
                ? 'Service copy per client type is derived from the current service mapping.'
                : 'Choose a space type below to see the work that usually fits best.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filterOption) => {
              const isActive = selectedFilter === filterOption.value
              return (
                <button
                  key={filterOption.value}
                  type="button"
                  onClick={() => setSelectedFilter(filterOption.value)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    background: isActive ? 'var(--color-brand-gold)' : 'transparent',
                    color: isActive ? 'var(--color-navy)' : 'var(--color-white-55)',
                    border: `1px solid ${isActive ? 'var(--color-brand-gold)' : 'var(--color-white-15)'}`,
                  }}
                >
                  {filterOption.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-white-10)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {serviceDefinitions.map((serviceDefinition) => {
              const isRelevant = !hasFilter || serviceDefinition.clients.includes(selectedFilter as ServiceClientKey)
              const description = selectedFilter === 'all'
                ? serviceDefinition.descriptions[serviceDefinition.clients[0]]
                : serviceDefinition.descriptions[selectedFilter as ServiceClientKey]

              return (
                <div
                  key={serviceDefinition.name}
                  className="group p-7 transition-all duration-300"
                  style={{
                    borderRight: '1px solid var(--color-white-10)',
                    borderBottom: '1px solid var(--color-white-10)',
                    opacity: isRelevant ? 1 : 0.3,
                    background: isRelevant && hasFilter ? 'var(--color-white-5)' : undefined,
                  }}
                >
                  <div
                    className="w-5 h-px mb-4 transition-all duration-300 group-hover:w-10"
                    style={{ background: 'var(--color-brand-gold)', opacity: isRelevant ? 1 : 0.5 }}
                  />
                  <p className="font-medium text-white text-sm mb-1.5">{serviceDefinition.name}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-white-70)' }}>{description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 mb-6">
          <p
            className="text-xs uppercase mb-4"
            style={{ color: 'rgba(196,154,68,0.7)' /* no token: intentional */, letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
          >
            We can also help with
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {extendedServiceDefinitions.map((extendedServiceDefinition) => {
              const isRelevant = !hasFilter || extendedServiceDefinition.clients.includes(selectedFilter as ServiceClientKey)

              return (
                <div key={extendedServiceDefinition.name} className="flex items-start gap-2.5" style={{ opacity: isRelevant ? 1 : 0.3 }}>
                  <span className="flex-shrink-0 mt-0.5 text-xs" style={{ color: 'var(--color-brand-gold)' }}>→</span>
                  <div>
                    <span className="text-xs font-medium text-white">{extendedServiceDefinition.name}</span>
                    <span className="text-xs" style={{ color: 'var(--color-white-40)' }}>
                      {' '}
                      — {getExtendedDescription(extendedServiceDefinition, selectedFilter)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--color-white-30)' }}>
            These are add-ons, not assumptions. The mix depends on how much of the operation you want us to handle.
          </p>
        </div>

        <p className="text-xs mb-8" style={{ color: 'var(--color-white-30)' }}>
          Minor wording in this section is derived from the current client-service mapping. A deeper ChatGPT refinement pass is still planned.
        </p>

        <button
          onClick={onQuoteClick}
          className="text-sm font-medium px-6 py-3.5 min-h-[44px] text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
          style={{ background: 'var(--color-white-10)', borderLeft: '2px solid var(--color-brand-gold)' }}
        >
          Not sure which service fits? Tell us what you need →
        </button>
      </div>
    </section>
  )
}
