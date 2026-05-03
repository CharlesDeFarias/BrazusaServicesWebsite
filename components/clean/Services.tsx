import { type JSX, useEffect, useState } from 'react'
import type { ExtendedServiceDefinition, ServiceClientKey, ServicesCopy } from '@/lib/copy/brazusa-cleaning/types'
import { baseCopy } from '@/lib/copy/brazusa-cleaning/base'
type ServiceFilterKey = 'all' | ServiceClientKey

interface ServicesProps {
  onQuoteClick: () => void
  activeClientId?: string | null
  servicesCopy: ServicesCopy
}

const filterOptions: { label: string; value: ServiceFilterKey }[] = [
  { label: 'All', value: 'all' },
  { label: 'STR', value: 'str' },
  { label: 'Property', value: 'property' },
  { label: 'Offices', value: 'offices' },
  { label: 'Homes', value: 'apartment' },
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
  return baseCopy.services.serviceDefinitions
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

export default function Services({ onQuoteClick, activeClientId, servicesCopy }: ServicesProps): JSX.Element {
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
            <h2 className="text-3xl md:text-4xl text-white leading-none">
              What we handle daily
            </h2>
            <p
              className="text-xs mt-2"
              style={{ color: hasFilter ? 'var(--color-gold-90)' : 'var(--color-white-35)', fontFamily: hasFilter ? 'var(--font-syne)' : 'var(--font-ibm-plex-sans)', fontSize: hasFilter ? '0.75rem' : '0.9rem' }}
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
            {servicesCopy.serviceDefinitions.map((serviceDefinition) => {
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
            {servicesCopy.extendedServiceDefinitions.map((extendedServiceDefinition) => {
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
        </div>

        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-5 text-center">
          <p className="text-xs text-white-30">
            These are optional layers. Scope depends on how much of the operation you want handled.
          </p>
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium px-6 py-3.5 min-h-[44px] text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy flex-shrink-0"
            style={{ background: 'var(--color-white-10)', borderLeft: '2px solid var(--color-brand-gold)' }}
          >
            Not sure what fits? Tell us how your space runs
          </button>
        </div>
      </div>
    </section>
  )
}
