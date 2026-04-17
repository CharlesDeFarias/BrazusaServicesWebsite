'use client'

import { type JSX, useState, useRef, useEffect, useCallback } from 'react'

type Category = 'all' | 'str' | 'property' | 'offices' | 'homes' | 'other'

const cases: { category: Category; title: string; result: string; detail: string }[] = [
  {
    category: 'str',
    title: 'Short-term rental owner',
    result: 'More reliable turnovers, fewer issues between guests.',
    detail: 'Created a repeatable turnover system with consistent expectations — no more scrambling before check-in.',
  },
  {
    category: 'property',
    title: 'Property manager',
    result: 'Less oversight required, smoother operations.',
    detail: 'Handled a mix of jobs across multiple units with consistent communication and no hand-holding needed.',
  },
  {
    category: 'homes',
    title: 'Residential client',
    result: 'Lower cost and better satisfaction.',
    detail: "Didn't need a full clean — we built a custom plan for key areas only. Flexible, honest, no upselling.",
  },
  {
    category: 'offices',
    title: 'Office manager',
    result: 'Consistent, minimally disruptive service.',
    detail: 'After-hours cleaning with reliable scheduling. Staff notices the difference; we never need reminders.',
  },
  {
    category: 'property',
    title: 'Building owner',
    result: 'Move-out cleans handled without follow-up.',
    detail: 'Same-day scheduling when a unit turns over. We document and communicate — no need to inspect after.',
  },
  {
    category: 'other',
    title: 'Post-construction client',
    result: 'A brand-new space, ready to use from day one.',
    detail: 'After a major renovation, we cleared the dust, detailed every surface, and made the space move-in ready — same week.',
  },
  {
    category: 'other',
    title: 'One-time deep clean',
    result: 'Exactly the scope we needed, nothing more.',
    detail: 'We needed a targeted kitchen and bathroom overhaul before listing the unit. Done on short notice, no package required.',
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
