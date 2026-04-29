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
      className="grain bg-navy text-white overflow-hidden"
      style={{ minHeight: '520px' }}
    >
      {/* Desktop: two-column grid. Mobile: single column. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] h-full" style={{ minHeight: '520px' }}>

        {/* Text column */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: '56px 56px 48px', paddingTop: 'calc(56px + 54px)' }}
        >
          {/* Eyebrow */}
          <div className="fade-up flex items-center gap-3 mb-8">
            {/* White rule per Claude Design — eyebrow rule is not a gold moment */}
            <div className="w-8 h-px" style={{ background: 'var(--color-white-30)' }} />
            <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-white-40)' }}>
              Greater Boston &middot; Since 1994
            </span>
          </div>

          <h1
            className="fade-up-1 leading-none mb-6"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: 'clamp(1.875rem, 4vw, 3.375rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
              maxWidth: '94%',
            }}
          >
            {heroCopy.h1}
          </h1>

          {/* Gold rule — one gold moment for the hero */}
          <div className="fade-up-1 mb-6" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />

          <div className="fade-up-2 mb-6" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--color-white-60)' }}>
            <p>{heroCopy.body}</p>
          </div>

          {/* CTAs */}
          <div className="fade-up-2 flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={onQuoteClick}
              className="text-sm font-medium px-8 py-4 min-h-[52px] transition-all duration-200 hover:opacity-90 text-navy"
              style={{ background: 'var(--color-brand-gold)' }}
            >
              Start with a free quote
            </button>
            <a
              href="tel:7816867189"
              className="text-sm font-medium px-6 py-4 min-h-[52px] text-white text-center transition-colors hover:bg-white/10 flex items-center justify-center"
              style={{ border: '1.5px solid var(--color-white-40)' }}
            >
              Call / Text: 781-686-7189
            </a>
          </div>

          {/* Differentiator pills — wraps to 2 rows naturally */}
          <div
            className="fade-up-2 flex flex-wrap gap-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}
          >
            {heroCopy.differentiators.map((d) => (
              <span
                key={d.n}
                className="text-xs px-3 py-1.5"
                style={{
                  fontFamily: 'var(--font-syne)',
                  color: 'var(--color-white-55)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  letterSpacing: '0.03em',
                }}
              >
                {d.text}
              </span>
            ))}
          </div>

          <p className="fade-up-3 mt-6 text-xs" style={{ color: 'var(--color-white-30)' }}>
            {heroCopy.microcopy}
          </p>
        </div>

        {/* Desktop image stripe — full section height, flush right */}
        <div
          className="hidden lg:block relative"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderLeft: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Image
            src="/images/hero.webp"
            alt="Professional cleaning"
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
            sizes="180px"
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </div>
    </section>
  )
}
