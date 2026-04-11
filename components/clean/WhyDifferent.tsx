const points = [
  'A consistent, small team that actually cares about each client',
  'Fast, flexible communication, scheduling, and invoicing',
  'Fully insured, structured, and professionally managed',
  'Decades of real cleaning experience behind everything we do',
]

export default function WhyDifferent() {
  return (
    <section className="bg-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-6">A different kind of cleaning company</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Most cleaning companies fall into one of two categories: they&apos;re either large, structured companies that feel impersonal — or small, high-quality cleaners that are hard to communicate with and unreliable at scale.
        </p>
        <p className="text-gray-600 leading-relaxed mb-7">We built something in between.</p>
        <ul className="space-y-4 mb-7">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="text-brand-blue mt-0.5 flex-shrink-0 text-lg leading-none">→</span>
              <span className="text-gray-700 leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 leading-relaxed font-medium">
          We&apos;re a local family business — just one that&apos;s been rebuilt to work properly in today&apos;s world.
        </p>
      </div>
    </section>
  )
}
