interface ClientSectionProps {
  id: string
  headline: string
  body: React.ReactNode
  ctaLabel?: string
  onCTAClick: () => void
  bg?: 'white' | 'off-white'
}

export default function ClientSection({
  id,
  headline,
  body,
  ctaLabel = 'Request a Quote',
  onCTAClick,
  bg = 'off-white',
}: ClientSectionProps) {
  return (
    <section
      id={id}
      style={{ scrollMarginTop: '64px' }}
      className={`border-t border-light-gray py-16 px-6 ${bg === 'white' ? 'bg-white' : 'bg-off-white'}`}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-6">{headline}</h2>
        <div className="text-gray-600 leading-relaxed space-y-4 mb-8">{body}</div>
        <button
          onClick={onCTAClick}
          className="bg-brand-blue text-white px-7 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  )
}
