'use client'

import { type JSX, useState, useRef, useEffect, useCallback } from 'react'

type Category = 'all' | 'str' | 'property' | 'offices' | 'homes' | 'other'

const cases: { category: Category; title: string; result: string; detail: string }[] = [
  {
    category: 'str',
    title: 'Thatch \u2014 multi-building STR operation',
    result: 'Turnover coordination across multiple units, no dropped handoffs.',
    detail: 'Managing several short-term rentals across different buildings meant scheduling was constantly changing. We built a system around their calendar \u2014 same-day confirmations, consistent checklists, and a direct line so nothing fell through between guests. At volume, turnovers ran $25\u201345 each.',
  },
  {
    category: 'str',
    title: 'Michelle \u2014 Bed and Breakfast Boston',
    result: 'Units run without oversight while she is away most of the year.',
    detail: 'Michelle runs multiple Boston units but is away most of the year. We handle turnovers, guest issues, small repairs, and day-to-day coordination. She texts bookings when needed; the units stay ready without her being present. Recurring at roughly $125/month.',
  },
  {
    category: 'str',
    title: 'BREC \u2014 two new STR buildings',
    result: 'Buildings prepared for first guests without delays or rework.',
    detail: 'Two newly built STR buildings needed full post-construction cleaning before opening. We handled dust, debris, and final prep across both sites so units were ready for guests without staggered delays or repeated work.',
  },
  {
    category: 'str',
    title: 'Labor Day semester turnover',
    result: 'Six units cleaned over a weekend. Everyone moved in on time.',
    detail: 'A property with student tenants needed a full turnover between semesters. Short window, multiple units, different conditions in each. We scheduled back-to-back cleans across the weekend and finished before the new tenants arrived.',
  },
  {
    category: 'property',
    title: 'Diana \u2014 corporate housing (Capital One)',
    result: 'Reliable turnovers for furnished units housing traveling employees.',
    detail: 'Corporate housing runs on tight schedules \u2014 employees check out, new ones check in within hours. Diana needed someone who could work on short notice, document the condition of units, and communicate clearly. We\'ve been handling these ever since.',
  },
  {
    category: 'homes',
    title: 'Roommates \u2014 partial apartment cleaning',
    result: 'Cleaned one bedroom and shared areas only. No pressure for more.',
    detail: 'One roommate wanted regular cleaning; the others didn\'t want to pay for rooms they\'d handle themselves. We set up a custom plan covering just the shared spaces and one bedroom \u2014 fair, straightforward, and exactly what they asked for.',
  },
  {
    category: 'offices',
    title: 'New Horizons \u2014 office operations',
    result: 'Cleaning runs on schedule without follow-ups or oversight.',
    detail: 'New Horizons needed a fixed cleaning schedule without having to manage the vendor themselves. We keep the same team, work the same days, and complete each visit without reminders needed. The schedule holds, and they haven\'t had to redirect us. Six visits per week at $30 each.',
  },
  {
    category: 'offices',
    title: 'Dr. Jeffrey E. Silver \u2014 clinic',
    result: 'Same team, same routine. No disruption to staff or patients.',
    detail: 'This clinic required recurring cleaning that would not interrupt staff or patients. We maintain the same team, follow set routines, and work around their schedule so the space meets the same standard each visit without added coordination. Three visits per week at $50 each.',
  },
  {
    category: 'other',
    title: 'Five Guys \u2014 post-construction',
    result: 'Restaurant opened on time after full construction cleanup.',
    detail: 'After construction, the space needed a full cleanup before it could open for business. We cleared floors, equipment surfaces, and construction debris on a tight timeline and handed it back ready to open on schedule.',
  },
  {
    category: 'other',
    title: 'Post-construction deep clean',
    result: 'Construction dust gone. The space was move-in ready the same week.',
    detail: 'After a significant renovation, the unit had drywall dust in every corner, adhesive residue on floors, and debris in the HVAC vents. We handled the full post-construction detail \u2014 surfaces, fixtures, floors \u2014 and the client moved in three days later.',
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

const testimonialHashToCategory: Record<string, Category> = {
  '#testimonials': 'all',
  '#testimonials-str': 'str',
  '#testimonials-property': 'property',
  '#testimonials-offices': 'offices',
  '#testimonials-homes': 'homes',
  '#testimonials-other': 'other',
}

function getCategoryFromHash(hash: string): Category | null {
  return testimonialHashToCategory[hash] ?? null
}

function updateHashForCategory(category: Category): void {
  const nextHash = category === 'all' ? '#testimonials' : `#testimonials-${category}`
  if (window.location.hash === nextHash) return
  window.history.replaceState(null, '', nextHash)
}

const CARD_W = 320
const GAP    = 16

export default function Testimonials(): JSX.Element {
  const [active, setActive] = useState<Category>(() => {
    if (typeof window === 'undefined') {
      return 'all'
    }

    return getCategoryFromHash(window.location.hash) ?? 'all'
  })
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollRef    = useRef<HTMLDivElement>(null)
  const isHovering   = useRef(false)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  const filtered = active === 'all' ? cases : cases.filter((c) => c.category === active)

  const applyCategoryFromHash = useCallback((hash: string, behavior: ScrollBehavior): void => {
    const categoryFromHash = getCategoryFromHash(hash)
    if (!categoryFromHash) return

    setActive(categoryFromHash)

    const testimonialsSection = document.getElementById('testimonials')
    if (!testimonialsSection) return

    testimonialsSection.scrollIntoView({ behavior })
  }, [])

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

  useEffect(() => {
    if (getCategoryFromHash(window.location.hash)) {
      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'auto' })
    }

    const handleHashChange = (): void => {
      applyCategoryFromHash(window.location.hash, 'smooth')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [applyCategoryFromHash])

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
      className="py-14 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-linen), var(--color-off-white))', borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      {/* no token: intentional - 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto relative">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-8">
          <div>
            <h2 className="italic text-3xl md:text-4xl text-navy mb-1.5" style={{ fontWeight: 300 }}>
              Real clients, real situations
            </h2>
            <p className="text-sm text-warm-gray">
              A few examples of the work we do and how we approach it.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end sm:flex-shrink-0">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  data-category={f.value}
                  onClick={() => {
                    setActive(f.value)
                    updateHashForCategory(f.value)
                  }}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    background: active === f.value ? 'var(--color-navy)' : 'transparent',
                    color: active === f.value ? 'var(--color-white-90)' : 'var(--color-warm-gray)',
                    border: active === f.value ? '1px solid var(--color-navy)' : '1px solid var(--color-light-gray)',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Arrow controls - desktop only */}
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
                <p className="text-xs leading-relaxed mt-auto text-warm-gray">
                  {c.detail}
                </p>
                <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-light-gray)' }}>
                  <span className="text-xs font-medium text-warm-gray-light">{c.title}</span>
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
                <p className="text-sm text-center text-warm-gray-light">
                  {'No examples for this category yet \u2014 reach out directly.'}
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
