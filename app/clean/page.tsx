'use client'

import { type JSX, useState, useRef, useEffect } from 'react'
import StickyNav        from '@/components/StickyNav'
import Hero             from '@/components/clean/Hero'
import TrustStrip       from '@/components/clean/TrustStrip'
import ClientAccordion  from '@/components/clean/ClientAccordion'
import type { ClientItem } from '@/components/clean/ClientAccordion'
import Services         from '@/components/clean/Services'
import Pricing          from '@/components/clean/Pricing'
import Testimonials     from '@/components/clean/Testimonials'
import ServiceArea      from '@/components/clean/ServiceArea'
import About            from '@/components/clean/About'
import QuickContact     from '@/components/clean/QuickContact'
import FinalCTA         from '@/components/clean/FinalCTA'
import Footer           from '@/components/clean/Footer'
import QuoteDrawer      from '@/components/clean/QuoteDrawer'
import ScrollToTop      from '@/components/clean/ScrollToTop'
import MobileCTABar     from '@/components/clean/MobileCTABar'

const clientItems: ClientItem[] = [
  {
    id: 'str',
    n: '01',
    label: 'Short-Term Rentals',
    teaser: 'Fast turnovers, consistent quality, no surprises',
    headline: 'Short-Term Rental Cleaning',
    imageLabel: 'STR unit photo',
    imageSrc: '/images/str.png',
    spaceType: 'str',
    body: (
      <>
        <p>Fast turnovers, consistent quality, no surprises — we build repeatable systems around your units.</p>
        <p>We handle every turnover the same way so you can stop thinking about it. We also help with small operational tasks that make managing your properties easier.</p>
        <p>A missed detail can mean a bad review — and a bad review costs more than a cleaning ever will.</p>
      </>
    ),
  },
  {
    id: 'property',
    n: '02',
    label: 'Property Managers & Buildings',
    teaser: 'Multi-unit coordination, reliability at scale',
    headline: 'Cleaning for Property Managers & Buildings',
    imageLabel: 'Building / property photo',
    imageSrc: '/images/property.png',
    spaceType: 'property',
    body: (
      <>
        <p>Property management requires reliability across multiple units, consistency across different jobs, and professionalism with tenants, staff, and vendors.</p>
        <p>We document, standardize, and communicate clearly — so you don&apos;t have to manage us. We manage ourselves.</p>
        <p>Whether it&apos;s routine cleaning, move-out prep, or anything in between, we adapt to your properties and your systems.</p>
      </>
    ),
  },
  {
    id: 'offices',
    n: '03',
    label: 'Offices & Clinics',
    teaser: 'Consistent, minimally disruptive cleaning',
    headline: 'Office & Clinic Cleaning',
    imageLabel: 'Office space photo',
    imageSrc: '/images/office.png',
    spaceType: 'office',
    body: (
      <>
        <p>Most office cleaning happens when no one&apos;s around — and that&apos;s exactly how we like it.</p>
        <p>Consistent, reliable service that works around your schedule. Simple communication, easy billing, no unnecessary complexity. Just dependable cleaning that works.</p>
      </>
    ),
  },
  {
    id: 'homes',
    n: '04',
    label: 'Apartments & Homes',
    teaser: 'Trusted, detail-oriented care for your home',
    headline: 'Apartment & Home Cleaning',
    imageLabel: 'Home / apartment photo',
    imageSrc: '/images/home.png',
    spaceType: 'apartment',
    body: (
      <>
        <p>Quality, trust, affordability, and real communication. We treat your space the way we&apos;d want ours treated.</p>
        <p>Whether it&apos;s a one-time deep clean or recurring service, we adapt to what you actually need — not a fixed package that doesn&apos;t quite fit.</p>
      </>
    ),
  },
]

