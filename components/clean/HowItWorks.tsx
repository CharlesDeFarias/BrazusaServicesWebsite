const steps = [
  { n: '01', text: 'Reach out — quick or detailed' },
  { n: '02', text: 'We respond fast' },
  { n: '03', text: 'We provide a quote or schedule a visit' },
  { n: '04', text: 'Cleaning begins' },
]

export default function HowItWorks() {
  return (
    <section className="bg-off-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-10">How it works</h2>
        <div className="space-y-7 mb-8">
          {steps.map((s) => (
            <div key={s.n} className="flex items-start gap-5">
              <span className="text-2xl font-light flex-shrink-0 w-10 leading-none" style={{ color: '#2DAAE1', opacity: 0.5 }}>
                {s.n}
              </span>
              <span className="text-lg text-navy leading-snug pt-0.5">{s.text}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-light-gray pt-6">
          <p className="text-sm text-gray-500 leading-relaxed">
            If something is different from what we expected when quoting, we&apos;ll tell you before starting — no surprises.
          </p>
        </div>
      </div>
    </section>
  )
}
