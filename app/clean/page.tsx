'use client'

import { useState, useRef } from 'react'
import StickyNav        from '@/components/StickyNav'
import Hero             from '@/components/clean/Hero'
import TrustStrip       from '@/components/clean/TrustStrip'
import WhyDifferent     from '@/components/clean/WhyDifferent'
import ClientAccordion  from '@/components/clean/ClientAccordion'
import type { ClientItem } from '@/components/clean/ClientAccordion'
import Services         from '@/components/clean/Services'
import HowItWorks       from '@/components/clean/HowItWorks'
import Pricing          from '@/components/clean/Pricing'
import Testimonials     from '@/components/clean/Testimonials'
import ServiceArea      from '@/components/clean/ServiceArea'
import About            from '@/components/clean/About'
import QuickContact     from '@/components/clean/QuickContact'
import NewsletterCTA    from '@/components/clean/NewsletterCTA'
import Promotions       from '@/components/clean/Promotions'
import FinalCTA         from '@/components/clean/FinalCTA'
import Footer           from '@/components/clean/Footer'
import QuoteDrawer      from '@/components/clean/QuoteDrawer'
import ScrollToTop      from '@/components/clean/ScrollToTop'

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

export default function CleanPage() {
  const [drawerOpen, setDrawerOpen]           = useState(false)
  const [drawerSpaceType, setDrawerSpaceType] = useState('')
  const [activeClient, setActiveClient]       = useState<string | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  const openDrawer = (spaceType = '') => {
    setDrawerSpaceType(spaceType)
    setDrawerOpen(true)
  }

  return (
    <main>
      <StickyNav heroRef={heroRef} onQuoteClick={() => openDrawer()} />
      <Hero heroRef={heroRef} onQuoteClick={() => openDrawer()} />
      <TrustStrip />
      <WhyDifferent />
      <ClientAccordion
        items={clientItems}
        openId={activeClient}
        onOpenChange={setActiveClient}
        onCTAClick={openDrawer}
      />
      <Services />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <ServiceArea onQuoteClick={() => openDrawer()} />
      <About />
      <QuickContact />
      <NewsletterCTA />
      <Promotions />
      <FinalCTA onQuoteClick={() => openDrawer()} />
      <Footer />

      <QuoteDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        defaultSpaceType={drawerSpaceType}
      />
      <ScrollToTop />
    </main>
  )
}