export default function CleanPage(): JSX.Element {
  const [drawerOpen, setDrawerOpen]           = useState(false)
  const [drawerSpaceType, setDrawerSpaceType] = useState('')
  const [activeClient, setActiveClient]       = useState<string | null>(null)
  const [showServicesHint, setShowServicesHint] = useState(false)
  const heroRef      = useRef<HTMLElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)

  // Briefly show mobile scroll hint when a client type is selected
  useEffect(() => {
    if (!activeClient) return
    setShowServicesHint(true)
    const hintTimer = setTimeout(() => setShowServicesHint(false), 2200)
    return () => clearTimeout(hintTimer)
  }, [activeClient])

  // Scroll left panel so the opened accordion item is at the top of the panel
  useEffect(() => {
    if (!activeClient || !leftPanelRef.current) return
    const panel = leftPanelRef.current
    const el = document.getElementById(activeClient)
    if (!el) return
    // Small delay so the accordion begins opening before we measure positions
    const scrollTimer = setTimeout(() => {
      const panelRect = panel.getBoundingClientRect()
      const elRect    = el.getBoundingClientRect()
      panel.scrollTo({ top: panel.scrollTop + (elRect.top - panelRect.top), behavior: 'smooth' })
    }, 60)
    return () => clearTimeout(scrollTimer)
  }, [activeClient])

  const openDrawer = (spaceType = ''): void => {
    setDrawerSpaceType(spaceType)
    setDrawerOpen(true)
  }

  return (
    <main className="pb-16 md:pb-0">
      <StickyNav
        heroRef={heroRef}
        onQuoteClick={() => openDrawer()}
        setActiveClient={setActiveClient}
        onOtherClick={() => openDrawer('other')}
      />
      <Hero heroRef={heroRef} onQuoteClick={() => openDrawer()} />
      <TrustStrip />

      {/* Combined client accordion + services — two-panel layout on desktop */}
      <section
        id="client-types"
        style={{ borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left panel: accordion — off-white, independently scrollable on desktop */}
          <div
            ref={leftPanelRef}
            className="bg-off-white lg:w-1/2 px-6 lg:px-10 pt-12 pb-8 lg:max-h-[calc(100vh-56px)] lg:overflow-y-auto"
          >
            <ClientAccordion
              items={clientItems}
              openId={activeClient}
              onOpenChange={setActiveClient}
              onCTAClick={openDrawer}
            />
          </div>

          {/* Mobile: brief "scroll to services" hint when client is selected */}
          {showServicesHint && (
            <div
              className="lg:hidden flex items-center justify-center gap-2 py-2.5 bg-off-white transition-opacity duration-500"
              style={{ borderTop: '1px solid var(--color-light-gray)', opacity: showServicesHint ? 1 : 0 }}
            >
              <span className="text-xs" style={{ color: 'var(--color-warm-gray)' }}>See matching services</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6l4 4 4-4" stroke="var(--color-brand-gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          {/* Gold divider — desktop only */}
          <div
            className="hidden lg:block flex-shrink-0"
            style={{ width: '1px', background: 'rgba(196,154,68,0.25)' }}
          />

          {/* Right panel: services — navy, sticky on desktop */}
          <div
            id="services"
            className="grain bg-navy text-white lg:w-1/2 px-6 lg:px-10 py-12 lg:overflow-y-auto"
            style={{ scrollMarginTop: '56px' }}
          >
            <Services
              activeClientId={activeClient}
              onQuoteClick={() => openDrawer()}
            />
          </div>
        </div>
      </section>

      <Pricing onQuoteClick={() => openDrawer()} />
      <Testimonials />
      <ServiceArea onQuoteClick={() => openDrawer()} />
      <About />
      <QuickContact />
      <FinalCTA onQuoteClick={() => openDrawer()} />
      <Footer />

      <QuoteDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        defaultSpaceType={drawerSpaceType}
      />
      <ScrollToTop drawerOpen={drawerOpen} />
      <MobileCTABar onQuoteClick={() => openDrawer()} drawerOpen={drawerOpen} />
    </main>
  )
}
