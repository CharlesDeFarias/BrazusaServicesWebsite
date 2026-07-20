import { requireUser } from '@/lib/ops/auth'
import { readPayrollFeed, type PayrollDay, type PayrollWeek } from '@/lib/ops/payroll'
import { Card } from '@/components/ops/Card'
import { DataTable } from '@/components/ops/DataTable'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'

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
      <h1 className="text-xl font-bold text-navy tracking-tight">Payroll</h1>
      {error && <ErrorState tone="warning">{error}</ErrorState>}
      {!error && !week && days.length === 0 && (
        <EmptyState>No payroll data available yet.</EmptyState>
      )}

      {week && (
        <section className="space-y-2">
          <h2 className="font-medium text-navy">
            Week of {week.weekStart}
            <span className="text-xs text-warm-gray ml-2">pushed {week.pushedAt.slice(0, 16)}</span>
          </h2>
          <DataTable className="overflow-hidden" table>
            <thead className="bg-linen text-warm-gray-dark">
              <tr>
                <th className="text-left px-3 py-2">Check Name</th>
                <th className="text-right px-3 py-2">Hours</th>
                <th className="text-right px-3 py-2">Total Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-10">
              {week.lines.map((l) => (
                <tr key={l.payee}>
                  <td className="px-3 py-2">{l.payee}</td>
                  <td className="px-3 py-2 text-right text-warm-gray-dark">{l.hours.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right font-medium">{money(l.pay)}</td>
                </tr>
              ))}
              <tr className="bg-linen">
                <td className="px-3 py-2 font-semibold">Grand total</td>
                <td />
                <td className="px-3 py-2 text-right font-semibold text-brand-gold">
                  {money(week.total)}
                </td>
              </tr>
            </tbody>
          </DataTable>
          {week.anomalies?.length > 0 && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm">
              <p className="text-amber-800 font-medium mb-1">
                Needs resolution before checks are written:
              </p>
              {week.anomalies.map((a, i) => (
                <p key={i} className="text-amber-700">
                  {a.date} — {a.worker}: {a.detail}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {days && days.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-medium text-navy">Recent days</h2>
          <div className="space-y-3">
            {days.slice(0, 7).map((d) => (
              <Card key={d.date} className="px-3 py-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy/80 font-medium">{d.date}</span>
                  <span className="text-warm-gray-dark">{money(d.total)}</span>
                </div>
                <p className="text-warm-gray">
                  {d.rows.map((r) => `${r.worker} ${r.hours.toFixed(1)}h`).join(' · ') || 'no complete sessions'}
                </p>
                {d.anomalies?.length > 0 && (
                  <p className="text-amber-700 text-xs mt-1">
                    {d.anomalies.map((a) => `${a.worker}: ${a.detail}`).join(' · ')}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
