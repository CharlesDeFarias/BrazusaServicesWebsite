'use client'

import { type JSX, useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/clean/Footer'
import QuoteDrawer from '@/components/clean/QuoteDrawer'
import ScrollToTop from '@/components/clean/ScrollToTop'

const stats = [
  { value: '100+ Units', subtitle: 'Cleaned daily across Boston multifamily buildings' },
  { value: 'Since 1994', subtitle: 'Family-run, serving Greater Boston for three decades' },
  { value: 'Bilingual Crews', subtitle: 'English & Portuguese, with translation always available' },
]

const services = [
  {
    name: 'Lobbies, hallways & stairwells',
    desc: 'Scheduled cleaning of every shared space, on a routine your residents can see and feel.',
  },
  {
    name: 'Elevators & touchpoints',
    desc: 'Cabs, rails, door handles, mailrooms, and intercom panels kept clean on every visit.',
  },
  {
    name: 'Trash & recycling rooms',
    desc: 'The rooms everyone notices when they slip. Kept in order, with overflow flagged early.',
  },
  {
    name: 'Laundry & amenity spaces',
    desc: 'Laundry rooms, gyms, roof decks, and community rooms cleaned on their own schedule.',
  },
  {
    name: 'Turnover & move-out cleans',
    desc: 'Unit turnovers between owners or tenants, documented and confirmed when done.',
  },
  {
    name: 'Eyes on the building',
    desc: 'Burned-out lights, leaks, damage, and dumping reported with photos the same day.',
  },
]

const reasons = [
  {
    n: '01',
    title: 'We are already in your neighborhood every morning',
    body: 'Our crews clean 100+ units daily across Boston, including buildings in Beacon Hill, Back Bay, Fenway, South Boston, and Roxbury. A condo building on the route gets the same daily reliability without paying for a dedicated crew.',
  },
  {
    n: '02',
    title: 'Work confirmed, issues flagged',
    body: 'Every visit is confirmed through your preferred channel. When something is off in the building, you hear about it with a photo and context, before a resident emails the board about it.',
  },
  {
    n: '03',
    title: 'One contact who actually answers',
    body: 'No ticket queues. Boards and managers get a direct line to the person who runs operations, in English or Portuguese, and requests are handled the same day they come in.',
  },
  {
    n: '04',
    title: 'A real company, sized to care',
    body: 'Brazusa Cleaning is a Massachusetts corporation, family-run and fully insured. Large enough to hold a daily standard across a whole portfolio, small enough that your building is never an account number.',
  },
]

const areas = [
  'Beacon Hill', 'Back Bay', 'Fenway', 'South Boston', 'Dorchester',
  'Roxbury', 'Somerville', 'Dedham', 'Greater Boston',
]

const steps = [
  {
    n: '1',
    title: 'Walkthrough',
    body: 'We walk the building with you or your manager and note what the current service is missing.',
  },
  {
    n: '2',
    title: 'Proposal within the week',
    body: 'A clear scope and price per visit. No vague "janitorial services" line items.',
  },
  {
    n: '3',
    title: 'Trial period, no long contract',
    body: 'Start with a trial month. If the building does not look better, you owe us nothing further.',
  },
]

export default function CondosPage(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <main>
      {/* Hero (navy) */}
      <section className="grain bg-navy text-white overflow-hidden">
        <div className="mx-auto" style={{ maxWidth: '960px', padding: '40px 24px 56px' }}>
          <div
            className="inline-flex mb-10"
            style={{ background: 'var(--color-white-90)', overflow: 'hidden', lineHeight: 0 }}
          >
            <Image
              src="/brand/logo.jpg"
              alt="Brazusa Cleaning"
              width={160}
              height={55}
              className="h-10 w-auto object-contain"
              style={{ display: 'block' }}
              priority
            />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'var(--color-white-30)' }} />
            <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-white-40)' }}>
              Condo Associations &middot; Property Managers &middot; Greater Boston
            </span>
          </div>

          <h1
            className="leading-none mb-6"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.875rem, 4vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
              maxWidth: '94%',
            }}
          >
            Common-area cleaning your board stops having to think about.
          </h1>

          <div className="mb-6" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />

          <p className="mb-8" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-white-60)', maxWidth: '640px' }}>
            Our crews are already inside Boston multifamily buildings every single morning,
            cleaning common areas and turning over 100+ units daily for a national rental
            operator. We bring that same daily standard to condo associations and managed
            buildings: work completed, confirmed, and problems flagged before residents notice them.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-sm font-semibold px-8 py-4 min-h-[52px] transition-all duration-200 hover:opacity-90 text-navy cursor-pointer"
              style={{ background: 'var(--color-brand-gold)' }}
            >
              Request a walkthrough
            </button>
            <a
              href="tel:7816867189"
              className="text-sm font-semibold px-8 py-4 min-h-[52px] flex items-center justify-center transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid var(--color-white-25)', color: 'var(--color-white-90)' }}
            >
              Call or text 781-686-7189
            </a>
          </div>
        </div>
      </section>

      {/* Trust stats (navy, bordered) */}
      <section className="grain bg-navy" style={{ borderTop: '1px solid var(--color-white-10)', padding: '28px 24px' }}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3" style={{ maxWidth: '960px', gap: '36px' }}>
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center text-center">
              <p
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--color-brand-gold)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {stat.value}
              </p>
              <div style={{ width: '24px', height: '1px', background: 'var(--color-white-15)', marginBottom: '8px' }} />
              <p className="text-xs" style={{ color: 'var(--color-white-40)', maxWidth: '240px', lineHeight: 1.5 }}>
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What we handle (off-white) */}
      <section className="bg-off-white" style={{ padding: '64px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '960px' }}>
          <h2
            className="mb-3"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              letterSpacing: '-0.01em',
            }}
          >
            What we handle in a condo building
          </h2>
          <div className="mb-10" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '28px' }}>
            {services.map((s) => (
              <div key={s.name} style={{ borderTop: '1px solid var(--color-navy-15)', paddingTop: '16px' }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>
                  {s.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-warm-gray-darker)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why boards switch (navy) */}
      <section className="grain bg-navy text-white" style={{ padding: '64px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '960px' }}>
          <h2
            className="mb-3"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            Why boards and managers switch to us
          </h2>
          <div className="mb-10" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '36px' }}>
            {reasons.map((r) => (
              <div key={r.n}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-xs" style={{ color: 'var(--color-brand-gold)', fontWeight: 600 }}>{r.n}</span>
                  <h3 className="text-base font-semibold">{r.title}</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-white-60)', lineHeight: 1.65 }}>
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area strip (linen) */}
      <section style={{ background: 'var(--color-linen)', padding: '28px 24px' }}>
        <div className="mx-auto flex flex-wrap items-center gap-x-6 gap-y-2" style={{ maxWidth: '960px' }}>
          <span className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-warm-gray-dark)' }}>
            Where we work
          </span>
          {areas.map((a) => (
            <span key={a} className="text-sm" style={{ color: 'var(--color-navy)' }}>{a}</span>
          ))}
        </div>
      </section>

      {/* How it works (off-white) */}
      <section className="bg-off-white" style={{ padding: '64px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '960px' }}>
          <h2
            className="mb-3"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              letterSpacing: '-0.01em',
            }}
          >
            How it starts
          </h2>
          <div className="mb-10" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '28px' }}>
            {steps.map((s) => (
              <div key={s.n} style={{ borderTop: '1px solid var(--color-navy-15)', paddingTop: '16px' }}>
                <p
                  className="mb-2"
                  style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-gold)' }}
                >
                  {s.n}
                </p>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-warm-gray-darker)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA (navy) */}
      <section className="grain bg-navy text-white" style={{ padding: '64px 24px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '640px' }}>
          <p className="text-xs uppercase tracking-[0.22em] mb-4" style={{ color: 'var(--color-white-40)' }}>
            Met us at the New England Condominium Expo?
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.5rem, 3vw, 2.125rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            Tell us about your building. We&apos;ll take it from there.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-white-60)', lineHeight: 1.65 }}>
            Leave your name and the best way to reach you. You&apos;ll hear back from a real
            person, usually the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-sm font-semibold px-8 py-4 min-h-[52px] transition-all duration-200 hover:opacity-90 text-navy cursor-pointer"
              style={{ background: 'var(--color-brand-gold)' }}
            >
              Request a walkthrough
            </button>
            <a
              href="tel:7816867189"
              className="text-sm font-semibold px-8 py-4 min-h-[52px] flex items-center justify-center transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid var(--color-white-25)', color: 'var(--color-white-90)' }}
            >
              781-686-7189
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <QuoteDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        defaultSpaceType="property"
      />
      <ScrollToTop drawerOpen={drawerOpen} />
    </main>
  )
}
