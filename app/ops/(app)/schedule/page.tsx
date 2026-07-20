import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { dateRange, fetchForecastSummary, type ForecastSummaryRow } from '@/lib/ops/forecast'
import { fetchSchedule, type ScheduleDay } from '@/lib/ops/schedule'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { SourceNote } from '@/components/ops/SourceNote'

export const dynamic = 'force-dynamic'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function shiftDate(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const todayISO = new Date().toISOString().slice(0, 10)
  const start = /^\d{4}-\d{2}-\d{2}$/.test(params.start ?? '') ? params.start! : todayISO
  const dates = dateRange(start, 7)

  let days: ScheduleDay[] = []
  let summary = new Map<string, ForecastSummaryRow[]>()
  let error: string | null = null
  try {
    ;[days, summary] = await Promise.all([fetchSchedule(dates), fetchForecastSummary(dates)])
  } catch {
    error = 'Could not load the schedule from Airtable. Check ops token configuration.'
  }

  const end = dates[dates.length - 1]
  const scheduleByDate = new Map(days.map((d) => [d.date, d]))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-white tracking-tight">Schedule</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/ops/schedule?start=${shiftDate(start, -7)}`} className="text-white-40 hover:text-white">←</Link>
          <span className="text-white-70">{start} – {end}</span>
          <Link href={`/ops/schedule?start=${shiftDate(start, 7)}`} className="text-white-40 hover:text-white">→</Link>
        </div>
      </div>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && days.length === 0 && summary.size === 0 && (
        <EmptyState>Nothing scheduled or forecast in this range yet.</EmptyState>
      )}

      {!error &&
        dates.map((date) => {
          const day = scheduleByDate.get(date)
          const rows = summary.get(date) ?? []
          if (!day && rows.length === 0) return null
          const d = new Date(`${date}T00:00:00`)
          const employees = day?.employees ?? []
          return (
            <section key={date} className="space-y-2">
              <h2 className="font-medium text-white">
                {date.slice(8)}/{date.slice(5, 7)} — {WEEKDAYS[d.getDay()]}
                <span className="text-white-35 text-sm"> · {employees.length}</span>
              </h2>
              <Card className="px-3 py-3 space-y-3">
                {employees.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {employees.map((name) => (
                      <span
                        key={name}
                        className="border-l-2 border-brand-gold bg-white-5 px-2 py-1 text-xs text-white"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white-35">No employees assigned.</p>
                )}

                {rows.length > 0 && (
                  <div className="border-t border-white-10 pt-2 space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-white-35">Forecast</p>
                    {rows.map((r) => (
                      <div key={r.label} className="flex justify-between gap-3 text-sm">
                        <span className="text-white-70 truncate">{r.label}</span>
                        <span className="whitespace-nowrap text-white-40">
                          <span className="font-medium text-brand-gold">{r.checkins}</span> check-in
                          {' · '}
                          <span className="text-white-70">{r.total - r.checkins}</span> no check-in
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {day?.note && (
                  <p className="border-t border-white-10 pt-2 text-sm text-white-70">
                    <span className="text-brand-gold">Note: </span>
                    {day.note}
                  </p>
                )}
              </Card>
            </section>
          )
        })}

      {!error && (
        <SourceNote
          source="Airtable Scheduling (employees) + ops sheet ‘schedule’ tab (notes)"
          loadedAt={new Date()}
          note="Assign staff in Airtable; add a per-day note in the sheet’s schedule tab (date, note)."
        />
      )}
    </div>
  )
}
