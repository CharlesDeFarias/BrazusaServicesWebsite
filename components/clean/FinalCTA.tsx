interface FinalCTAProps {
  onQuoteClick: () => void
}

export default function FinalCTA({ onQuoteClick }: FinalCTAProps) {
  return (
    <section className="bg-navy text-white py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: 'var(--font-dm-serif, Georgia, serif)', fontWeight: 400 }}
        >
          Tell us what you need
        </h2>
        <div className="w-8 h-[2px] bg-brand-yellow mx-auto mb-7" />
        <p className="mb-9 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Send us a quick message, or give us as much detail as you want. Either way, we&apos;ll take it from there.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={onQuoteClick}
            className="bg-brand-blue text-white px-8 py-3.5 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Request a Quote
          </button>
          <a
            href="tel:+1"
            className="border text-white px-8 py-3.5 rounded-md font-medium hover:bg-white/10 transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Call / Text Us
          </a>
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Even if we&apos;re not the right fit, we&apos;ll help you find someone who is.
        </p>
      </div>
    </section>
  )
}
