const badges = [
  { text: 'Fully insured' },
  { text: 'Family-owned and operated' },
  { text: 'Serving Greater Boston since 1994' },
  { text: 'Residential + commercial experience' },
]

export default function TrustStrip() {
  return (
    <div className="bg-white border-b border-light-gray py-4 px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
        {badges.map((b) => (
          <span key={b.text} className="flex items-center gap-2 text-sm font-medium text-navy">
            <span className="text-brand-green text-base">✓</span>
            {b.text}
          </span>
        ))}
      </div>
    </div>
  )
}
