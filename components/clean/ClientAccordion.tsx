'use client'

import { type JSX, type ReactNode, useMemo, useState } from 'react'
import Image from 'next/image'
import { getServicesForClient } from '@/components/clean/Services'

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

type ServiceClientKey = 'str' | 'property' | 'offices' | 'apartment'

const serviceClientMap: Record<string, ServiceClientKey> = {
  str: 'str',
  property: 'property',
  office: 'offices',
  apartment: 'apartment',
}

export interface ClientItem {
  id: string
  n: string
  label: string
  teaser: string
  headline: string
  body: ReactNode
  imageLabel: string
  imageSrc: string
  spaceType: string
}

interface ClientAccordionProps {
  headline: string
  items: ClientItem[]
  openId: string | null
  onOpenChange: (id: string | null) => void
  onCTAClick: (spaceType: string) => void
}

function AccordionItem({
  item,
  isOpen,
  onOpenChange,
  onCTAClick,
}: {
  item: ClientItem
  isOpen: boolean
  onOpenChange: (id: string | null) => void
  onCTAClick: (spaceType: string) => void
}): JSX.Element {
  const clientKey = serviceClientMap[item.spaceType]
  const relatedServices = useMemo(
    () => getServicesForClient(clientKey),
    [clientKey]
  )

  return (
    <div
      id={item.id}
      style={{ borderBottom: '1px solid var(--color-light-gray)' }}
    >
      <button
        onClick={() => onOpenChange(isOpen ? null : item.id)}
        className="w-full flex items-center justify-between py-5 min-h-[44px] text-left group"
      >
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <span
            className="text-xs font-semibold tabular-nums flex-shrink-0 text-brand-gold"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {item.n}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-navy text-base leading-none">{item.label}</p>
            {!isOpen && (
              <p className="text-xs mt-1.5 truncate text-warm-gray">
                {item.teaser}
              </p>
            )}
          </div>
        </div>
        <span
          className="flex-shrink-0 ml-4 text-xl font-light leading-none transition-transform duration-300"
          style={{
            color: isOpen ? 'var(--color-brand-gold)' : 'var(--color-warm-gray-light)',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transition: 'grid-template-rows 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div style={{ minHeight: 0, overflow: 'hidden' }}>
          <div className="pb-8">
            <div className="relative w-full mb-5 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '220px' }}>
              <Image
                src={item.imageSrc}
                alt={item.imageLabel}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) min(100vw, 800px), 100vw"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
            <h2
              className="italic text-2xl text-navy mb-3 leading-snug"
              style={{ fontWeight: 300 }}
            >
              {item.headline}
            </h2>
            <div className="space-y-3 mb-6 text-sm leading-relaxed text-warm-gray-darker">
              {item.body}
            </div>

            <div className="mb-6">
              <p
                className="text-xs uppercase mb-3 text-warm-gray-light"
                style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
              >
                Typical services for this type
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedServices.map((relatedService) => (
                  <span
                    key={relatedService}
                    className="text-xs px-3 py-1.5 rounded-full text-warm-gray-darkest"
                    style={{
                      border: '1px solid var(--color-light-gray)',
                      background: 'var(--color-off-white)',
                      fontFamily: 'var(--font-syne)',
                    }}
                  >
                    {relatedService}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onCTAClick(item.spaceType)}
              className="text-sm font-medium px-5 py-2.5 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
              style={{ background: 'var(--color-navy)', borderLeft: '2px solid var(--color-brand-gold)' }}
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClientAccordion({
  headline,
  items,
  openId,
  onOpenChange,
  onCTAClick,
}: ClientAccordionProps): JSX.Element {
  const [otherOpen, setOtherOpen] = useState(false)

  const handleOtherToggle = (): void => {
    const nextOpen = !otherOpen
    setOtherOpen(nextOpen)
    if (nextOpen) {
      onOpenChange(null)
    }
  }

  const handleAccordionChange = (id: string | null): void => {
    setOtherOpen(false)
    onOpenChange(id)
  }

  return (
    <section
      id="client-types"
      className="grain py-14 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, var(--color-off-white), var(--color-linen))',
        borderTop: '1px solid var(--color-light-gray)',
        scrollMarginTop: '56px',
      }}
    >
      {/* no token: intentional - 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto relative">
        <h2
          className="italic text-2xl md:text-3xl text-navy mb-5"
          style={{ fontWeight: 300 }}
        >
          {headline}
        </h2>

        <div style={{ borderTop: '1px solid var(--color-light-gray)' }}>
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onOpenChange={handleAccordionChange}
              onCTAClick={onCTAClick}
            />
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleOtherToggle}
            className="w-full flex items-center gap-5 px-5 py-4 min-h-[44px] text-left transition-colors hover:bg-white/80"
            style={{ border: '1.5px solid var(--color-brand-gold)', borderRadius: '10px', background: 'var(--color-gold-5)' }}
          >
            <span
              className="text-xs font-semibold flex-shrink-0 tabular-nums text-brand-gold"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              ✦
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy text-sm leading-none mb-1">Other spaces too</p>
              <p className="text-xs text-warm-gray">
                {"Some setups do not fit clean categories. We still handle them if the work and expectations can be defined clearly."}
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 transition-transform duration-300" style={{ transform: otherOpen ? 'rotate(180deg)' : 'none' }}>
              <path d="M3 5l4 4 4-4" stroke="var(--color-brand-gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div
            style={{
              display: 'grid',
              gridTemplateRows: otherOpen ? '1fr' : '0fr',
              opacity: otherOpen ? 1 : 0,
              transition: 'grid-template-rows 0.4s ease, opacity 0.3s ease',
            }}
          >
            <div style={{ minHeight: 0, overflow: 'hidden' }}>
              <div
                className="mt-3 px-5 py-4 rounded-xl"
                style={{ border: '1px solid var(--color-light-gray)', background: 'var(--color-off-white)' }}
              >
                <div className="space-y-3 text-sm leading-relaxed text-warm-gray-darker">
                  <p>
                    We work across rentals, homes, offices, buildings, and mixed-use setups where cleaning overlaps with coordination or operational tasks.
                  </p>
                  <p>
                    If your situation blends cleaning with logistics, access, or ongoing management tasks, we can define a scope that fits instead of forcing it into a preset category.
                  </p>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <a
                    href="#testimonials"
                    className="text-sm font-medium text-navy hover:opacity-60 transition-opacity"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    See client examples →
                  </a>
                  <a
                    href="#pricing"
                    className="text-sm font-medium text-navy hover:opacity-60 transition-opacity"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    How our pricing works →
                  </a>
                  <button
                    type="button"
                    onClick={() => onCTAClick('other')}
                    className="text-sm font-medium text-navy hover:opacity-60 transition-opacity text-left"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    Request a quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
