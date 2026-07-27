import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { dateRange, fetchForecastSummary, type ForecastSummaryRow } from '@/lib/ops/forecast'
import { fetchSchedule, type ScheduleDay } from '@/lib/ops/schedule'
import { dayMeta, type DayMeta } from '@/lib/ops/opsfeed'
import { DayStatus } from '@/components/ops/DayStatus'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { SourceNote } from '@/components/ops/SourceNote'
import { bostonToday } from '@/lib/ops/time'

export const dynamic = 'force-dynamic'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Thatch buildings — anything else in a forecast label is a non-Thatch (residential) client,
// which we color-code so it stands out.
const THATCH = [
  'prentiss', '30 webro', '80 dot', '304 newb', 'charles', 'burbank', 'highl', 'symphony',
  'quarters', 'newbury', 'dorchester', 'broadway', 'jmf',
]
function isNonThatch(label: string): boolean {
  const l = label.toLowerCase()
  return !THATCH.some((b) => l.includes(b))
}

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
  const todayISO = bostonToday()
  const start = /^\d{4}-\d{2}-\d{2}$/.test(params.start ?? '') ? params.start! : todayISO
  const dates = dateRange(start, 7)

  let days: ScheduleDay[] = []
  let summary = new Map<string, ForecastSummaryRow[]>()
  let meta = new Map<string, DayMeta>()
  let error: string | null = null
  try {
    ;[days, summary, meta] = await Promise.all([
      fetchSchedule(dates),
      fetchForecastSummary(dates),
      dayMeta().catch(() => new Map<string, DayMeta>()),
    ])
  } catch {
    error = 'Could not load the schedule from Airtable. Check ops token configuration.'
  }

  const end = dates[dates.length - 1]
  const scheduleByDate = new Map(days.map((d) => [d.date, d]))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Schedule</h1>
          <p className="text-xs text-white-35">Workload + staffing for the week, at a glance.</p>
        </div>
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
          const m = meta.get(date)
          if (!day && rows.length === 0 && !m) return null
          const d = new Date(`${date}T00:00:00`)
          const employees = day?.employees ?? []
          const totalCleans = rows.reduce((s, r) => s + r.total, 0)
          const totalCheckins = rows.reduce((s, r) => s + r.checkins, 0)
          return (
            <section key={date} className="space-y-2">
              <h2 className="font-medium text-white">
                {date.slice(8)}/{date.slice(5, 7)} — {WEEKDAYS[d.getDay()]}
                {totalCleans > 0 && (
                  <span className="text-white-35 text-sm">
                    {' '}· {totalCleans} cleans · {totalCheckins} check-ins · {employees.length} staff
                  </span>
                )}
              </h2>
              <Card className="px-3 py-3 space-y-3">
                {/* Day planning status: roster / sent / notified + cleaner assignments */}
                <DayStatus
                  date={date}
                  initial={{
                    rosterConfirmed: m?.rosterConfirmed ?? false,
                    scheduleSent: m?.scheduleSent ?? false,
                    cleanersNotified: m?.cleanersNotified ?? false,
                    assignments: m?.assignments ?? '',
                  }}
                />

                {employees.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 border-t border-white-10 pt-2">
                    {employees.map((name) => (
                      <span
                        key={name}
                        className="border-l-2 border-brand-gold bg-white-5 px-2 py-1 text-xs text-white"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}

                {rows.length > 0 && (
                  <div className="border-t border-white-10 pt-2 space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-white-35">Forecast</p>
                    {rows.map((r) => {
                      const nonThatch = isNonThatch(r.label)
                      return (
                        <div key={r.label} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                          <span
                            className={
                              nonThatch
                                ? 'rounded bg-purple-400/15 px-1.5 font-medium text-purple-300'
                                : 'font-medium text-white-70'
                            }
                            title={nonThatch ? 'non-Thatch (residential) client' : undefined}
                          >
                            {r.label}
                          </span>
                          <span className="whitespace-nowrap text-white-40">
                            <span className="font-medium text-brand-gold">{r.checkins}</span> check-in
                            {' · '}
                            <span className="text-white-70">{r.total - r.checkins}</span> no check-in
                          </span>
                        </div>
                      )
                    })}
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
          source="Airtable Scheduling + forecast · ops sheet ‘schedule’ (notes) + ‘daymeta’ (status/assignments)"
          loadedAt={new Date()}
          note="Non-Thatch (residential) clients are highlighted. Tap the status flags to update; assign staff in Airtable."
        />
      )}
    </div>
  )
}
