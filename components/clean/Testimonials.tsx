'use client'

import { type JSX, useState, useEffect } from 'react'
import { toggleCategory, type TestimonialCategory } from './helpers/testimonialToggle'

type Category = TestimonialCategory

interface Case {
  category: Category
  title: string
  result: string
  detail: string
}

const cases: Case[] = [
  {
    category: 'str',
    title: 'Thatch — multi-building STR operation',
    result: 'Turnover coordination across multiple units, no dropped handoffs.',
    detail: 'Managing several short-term rentals across different buildings meant scheduling was constantly changing. We built a system around their calendar — same-day confirmations, consistent checklists, and a direct line so nothing fell through between guests. At volume, turnovers ran $25–45 each.',
  },
  {
    category: 'str',
    title: 'Michelle — Bed and Breakfast Boston',
    result: 'Units run without oversight while she is away most of the year.',
    detail: 'Michelle runs multiple Boston units but is away most of the year. We handle turnovers, guest issues, small repairs, and day-to-day coordination. She texts bookings when needed; the units stay ready without her being present. Recurring at roughly $125/month.',
  },
  {
    category: 'str',
    title: 'BREC — two new STR buildings',
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
    title: 'Diana — corporate housing (Capital One)',
    result: 'Reliable turnovers for furnished units housing traveling employees.',
    detail: 'Corporate housing runs on tight schedules — employees check out, new ones check in within hours. Diana needed someone who could work on short notice, document the condition of units, and communicate clearly. We’ve been handling these ever since.',
  },
  {
    category: 'homes',
    title: 'Roommates — partial apartment cleaning',
    result: 'Cleaned one bedroom and shared areas only. No pressure for more.',
    detail: 'One roommate wanted regular cleaning; the others didn’t want to pay for rooms they’d handle themselves. We set up a custom plan covering just the shared spaces and one bedroom — fair, straightforward, and exactly what they asked for.',
  },
  {
    category: 'offices',
    title: 'New Horizons — office operations',
    result: 'Cleaning runs on schedule without follow-ups or oversight.',
    detail: 'New Horizons needed a fixed cleaning schedule without having to manage the vendor themselves. We keep the same team, work the same days, and complete each visit without reminders needed. The schedule holds, and they haven’t had to redirect us. Six visits per week at $30 each.',
  },
  {
    category: 'offices',
    title: 'Dr. Jeffrey E. Silver — clinic',
    result: 'Same team, same routine. No disruption to staff or patients.',
    detail: 'This clinic required recurring cleaning that would not interrupt staff or patients. We maintain the same team, follow set routines, and work around their schedule so the space meets the same standard each visit without added coordination. Three visits per week at $50 each.',
  },
  {
    category: 'other',
    title: 'Five Guys — post-construction',
    result: 'Restaurant opened on time after full construction cleanup.',
    detail: 'After construction, the space needed a full cleanup before it could open for business. We cleared floors, equipment surfaces, and construction debris on a tight timeline and handed it back ready to open on schedule.',
  },
  {
    category: 'other',
    title: 'Post-construction deep clean',
    result: 'Construction dust gone. The space was move-in ready the same week.',
    detail: 'After a significant renovation, the unit had drywall dust in every corner, adhesive residue on floors, and debris in the HVAC vents. We handled the full post-construction detail — surfaces, fixtures, floors — and the client moved in three days later.',
  },
]

const categoryButtons: { label: string; value: Category }[] = [
  { label: 'STR',      value: 'str' },
  { label: 'Property', value: 'property' },
  { label: 'Offices',  value: 'offices' },
  { label: 'Homes',    value: 'homes' },
  { label: 'Other',    value: 'other' },
]

const categoryLabel = (cat: Category): string =>
  categoryButtons.find((b) => b.value === cat)?.label ?? cat

const testimonialHashToCategory: Record<string, Category> = {
  '#testimonials-str': 'str',
  '#testimonials-property': 'property',
  '#testimonials-offices': 'offices',
  '#testimonials-homes': 'homes',
  '#testimonials-other': 'other',
}

