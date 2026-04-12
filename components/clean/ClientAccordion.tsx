'use client'

import { useEffect } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

export interface ClientItem {
  id: string
  n: string
  label: string
  teaser: string
  headline: string
  body: React.ReactNode
  imageLabel: string
  spaceType: string
}

interface ClientAccordionProps {
  items: ClientItem[]
  openId: string | null
  onOpenChange: (id: string | null) => void
  onCTAClick: (spaceType: string) => void
}

export default function ClientAccordion({
  items,
  openId,
  onOpenChange,
  onCTAClick,
}: ClientAccordionProps) {
  // Scroll to newly-opened item
  useEffect(() => {
    if (!openId) return
    const el = document.getElementById(openId)
    if (el) {
      // small delay so the panel starts opening before we scroll
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
  }, [openId])

  return (
    <section
      id="client-types"
      className="bg-white"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {items.map((item, i) => {
          const isOpen = openId === item.id

          return (
            <div
              key={item.id}
              id={item.id}
              style={{
                borderBottom: '1px solid #D8D0C6',
                scrollMarginTop: '64px',
              }}
            >
              {/* Accordion header — always visible */}
              <button
                onClick={() => onOpenChange(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <span
                    className="text-xs font-semibold tabular-nums flex-shrink-0"
                    style={{ color: '#C49A44', fontFamily: 'var(--font-syne)' }}
                  >
                    {item.n}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy text-base leading-none">{item.label}</p>
                    {!isOpen && (
                      <p className="text-xs mt-1.5 truncate" style={{ color: '#9B9288' }}>
                        {item.teaser}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className="flex-shrink-0 ml-4 text-xl font-light leading-none transition-transform duration-300"
                  style={{
                    color: isOpen ? '#C49A44' : '#B0A89E',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>

              {/* Expandable content */}
              <div
                className="overflow-hidden transition-all duration-350"
                style={{
                  maxHeight: isOpen ? '800px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                }}
              >
                <div className="pb-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
                  <div>
                    <h2
                      className="italic text-3xl text-navy mb-4 leading-snug"
                      style={{ fontWeight: 300 }}
                    >
                      {item.headline}
                    </h2>
                    <div className="space-y-3 mb-7 text-sm leading-relaxed" style={{ color: '#6B6360' }}>
                      {item.body}
                    </div>
                    <button
                      onClick={() => onCTAClick(item.spaceType)}
                      className="text-sm font-medium px-6 py-3 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
                      style={{ background: '#0B1D2E', borderLeft: '2px solid #C49A44' }}
                    >
                      Get a Free Quote
                    </button>
                  </div>
                  <div className="hidden lg:block">
                    <ImagePlaceholder aspect="4/3" label={item.imageLabel} className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
