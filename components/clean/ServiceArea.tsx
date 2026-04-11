interface ServiceAreaProps {
  onQuoteClick: () => void
}

export default function ServiceArea({ onQuoteClick }: ServiceAreaProps) {
  return (
    <section className="bg-off-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Service area</h2>
        <p className="text-gray-600 mb-2 leading-relaxed">Serving Greater Boston and surrounding areas.</p>
        <p className="text-gray-600 mb-6 leading-relaxed">Apartments, high-rises, offices, and multi-unit properties welcome.</p>
        <button
          onClick={onQuoteClick}
          className="text-brand-blue font-medium text-sm hover:underline underline-offset-4"
        >
          Not sure if you&apos;re in range? Just ask →
        </button>
      </div>
    </section>
  )
}
