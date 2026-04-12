const ways = [
  { title: 'Referrals',             desc: 'Send us a client. Get rewarded when we complete the job.' },
  { title: 'Schedule with neighbors', desc: 'Same-day nearby bookings reduce travel — we pass the savings on.' },
  { title: 'Flexible timing',       desc: 'Flexibility lets us optimize our schedule and your cost.' },
  { title: 'Recurring service',     desc: 'Consistent bookings are simpler to maintain and better priced.' },
  { title: 'Help us grow locally',  desc: 'Introductions to property managers or neighbors can translate into better pricing.' },
]

export default function Promotions() {
  return (
    <section className="bg-off-white py-14 px-6" style={{ borderTop: '1px solid #D8D0C6' }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="italic text-3xl md:text-4xl text-navy mb-2" style={{ fontWeight: 300 }}>
            Ways to lower your cost
          </h2>
          <p className="text-sm" style={{ color: '#7A7470' }}>Help us operate more efficiently — we share the savings.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ways.map((w, i) => (
            <div key={w.title} className="bg-white rounded-xl p-5 relative overflow-hidden" style={{ border: '1px solid #D8D0C6' }}>
              <span className="absolute -bottom-2 -right-1 text-7xl font-bold leading-none pointer-events-none select-none" style={{ color: 'rgba(11,29,46,0.03)', fontFamily: 'var(--font-syne)' }}>
                {i + 1}
              </span>
              <p className="font-semibold text-navy mb-1.5 text-sm relative">{w.title}</p>
              <p className="text-xs leading-relaxed relative" style={{ color: '#7A7470' }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
