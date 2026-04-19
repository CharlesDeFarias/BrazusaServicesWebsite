'use client'

import type { JSX, RefObject } from 'react'
import Image from 'next/image'

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

const differentiators = [
  { n: '01', text: 'Real people managing your space, not a rotating crew' },
  { n: '02', text: '24/7 communication through our virtual team' },
  { n: '03', text: 'We can use whatever tools, apps, or systems you already have' },
  { n: '04', text: 'Highly customized cleaning plans and pricing' },
  { n: '05', text: 'We scale up or down depending on your needs' },
  { n: '06', text: 'We track details so things don\'t fall through the cracks' },
  { n: '07', text: 'We can handle more than just cleaning if needed' },
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
              We&apos;re a family business that&apos;s been doing this since 1994.
              But we&apos;re not stuck in 1994.
            </p>
            <p>
              You get the care and consistency of a small, experienced team,
              with the communication, structure, and flexibility most companies struggle to offer.
            </p>
            <p>
              We work with homeowners, short-term rentals, and multi-building operations.
              We can keep it simple, or we can build systems around your space.
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
            Not sure if we&apos;re the right fit? Reach out anyway. We&apos;ll point you in the right direction.
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
