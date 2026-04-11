const factors = [
  'Size and layout of the space',
  'Level of cleaning needed (light vs deep)',
  'Type of service (routine, move-out, turnover, etc.)',
  'Frequency (one-time vs recurring)',
  'Accessibility (parking, building rules, timing)',
  'Custom requests',
]

const examples = [
  { label: 'Studio apartment (light cleaning)', range: '$X – $Y' },
  { label: '1–2 bedroom apartment (moderate)', range: '$X – $Y' },
  { label: 'Deep cleaning (varies heavily)', range: '$X – $Y' },
  { label: 'Short-term rental turnover', range: '$X – $Y' },
  { label: 'Small office', range: '$X – $Y' },
]

export default function Pricing() {
  return (
    <section className="bg-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Transparent, flexible pricing</h2>
        <p className="text-gray-600 leading-relaxed mb-12">
          Every space is different, so we don&apos;t use flat, one-size pricing. We price based on what the job actually requires — and we&apos;d rather explain that upfront than surprise you later.
        </p>

        <h3 className="text-xl text-navy mb-4">How we calculate pricing</h3>
        <ul className="space-y-2.5 mb-12">
          {factors.map((f) => (
            <li key={f} className="flex items-start gap-3 text-gray-600">
              <span className="text-brand-blue flex-shrink-0 mt-0.5">→</span>
              {f}
            </li>
          ))}
        </ul>

        <h3 className="text-xl text-navy mb-5">Real examples</h3>
        <div className="mb-4">
          {examples.map((ex, i) => (
            <div
              key={ex.label}
              className={`flex justify-between items-center py-3.5 px-1 ${i < examples.length - 1 ? 'border-b border-light-gray' : ''}`}
            >
              <span className="text-gray-700 text-sm">{ex.label}</span>
              <span className="font-semibold text-navy text-sm tabular-nums">{ex.range}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-12">
          Your exact quote may vary — but this gives you a realistic starting point.
        </p>

        <h3 className="text-xl text-navy mb-4">Custom cleaning</h3>
        <p className="text-gray-600 leading-relaxed mb-3">
          We don&apos;t believe cleaning has to be all-or-nothing. We regularly do jobs like:
        </p>
        <ul className="space-y-2 text-gray-600 mb-12">
          <li className="flex items-start gap-3"><span className="text-brand-blue flex-shrink-0">→</span> Cleaning only one roommate&apos;s half of an apartment</li>
          <li className="flex items-start gap-3"><span className="text-brand-blue flex-shrink-0">→</span> Cleaning just kitchens and bathrooms</li>
          <li className="flex items-start gap-3"><span className="text-brand-blue flex-shrink-0">→</span> Doing only the tasks you don&apos;t want to deal with</li>
          <li className="flex items-start gap-3"><span className="text-brand-blue flex-shrink-0">→</span> One-time targeted deep cleans</li>
        </ul>

        <div className="bg-off-white border border-light-gray rounded-lg p-5">
          <p className="font-medium text-navy text-sm mb-1.5">If something changes</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sometimes we arrive and the situation differs from what was described. We&apos;ll explain the difference, adjust the price if needed, or work within the original quote as best we can. No surprises.
          </p>
        </div>
      </div>
    </section>
  )
}
