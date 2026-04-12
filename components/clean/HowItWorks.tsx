const steps = [
  { n: '01', title: 'Reach out',      desc: 'Quick message or detailed — whatever works' },
  { n: '02', title: 'Fast response',  desc: 'We get back to you promptly' },
  { n: '03', title: 'Get a quote',    desc: 'A visit or estimate based on what you need' },
  { n: '04', title: 'We handle it',   desc: 'Cleaning begins — no follow-up required' },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-off-white py-14 px-6"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="italic text-3xl md:text-4xl text-navy mb-12" style={{ fontWeight: 300 }}>
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="text-7xl font-bold leading-none mb-3 select-none" style={{ color: 'rgba(11,29,46,0.06)', fontFamily: 'var(--font-syne)' }}>
                {s.n}
              </div>
              <div className="w-6 h-px mb-3" style={{ background: '#C49A44' }} />
              <p className="font-semibold text-navy mb-1.5 text-sm">{s.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#7A7470' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-10 pt-5" style={{ borderTop: '1px solid #D8D0C6', color: '#9B9288' }}>
          If something unexpected comes up, we&apos;ll tell you before starting — no surprises.
        </p>
      </div>
    </section>
  )
}
