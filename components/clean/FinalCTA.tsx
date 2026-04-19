import type { JSX } from 'react'

interface FinalCTAProps {
  onQuoteClick: () => void
}

export default function FinalCTA({ onQuoteClick }: FinalCTAProps): JSX.Element {
  return (
    <section
      className="bg-off-white py-20 px-6 relative overflow-hidden"
      style={{ borderTop: '1px solid var(--color-light-gray)' }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        // no token: intentional — 2.5% opacity falls between stops
        backgroundImage: `linear-gradient(rgba(11,29,46,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(11,29,46,0.025) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, var(--color-gold-5) 0%, transparent 70%)`,
      }} />
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="w-8 h-px mx-auto mb-8" style={{ background: 'var(--color-brand-gold)' }} />
        <h2
          className="italic leading-none mb-5 text-navy"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300 }}
        >
          Tell us what you need.
        </h2>
        <p className="text-base mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--color-navy-50)' }}>
          You can send a quick message or a detailed breakdown. Either way, we&apos;ll figure it out with you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium px-7 py-3.5 min-h-[44px] transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--color-brand-gold)', color: 'var(--color-navy)' }}
          >
            Get a Free Quote
          </button>
          <a
            href="tel:7816867189"
            className="text-sm font-medium px-7 py-3.5 min-h-[44px] text-navy text-center transition-colors hover:bg-navy hover:text-white flex items-center justify-center"
            style={{ border: '1px solid var(--color-navy-20)' }}
          >
            Call / Text: 781-686-7189
          </a>
        </div>
        <p className="text-xs" style={{ color: 'var(--color-navy-30)' }}>
          Even if we&apos;re not the right fit, we&apos;ll help you find someone who is.
        </p>
      </div>
    </section>
  )
}
