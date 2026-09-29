'use client'

import { type JSX, useState } from 'react'
import Footer from '@/components/clean/Footer'
import QuoteDrawer from '@/components/clean/QuoteDrawer'
import ScrollToTop from '@/components/clean/ScrollToTop'

/* ---------- content ---------- */

const dayLoop = [
  {
    time: '7:00 AM',
    title: 'Routes confirmed',
    body: 'Every crew gets its building list for the day, confirmed before anyone is on the road. Your building is a fixed stop, not a maybe.',
  },
  {
    time: 'Morning',
    title: 'Common areas done early',
    body: 'Lobbies, hallways, elevators, and trash rooms are cleaned before the building gets busy, on the same route our crews already run through your neighborhood.',
  },
  {
    time: 'On site',
    title: 'Problems get photographed',
    body: 'A burned-out light, a leak, dumping in the trash room. Whatever is off gets a photo and a note the moment a cleaner sees it, not whenever someone remembers.',
  },
  {
    time: 'Same day',
    title: 'Completion confirmed in writing',
    body: 'Your manager or board contact gets written confirmation the work happened, plus anything flagged. No calling around to check if the cleaners came.',
  },
]

const services = [
  { n: '01', name: 'Lobbies, hallways & stairwells', desc: 'Every shared floor, on a fixed schedule residents can feel.' },
  { n: '02', name: 'Elevators & touchpoints', desc: 'Cabs, rails, handles, mailrooms, intercom panels. Every visit.' },
  { n: '03', name: 'Trash & recycling rooms', desc: 'The rooms everyone notices when they slip. Overflow flagged early.' },
  { n: '04', name: 'Laundry & amenity spaces', desc: 'Gyms, roof decks, community rooms, on their own cadence.' },
  { n: '05', name: 'Turnovers & move-outs', desc: 'Unit resets between owners or tenants, documented and confirmed.' },
  { n: '06', name: 'Eyes on the building', desc: 'Lights, leaks, damage, dumping. Reported with photos, same day.' },
]

const cases = [
  {
    client: 'National short-term-rental operator',
    result: '100+ Boston units, cleaned daily, for years.',
    detail: 'Turnover coordination across multiple buildings with schedules that change by the hour. Same-day confirmations, consistent checklists, a direct line. Nothing falls through between guests.',
  },
  {
    client: 'Corporate housing (Fortune 500 tenants)',
    result: 'Short-notice turnovers with documented unit condition.',
    detail: 'Furnished units housing traveling employees. Check-out and check-in within hours of each other, so every clean is on the clock and every unit condition is documented in writing.',
  },
  {
    client: 'Office operations client',
    result: 'Cleaning runs on schedule with zero follow-ups.',
    detail: 'Same team, same days, service completed without reminders. The client has never had to redirect the work. That is the standard your property manager inherits.',
  },
]

const areas = ['Beacon Hill', 'Back Bay', 'Fenway', 'South Boston', 'Dorchester', 'Roxbury', 'Somerville', 'Dedham']

const steps = [
  { n: '1', title: 'Walkthrough this week', body: 'We walk the building with you or your manager and write down exactly what the current vendor is missing.' },
  { n: '2', title: 'Per-visit proposal', body: 'A clear scope with a price per visit. Itemized, so the board can compare it line by line against what you pay now.' },
  { n: '3', title: 'Trial month', body: 'No long contract to approve. Run us for a month; if the building does not look better, walking away costs nothing.' },
]

/* ---------- shared bits ---------- */

function Wordmark({ inverted = false }: { inverted?: boolean }): JSX.Element {
  return (
    <span className="inline-flex items-baseline gap-2 select-none" style={{ lineHeight: 1 }}>
      <span
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: '18px',
          letterSpacing: '0.06em',
          color: inverted ? 'var(--color-navy)' : '#FFFFFF',
        }}
      >
        BRAZUSA
      </span>
      <span
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: '11px',
          letterSpacing: '0.32em',
          color: 'var(--color-brand-gold)',
          textTransform: 'uppercase',
        }}
      >
        Cleaning
      </span>
    </span>
  )
}

function SectionLabel({ children }: { children: string }): JSX.Element {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-px flex-shrink-0" style={{ height: '28px', background: 'var(--color-brand-gold)' }} />
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
        {children}
      </span>
    </div>
  )
}

const h2Style = (dark: boolean) => ({
  fontFamily: 'var(--font-ibm-plex-sans)',
  fontSize: 'clamp(1.6rem, 4.5vw, 2.25rem)',
  fontWeight: 700,
  letterSpacing: '-0.015em',
  lineHeight: 1.12,
  color: dark ? '#FFFFFF' : 'var(--color-navy)',
})

/* ---------- page ---------- */

