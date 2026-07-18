import { requireUser } from '@/lib/ops/auth'
import { readPayrollFeed, type PayrollDay, type PayrollWeek } from '@/lib/ops/payroll'

export const dynamic = 'force-dynamic'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function PayrollPage() {
  await requireUser()

  let weeks: PayrollWeek[]
  let days: PayrollDay[]
  let error: string | null = null
  try {
    ;({ weeks, days } = await readPayrollFeed())
  } catch {
    weeks = []
    days = []
    error = 'Payroll feed not available yet (sheet not configured or no pushes).'
  }

  const week = weeks?.[0]

  return (
    <div className="space-y-8">
      <h1 className="text-lg font-semibold">Payroll</h1>
      {error && <p className="text-amber-400 text-sm">{error}</p>}

      {week && (
        <section className="space-y-2">
          <h2 className="font-medium text-neutral-200">
            Week of {week.weekStart}
            <span className="text-xs text-neutral-500 ml-2">pushed {week.pushedAt.slice(0, 16)}</span>
          </h2>
          <div className="rounded-lg border border-neutral-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900 text-neutral-400">
                <tr>
                  <th className="text-left px-3 py-2">Check Name</th>
                  <th className="text-right px-3 py-2">Hours</th>
                  <th className="text-right px-3 py-2">Total Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {week.lines.map((l) => (
                  <tr key={l.payee}>
                    <td className="px-3 py-2">{l.payee}</td>
                    <td className="px-3 py-2 text-right text-neutral-400">{l.hours.toFixed(1)}</td>
                    <td className="px-3 py-2 text-right font-medium">{money(l.pay)}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-900/60">
                  <td className="px-3 py-2 font-semibold">Grand total</td>
                  <td />
                  <td className="px-3 py-2 text-right font-semibold text-emerald-400">
                    {money(week.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {week.anomalies?.length > 0 && (
            <div className="rounded-lg border border-amber-900/60 bg-amber-950/30 px-3 py-2 text-sm">
              <p className="text-amber-400 font-medium mb-1">
                Needs resolution before checks are written:
              </p>
              {week.anomalies.map((a, i) => (
                <p key={i} className="text-amber-200/80">
                  {a.date} — {a.worker}: {a.detail}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {days && days.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-medium text-neutral-200">Recent days</h2>
          <div className="space-y-3">
            {days.slice(0, 7).map((d) => (
              <div key={d.date} className="rounded-lg border border-neutral-800 px-3 py-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-300 font-medium">{d.date}</span>
                  <span className="text-neutral-400">{money(d.total)}</span>
                </div>
                <p className="text-neutral-500">
                  {d.rows.map((r) => `${r.worker} ${r.hours.toFixed(1)}h`).join(' · ') || 'no complete sessions'}
                </p>
                {d.anomalies?.length > 0 && (
                  <p className="text-amber-400/80 text-xs mt-1">
                    {d.anomalies.map((a) => `${a.worker}: ${a.detail}`).join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