export default function Testimonials(): JSX.Element {
  const [openCategory, setOpenCategory] = useState<Category | null>('str')

  useEffect(() => {
    const hash = window.location.hash
    const fromHash = testimonialHashToCategory[hash] ?? null
    if (fromHash) {
      setOpenCategory(fromHash)
      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'auto' })
    }

    const handleHashChange = (): void => {
      const cat = testimonialHashToCategory[window.location.hash] ?? null
      if (cat) {
        setOpenCategory(cat)
        document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const filteredCases = openCategory ? cases.filter((c) => c.category === openCategory) : []

  return (
    <section
      id="testimonials"
      className="grain py-14 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, var(--color-linen-deep), var(--color-linen))',
        borderTop: '1px solid var(--color-light-gray)',
        scrollMarginTop: '56px',
      }}
    >
      {/* no token: intentional — 1.5% opacity falls below all stops */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      <div className="max-w-5xl mx-auto relative">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-px flex-shrink-0" style={{ height: '32px', background: 'var(--color-brand-gold)' }} />
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'var(--color-brand-gold)',
              textTransform: 'uppercase',
            }}
          >
            Client Work
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl text-navy mb-3 leading-snug">
          Real clients, real situations.
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--color-warm-gray-dark)', maxWidth: '680px', lineHeight: 1.6 }}>
          Pick your type of space below to see how we&apos;ve handled real work there. Every example is a real client — scope, result, and pricing where relevant.
        </p>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryButtons.map((btn) => {
            const isOpen = openCategory === btn.value
            return (
              <button
                key={btn.value}
                type="button"
                onClick={() => setOpenCategory(toggleCategory(openCategory, btn.value))}
                className="text-xs px-4 py-2 transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-syne)',
                  background: isOpen ? 'var(--color-navy)' : 'white',
                  color: isOpen ? 'white' : 'var(--color-warm-gray)',
                  border: isOpen ? '1px solid var(--color-navy)' : '1px solid var(--color-light-gray)',
                  letterSpacing: '0.06em',
                }}
              >
                {btn.label}
              </button>
            )
          })}
        </div>

        {/* Accordion panel */}
        {openCategory && filteredCases.length > 0 && (
          <div
            style={{
              background: 'var(--color-white-40)',
              borderTop: '1px solid var(--color-light-gray)',
            }}
          >
            {filteredCases.map((c, i) => (
              <div
                key={c.title}
                className="grid gap-4 px-5 py-4"
                style={{
                  gridTemplateColumns: '1fr 100px',
                  alignItems: 'start',
                  borderBottom: i < filteredCases.length - 1 ? '1px solid var(--color-light-gray)' : 'none',
                }}
              >
                <div>
                  <p
                    className="mb-1.5 leading-snug"
                    style={{
                      fontFamily: 'var(--font-ibm-plex-sans)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--color-navy)',
                    }}
                  >
                    {c.result}
                  </p>
                  <p
                    className="leading-relaxed mb-2"
                    style={{ fontSize: '13.5px', color: 'var(--color-warm-gray-dark)', lineHeight: 1.55 }}
                  >
                    {c.detail}
                  </p>
                  <p
                    style={{ fontSize: '11.5px', color: 'var(--color-warm-gray-light)' }}
                  >
                    {c.title}
                  </p>
                </div>
                <div className="flex justify-end pt-1">
                  <span
                    className="text-xs px-2.5 py-1 inline-block"
                    style={{
                      color: 'var(--color-brand-gold)',
                      border: '1px solid var(--color-brand-gold)',
                      fontFamily: 'var(--font-syne)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {categoryLabel(c.category)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty-state hint when nothing is open */}
        {!openCategory && (
          <p
            className="text-xs mt-2"
            style={{
              fontFamily: 'var(--font-syne)',
              letterSpacing: '0.12em',
              color: 'var(--color-navy-30)',
              textTransform: 'uppercase',
            }}
          >
            &#8595; Click a category to expand
          </p>
        )}
      </div>
    </section>
  )
}
