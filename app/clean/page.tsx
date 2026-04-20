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
import HowItWorks       from '@/components/clean/HowItWorks'
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
    teaser: 'Turnovers handled, confirmed, and ready for check-in',
    headline: 'Short-Term Rental Cleaning',
    imageLabel: 'STR unit photo',
    imageSrc: '/images/str.png',
    spaceType: 'str',
    body: (
      <>
        <p>Most STR hosts run into coordination problems between turnovers. Things fall through the gap between checkout and check-in: linens not restocked, supplies running low, something broken that nobody flagged.</p>
        <p>We build a repeatable system around your units. Consistent checklists, direct communication, same-day confirmations when you need them. We can also handle linen processing, inventory tracking, and small operational tasks so you&apos;re not managing the details yourself.</p>
        <p>A missed detail can mean a bad review. A bad review costs more than a cleaning ever will. We treat your units like the business they are.</p>
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
        <p>Property management means juggling multiple units, coordinating with tenants and vendors, and making sure nothing slips. You don&apos;t need another vendor you have to manage on top of that.</p>
        <p>We document condition, communicate clearly before and after every job, and flag issues before they become problems. Move-in ready, move-out documented, common areas handled, and we adapt to your buildings and your process.</p>
        <p>We&apos;ve worked with independent landlords, building owners, and property management companies. The common thread: they stop worrying about whether the cleaning got done.</p>
      </>
    ),
  },
  {
    id: 'offices',
    n: '03',
    label: 'Offices & Clinics',
    teaser: 'Cleaning handled without needing follow-up',
    headline: 'Office & Clinic Cleaning',
    imageLabel: 'Office space photo',
    imageSrc: '/images/office.png',
    spaceType: 'office',
    body: (
      <>
        <p>Office cleaning works best when you don&apos;t have to think about it. We schedule around your hours, show up when we say we will, and keep the same team so the space stays consistent.</p>
        <p>{'We work with small offices, coworking spaces, and medical and clinical environments \u2014 keeping a consistent team, following set routines, and working around your hours.'}</p>
        <p>Simple communication, consistent service. No reminders, no follow-ups needed on your end.</p>
      </>
    ),
  },
  {
    id: 'homes',
    n: '04',
    label: 'Apartments & Homes',
    teaser: 'Consistent team, flexible scope, simple communication',
    headline: 'Apartment & Home Cleaning',
    imageLabel: 'Home / apartment photo',
    imageSrc: '/images/home.png',
    spaceType: 'apartment',
    body: (
      <>
        <p>You get a consistent team that understands your home and how you like things done. Not a rotating group that needs to relearn everything each visit.</p>
        <p>Scope stays flexible. You can adjust what gets done, how often, and how detailed it is, without turning it into a complicated process.</p>
        <p>Communication stays simple and clear. If something needs attention, you&apos;ll know. Otherwise, the work is handled without you having to think about it.</p>
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
  const heroRef      = useRef<HTMLElement>(null)
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
    <main className="pb-16 md:pb-0">
      <StickyNav
        heroRef={heroRef}
        onQuoteClick={() => openDrawer()}
        setActiveClient={handleActiveClientChange}
        onOtherClick={() => openDrawer('other')}
      />
      <Hero heroRef={heroRef} onQuoteClick={() => openDrawer()} heroCopy={getCopy(activeClient).hero} />
      <TrustStrip />
      <Positioning />
      <ClientAccordion
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

      <Services
        activeClientId={activeClient}
        onQuoteClick={() => openDrawer()}
      />

      <HowItWorks />
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
