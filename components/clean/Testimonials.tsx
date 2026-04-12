const cases = [
  {
    title: 'Short-term rental owner',
    result: 'More reliable cleanings, fewer issues between guests.',
    detail: 'Created a repeatable turnover system with consistent expectations.',
  },
  {
    title: 'Residential client',
    result: 'Lower cost and better satisfaction.',
    detail: "Didn't need a full clean — we built a custom plan for key areas only.",
  },
  {
    title: 'Property manager',
    result: 'Less oversight required, smoother operations.',
    detail: 'Handled a mix of jobs across multiple units with consistent communication.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-14 px-6" style={{ borderTop: '1px solid #D8D0C6' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="italic text-3xl md:text-4xl text-navy mb-2" style={{ fontWeight: 300 }}>
            Real clients, real situations
          </h2>
          <p className="text-sm" style={{ color: '#9B9288' }}>A few examples of the work we do and how we approach it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c) => (
            <div key={c.title} className="rounded-xl p-6 flex flex-col gap-3" style={{ border: '1px solid #D8D0C6' }}>
              <span className="text-4xl leading-none select-none" style={{ fontFamily: 'var(--font-cormorant)', color: '#D8D0C6', lineHeight: 1 }}>&ldquo;</span>
              <p className="italic text-navy leading-snug" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 400 }}>
                {c.result}
              </p>
              <p className="text-xs leading-relaxed mt-auto" style={{ color: '#9B9288' }}>{c.detail}</p>
              <div className="pt-3" style={{ borderTop: '1px solid #D8D0C6' }}>
                <span className="text-xs font-medium" style={{ color: '#B0A89E' }}>{c.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
