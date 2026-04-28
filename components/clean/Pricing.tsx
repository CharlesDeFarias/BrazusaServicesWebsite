'use client'

import type { JSX } from 'react'

interface PricingProps {
  onQuoteClick: () => void
}

type PricingFilter = 'str' | 'property' | 'offices' | 'homes' | 'other'

const pricingFilters: { label: string; value: PricingFilter }[] = [
  { label: 'STR', value: 'str' },
  { label: 'Property', value: 'property' },
  { label: 'Offices', value: 'offices' },
  { label: 'Apartments', value: 'homes' },
  { label: 'Other', value: 'other' },
]

const pricingFilterHashes: Record<PricingFilter, string> = {
  str: '#testimonials-str',
  property: '#testimonials-property',
  offices: '#testimonials-offices',
  homes: '#testimonials-homes',
  other: '#testimonials-other',
}

const factors = [
  'Size and layout',
  'Level of cleaning needed',
  'Service type',
  'Frequency',
  'Accessibility and timing',
  'Extra responsibilities beyond cleaning',
]

const customExamples = [
  "Cleaning only one roommate's half of an apartment",
  'Just kitchens and bathrooms',
  "Tasks you don't want to deal with",
  'One-time targeted deep cleans',
]

const savingsWays = [
  { title: 'Referrals', desc: 'Send us a client. When the work fits, everyone benefits.' },
  { title: 'Schedule with neighbors', desc: 'Nearby same-day work reduces travel and makes pricing easier to optimize.' },
  { title: 'Flexible timing', desc: 'More scheduling flexibility gives us room to structure the work more efficiently.' },
  { title: 'Recurring service', desc: 'Consistent recurring work is easier to maintain and usually easier to price well.' },
  { title: 'Help us grow locally', desc: 'Introductions inside a building or neighborhood can create more efficient service routes.' },
]

export default function Pricing({ onQuoteClick }: PricingProps): JSX.Element {
  return (
    <section
      id="pricing"
      className="py-14 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, var(--color-linen), var(--color-off-white))',
        borderTop: '1px solid var(--color-light-gray)',
        scrollMarginTop: '56px',
      }}
    >
      {/* no token: intentional - 1.5% opacity falls below all stops */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(11,29,46,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.015) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 mb-8">
          <div>
            <p
              className="text-xs uppercase mb-4 text-warm-gray-light"
              style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
            >
              Pricing approach
            </p>
            <h2
              className="text-navy leading-none mb-4"
              style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 700, fontStyle: 'normal' }}
            >
              Real examples, real clients.
            </h2>
            <p className="text-sm leading-relaxed mb-4 max-w-2xl text-warm-gray-dark">
              We do not price from a generic chart because the real work rarely fits one. A straightforward cleaning visit is one kind of
              scope. Ongoing operational support like inventory, linens, coordination, checklists, and reporting is another. We price
              around what the work actually requires, then walk you through it clearly before anything starts.
            </p>
            <p className="text-sm leading-relaxed mb-5 max-w-2xl text-warm-gray">
              If you want to see the kinds of situations we already handle, jump to the testimonial examples below. If your setup is more
              custom, we can still scope it and give you a clear quote built around your exact needs.
            </p>

            <div className="flex flex-wrap gap-2">
              {pricingFilters.map((pricingFilter) => (
                <a
                  key={pricingFilter.value}
                  href={pricingFilterHashes[pricingFilter.value]}
                    className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 text-navy"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      background: 'transparent',
                      border: '1px solid var(--color-light-gray)',
                    }}
                >
                  {pricingFilter.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-xs uppercase mb-4 text-warm-gray-light"
              style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}
            >
              What affects your quote
            </p>
            <ul className="space-y-2.5 mb-5">
              {factors.map((factor) => (
                <li key={factor} className="flex items-center gap-2.5 text-sm text-warm-gray-darker">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-navy-30)' }} />
                  {factor}
                </li>
              ))}
            </ul>
            <div className="rounded-xl p-4" style={{ border: '1px solid var(--color-light-gray)', background: 'rgba(255,255,255,0.82)' /* no token: intentional — between white-70 and white-90 */ }}>
              <p className="text-sm font-medium text-navy mb-2">How we build a custom quote</p>
              <p className="text-xs leading-relaxed mb-3 text-warm-gray">
                Basic cleaning, deeper resets, and operational support are scoped differently because they take different levels of time,
                coordination, and responsibility.
              </p>
              <p className="text-xs leading-relaxed mb-4 text-warm-gray">
                Once we understand the space, expectations, and handoff details, we can recommend the cleanest scope and price it
                accordingly.
              </p>
              <button
                type="button"
                onClick={onQuoteClick}
                className="w-full text-xs font-medium px-4 py-2.5 min-h-[40px] text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
                style={{ background: 'var(--color-navy)', borderLeft: '2px solid var(--color-brand-gold)' }}
              >
                Request a custom quote
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-3">
          <div className="rounded-xl p-5" style={{ border: '1px solid var(--color-light-gray)' }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-medium text-navy leading-snug">Custom &amp; partial cleaning</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: 'var(--color-off-white)',
                  color: 'var(--color-brand-gold)',
                  border: '1px solid var(--color-linen-dark)',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                Flexible scope
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4 text-warm-gray">
              We can quote only the parts of the job that actually need doing.
            </p>
            <div className="h-px w-6 mb-4" style={{ background: 'var(--color-brand-gold)' }} />
            <p className="text-sm font-medium text-navy mb-3">Cleaning does not have to be all-or-nothing:</p>
            <ul className="space-y-2">
              {customExamples.map((customExample) => (
                <li key={customExample} className="flex items-start gap-2.5 text-sm text-warm-gray-darker">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-navy-40)' }}>
                    &rarr;
                  </span>
                  {customExample}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-5" style={{ border: '1px solid var(--color-light-gray)' }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-medium text-navy leading-snug">Ways to lower your price</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: 'var(--color-off-white)',
                  color: 'var(--color-brand-gold)',
                  border: '1px solid var(--color-linen-dark)',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                Efficiency wins
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4 text-warm-gray">
              If the work is easier to run well, we can usually structure it more efficiently.
            </p>
            <div className="h-px w-6 mb-4" style={{ background: 'var(--color-brand-gold)' }} />
            <p className="text-sm font-medium text-navy mb-3">Help us operate efficiently and we pass that on where we can:</p>
            <ul className="space-y-3">
              {savingsWays.map((savingsWay) => (
                <li key={savingsWay.title} className="flex items-start gap-2.5 text-sm text-warm-gray-darker">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-navy-40)' }}>
                    &rarr;
                  </span>
                  <span>
                    <strong className="text-navy font-medium">{savingsWay.title}</strong>: {savingsWay.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
