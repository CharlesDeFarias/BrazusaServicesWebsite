const points = [
  { n: '01', text: 'A consistent, small team that genuinely cares about each client' },
  { n: '02', text: 'Fast, flexible communication and scheduling' },
  { n: '03', text: 'Fully insured, structured, professionally managed' },
  { n: '04', text: 'Decades of real cleaning experience behind everything we do' },
]

export default function WhyDifferent() {
  return (
    <section className="bg-white py-14 px-6" style={{ borderTop: '1px solid #D8D0C6' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto] gap-8 lg:gap-20 items-start">
        <div>
          <h2 className="italic text-3xl md:text-4xl text-navy mb-4 leading-snug" style={{ fontWeight: 300 }}>
            A different kind of<br />cleaning company
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#7A7470' }}>
            Not too big to care, not too small to be reliable. We sit in between.
          </p>
        </div>
        <ul className="space-y-5 sm:pt-2">
          {points.map((p) => (
            <li key={p.n} className="flex items-start gap-4">
              <span className="text-xs font-semibold flex-shrink-0 pt-0.5 tabular-nums" style={{ color: '#C49A44' }}>
                {p.n}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: '#5A5451' }}>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
