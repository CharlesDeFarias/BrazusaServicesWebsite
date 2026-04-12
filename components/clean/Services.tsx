const services = [
  { name: 'Routine Cleaning',    desc: 'Consistent maintenance on your schedule' },
  { name: 'Deep Cleaning',       desc: 'Top-to-bottom — every detail addressed' },
  { name: 'Move-in / Move-out',  desc: 'Fresh starts and clean exits' },
  { name: 'STR Turnover',        desc: 'Fast, reliable between-guest turnovers' },
  { name: 'Post-construction',   desc: 'Dust, debris, and detail work after builds' },
  { name: 'Custom Requests',     desc: 'Only the rooms or tasks you actually need' },
]

export default function Services() {
  return (
    <section
      id="services"
      className="grain bg-navy text-white py-14 px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end gap-8 mb-10">
          <h2 className="italic text-4xl md:text-5xl text-white leading-none" style={{ fontWeight: 300 }}>
            What we do
          </h2>
          <div className="hidden sm:block flex-1 h-px mb-2" style={{ background: 'rgba(196,154,68,0.35)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {services.map((s, i) => (
            <div
              key={s.name}
              className="group p-7 transition-colors duration-200 hover:bg-white/5"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                borderBottom: i < services.length - 3 ? '1px solid rgba(255,255,255,0.08)' : undefined,
              }}
            >
              <div className="w-5 h-px mb-4 transition-all duration-300 group-hover:w-10" style={{ background: '#C49A44' }} />
              <p className="font-medium text-white text-sm mb-1.5">{s.name}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Can&apos;t find what you need? We do partial and one-off jobs too — if we can&apos;t help, we&apos;ll point you to someone who can.
        </p>
      </div>
    </section>
  )
}
