import type { JSX } from 'react'

interface FinalCTAProps {
  onQuoteClick: () => void
}

export default function FinalCTA({ onQuoteClick }: FinalCTAProps): JSX.Element {
  return (
    <section
      id="contact"
      className="grain bg-off-white pt-4 pb-10 px-6 relative overflow-hidden"
      style={{ borderTop: '1px solid var(--color-light-gray)', scrollMarginTop: '56px' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        /* no token: intentional — 2.5% opacity falls between stops */
        backgroundImage: `linear-gradient(rgba(11,29,46,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.025) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />
      {/* Radial gold glow bottom-right */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, var(--color-gold-5) 0%, transparent 70%)`,
      }} />

      <div className="max-w-3xl mx-auto text-center relative" style={{ maxWidth: '780px' }}>

        {/* Gold rule */}
        <div className="mx-auto mb-5" style={{ width: '42px', height: '1px', background: 'var(--color-brand-gold)' }} />

        <h2
          className="leading-none mb-5 text-navy"
          style={{
            fontFamily: 'var(--font-ibm-plex-sans)',
            fontSize: 'clamp(2.5rem, 5vw, 2.875rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Tell us what you need.
        </h2>
        <p
          className="text-base mb-8 mx-auto leading-relaxed"
          style={{ maxWidth: '480px', color: 'var(--color-warm-gray-dark)' }}
        >
          Send a quick message or a detailed breakdown. Either way, we&apos;ll figure it out with you.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium px-7 py-3.5 min-h-[44px] transition-all duration-200 hover:opacity-90 text-navy"
            style={{ background: 'var(--color-brand-gold)' }}
          >
            Request a Walkthrough
          </button>
          <a
            href="tel:7816867189"
            className="text-sm font-medium px-7 py-3.5 min-h-[44px] text-navy text-center transition-colors hover:bg-navy hover:text-white flex items-center justify-center"
            style={{ border: '1px solid var(--color-navy-20)' }}
          >
            Call / Text: 781-686-7189
          </a>
        </div>

        {/* Hairline divider */}
        <div className="mb-6" style={{ borderTop: '1px solid var(--color-light-gray)' }} />

        {/* 3-column contact strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: 'var(--color-warm-gray)',
                textTransform: 'uppercase',
              }}
            >
              Call or Text
            </p>
            <a
              href="tel:7816867189"
              className="transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-navy)',
                textDecoration: 'none',
              }}
            >
              781-686-7189
            </a>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: 'var(--color-warm-gray)',
                textTransform: 'uppercase',
              }}
            >
              Email
            </p>
            <a
              href="mailto:info@brazusa.com"
              className="transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-navy)',
                textDecoration: 'none',
              }}
            >
              info@brazusa.com
            </a>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: 'var(--color-warm-gray)',
                textTransform: 'uppercase',
              }}
            >
              Google
            </p>
            <a
              href="https://maps.app.goo.gl/gvJ4MmpuShUocGB3A"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-navy)',
                textDecoration: 'none',
              }}
            >
              View our profile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
