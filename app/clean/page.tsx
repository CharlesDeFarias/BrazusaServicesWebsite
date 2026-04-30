'use client'

import { type JSX, useState, useRef, useEffect } from 'react'
import { getCopy, isValidSegment, type Segment } from '@/lib/copy/brazusa-cleaning'
import StickyNav        from '@/components/clean/StickyNav'
import Hero             from '@/components/clean/Hero'
import TrustStrip       from '@/components/clean/TrustStrip'
import Positioning      from '@/components/clean/Positioning'
import ClientAccordion  from '@/components/clean/ClientAccordion'
import type { ClientItem } from '@/components/clean/ClientAccordion'
import Services         from '@/components/clean/Services'
import Pricing          from '@/components/clean/Pricing'
import About            from '@/components/clean/About'
import Testimonials     from '@/components/clean/Testimonials'
import ServiceArea      from '@/components/clean/ServiceArea'
import TrustStats       from '@/components/clean/TrustStats'
import FinalCTA         from '@/components/clean/FinalCTA'
import Footer           from '@/components/clean/Footer'
import QuoteDrawer      from '@/components/clean/QuoteDrawer'
import ScrollToTop      from '@/components/clean/ScrollToTop'

const clientItems: ClientItem[] = [
  {
    id: 'str',
    n: '01',
    label: 'Short-Term Rentals',
    teaser: 'Turnovers handled, tracked, and ready for every check-in',
    headline: 'Short-Term Rental Operations',
    imageLabel: 'STR unit photo',
    imageSrc: '/images/str.webp',
    spaceType: 'str',
    body: (
      <>
        <p>Most STR setups break between checkout and check-in. Linens run low, inventory drifts, and small issues go unreported until a guest finds them. These gaps happen when no one owns the full process across units and booking days.</p>
        <p>We structure your operation so it runs the same way every time. Cleanings are confirmed through your system or ours, inventory and linens are tracked, and issues are flagged with context. We can integrate with your tools, handle communication with translation, and build in tiered cleans so units don&apos;t degrade between bookings.</p>
        <p>When something is off, you hear about it with context and next steps. You are not chasing updates or finding problems after guests do.</p>
      </>
    ),
  },
  {
    id: 'property',
    n: '02',
    label: 'Property Managers & Buildings',
    teaser: 'Cleaning that holds across buildings and tenants',
    headline: 'Multi-Unit Cleaning & Coordination',
    imageLabel: 'Building / property photo',
    imageSrc: '/images/property.webp',
    spaceType: 'property',
    body: (
      <>
        <p>Managing buildings means coordinating units, tenants, and vendors at the same time. Cleaning often becomes another moving piece that needs checking, especially when standards drift across units or teams.</p>
        <p>We set a consistent structure across your properties. Work is completed and confirmed, building-specific details are tracked, and issues are flagged early. We can align with your systems, support inventory and linen flow, and adjust volume as occupancy changes so service stays consistent across units.</p>
        <p>You are not checking if things were done or correcting them after. The process is visible, repeatable, and held across every unit we touch.</p>
      </>
    ),
  },
  {
    id: 'offices',
    n: '03',
    label: 'Offices & Clinics',
    teaser: 'Same team, same schedule, no disruption to staff',
    headline: 'Office & Clinic Cleaning',
    imageLabel: 'Office space photo',
    imageSrc: '/images/office.webp',
    spaceType: 'office',
    body: (
      <>
        <p>Office and clinical spaces work best when cleaning follows a fixed routine. We keep the same team, work on a set schedule, and complete service without interrupting staff or patient-facing areas.</p>
        <p>We operate in offices, coworking spaces, and clinical environments. We keep the same team where possible, follow set routines, and confirm each service completed.</p>
        <p>If something needs attention, it is flagged. Otherwise, the work is done and confirmed.</p>
      </>
    ),
  },
  {
    id: 'homes',
    n: '04',
    label: 'Homes',
    teaser: 'Consistent team, flexible scope, simple communication',
    headline: 'Home Cleaning',
    imageLabel: 'Home photo',
    imageSrc: '/images/home.webp',
    spaceType: 'apartment',
    body: (
      <>
        <p>Your home is handled by a consistent team that knows the space. Nobody is sent in without significant time on the team, and care notes are kept so nothing needs to be re-explained.</p>
        <p>Scheduling adjusts around your life without extra back and forth. Scope can shift, frequency can change, and we keep track of it so you don&apos;t have to.</p>
        <p>Communication is always available, including translation. If something needs attention, you hear about it. Otherwise, the work is handled and confirmed.</p>
      </>
    ),
  },
]

