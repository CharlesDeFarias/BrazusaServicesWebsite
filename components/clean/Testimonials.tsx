'use client'

import { type JSX, useState, useRef, useEffect, useCallback } from 'react'

type Category = 'all' | 'str' | 'property' | 'offices' | 'homes' | 'other'

const cases: { category: Category; title: string; result: string; detail: string }[] = [
  {
    category: 'str',
    title: 'Thatch — multi-building STR operation',
    result: 'Turnover coordination across multiple units, no dropped handoffs.',
    detail: 'Managing several short-term rentals across different buildings meant scheduling was constantly changing. We built a system around their calendar — same-day confirmations, consistent checklists, and a direct line so nothing fell through between guests.',
  },
  {
    category: 'str',
    title: 'Michelle & Wendy — independent STR hosts',
    result: 'Review scores improved. They stopped thinking about cleaning.',
    detail: 'Two separate hosts who each had issues with their previous cleaners — inconsistency, missed items, bad communication. We took over both and standardized the process. They now text us the booking; we handle the rest.',
  },
  {
    category: 'property',
    title: 'Diana — corporate housing (Capital One)',
    result: 'Reliable turnovers for furnished units housing traveling employees.',
    detail: 'Corporate housing runs on tight schedules — employees check out, new ones check in within hours. Diana needed someone who could work on short notice, document the condition of units, and communicate clearly. We\'ve been handling these ever since.',
  },
  {
    category: 'homes',
    title: 'Roommates — partial apartment cleaning',
    result: 'Cleaned one bedroom and shared areas only. No pressure for more.',
    detail: 'One roommate wanted regular cleaning; the others didn\'t want to pay for rooms they\'d handle themselves. We set up a custom plan covering just the shared spaces and one bedroom — fair, straightforward, and exactly what they asked for.',
  },
  {
    category: 'str',
    title: 'Labor Day semester turnover',
    result: 'Six units cleaned over a weekend. Everyone moved in on time.',
    detail: 'A property with student tenants needed a full turnover between semesters. Short window, multiple units, different conditions in each. We scheduled back-to-back cleans across the weekend and finished before the new tenants arrived.',
  },
  {
    category: 'other',
    title: 'Post-construction deep clean',
    result: 'Construction dust gone. The space was move-in ready the same week.',
    detail: 'After a significant renovation, the unit had drywall dust in every corner, adhesive residue on floors, and debris in the HVAC vents. We handled the full post-construction detail — surfaces, fixtures, floors — and the client moved in three days later.',
  },
]

const filters: { label: string; value: Category }[] = [
  { label: 'All',      value: 'all' },
  { label: 'STR',      value: 'str' },
  { label: 'Property', value: 'property' },
  { label: 'Offices',  value: 'offices' },
  { label: 'Homes',    value: 'homes' },
  { label: 'Other',    value: 'other' },
]

const CARD_W = 320
const GAP    = 16

export default function Testimonials(): JSX.Element {
  const [active, setActive]               = useState<Category>('all')
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollRef    = useRef<HTMLDivElement>(null)
  const isHovering   = useRef(false)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  const filtered = active === 'all' ? cases : cases.filter((c) => c.category === active)

  const updateScrollState = useCallback((): void => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  const resetAutoScroll = useCallback((count: number): void => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (count < 3) return
    intervalRef.current = setInterval(() => {
      if (isHovering.current || !scrollRef.current) return
      const el = scrollRef.current
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: CARD_W + GAP, behavior: 'smooth' })
      }
    }, 4500)
  }, [])

  // Reset scroll position + restart auto-scroll when filter changes
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = 0
    updateScrollState()
    resetAutoScroll(filtered.length)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [active, filtered.length, resetAutoScroll, updateScrollState])

  const scrollByCard = (dir: 'left' | 'right'): void => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? CARD_W + GAP : -(CARD_W + GAP), behavior: 'smooth' })
    resetAutoScroll(filtered.length) // Reset timer on manual interaction
  }

  const categoryLabel = (cat: Category): string =>
    filters.find((f) => f.value === cat)?.label ?? cat

  return (
    <section
      id="testimonials"
      className="bg-off-white py-14 px-6"
      style={{ borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
          <div>
            <h2 className="italic text-3xl md:text-4xl text-navy mb-1.5" style={{ fontWeight: 300 }}>
              Real clients, real situations
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-warm-gray)' }}>
              A few examples of the work we do and how we approach it.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end sm:flex-shrink-0">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    background: active === f.value ? 'var(--color-navy)' : 'transparent',
                    color: active === f.value ? '#fff' : 'var(--color-warm-gray)',
                    border: active === f.value ? '1px solid var(--color-navy)' : '1px solid var(--color-light-gray)',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Arrow controls — desktop only */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scrollByCard('left')}
                disabled={!canScrollLeft}
                aria-label="Previous"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  border: '1px solid',
                  borderColor: canScrollLeft ? 'var(--color-brand-gold)' : 'var(--color-light-gray)',
                  background: canScrollLeft ? 'var(--color-brand-gold)' : 'transparent',
                  color: canScrollLeft ? 'var(--color-navy)' : 'var(--color-light-gray)',
                  cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => scrollByCard('right')}
                disabled={!canScrollRight}
                aria-label="Next"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  border: '1px solid',
                  borderColor: canScrollRight ? 'var(--color-brand-gold)' : 'var(--color-light-gray)',
                  background: canScrollRight ? 'var(--color-brand-gold)' : 'transparent',
                  color: canScrollRight ? 'var(--color-navy)' : 'var(--color-light-gray)',
                  cursor: canScrollRight ? 'pointer' : 'not-allowed',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => { isHovering.current = true }}
          onMouseLeave={() => { isHovering.current = false }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={updateScrollState}
          >
            {filtered.map((c, i) => (
              <div
                key={`${c.title}-${i}`}
                className="flex-shrink-0 rounded-xl p-6 flex flex-col gap-3 bg-white"
                style={{
                  width: `${CARD_W}px`,
                  maxWidth: '80vw',
                  border: '1px solid var(--color-light-gray)',
                  scrollSnapAlign: 'start',
                }}
              >
                <p
                  className="italic text-navy leading-snug"
                  style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 400 }}
                >
                  {c.result}
                </p>
                <p className="text-xs leading-relaxed mt-auto" style={{ color: 'var(--color-warm-gray)' }}>
                  {c.detail}
                </p>
                <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-light-gray)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--color-warm-gray-light)' }}>{c.title}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: 'var(--color-off-white)',
                      color: 'var(--color-brand-gold)',
                      border: '1px solid var(--color-linen-dark)',
                      fontFamily: 'var(--font-syne)',
                    }}
                  >
                    {categoryLabel(c.category)}
                  </span>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div
                className="flex-shrink-0 rounded-xl p-8 flex items-center justify-center"
                style={{ width: `${CARD_W}px`, maxWidth: '80vw', border: '1px dashed var(--color-light-gray)' }}
              >
                <p className="text-sm text-center" style={{ color: 'var(--color-warm-gray-light)' }}>
                  No examples for this category yet — reach out directly.
                </p>
              </div>
            )}
          </div>

          {/* Right-edge fade */}
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-4 w-16"
            style={{ background: 'linear-gradient(to right, transparent, var(--color-off-white))' }}
          />
        </div>
      </div>
    </section>
  )
}
