'use client'

import type { JSX, RefObject } from 'react'
import Image from 'next/image'
import type { HeroCopy } from '@/lib/copy/brazusa-cleaning'

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
  heroCopy: HeroCopy
}

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export default function Hero({ heroRef, onQuoteClick, heroCopy }: HeroProps): JSX.Element {
  return (
    <section
      ref={heroRef}
      className="grain bg-navy text-white flex items-center px-6 md:px-12 lg:px-16 pt-14"
      style={{ minHeight: '82vh' }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start py-10 lg:py-14">

        {/* Text column */}
        <div>
          <div className="fade-up flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs uppercase tracking-[0.22em] text-white-40">
              Greater Boston · Since 1994
            </span>
          </div>

          <h1
            className="fade-up-1 italic leading-none mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.01em' }}
          >
            {heroCopy.h1}
          </h1>

          <div className="fade-up-1 w-12 h-px bg-brand-gold mb-6" />

          <div className="fade-up-2 text-base md:text-lg leading-relaxed mb-6 text-white-55">
            <p>
              {heroCopy.body}
            </p>
          </div>

          {/* Differentiators 2-column grid */}
          <div className="fade-up-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
            {heroCopy.differentiators.map((d) => (
              <div key={d.n} className="flex items-start gap-2">
                <span
                  className="text-xs font-semibold flex-shrink-0 tabular-nums mt-0.5 text-brand-gold"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {d.n}
                </span>
                <span className="text-xs leading-relaxed text-white-40">
                  {d.text}
                </span>
              </div>
            ))}
          </div>

          <div className="fade-up-2 flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={onQuoteClick}
              className="w-full sm:w-auto text-sm font-medium px-10 py-4 min-h-[52px] min-w-[180px] transition-all duration-200 hover:opacity-90 text-navy"
              style={{ background: 'var(--color-brand-gold)' }}
            >
              Start with a free quote
            </button>
            <a
              href="tel:7816867189"
              className="w-full sm:w-auto text-sm font-medium px-8 py-4 min-h-[52px] text-white text-center transition-colors hover:bg-white/10 flex items-center justify-center"
              style={{ border: '1.5px solid var(--color-white-40)' }}
            >
              Call / Text: 781-686-7189
            </a>
          </div>

          <p className="fade-up-3 text-xs text-white-30">
            {heroCopy.microcopy}
          </p>

          {/* Mobile image — full-bleed, shown below CTAs on small screens */}
          <div
            className="fade-up-3 lg:hidden mt-10 overflow-hidden"
            style={{ aspectRatio: '4/3', position: 'relative', marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
          >
            <Image
              src="/images/hero.webp"
              alt="Professional cleaning"
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              sizes="100vw"
              priority
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        </div>

        {/* Desktop image — right column, portrait accent. Capped at 280px wide / 373px tall. */}
        {/* If this looks awkward at a specific breakpoint, the fallback is xl:block (hide below xl). */}
        <div className="fade-up-1 hidden lg:block">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4', maxHeight: '453px' }}>
            <Image
              src="/images/hero.webp"
              alt="Professional cleaning"
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              sizes="340px"
              priority
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
