'use client'

import type { JSX, RefObject } from 'react'
import Image from 'next/image'

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

const differentiators = [
  { n: '01', text: 'Consistent team that genuinely cares' },
  { n: '02', text: 'Fast, flexible communication' },
  { n: '03', text: 'Fully insured & professionally managed' },
  { n: '04', text: 'Decades of real cleaning experience' },
]

export default function Hero({ heroRef, onQuoteClick }: HeroProps): JSX.Element {
  return (
    <section
      ref={heroRef}
      className="grain bg-navy text-white flex items-center px-6 md:px-12 lg:px-16 pt-14"
      style={{ minHeight: '82vh' }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-10 items-start py-10 lg:py-14">

        {/* Text column */}
        <div>
          <div className="fade-up flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-brand-gold" />
            <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Greater Boston · Since 1994
            </span>
          </div>

          <h1
            className="fade-up-1 italic leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)', fontWeight: 300, letterSpacing: '-0.01em' }}
          >
            Reliable, high-detail cleaning.
          </h1>

          <div className="fade-up-1 w-12 h-px bg-brand-gold mb-6" />

          <p className="fade-up-2 text-base md:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Residential and commercial cleaning for apartments, short-term rentals,
            offices, and managed properties — consistent, professional, and built
            around how you operate.
          </p>

          {/* Differentiators 2×2 grid */}
          <div className="fade-up-2 grid grid-cols-2 gap-x-8 gap-y-2 mb-8">
            {differentiators.map((d) => (
              <div key={d.n} className="flex items-start gap-2">
                <span
                  className="text-xs font-semibold flex-shrink-0 tabular-nums mt-0.5"
                  style={{ color: 'var(--color-brand-gold)', fontFamily: 'var(--font-syne)' }}
                >
                  {d.n}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {d.text}
                </span>
              </div>
            ))}
          </div>

          <div className="fade-up-2 flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={onQuoteClick}
              className="w-full sm:w-auto text-sm font-medium px-10 py-4 min-h-[52px] min-w-[180px] transition-all duration-200 hover:opacity-90"
              style={{ background: 'var(--color-brand-gold)', color: 'var(--color-navy)' }}
            >
              Get a Free Quote
            </button>
            <a
              href="tel:7816867189"
              className="w-full sm:w-auto text-sm font-medium px-8 py-4 min-h-[52px] text-white text-center transition-colors hover:bg-white/10 flex items-center justify-center"
              style={{ border: '1.5px solid rgba(255,255,255,0.40)' }}
            >
              Call / Text: 781-686-7189
            </a>
          </div>

          <p className="fade-up-3 text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Not the right fit? We&apos;ll help you find someone who is.
          </p>

          {/* Mobile image — full-bleed, shown below CTAs on small screens */}
          <div
            className="fade-up-3 lg:hidden mt-10 overflow-hidden"
            style={{ aspectRatio: '4/3', position: 'relative', marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
          >
            <Image
              src="/images/hero.png"
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

        {/* Desktop image — right column, portrait */}
        <div className="fade-up-1 hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
            <Image
              src="/images/hero.png"
              alt="Professional cleaning"
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              sizes="420px"
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
