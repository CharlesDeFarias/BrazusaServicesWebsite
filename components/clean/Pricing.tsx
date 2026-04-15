'use client'

interface PricingProps {
  onQuoteClick: () => void
}

const examples = [
  { label: 'Studio apartment (light cleaning)', range: '$X – $Y' },
  { label: '1–2 bedroom apartment (moderate)',  range: '$X – $Y' },
  { label: 'Deep cleaning',                     range: '$X – $Y' },
  { label: 'Short-term rental turnover',        range: '$X – $Y' },
  { label: 'Small office',                      range: '$X – $Y' },
]

const factors = [
  'Size and layout',
  'Level of cleaning needed',
  'Service type',
  'Frequency',
  'Accessibility & timing',
  'Custom requests',
]

const customExamples = [
  "Cleaning only one roommate's half of an apartment",
  'Just kitchens and bathrooms',
  "Tasks you don't want to deal with",
  'One-time targeted deep cleans',
]

const savingsWays = [
  { title: 'Referrals',               desc: 'Send us a client. Get rewarded when we complete the job.' },
  { title: 'Schedule with neighbors', desc: 'Same-day nearby bookings reduce travel — we pass the savings on.' },
  { title: 'Flexible timing',         desc: 'Flexibility lets us optimize our schedule and your cost.' },
  { title: 'Recurring service',       desc: 'Consistent bookings are simpler to maintain and better priced.' },
  { title: 'Help us grow locally',    desc: 'Introductions to property managers or neighbors can translate into better pricing.' },
]

export default function Pricing({ onQuoteClick }: PricingProps) {
  return (
    <section
      id="pricing"
      className="bg-white py-14 px-6"
      style={{ borderTop: '1px solid #D8D0C6', scrollMarginTop: '56px' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Top row: pricing table (left) + sidebar (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_270px] gap-10 mb-8">

          {/* Table column */}
          <div>
            <h2 className="italic text-3xl md:text-4xl text-navy mb-3" style={{ fontWeight: 300 }}>
              Transparent, flexible pricing
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#7A7470' }}>
              We price based on what the job actually requires. Reference ranges:
            </p>

            <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #D8D0C6' }}>
              {examples.map((ex, i) => (
                <div
                  key={ex.label}
                  className="flex flex-wrap justify-between items-center gap-y-1 px-5 py-3 text-sm bg-white"
                  style={{ borderBottom: i < examples.length - 1 ? '1px solid #D8D0C6' : undefined }}
                >
                  <span style={{ color: '#5A5451' }}>{ex.label}</span>
                  <span
                    className="font-semibold text-navy tabular-nums"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {ex.range}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs" style={{ color: '#B0A89E' }}>
              Exact quotes vary. If something unexpected comes up on-site, we&apos;ll explain before starting.
            </p>
          </div>

          {/* Sidebar — sits beside the table */}
          <div>
            <p className="text-xs uppercase mb-4" style={{ color: '#B0A89E', letterSpacing: '0.12em', fontFamily: 'var(--font-syne)' }}>
              What affects your quote
            </p>
            <ul className="space-y-2.5 mb-5">
              {factors.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#6B6360' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C49A44' }} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="rounded-xl p-4" style={{ border: '1px solid #D8D0C6', background: '#F2EDE6' }}>
              <p className="text-sm font-medium text-navy mb-1">Ready for a quote?</p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: '#9B9288' }}>
                Tell us about your space — we&apos;ll get back to you fast.
              </p>
              <button
                onClick={onQuoteClick}
                className="w-full text-xs font-medium px-4 py-2.5 min-h-[40px] text-white transition-all duration-200 hover:bg-brand-gold hover:text-navy"
                style={{ background: '#0B1D2E', borderLeft: '2px solid #C49A44' }}
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>

        {/* Info cards — full max-w-5xl width, no sidebar constraint */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-3">

          {/* Custom & partial cleaning */}
          <div className="rounded-xl p-5" style={{ border: '1px solid #D8D0C6' }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-medium text-navy leading-snug">Custom &amp; partial cleaning</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 tabular-nums"
                style={{
                  background: '#F2EDE6',
                  color: '#C49A44',
                  border: '1px solid #E8E0D6',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                4 options
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#9B9288' }}>
              Clean only what you need — by room, task, or frequency
            </p>
            <div className="h-px w-6 mb-4" style={{ background: '#C49A44' }} />
            <p className="text-sm font-medium text-navy mb-3">We don&apos;t believe cleaning has to be all-or-nothing:</p>
            <ul className="space-y-2">
              {customExamples.map((e) => (
                <li key={e} className="flex items-start gap-2.5 text-sm" style={{ color: '#6B6360' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#C49A44' }}>→</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Ways to lower your price */}
          <div className="rounded-xl p-5" style={{ border: '1px solid #D8D0C6' }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm font-medium text-navy leading-snug">Ways to lower your price</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 tabular-nums"
                style={{
                  background: '#F2EDE6',
                  color: '#C49A44',
                  border: '1px solid #E8E0D6',
                  fontFamily: 'var(--font-syne)',
                }}
              >
                5 ways
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#9B9288' }}>
              Referrals, flexible timing, recurring bookings, and more
            </p>
            <div className="h-px w-6 mb-4" style={{ background: '#C49A44' }} />
            <p className="text-sm font-medium text-navy mb-3">Help us operate efficiently — we share the savings:</p>
            <ul className="space-y-3">
              {savingsWays.map((w) => (
                <li key={w.title} className="flex items-start gap-2.5 text-sm" style={{ color: '#6B6360' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#C49A44' }}>→</span>
                  <span><strong className="text-navy font-medium">{w.title}</strong> — {w.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
