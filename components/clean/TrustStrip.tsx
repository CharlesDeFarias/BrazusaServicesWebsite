const badges = [
  'Fully insured',
  'Family-owned & operated',
  'Serving Greater Boston since 1994',
  'Residential + commercial',
  'No surprises, ever',
  'Fast, flexible communication',
  'Fully insured',
  'Family-owned & operated',
  'Serving Greater Boston since 1994',
  'Residential + commercial',
  'No surprises, ever',
  'Fast, flexible communication',
]

export default function TrustStrip() {
  return (
    <div
      className="bg-white border-b py-3.5 overflow-hidden"
      style={{ borderColor: '#D8D0C6' }}
    >
      <div className="flex marquee-track whitespace-nowrap">
        {badges.map((b, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 mx-8 text-xs font-medium flex-shrink-0"
            style={{ color: '#0B1D2E', letterSpacing: '0.04em' }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: '#C49A44' }}
            />
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}
