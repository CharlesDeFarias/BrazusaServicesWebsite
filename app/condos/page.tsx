'use client'

import { type JSX, useState } from 'react'
import QuoteDrawer from '@/components/clean/QuoteDrawer'
import ScrollToTop from '@/components/clean/ScrollToTop'

const GOOGLE_REVIEWS = 'https://maps.app.goo.gl/gvJ4MmpuShUocGB3A'

/* ---------- content ---------- */

const dayLoop = [
  {
    time: '7:00 AM',
    title: 'Routes confirmed',
    body: 'Every crew gets its building list before anyone is on the road. Your building is a fixed stop, not a maybe.',
  },
  {
    time: 'Morning',
    title: 'Common areas done early',
    body: 'Lobbies, hallways, elevators, and trash rooms cleaned before the building gets busy.',
  },
  {
    time: 'On site',
    title: 'Problems get photographed',
    body: 'A burned-out light, a leak, dumping. Whatever is off gets a photo and a note the moment a cleaner sees it.',
  },
  {
    time: 'Same day',
    title: 'Confirmed in writing',
    body: 'Written confirmation the work happened, with photos or video whenever you want them.',
  },
]

const services = [
  { n: '01', name: 'Lobbies, hallways & stairwells', desc: 'Every shared floor, on a fixed schedule residents can feel.' },
  { n: '02', name: 'Elevators & touchpoints', desc: 'Cabs, rails, handles, mailrooms. Every visit.' },
  { n: '03', name: 'Trash & recycling rooms', desc: 'Kept in order, overflow flagged early.' },
  { n: '04', name: 'Laundry & amenity spaces', desc: 'Gyms, roof decks, community rooms, on their own cadence.' },
  { n: '05', name: 'Turnovers & move-outs', desc: 'Unit resets between owners or tenants, documented.' },
  { n: '06', name: 'In-unit residential cleaning', desc: 'Your residents can hire us directly for their own homes.' },
]

const howWeWork = [
  {
    title: 'A workforce other companies can’t reach',
    body: 'We recruit from Greater Boston’s Brazilian cleaning community, the strongest crews in the market, and we remove their barriers: we handle the apps, the English, the scheduling. You get top crews at honest prices.',
  },
  {
    title: 'We fit your systems',
    body: 'Breezeway today; Yardi, AppFolio, or whatever your manager runs tomorrow. Portals, checklists, reports: we adapt to your requirements, and we use AI daily to tailor scheduling, reporting, and communication to each client.',
  },
  {
    title: 'Three languages, zero barriers',
    body: 'English, Portuguese, and Spanish natively, including with your building’s staff. With AI translation we can work with anyone, in any language.',
  },
]

const cases = [
  {
    client: 'National short-term-rental operator',
    result: '100+ Boston units, cleaned daily, for years.',
    detail: 'Schedules that change by the hour, same-day confirmations, consistent checklists. Nothing falls through between guests.',
  },
  {
    client: 'Corporate housing (Fortune 500 tenants)',
    result: 'Short-notice turnovers with documented unit condition.',
    detail: 'Check-out and check-in within hours of each other, every clean on the clock, every unit condition in writing.',
  },
  {
    client: 'Office operations client',
    result: 'Cleaning runs on schedule with zero follow-ups.',
    detail: 'Same team, same days, no reminders needed. That is the standard your property manager inherits.',
  },
]

const areas = ['Beacon Hill', 'Back Bay', 'Fenway', 'South Boston', 'Dorchester', 'Roxbury', 'Somerville', 'Dedham']

