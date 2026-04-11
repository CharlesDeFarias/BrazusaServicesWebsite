const cases = [
  {
    title: 'Short-term rental, inconsistent cleaners',
    situation: 'Client had inconsistent cleaning and guest complaints.',
    action: 'Created a repeatable turnover system with consistent expectations.',
    result: 'More reliable cleanings and fewer issues between guests.',
  },
  {
    title: 'Partial cleaning, reduced cost',
    situation: "Client didn't need full cleaning and didn't want to pay for it.",
    action: 'Built a custom plan focused only on key areas.',
    result: 'Lower cost and better satisfaction.',
  },
  {
    title: 'Property management support',
    situation: 'Manager needed flexible help across different units and situations.',
    action: 'Handled a mix of jobs while maintaining consistent communication.',
    result: 'Less oversight required and smoother operations.',
  },
]

const rows: { key: keyof (typeof cases)[0]; label: string }[] = [
  { key: 'situation', label: 'Situation' },
  { key: 'action',    label: 'What we did' },
  { key: 'result',    label: 'Result' },
]

export default function Testimonials() {
  return (
    <section className="bg-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-3">Real clients, real situations</h2>
        <p className="text-gray-500 mb-10 leading-relaxed">
          A few examples of the kinds of work we do and how we approach it.
        </p>
        <div className="space-y-6">
          {cases.map((c) => (
            <div key={c.title} className="border border-light-gray rounded-lg p-6">
              <p className="font-semibold text-navy mb-5 text-base">{c.title}</p>
              <div className="space-y-3">
                {rows.map(({ key, label }) => (
                  <div key={label} className="flex gap-4 text-sm">
                    <span className="text-gray-400 w-24 flex-shrink-0 pt-0.5">{label}</span>
                    <span className="text-gray-600 leading-relaxed">{c[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-8">More testimonials coming soon.</p>
      </div>
    </section>
  )
}
