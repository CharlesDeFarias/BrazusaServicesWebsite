import { requireUser } from '@/lib/ops/auth'
import { readPayrollFeed, type PayrollDay, type PayrollWeek } from '@/lib/ops/payroll'
import { Card } from '@/components/ops/Card'
import { DataTable } from '@/components/ops/DataTable'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { bostonToday } from '@/lib/ops/time'

export const dynamic = 'force-dynamic'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function shiftDate(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Inclusive list of ISO dates from `from` to `to` (ascending); capped for safety. */
function datesBetween(from: string, to: string, cap = 31): string[] {
  const out: string[] = []
  let d = from
  while (d <= to && out.length < cap) {
    out.push(d)
    d = shiftDate(d, 1)
  }
  return out
}

function weekday(iso: string): string {
  return WEEKDAY[new Date(`${iso}T00:00:00`).getDay()]
}

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

  // Recent days = every day since the displayed week's last day (so a backlog gap is visible),
  // most-recent first. Fall back to whatever days were pushed if no week is shown.
  const today = bostonToday()
  const dayByDate = new Map(days.map((d) => [d.date, d]))
  const weekEnd = week ? shiftDate(week.weekStart, 6) : null
  const recentDates =
    weekEnd && today > weekEnd
      ? datesBetween(shiftDate(weekEnd, 1), today).reverse()
      : days.map((d) => d.date).sort((a, b) => b.localeCompare(a)).slice(0, 7)

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-white tracking-tight">Payroll</h1>
      {error && <ErrorState tone="warning">{error}</ErrorState>}
      {!error && !week && days.length === 0 && (
        <EmptyState>No payroll data available yet.</EmptyState>
      )}

      {week && (
        <section className="space-y-2">
          <h2 className="font-medium text-white">
            Week of {week.weekStart}
            <span className="text-xs text-white-35 ml-2">pushed {week.pushedAt.slice(0, 16)}</span>
          </h2>
          <DataTable className="overflow-hidden" table>
            <thead className="bg-white-5 text-white-40">
              <tr>
                <th className="text-left px-3 py-2">Check Name</th>
                <th className="text-right px-3 py-2">Hours</th>
                <th className="text-right px-3 py-2">Total Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white-10">
              {week.lines.map((l) => (
                <tr key={l.payee}>
                  <td className="px-3 py-2">{l.payee}</td>
                  <td className="px-3 py-2 text-right text-white-40">{l.hours > 0 ? l.hours.toFixed(1) : '—'}</td>
                  <td className="px-3 py-2 text-right font-medium">{money(l.pay)}</td>
                </tr>
              ))}
              <tr className="bg-white-5">
                <td className="px-3 py-2 font-semibold">Grand total</td>
                <td />
                <td className="px-3 py-2 text-right font-semibold text-brand-gold">
                  {money(week.total)}
                </td>
              </tr>
            </tbody>
          </DataTable>
          {week.anomalies?.length > 0 && (
            <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm">
              <p className="text-amber-300 font-medium mb-1">
                Needs resolution before checks are written:
              </p>
              {week.anomalies.map((a, i) => (
                <p key={i} className="text-amber-300">
                  {a.date} — {a.worker}: {a.detail}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {recentDates.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-medium text-white">
            Recent days
            {weekEnd && (
              <span className="text-xs text-white-35 ml-2">since the {weekEnd} pay week</span>
            )}
          </h2>
          <div className="space-y-3">
            {recentDates.map((date) => {
              const d = dayByDate.get(date)
              return (
                <Card key={date} className="px-3 py-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white-70 font-medium">
                      {date} <span className="text-white-35">{weekday(date)}</span>
                    </span>
                    <span className="text-white-40">{d ? money(d.total) : 'not pushed yet'}</span>
                  </div>
                  {d ? (
                    <p className="text-white-35">
                      {d.rows.map((r) => `${r.worker} ${r.hours.toFixed(1)}h`).join(' · ') ||
                        'no complete sessions'}
                    </p>
                  ) : (
                    <p className="text-white-35 italic">No punches pushed for this day.</p>
                  )}
                  {d?.anomalies && d.anomalies.length > 0 && (
                    <p className="text-amber-300 text-xs mt-1">
                      {d.anomalies.map((a) => `${a.worker}: ${a.detail}`).join(' · ')}
                    </p>
                  )}
                </Card>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
