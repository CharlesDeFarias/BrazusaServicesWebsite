'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export interface ClientItem {
  id: string
  n: string
  label: string
  teaser: string
  headline: string
  body: React.ReactNode
  imageLabel: string
  imageSrc: string
  spaceType: string
}

interface ClientAccordionProps {
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
}) {
  return (
    <div
      id={item.id}
      style={{ borderBottom: '1px solid #D8D0C6', scrollMarginTop: '72px' }}
    >
      {/* Header */}
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

      {/* Expandable content — grid trick for true-height animation */}
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
            {/* Full-width image within the column */}
            <div className="relative w-full mb-5 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image
                src={item.imageSrc}
                alt={item.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h2
              className="italic text-2xl text-navy mb-3 leading-snug"
              style={{ fontWeight: 300 }}
            >
              {item.headline}
            </h2>
            <div className="space-y-3 mb-6 text-sm leading-relaxed" style={{ color: '#6B6360' }}>
              {item.body}
            </div>
            <button
              onClick={() => onCTAClick(item.spaceType)}
              className="text-sm font-medium px-5 py-2.5 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
              style={{ background: '#0B1D2E', borderLeft: '2px solid #C49A44' }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClientAccordion({
  items,
  openId,
  onOpenChange,
  onCTAClick,
}: ClientAccordionProps) {
  // Scroll to newly-opened item — 'nearest' avoids overshooting when item is already visible
  useEffect(() => {
    if (!openId) return
    const el = document.getElementById(openId)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60)
    }
  }, [openId])

  // col 1: STR (0) + Offices (2) — col 2: Property (1) + Homes (3)
  const col1 = [items[0], items[2]].filter(Boolean)
  const col2 = [items[1], items[3]].filter(Boolean)

  return (
    <section
      id="client-types"
      className="bg-white"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-4">
        <h2
          className="italic text-2xl md:text-3xl text-navy mb-8"
          style={{ fontWeight: 300 }}
        >
          What kind of space?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {/* Column 1 */}
          <div>
            {col1.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onOpenChange={onOpenChange}
                onCTAClick={onCTAClick}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div>
            {col2.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onOpenChange={onOpenChange}
                onCTAClick={onCTAClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
