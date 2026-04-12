interface FinalCTAProps {
  onQuoteClick: () => void
}

export default function FinalCTA({ onQuoteClick }: FinalCTAProps) {
  return (
    <section
      className="grain bg-navy text-white py-20 px-6 relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(45,170,225,0.07) 0%, transparent 70%)',
      }} />
      <div className="max-w-3xl mx-auto text-center relative">
        <div className="w-8 h-px mx-auto mb-8" style={{ background: '#C49A44' }} />
        <h2
          className="italic leading-none mb-5"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300 }}
        >
          Tell us what you need.
        </h2>
        <p className="text-base mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
          A quick message or full details — we&apos;ll take it from there.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium px-7 py-3.5 text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
            style={{ background: '#2DAAE1', borderLeft: '2px solid rgba(255,255,255,0.3)' }}
          >
            Get a Free Quote
          </button>
          <a
            href="tel:7816867189"
            className="text-sm font-medium px-7 py-3.5 text-white text-center transition-colors hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Call / Text: 781-686-7189
          </a>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
          Even if we&apos;re not the right fit, we&apos;ll help you find someone who is.
        </p>
      </div>
    </section>
  )
}