export default function CleanPage(): JSX.Element {
  const [drawerOpen, setDrawerOpen]           = useState(false)
  const [drawerSpaceType, setDrawerSpaceType] = useState('')
  const [activeClient, setActiveClient] = useState<Segment | null>(() => {
    if (typeof window === 'undefined') return null
    const param = new URLSearchParams(window.location.search).get('for')
    return param && isValidSegment(param) ? param : null
  })
  const [showServicesHint, setShowServicesHint] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const servicesHintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (servicesHintTimerRef.current) {
        clearTimeout(servicesHintTimerRef.current)
      }
    }
  }, [])

  const openDrawer = (spaceType = ''): void => {
    setDrawerSpaceType(spaceType)
    setDrawerOpen(true)
  }

  const handleActiveClientChange = (clientId: string | null): void => {
    setActiveClient(clientId && isValidSegment(clientId) ? clientId : null)

    if (!clientId) {
      setShowServicesHint(false)
      return
    }

    setShowServicesHint(true)
    if (servicesHintTimerRef.current) {
      clearTimeout(servicesHintTimerRef.current)
    }
    servicesHintTimerRef.current = setTimeout(() => {
      setShowServicesHint(false)
    }, 2200)
  }

  return (
    <main>
      {/* 1. Nav */}
      <StickyNav
        heroRef={heroRef}
        onQuoteClick={() => openDrawer()}
        setActiveClient={handleActiveClientChange}
        onOtherClick={() => openDrawer('other')}
      />
      {/* 2. Hero (navy) */}
      <Hero heroRef={heroRef} onQuoteClick={() => openDrawer()} heroCopy={getCopy(activeClient).hero} />
      {/* 3. Ticker (light) */}
      <TrustStrip />
      {/* 4. Positioning (navy) */}
      <Positioning />
      {/* 5. Trust Stats (navy) */}
      <TrustStats />
      {/* 6. Services Accordion (off-white) */}
      <ClientAccordion
        headline={getCopy(activeClient).accordion.headline}
        items={clientItems}
        openId={activeClient}
        onOpenChange={handleActiveClientChange}
        onCTAClick={openDrawer}
      />

      {showServicesHint && (
        <div
          className="flex items-center justify-center gap-2 py-2.5 bg-off-white transition-opacity duration-500"
          style={{ borderTop: '1px solid var(--color-light-gray)', opacity: showServicesHint ? 1 : 0 }}
        >
          <span className="text-xs" style={{ color: 'var(--color-warm-gray)' }}>Matching services are just below</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6l4 4 4-4" stroke="var(--color-brand-gold)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 7. Services Cards (navy) */}
      <Services
        servicesCopy={getCopy(activeClient).services}
        activeClientId={activeClient}
        onQuoteClick={() => openDrawer()}
      />
      {/* 8. Pricing (off-white) */}
      <Pricing onQuoteClick={() => openDrawer()} />
      {/* 9. About (off-white) */}
      <About />
      {/* 10. Testimonials (linen-deep) */}
      <Testimonials />
      {/* 11. Service Area (off-white) */}
      <ServiceArea onQuoteClick={() => openDrawer()} />
      {/* 12. Final CTA + Contact (off-white) */}
      <FinalCTA onQuoteClick={() => openDrawer()} />
      {/* 14. Footer (navy) */}
      <Footer />

      <QuoteDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        defaultSpaceType={drawerSpaceType}
      />
      <ScrollToTop drawerOpen={drawerOpen} />
    </main>
  )
}
