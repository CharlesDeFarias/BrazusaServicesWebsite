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
      property: 'Recurring cleaning across units and common areas with issues flagged as they come up.',
      offices: 'Scheduled cleaning that runs without reminders and is confirmed after each visit.',
      apartment: 'Recurring upkeep handled on your schedule, with clear confirmation after each visit.',
      str: 'Baseline maintenance between turnovers so listings do not drift or fall behind.',
    },
  },
  {
    name: 'Deep Cleaning',
    clients: ['str', 'property', 'offices', 'apartment'],
    descriptions: {
      str: 'Full reset when guest wear builds up or before putting a unit back online.',
      property: 'Detail work across units and shared spaces when standard cleaning no longer holds.',
      offices: 'Detailed reset for offices and clinics when routine cleaning stops being enough.',
      apartment: 'Full reset when buildup reaches a point routine cleaning cannot keep up with.',
    },
  },
  {
    name: 'Move-in / Move-out',
    clients: ['str', 'property', 'apartment'],
    descriptions: {
      str: 'Reset units between stays or seasons so they are ready to go back online.',
      property: 'Move-out documented and move-in ready across units and managed properties.',
      offices: 'Office transition cleaning handled during relocations and tenant handoffs.',
      apartment: 'Move-in and move-out cleaning handled and confirmed so the space is ready when it needs to be.',
    },
  },
  {
    name: 'STR Turnover',
    clients: ['str'],
    descriptions: {
      str: 'Between-guest cleaning with completion confirmed so units are ready on time.',
      property: 'Turnover coordination for furnished units that follow hospitality timelines.',
      offices: 'Fast reset support when spaces turn over between short-term use or events.',
      apartment: 'Quick resets for furnished units that need to be ready again the same day.',
    },
  },
  {
    name: 'Post-construction',
    clients: ['property', 'offices'],
    descriptions: {
      str: 'Post-renovation cleanup so units can be listed again without delays.',
      property: 'Cleanup after projects, handling dust, debris, and contractor handoff issues.',
      offices: 'Construction cleanup for offices and clinics before reopening to staff.',
      apartment: 'Post-renovation cleanup handled until the space is genuinely livable again.',
    },
  },
]

const extendedServiceDefinitions: ExtendedServiceDefinition[] = [
  {
    name: 'Linen processing',
    clients: ['str', 'property'],
    descriptions: {
      str: 'Wash, sort, and stage linens so turnovers do not slow down.',
      property: 'Manage linen flow across units so shortages do not disrupt operations.',
    },
    defaultDescription: 'Linen handling when volume or turnover makes it part of the workflow.',
  },
  {
    name: 'Inventory tracking',
    clients: ['str', 'property'],
    descriptions: {
      str: 'Track supplies and flag shortages before they affect guest stays.',
      property: 'Monitor inventory across units so gaps are seen before they cause delays.',
    },
    defaultDescription: 'Track supplies and flag shortages before they affect the next visit.',
  },
  {
    name: 'Closet & storage organization',
    clients: ['str', 'property', 'apartment'],
    descriptions: {
      str: 'Keep closets organized so supplies are visible and easy to restock.',
      property: 'Set storage standards so teams know where items go across units.',
      apartment: 'Organize storage so items have a clear place and are easy to find each time.',
    },
    defaultDescription: 'Organize storage so items are in the right place and easy to access.',
  },
  {
    name: 'Maintenance coordination',
    clients: ['str', 'property', 'offices'],
    descriptions: {
      str: 'Flag issues during cleans and coordinate fixes before guests notice.',
      property: 'Surface problems early and coordinate with vendors before they grow.',
      offices: 'Identify issues during service so they are handled before disruption.',
    },
    defaultDescription: 'Identify issues early and coordinate fixes when cleaning reveals them.',
  },
  {
    name: 'Minor task handling',
    clients: ['str', 'property', 'offices', 'apartment'],
    descriptions: {
      str: 'Handle small issues during service so the unit stays guest-ready between turnovers.',
      property: 'Take care of small tasks that would otherwise require another vendor.',
      offices: 'Resolve minor issues during service so they do not become larger tasks.',
      apartment: 'Handle small tasks during visits so they do not pile up.',
    },
    defaultDescription: 'Take care of small tasks during service so they do not escalate.',
  },
  {
    name: 'Guest support tasks',
    clients: ['str'],
    descriptions: {
      str: 'Assist with guest-facing needs so hosts are not pulled into small issues.',
    },
    defaultDescription: 'Cover the in-between tasks that do not fit cleaning but need to be handled.',
  },
  {
    name: 'Key & access management',
    clients: ['str', 'property', 'offices'],
    descriptions: {
      str: 'Manage keys and access so turnovers do not get delayed or blocked.',
      property: 'Keep access organized across units so staff and vendors can enter.',
      offices: 'Coordinate access for after-hours work without needing supervision.',
    },
    defaultDescription: 'Handle access so entry and handoffs do not slow down the work.',
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
              What we handle daily
            </h2>
            <p
              className="text-xs mt-2"
              style={{ color: hasFilter ? 'var(--color-gold-90)' : 'var(--color-white-35)', fontFamily: hasFilter ? 'var(--font-syne)' : 'var(--font-cormorant)', fontSize: hasFilter ? '0.75rem' : '0.9rem' }}
            >
              {hasFilter
                ? 'We highlight the services that tend to apply to your space.'
                : 'Pick a space type to see how the work is usually handled there.'}
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
                  <p className="text-xs leading-relaxed text-white-70">{description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 mb-6">
          <p
            className="text-xs uppercase mb-4 text-gold-60"
            style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
          >
            We can also help with
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {extendedServiceDefinitions.map((extendedServiceDefinition) => {
              const isRelevant = !hasFilter || extendedServiceDefinition.clients.includes(selectedFilter as ServiceClientKey)

              return (
                <div key={extendedServiceDefinition.name} className="flex items-start gap-2.5" style={{ opacity: isRelevant ? 1 : 0.3 }}>
                  <span className="flex-shrink-0 mt-0.5 text-xs text-brand-gold">→</span>
                  <div>
                    <span className="text-xs font-medium text-white">{extendedServiceDefinition.name}</span>
                    <span className="text-xs text-white-40">
                      {' '}
                      {'\u2014'} {getExtendedDescription(extendedServiceDefinition, selectedFilter)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs mt-4 text-white-30">
            These are optional layers. Scope depends on how much of the operation you want handled.
          </p>
        </div>

        <button
          onClick={onQuoteClick}
          className="text-sm font-medium px-6 py-3.5 min-h-[44px] text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
          style={{ background: 'var(--color-white-10)', borderLeft: '2px solid var(--color-brand-gold)' }}
        >
          Not sure what fits? Tell us how your space runs →
        </button>
      </div>
    </section>
  )
}
