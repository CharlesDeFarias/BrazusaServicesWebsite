import type { RefObject } from 'react'

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

export default function Hero({ heroRef, onQuoteClick }: HeroProps) {
  return (
    <section
      ref={heroRef}
      style={{ background: 'linear-gradient(160deg, #0d3347 0%, #0B2A3C 55%)' }}
      className="text-white py-28 md:py-36 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="fade-up text-4xl md:text-5xl lg:text-[3.4rem] leading-tight tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-dm-serif, Georgia, serif)', fontWeight: 400 }}
        >
          Reliable, high-detail cleaning for apartments, short-term rentals, and managed properties
        </h1>

        {/* Brand accent */}
        <div className="fade-up-1 w-10 h-[2px] bg-brand-yellow mx-auto mb-7" />

        <p className="fade-up-1 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
          A family-run cleaning company with decades of experience — now built with the speed, structure, and communication of a modern service.
        </p>

        <div className="fade-up-2 flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <button
            onClick={onQuoteClick}
            className="bg-brand-blue text-white px-8 py-3.5 rounded-md text-base font-medium hover:opacity-90 transition-opacity"
          >
            Request a Quote
          </button>
          <a
            href="tel:+1"
            className="border text-white px-8 py-3.5 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.35)' }}
          >
            Call / Text Us
          </a>
        </div>

        <p className="fade-up-3 text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
          Not sure if we&apos;re the right fit? Call us anyway — we&apos;ll help you find someone who is.
        </p>
      </div>
    </section>
  )
}
