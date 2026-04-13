'use client'

import type { RefObject } from 'react'
import Image from 'next/image'

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

export default function Hero({ heroRef, onQuoteClick }: HeroProps) {
  return (
    <section
      ref={heroRef}
      className="grain bg-navy text-white min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-14"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-20 items-center py-20">

        {/* Text column */}
        <div>
          <div className="fade-up flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Greater Boston · Since 1994
            </span>
          </div>

          <h1
            className="fade-up-1 italic leading-none mb-8"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.25rem)', fontWeight: 300, letterSpacing: '-0.01em' }}
          >
            Reliable,<br />
            high-detail<br />
            cleaning.
          </h1>

          <div className="fade-up-1 w-12 h-px bg-brand-gold mb-8" />

          <p className="fade-up-2 text-base md:text-lg leading-relaxed mb-10 max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Apartments, short-term rentals, and managed properties —
            cleaned with the consistency and communication modern owners expect.
          </p>

          <div className="fade-up-2 flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={onQuoteClick}
              className="text-sm font-medium px-6 py-3.5 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
              style={{ background: '#2DAAE1', borderLeft: '2px solid rgba(255,255,255,0.3)' }}
            >
              Get a Free Quote
            </button>
            <a
              href="tel:7816867189"
              className="text-sm font-medium px-6 py-3.5 text-white text-center transition-colors hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.22)' }}
            >
              Call / Text: 781-686-7189
            </a>
          </div>

          <p className="fade-up-3 text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Not the right fit? We&apos;ll help you find someone who is.
          </p>

          {/* Mobile image — shown below CTAs, hidden on desktop */}
          <div className="fade-up-3 lg:hidden mt-10 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9', position: 'relative' }}>
            <Image
              src="/images/hero.png"
              alt="Professional cleaning"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Desktop image — right column, portrait */}
        <div className="fade-up-1 hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
            <Image
              src="/images/hero.png"
              alt="Professional cleaning"
              fill
              className="object-cover"
              sizes="380px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
