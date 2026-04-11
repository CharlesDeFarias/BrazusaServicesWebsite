'use client'

import { useState, useRef } from 'react'
import StickyNav    from '@/components/StickyNav'
import Hero         from '@/components/clean/Hero'
import TrustStrip   from '@/components/clean/TrustStrip'
import ClientSelector from '@/components/clean/ClientSelector'
import WhyDifferent from '@/components/clean/WhyDifferent'
import ClientSection from '@/components/clean/ClientSection'
import Services     from '@/components/clean/Services'
import HowItWorks   from '@/components/clean/HowItWorks'
import Pricing      from '@/components/clean/Pricing'
import Promotions   from '@/components/clean/Promotions'
import Testimonials from '@/components/clean/Testimonials'
import ServiceArea  from '@/components/clean/ServiceArea'
import About        from '@/components/clean/About'
import FinalCTA     from '@/components/clean/FinalCTA'
import Footer       from '@/components/clean/Footer'
import QuoteDrawer  from '@/components/clean/QuoteDrawer'

export default function CleanPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const openDrawer = () => setDrawerOpen(true)

  return (
    <main>
      <StickyNav heroRef={heroRef} onQuoteClick={openDrawer} />
      <Hero heroRef={heroRef} onQuoteClick={openDrawer} />
      <TrustStrip />
      <ClientSelector />
      <WhyDifferent />

      <ClientSection
        id="str"
        headline="Short-Term Rental Cleaning"
        onCTAClick={openDrawer}
        body={
          <>
            <p>We know what matters for short-term rentals: fast turnovers, consistent quality, no surprises.</p>
            <p>A missed detail can mean a bad review — and a bad review costs more than a cleaning ever will.</p>
            <p>We build repeatable systems around your units so you can rely on us without thinking about it. We can also help with small operational tasks that make managing your units easier.</p>
          </>
        }
      />

      <ClientSection
        id="property"
        headline="Cleaning for Property Managers & Buildings"
        onCTAClick={openDrawer}
        bg="white"
        body={
          <>
            <p>Property management requires more than just cleaning. It requires reliability across multiple units, consistency across different jobs, understanding building rules and systems, and professionalism with tenants, staff, and vendors.</p>
            <p>We&apos;re built to handle that. We document, standardize, and communicate clearly so you don&apos;t have to manage the cleaners — we manage ourselves.</p>
          </>
        }
      />

      <ClientSection
        id="offices"
        headline="Office & Clinic Cleaning"
        onCTAClick={openDrawer}
        body={
          <>
            <p>Most office cleaning happens when no one&apos;s around — and that&apos;s exactly how we like it.</p>
            <p>We focus on consistent, reliable cleaning, simple communication, and easy billing and scheduling. No unnecessary complexity. Just dependable service that works.</p>
          </>
        }
      />

      <ClientSection
        id="homes"
        headline="Apartment & Home Cleaning"
        onCTAClick={openDrawer}
        bg="white"
        body={
          <>
            <p>For residential clients, it comes down to a few things: quality, trust, affordability, and communication.</p>
            <p>We treat your space with the same level of care we&apos;d expect in our own. Whether it&apos;s a one-time clean or something recurring, we&apos;ll adapt to what you actually need.</p>
          </>
        }
      />

      <Services />
      <HowItWorks />
      <Pricing />
      <Promotions />
      <Testimonials />
      <ServiceArea onQuoteClick={openDrawer} />
      <About />
      <FinalCTA onQuoteClick={openDrawer} />
      <Footer />

      <QuoteDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  )
}
