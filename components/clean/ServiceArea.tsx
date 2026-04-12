import ImagePlaceholder from './ImagePlaceholder'

interface ServiceAreaProps {
  onQuoteClick: () => void
}

export default function ServiceArea({ onQuoteClick }: ServiceAreaProps) {
  return (
    <section className="bg-off-white py-14 px-6" style={{ borderTop: '1px solid #D8D0C6' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-4 leading-snug" style={{ fontWeight: 300 }}>
            Greater Boston &<br />surrounding areas
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#7A7470' }}>
            Apartments, high-rises, offices, and multi-unit properties welcome.
          </p>
          <button
            onClick={onQuoteClick}
            className="text-sm font-medium text-navy pb-0.5 hover:opacity-60 transition-opacity"
            style={{ borderBottom: '1px solid #0B1D2E' }}
          >
            Not sure if you&apos;re in range? Just ask →
          </button>
        </div>
        <ImagePlaceholder aspect="4/3" label="Service area map" className="w-full" />
      </div>
    </section>
  )
}
