'use client'

import type { JSX, RefObject } from 'react'
import Image from 'next/image'

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

const differentiators = [
  { n: '01', text: 'Work completed and clearly confirmed' },
  { n: '02', text: 'Issues flagged before they become problems' },
  { n: '03', text: 'Communication you do not have to chase' },
  { n: '04', text: 'Works with your tools, apps, or systems' },
  { n: '05', text: 'Stable team that learns your space' },
  { n: '06', text: 'Flexible scope without losing structure' },
  { n: '07', text: 'Can support beyond cleaning when defined' },
]

export default function Hero({ heroRef, onQuoteClick }: HeroProps): JSX.Element {
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
            <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-white-40)' }}>
              Greater Boston · Since 1994
            </span>
          </div>

          <h1
            className="fade-up-1 italic leading-none mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.01em' }}
          >
            Cleaning that actually works the way your operation works.
          </h1>

          <div className="fade-up-1 w-12 h-px bg-brand-gold mb-6" />

          <div className="fade-up-2 space-y-3 text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--color-white-55)' }}>
            <p>
              Work is completed on schedule, confirmed, and communicated clearly through your tools or preferred method.
            </p>
            <p>
              Your operation keeps running &mdash; no check-ins, no last-minute calls, no cleaning becoming something you have to manage.
            </p>
          </div>

          {/* Differentiators 2-column grid */}
          <div className="fade-up-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
            {differentiators.map((d) => (
              <div key={d.n} className="flex items-start gap-2">
                <span
                  className="text-xs font-semibold flex-shrink-0 tabular-nums mt-0.5"
                  style={{ color: 'var(--color-brand-gold)', fontFamily: 'var(--font-syne)' }}
                >
                  {d.n}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: 'var(--color-white-40)' }}>
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
              Get a Quote
            </button>
            <a
              href="tel:7816867189"
              className="w-full sm:w-auto text-sm font-medium px-8 py-4 min-h-[52px] text-white text-center transition-colors hover:bg-white/10 flex items-center justify-center"
              style={{ border: '1.5px solid var(--color-white-40)' }}
            >
              Call / Text: 781-686-7189
            </a>
          </div>

          <p className="fade-up-3 text-xs" style={{ color: 'var(--color-white-30)' }}>
            Not sure if this fits? Reach out and we&apos;ll tell you honestly.
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

        {/* Desktop image — right column, portrait accent. Capped at 280px wide / 373px tall. */}
        {/* If this looks awkward at a specific breakpoint, the fallback is xl:block (hide below xl). */}
        <div className="fade-up-1 hidden lg:block">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4', maxHeight: '453px' }}>
            <Image
              src="/images/hero.png"
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