export default function CondosPage(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const goldBtn = (
    <button
      onClick={() => setDrawerOpen(true)}
      className="text-sm font-semibold px-7 py-4 min-h-[52px] transition-all duration-200 hover:opacity-90 text-navy cursor-pointer"
      style={{ background: 'var(--color-brand-gold)', letterSpacing: '0.01em' }}
    >
      Request a proposal
    </button>
  )

  return (
    <main>
      {/* Top bar */}
      <header
        className="bg-navy flex items-center justify-between px-5 sm:px-8"
        style={{ height: '54px', borderBottom: '1px solid var(--color-white-10)' }}
      >
        <Wordmark />
        <a
          href="tel:7816867189"
          className="text-xs sm:text-sm font-medium transition-colors hover:text-white"
          style={{ color: 'var(--color-white-60)', letterSpacing: '0.02em' }}
        >
          781-686-7189
        </a>
      </header>

      {/* Hero */}
      <section className="grain bg-navy text-white overflow-hidden">
        <div className="mx-auto" style={{ maxWidth: '860px', padding: 'clamp(48px, 9vw, 88px) 24px clamp(48px, 8vw, 72px)' }}>
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-px" style={{ background: 'var(--color-white-30)' }} />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-white-40)' }}>
              Condominium &amp; HOA Cleaning &middot; Greater Boston
            </span>
          </div>

          <h1
            className="mb-7"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(2rem, 6.5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.06,
            }}
          >
            Common areas held to a{' '}
            <span style={{ color: 'var(--color-brand-gold)' }}>five&#8209;star&#8209;guest</span>{' '}
            standard.
          </h1>

          <div className="mb-7" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />

          <p className="mb-9" style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.65, color: 'var(--color-white-60)', maxWidth: '600px' }}>
            Brazusa cleans 100+ Boston units every day for a national short&#8209;term&#8209;rental
            operator, work that a paying guest inspects and rates within hours. Your building
            gets those same crews, the same daily discipline, and written proof it happened.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-9">
            {goldBtn}
            <a
              href="tel:7816867189"
              className="text-sm font-semibold px-7 py-4 min-h-[52px] flex items-center justify-center transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid var(--color-white-25)', color: 'var(--color-white-90)' }}
            >
              Call or text 781-686-7189
            </a>
          </div>

          <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--color-white-40)' }}>
            Since 1994 &nbsp;&middot;&nbsp; Fully insured &nbsp;&middot;&nbsp; English &amp; Portuguese
          </p>
        </div>
      </section>

      {/* Numbers band */}
      <section className="grain bg-navy" style={{ borderTop: '1px solid var(--color-white-10)', padding: '30px 24px' }}>
        <div className="mx-auto grid grid-cols-3" style={{ maxWidth: '860px', gap: '16px' }}>
          {[
            { v: '100+', s: 'units cleaned daily' },
            { v: '30 yrs', s: 'serving Greater Boston' },
            { v: '7 days', s: 'a week on the ground' },
          ].map((stat) => (
            <div key={stat.v} className="text-center">
              <p
                style={{
                  fontFamily: 'var(--font-ibm-plex-sans)',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--color-brand-gold)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  marginBottom: '7px',
                }}
              >
                {stat.v}
              </p>
              <p className="text-[11px] sm:text-xs" style={{ color: 'var(--color-white-40)', lineHeight: 1.45 }}>{stat.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The daily loop */}
      <section className="bg-off-white" style={{ padding: 'clamp(52px, 8vw, 76px) 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>How a service day runs</SectionLabel>
          <h2 className="mb-4" style={h2Style(false)}>
            You should never have to ask whether the cleaners came.
          </h2>
          <p className="mb-10 text-sm" style={{ color: 'var(--color-warm-gray-darker)', maxWidth: '560px', lineHeight: 1.65 }}>
            Most building cleaning fails quietly: the vendor skips a day, nobody notices for a
            week, and the board finds out from an angry email. Our day is built so that cannot
            happen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0' }}>
            {dayLoop.map((step) => (
              <div
                key={step.time}
                className="relative"
                style={{
                  borderTop: '1px solid var(--color-navy-15)',
                  padding: '20px 4px 24px',
                }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: 'var(--color-brand-gold)',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.time}
                </p>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-warm-gray-darker)', lineHeight: 1.6, maxWidth: '380px' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="grain bg-navy text-white" style={{ padding: 'clamp(52px, 8vw, 76px) 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>Scope</SectionLabel>
          <h2 className="mb-10" style={h2Style(true)}>
            Everything a condo building needs covered.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '0 40px' }}>
            {services.map((s) => (
              <div key={s.n} className="flex gap-4" style={{ borderTop: '1px solid var(--color-white-10)', padding: '18px 0' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-brand-gold)',
                    letterSpacing: '0.1em',
                    paddingTop: '3px',
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold mb-1">{s.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-white-50)', lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-8" style={{ color: 'var(--color-white-40)' }}>
            Building-specific tasks (porter work, supply restocking, seasonal jobs) get scoped in
            the walkthrough, priced per visit, and written into the proposal.
          </p>
        </div>
      </section>

      {/* Proof */}
      <section
        className="grain"
        style={{
          background: 'linear-gradient(to bottom, var(--color-linen-deep), var(--color-linen))',
          padding: 'clamp(52px, 8vw, 76px) 24px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>Track record</SectionLabel>
          <h2 className="mb-4" style={h2Style(false)}>
            Judged daily in the least forgiving market there is.
          </h2>
          <p className="mb-10 text-sm" style={{ color: 'var(--color-warm-gray-dark)', maxWidth: '580px', lineHeight: 1.65 }}>
            Short-term rentals are the hardest cleaning discipline in the industry: every clean
            is inspected by a paying guest the same day, and every miss becomes a public review.
            A company that survives years of that does not struggle with a lobby.
          </p>

          <div style={{ background: 'var(--color-white-40)', borderTop: '1px solid var(--color-light-gray)' }}>
            {cases.map((c, i) => (
              <div
                key={c.client}
                className="px-5 py-5"
                style={{ borderBottom: i < cases.length - 1 ? '1px solid var(--color-light-gray)' : 'none' }}
              >
                <p className="mb-1.5" style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '16.5px', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.3 }}>
                  {c.result}
                </p>
                <p className="mb-2 text-sm" style={{ color: 'var(--color-warm-gray-dark)', lineHeight: 1.6 }}>{c.detail}</p>
                <p style={{ fontSize: '11.5px', color: 'var(--color-warm-gray-light)' }}>{c.client}</p>
              </div>
            ))}
          </div>

          <a
            href="https://maps.app.goo.gl/gvJ4MmpuShUocGB3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-navy)' }}
          >
            <span style={{ fontFamily: 'var(--font-syne)', letterSpacing: '0.04em' }}>Read our reviews on Google</span>
            <span aria-hidden style={{ color: 'var(--color-brand-gold)' }}>&#8599;</span>
          </a>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-off-white" style={{ padding: '26px 24px', borderTop: '1px solid var(--color-light-gray)' }}>
        <div className="mx-auto flex flex-wrap items-baseline gap-x-5 gap-y-1.5" style={{ maxWidth: '860px' }}>
          <span className="text-[11px] uppercase tracking-[0.18em] mr-1" style={{ color: 'var(--color-warm-gray)', fontFamily: 'var(--font-syne)', fontWeight: 600 }}>
            On our routes now
          </span>
          {areas.map((a) => (
            <span key={a} className="text-sm" style={{ color: 'var(--color-navy)' }}>{a}</span>
          ))}
          <span className="text-sm" style={{ color: 'var(--color-warm-gray)' }}>+ Greater Boston</span>
        </div>
      </section>

      {/* How it starts */}
      <section className="bg-off-white" style={{ padding: 'clamp(48px, 8vw, 72px) 24px', borderTop: '1px solid var(--color-light-gray)' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>Getting started</SectionLabel>
          <h2 className="mb-10" style={h2Style(false)}>
            Three steps. No committee-meeting marathon.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '28px' }}>
            {steps.map((s) => (
              <div key={s.n} style={{ borderTop: '1px solid var(--color-navy-15)', paddingTop: '16px' }}>
                <p className="mb-2" style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 700, color: 'var(--color-brand-gold)' }}>
                  {s.n}
                </p>
                <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-warm-gray-darker)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="grain bg-navy text-white" style={{ padding: 'clamp(56px, 9vw, 84px) 24px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '600px' }}>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--color-brand-gold)', fontFamily: 'var(--font-syne)', fontWeight: 600 }}>
            Met us at the New England Condominium Expo?
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.6rem, 4.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              lineHeight: 1.12,
            }}
          >
            Tell us about your building. We&apos;ll take it from there.
          </h2>
          <p className="text-sm mb-9" style={{ color: 'var(--color-white-60)', lineHeight: 1.65 }}>
            Name and a way to reach you is enough. A real person answers, usually the same day,
            in English or Portuguese.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {goldBtn}
            <a
              href="tel:7816867189"
              className="text-sm font-semibold px-7 py-4 min-h-[52px] flex items-center justify-center transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid var(--color-white-25)', color: 'var(--color-white-90)' }}
            >
              781-686-7189
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <QuoteDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} defaultSpaceType="property" />
      <ScrollToTop drawerOpen={drawerOpen} />
    </main>
  )
}
