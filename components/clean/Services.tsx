const services = [
  'Routine cleaning',
  'Deep cleaning',
  'Move-in / move-out cleaning',
  'Short-term rental turnover',
  'Custom cleaning requests',
]

export default function Services() {
  return (
    <section className="bg-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">What we do</h2>
        <ul className="space-y-3 mb-10">
          {services.map((s) => (
            <li key={s} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{s}</span>
            </li>
          ))}
        </ul>
        <div className="bg-off-white border border-light-gray rounded-lg p-6">
          <p className="font-medium text-navy mb-3">We don&apos;t believe in one-size-fits-all cleaning.</p>
          <p className="text-gray-600 text-sm mb-3">We can clean:</p>
          <ul className="text-gray-600 text-sm space-y-1.5 mb-4">
            <li className="flex items-center gap-2"><span className="text-brand-blue">→</span> Entire units</li>
            <li className="flex items-center gap-2"><span className="text-brand-blue">→</span> Specific rooms</li>
            <li className="flex items-center gap-2"><span className="text-brand-blue">→</span> Or just the tasks you don&apos;t want to deal with</li>
          </ul>
          <p className="text-gray-500 text-sm">If we don&apos;t do something, we&apos;ll help you find someone who does.</p>
        </div>
      </div>
    </section>
  )
}
