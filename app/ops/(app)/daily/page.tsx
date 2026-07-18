import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { fetchForecast, type ForecastDay, type ForecastUnit } from '@/lib/ops/forecast'
import { readPayrollFeed, type PayrollDay } from '@/lib/ops/payroll'

export const dynamic = 'force-dynamic'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function unitBadge(u: ForecastUnit) {
  if (u.kind === 'ca') return 'CA'
  if (u.kind === 'restock') return 'Restock'
  if (u.kind === 'linen') return 'Linen'
  if (u.kind === 'mid') return `${u.label} (Mid)`
  return u.checkin ? `${u.label}°` : u.label
}

function shiftDate(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default async function DailyPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const today = new Date().toISOString().slice(0, 10)
  const date = /^\d{4}-\d{2}-\d{2}$/.test(params.date ?? '') ? params.date! : today
  const yesterday = shiftDate(date, -1)

  let forecast: ForecastDay[] = []
  let labor: PayrollDay | undefined
  let forecastErr = false
  try {
    forecast = await fetchForecast([date])
  } catch {
    forecastErr = true
  }
  try {
    const feed = await readPayrollFeed()
    labor = feed.days.find((d) => d.date === yesterday)
  } catch {
    /* payroll feed optional */
  }

  const day = forecast[0]
  const checkins = day?.groups.flatMap((g) => g.units).filter((u) => u.checkin).length ?? 0
  const cleans = day?.groups.flatMap((g) => g.units).length ?? 0
  const wd = WEEKDAYS[new Date(`${date}T00:00:00`).getDay()]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Daily Report</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/ops/daily?date=${shiftDate(date, -1)}`} className="text-neutral-400">←</Link>
          <span className="text-neutral-200">{date}</span>
          <Link href={`/ops/daily?date=${shiftDate(date, 1)}`} className="text-neutral-400">→</Link>
        </div>
      </div>

      <section className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h2 className="font-medium text-neutral-200">Cleanings — {wd}</h2>
          <span className="text-xs text-neutral-500">
            {cleans} cleans · {checkins} check-ins
          </span>
        </div>
        {forecastErr && <p className="text-red-400 text-sm">Could not load Airtable.</p>}
        {!forecastErr && !day && <p className="text-neutral-400 text-sm">Nothing scheduled.</p>}
        {day && (
          <div className="rounded-lg border border-neutral-800 divide-y divide-neutral-800">
            {day.groups.map((g) => (
              <div key={g.property} className="px-3 py-2 flex flex-wrap items-baseline gap-x-2">
                <span className="font-medium text-neutral-300 mr-1">{g.property}:</span>
                {g.units.map((u, i) => (
                  <span key={i} className={u.checkin ? 'font-bold text-emerald-400' : 'text-neutral-300'}>
                    {unitBadge(u)}
                    {i < g.units.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-neutral-600">° = same-day check-in · full week on the <Link href={`/ops/forecast?start=${date}&view=week`} className="underline">Forecast</Link> page</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-medium text-neutral-200">
          Yesterday&apos;s labor <span className="text-neutral-500 text-sm">({yesterday})</span>
        </h2>
        {!labor && (
          <p className="text-neutral-400 text-sm">No payroll pushed for {yesterday} yet.</p>
        )}
        {labor && (
          <div className="rounded-lg border border-neutral-800 px-3 py-2 text-sm space-y-1">
            {labor.rows.map((r) => (
              <div key={r.worker} className="flex justify-between">
                <span className="text-neutral-300">{r.worker}</span>
                <span className="text-neutral-400">
                  {r.hours.toFixed(1)}h · <span className="text-neutral-200">{money(r.pay)}</span>
                </span>
              </div>
            ))}
            <div className="flex justify-between border-t border-neutral-800 pt-1 font-medium">
              <span>Total labor</span>
              <span className="text-emerald-400">{money(labor.total)}</span>
            </div>
            {labor.anomalies?.length > 0 && (
              <div className="text-amber-400/90 text-xs pt-1">
                {labor.anomalies.map((a, i) => (
                  <p key={i}>{a.worker}: {a.detail}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