const steps = [
  { n: '1', title: 'Walkthrough this week', body: 'We walk the building with you or your manager and note what the current vendor is missing.' },
  { n: '2', title: 'Per-visit proposal', body: 'Itemized price per visit, so the board can compare line by line. Insurance certificates provided before day one.' },
  { n: '3', title: 'Trial month', body: 'No long contract. If the building does not look better, walking away costs nothing.' },
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
          fontSize: '12px',
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
  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
  fontWeight: 700,
  letterSpacing: '-0.015em',
  lineHeight: 1.1,
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
      <section className="grain bg-navy text-white overflow-hidden relative">
        {/* Hairline skyline motif, desktop only */}
        <svg
          className="hidden lg:block absolute pointer-events-none"
          style={{ right: '-40px', bottom: '0', height: '88%', opacity: 0.5 }}
          viewBox="0 0 340 420"
          fill="none"
          aria-hidden
        >
          <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
            <rect x="30" y="140" width="80" height="280" />
            <rect x="130" y="60" width="90" height="360" />
            <rect x="240" y="180" width="70" height="240" />
            {Array.from({ length: 9 }).map((_, r) => (
              <line key={`a${r}`} x1="38" y1={158 + r * 28} x2="102" y2={158 + r * 28} />
            ))}
            {Array.from({ length: 12 }).map((_, r) => (
              <line key={`b${r}`} x1="138" y1={80 + r * 28} x2="212" y2={80 + r * 28} />
            ))}
            {Array.from({ length: 8 }).map((_, r) => (
              <line key={`c${r}`} x1="248" y1={198 + r * 28} x2="302" y2={198 + r * 28} />
            ))}
          </g>
          <line x1="130" y1="60" x2="220" y2="60" stroke="var(--color-brand-gold)" strokeWidth="1.5" opacity="0.8" />
        </svg>
        <div className="mx-auto relative" style={{ maxWidth: '860px', padding: 'clamp(44px, 8vw, 80px) 24px clamp(44px, 7vw, 64px)' }}>
          <div className="mb-6">
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] px-2.5 py-1"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 600,
                color: 'var(--color-brand-gold)',
                border: '1px solid var(--color-gold-60, rgba(196,154,68,0.6))',
              }}
            >
              NE Condominium Expo 2026
            </span>
          </div>

          {/* The category IS the headline (Vitor: the one line they need) */}
          <h1
            className="mb-4"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(2.1rem, 7vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.04,
            }}
          >
            Condo &amp; HOA cleaning,
            <br />
            Greater Boston.
          </h1>

          <p
            className="mb-7"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.05rem, 3vw, 1.4rem)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              color: 'var(--color-brand-gold)',
            }}
          >
            Common areas held to a five&#8209;star&#8209;guest standard.
          </p>

          <p className="mb-8" style={{ fontSize: 'clamp(15px, 2vw, 16.5px)', lineHeight: 1.6, color: 'var(--color-white-60)', maxWidth: '560px' }}>
            Our crews clean 100+ Boston units every day for a national rental operator, where
            paying guests rate every clean within hours. Your building gets those same crews
            and written proof it happened.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
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
            Since 1994 &nbsp;&middot;&nbsp; Fully insured &nbsp;&middot;&nbsp; English &middot; Portugu&ecirc;s &middot; Espa&ntilde;ol
          </p>
        </div>
      </section>

      {/* Numbers band */}
      <section className="grain bg-navy" style={{ borderTop: '1px solid var(--color-white-10)', padding: '30px 24px' }}>
        <div className="mx-auto grid grid-cols-3" style={{ maxWidth: '860px', gap: '16px' }}>
          {[
            { v: '100+', s: 'units cleaned daily' },
            { v: '30+ years', s: 'serving Greater Boston' },
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
      <section className="bg-off-white" style={{ padding: 'clamp(48px, 7vw, 68px) 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>How a service day runs</SectionLabel>
          <h2 className="mb-4" style={h2Style(false)}>
            You&apos;ll never have to ask if we came.
          </h2>
          <p className="mb-10 text-sm sm:text-[15px]" style={{ color: 'var(--color-warm-gray-darker)', maxWidth: '680px', lineHeight: 1.65 }}>
            Most building cleaning fails quietly: a skipped day nobody notices until a resident
            complains. Our day is built so that cannot happen.
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

      {/* Scope */}
      <section className="grain bg-navy text-white" style={{ padding: 'clamp(48px, 7vw, 68px) 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>What we cover</SectionLabel>
          <h2 className="mb-10" style={h2Style(true)}>
            The whole building. Units too.
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
          <p className="text-sm mt-8" style={{ color: 'var(--color-white-50)', maxWidth: '640px', lineHeight: 1.6 }}>
            In-unit cleaning for residents is an amenity your board offers at zero cost. And the
            more your building works with us, directly or through residents, the better your
            pricing gets.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-off-white" style={{ padding: 'clamp(48px, 7vw, 68px) 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mb-10" style={h2Style(false)}>
            Better crews, better tech, no barriers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '28px' }}>
            {howWeWork.map((item) => (
              <div key={item.title} style={{ borderTop: '2px solid var(--color-brand-gold)', paddingTop: '16px' }}>
                <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-warm-gray-darker)', lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section
        className="grain"
        style={{
          background: 'linear-gradient(to bottom, var(--color-linen-deep), var(--color-linen))',
          padding: 'clamp(48px, 7vw, 68px) 24px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>Track record</SectionLabel>
          <h2 className="mb-4" style={h2Style(false)}>
            Judged daily by paying guests.
          </h2>
          <p className="mb-10 text-sm sm:text-[15px]" style={{ color: 'var(--color-warm-gray-dark)', maxWidth: '620px', lineHeight: 1.65 }}>
            Short-term rentals are the least forgiving market in cleaning: every miss becomes a
            public review. A company that survives years of that does not struggle with a lobby.
          </p>

          <div className="grid grid-cols-1" style={{ gap: '14px' }}>
            {cases.map((c) => (
              <div
                key={c.client}
                className="px-5 py-5"
                style={{
                  background: '#FFFFFF',
                  borderLeft: '2px solid var(--color-brand-gold)',
                  boxShadow: '0 1px 2px rgba(11,29,46,0.06)',
                }}
              >
                <p className="mb-1.5" style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '16.5px', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.3 }}>
                  {c.result}
                </p>
                <p className="mb-2.5 text-sm" style={{ color: 'var(--color-warm-gray-dark)', lineHeight: 1.6 }}>{c.detail}</p>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: 'var(--color-warm-gray)',
                  }}
                >
                  {c.client}
                </p>
              </div>
            ))}
          </div>

          <a
            href={GOOGLE_REVIEWS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-8 text-sm font-semibold px-6 py-3.5 transition-all duration-200 hover:opacity-80"
            style={{ color: 'var(--color-navy)', border: '1px solid var(--color-navy-25)', background: '#FFFFFF' }}
          >
            <span aria-hidden style={{ color: 'var(--color-brand-gold)', fontSize: '15px' }}>&#9733;</span>
            <span style={{ fontFamily: 'var(--font-syne)', letterSpacing: '0.03em' }}>Read our reviews on Google</span>
            <span aria-hidden style={{ color: 'var(--color-brand-gold)' }}>&#8599;</span>
          </a>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="grain bg-navy" style={{ padding: '36px 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <p
            className="text-[11px] uppercase tracking-[0.18em] mb-4"
            style={{ color: 'var(--color-brand-gold)', fontFamily: 'var(--font-syne)', fontWeight: 600 }}
          >
            Crews on the ground every morning in
          </p>
          <div className="flex flex-wrap" style={{ gap: '8px' }}>
            {areas.map((a) => (
              <span
                key={a}
                className="text-sm px-3.5 py-1.5"
                style={{ color: 'var(--color-white-90)', border: '1px solid var(--color-white-15)' }}
              >
                {a}
              </span>
            ))}
            <span className="text-sm px-3.5 py-1.5" style={{ color: 'var(--color-white-40)' }}>
              + Greater Boston
            </span>
          </div>
        </div>
      </section>

      {/* How it starts */}
      <section className="bg-off-white" style={{ padding: 'clamp(48px, 7vw, 68px) 24px' }}>
        <div className="mx-auto" style={{ maxWidth: '860px' }}>
          <SectionLabel>Getting started</SectionLabel>
          <h2 className="mb-10" style={h2Style(false)}>
            Three steps. No long contract.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '28px' }}>
            {steps.map((s) => (
              <div key={s.n} style={{ borderTop: '1px solid var(--color-navy-15)', paddingTop: '16px' }}>
                <p className="mb-2" style={{ fontFamily: 'var(--font-syne)', fontSize: '22px', fontWeight: 700, color: 'var(--color-brand-gold)' }}>
                  {s.n}
                </p>
                <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--color-navy)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-warm-gray-darker)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="grain bg-navy text-white" style={{ padding: 'clamp(52px, 8vw, 76px) 24px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '600px' }}>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--color-brand-gold)', fontFamily: 'var(--font-syne)', fontWeight: 600 }}>
            Met us at the New England Condominium Expo?
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
            }}
          >
            Tell us about your building.
          </h2>
          <p className="text-sm mb-2" style={{ color: 'var(--color-white-60)', lineHeight: 1.65 }}>
            Name and a way to reach you is enough. A real person answers, usually the same day.
          </p>
          <p className="text-sm mb-9" style={{ color: 'var(--color-white-40)', lineHeight: 1.65 }}>
            Falamos portugu&ecirc;s. Hablamos espa&ntilde;ol.
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

      {/* Footer (page-local: no newsletter, no links to unbuilt pages) */}
      <footer className="bg-navy px-6" style={{ borderTop: '1px solid var(--color-white-10)', padding: '36px 24px 44px' }}>
        <div className="mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8" style={{ maxWidth: '860px' }}>
          <div>
            <div className="mb-3"><Wordmark /></div>
            <p className="text-sm mb-1" style={{ color: 'var(--color-white-40)' }}>Greater Boston &amp; surrounding areas</p>
            <a href="tel:7816867189" className="text-sm block transition-colors hover:text-white" style={{ color: 'var(--color-white-40)' }}>
              781-686-7189
            </a>
            <a href="mailto:info@brazusa.com" className="text-sm block transition-colors hover:text-white" style={{ color: 'var(--color-white-40)' }}>
              info@brazusa.com
            </a>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <a
              href={GOOGLE_REVIEWS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'var(--color-white-40)' }}
            >
              Reviews on Google &#8599;
            </a>
            <a href="/" className="text-sm transition-colors hover:text-white" style={{ color: 'var(--color-white-40)' }}>
              Full site &#8599;
            </a>
            <p className="text-xs mt-2" style={{ color: 'var(--color-white-30, rgba(255,255,255,0.3))' }}>
              &copy; {new Date().getFullYear()} Brazusa Cleaning. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <QuoteDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} defaultSpaceType="property" />
      <ScrollToTop drawerOpen={drawerOpen} />
    </main>
  )
}
