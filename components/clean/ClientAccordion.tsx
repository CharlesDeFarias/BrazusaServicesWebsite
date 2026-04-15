'use client'

import Image from 'next/image'

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

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
      style={{ borderBottom: '1px solid #D8D0C6' }}
    >
      {/* Header */}
      <button
        onClick={() => onOpenChange(isOpen ? null : item.id)}
        className="w-full flex items-center justify-between py-5 min-h-[44px] text-left group"
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
            <div className="relative w-full mb-5 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image
                src={item.imageSrc}
                alt={item.label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
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
  return (
    <div>
      <h2
        className="italic text-2xl md:text-3xl text-navy mb-5"
        style={{ fontWeight: 300 }}
      >
        What kind of space?
      </h2>

      {/* "We clean it all!" — moved to top, gold-bordered card */}
      <button
        onClick={() => onCTAClick('other')}
        className="w-full mb-4 flex items-center gap-5 px-5 py-4 min-h-[44px] text-left transition-colors hover:bg-white/80"
        style={{ border: '1.5px solid #C49A44', borderRadius: '10px', background: 'rgba(196,154,68,0.04)' }}
      >
        <span
          className="text-xs font-semibold flex-shrink-0 tabular-nums"
          style={{ color: '#C49A44', fontFamily: 'var(--font-syne)' }}
        >
          ✦
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy text-sm leading-none mb-1">We clean it all</p>
          <p className="text-xs" style={{ color: '#9B9288' }}>
            Not sure which applies? We adapt — reach out and we&apos;ll figure it out.
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 hidden sm:block">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="#C49A44" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Accordion items */}
      <div style={{ borderTop: '1px solid #D8D0C6' }}>
        {items.map((item) => (
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
  )
}
