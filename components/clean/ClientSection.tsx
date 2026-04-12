import ImagePlaceholder from './ImagePlaceholder'

interface ClientSectionProps {
  id: string
  headline: string
  body: React.ReactNode
  ctaLabel?: string
  onCTAClick: () => void
  bg?: 'white' | 'off-white'
  imageLabel?: string
  imagePosition?: 'left' | 'right'
}

export default function ClientSection({
  id,
  headline,
  body,
  ctaLabel = 'Request a Quote',
  onCTAClick,
  bg = 'off-white',
  imageLabel,
  imagePosition = 'right',
}: ClientSectionProps) {
  const imgEl = imageLabel ? (
    <div className="hidden lg:block flex-shrink-0 w-72 xl:w-80">
      <ImagePlaceholder aspect="3/4" label={imageLabel} className="w-full" />
    </div>
  ) : null

  return (
    <section
      id={id}
      style={{ scrollMarginTop: '64px', borderTop: '1px solid #D8D0C6' }}
      className={`py-20 px-6 ${bg === 'white' ? 'bg-white' : 'bg-off-white'}`}
    >
      <div className="max-w-5xl mx-auto flex items-start gap-14">
        {imagePosition === 'left' && imgEl}

        <div className="flex-1 min-w-0">
          <h2
            className="italic text-3xl md:text-4xl text-navy mb-5 leading-snug"
            style={{ fontWeight: 300 }}
          >
            {headline}
          </h2>
          <div
            className="space-y-3 mb-8 text-sm leading-relaxed max-w-xl"
            style={{ color: '#6B6360' }}
          >
            {body}
          </div>
          <button
            onClick={onCTAClick}
            className="border text-navy px-6 py-3 rounded-md text-sm font-medium hover:bg-navy hover:text-white transition-all duration-200"
            style={{ borderColor: '#0B1D2E' }}
          >
            {ctaLabel}
          </button>
        </div>

        {imagePosition === 'right' && imgEl}
      </div>
    </section>
  )
}
