const ways = [
  {
    title: 'Referrals',
    desc: 'Send us a client. If we complete a cleaning, you get rewarded.',
  },
  {
    title: 'Schedule with neighbors',
    desc: 'If you and nearby clients book on the same day, it reduces our travel time — which lowers your cost.',
  },
  {
    title: 'Flexible timing',
    desc: "If you're flexible on when we clean, it lets us optimize our schedule.",
  },
  {
    title: 'Recurring service',
    desc: 'Consistent cleanings are easier to maintain and more efficient.',
  },
  {
    title: 'Helping us grow locally',
    desc: "Connecting us with property managers, letting us share info in your building, or helping us build local relationships can all translate into better pricing.",
  },
]

export default function Promotions() {
  return (
    <section className="bg-off-white border-t border-light-gray py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Ways to lower your cost</h2>
        <p className="text-gray-600 leading-relaxed mb-10">
          If you help us operate more efficiently, we pass that savings to you.
        </p>
        <div className="space-y-7 mb-10">
          {ways.map((w) => (
            <div key={w.title}>
              <p className="font-semibold text-navy mb-1">{w.title}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-light-gray pt-6">
          <p className="text-sm text-gray-500">
            We&apos;re open to creative setups. If there&apos;s a way to make things work better for both sides, we&apos;ll usually find it.
          </p>
        </div>
      </div>
    </section>
  )
}
