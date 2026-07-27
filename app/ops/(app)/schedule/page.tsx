import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { dateRange, fetchForecast, type ForecastDay, type ForecastUnit } from '@/lib/ops/forecast'
import { fetchSchedule, type ScheduleDay } from '@/lib/ops/schedule'
import { dayMeta, type DayMeta } from '@/lib/ops/opsfeed'
import { DayStatus } from '@/components/ops/DayStatus'
import { WeekRosterButton } from '@/components/ops/WeekRosterButton'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { SourceNote } from '@/components/ops/SourceNote'
import { bostonToday } from '@/lib/ops/time'

export const dynamic = 'force-dynamic'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const THATCH = [
  'prentiss', '30 webro', '80 dot', '304 newb', 'charles', 'burbank', 'highl', 'symphony',
  'quarters', 'newbury', 'dorchester', 'broadway', 'jmf',
]
const isNonThatch = (label: string) => !THATCH.some((b) => label.toLowerCase().includes(b))

function unitBadge(u: ForecastUnit): string {
  if (u.kind === 'ca') return 'CA'
  if (u.kind === 'restock') return 'Restock'
  if (u.kind === 'linen') return 'Linen'
  if (u.kind === 'mid') return `${u.label} (Mid)`
  return u.label
}

function shiftDate(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; days?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const todayISO = bostonToday()
  const start = /^\d{4}-\d{2}-\d{2}$/.test(params.start ?? '') ? params.start! : todayISO
  const numDays = Math.min(Math.max(Number(params.days) || 7, 7), 35)
  const dates = dateRange(start, numDays)

  let forecast: ForecastDay[] = []
  let sched: ScheduleDay[] = []
  let meta = new Map<string, DayMeta>()
  let error: string | null = null
  try {
    ;[forecast, sched, meta] = await Promise.all([
      fetchForecast(dates),
      fetchSchedule(dates),
      dayMeta().catch(() => new Map<string, DayMeta>()),
    ])
  } catch {
    error = 'Could not load the schedule from Airtable. Check ops token configuration.'
  }

  const end = dates[dates.length - 1]
  const forecastByDate = new Map(forecast.map((d) => [d.date, d]))
  const scheduleByDate = new Map(sched.map((d) => [d.date, d]))

  // for the week-roster button: each visible day's current meta
  const weekDays = dates.map((date) => {
    const m = meta.get(date)
    return {
      date,
      rosterConfirmed: m?.rosterConfirmed ?? false,
      scheduleSent: m?.scheduleSent ?? false,
      cleanersNotified: m?.cleanersNotified ?? false,
      assignments: m?.assignments ?? '',
    }
  })

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

      {!error && <WeekRosterButton days={weekDays} />}

      {error && <ErrorState>{error}</ErrorState>}
      {!error && forecast.length === 0 && sched.length === 0 && (
        <EmptyState>Nothing scheduled or forecast in this range yet.</EmptyState>
      )}

      {!error &&
        dates.map((date) => {
          const day = forecastByDate.get(date)
          const groups = day?.groups ?? []
          const s = scheduleByDate.get(date)
          const m = meta.get(date)
          const employees = s?.employees ?? []
          const allUnits = groups.flatMap((g) => g.units)
          const total = allUnits.length
          const checkins = allUnits.filter((u) => u.checkin).length
          if (total === 0 && employees.length === 0 && !m) return null
          const d = new Date(`${date}T00:00:00`)
          return (
            <section key={date} className="space-y-2">
              <h2 className="font-medium text-white">
                {date.slice(8)}/{date.slice(5, 7)} — {WEEKDAYS[d.getDay()]}
              </h2>
              <div className="space-y-3 rounded-lg border border-white-10 bg-white-5 px-3 py-3">
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
                        className="rounded border-l-2 border-brand-gold bg-white-5 px-2 py-1 text-xs text-white"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actual units, one line per building */}
                {groups.length > 0 && (
                  <div className="border-t border-white-10 pt-2">
                    {groups.map((g) => (
                      <div
                        key={g.property}
                        className="flex flex-wrap items-baseline gap-x-1.5 border-b border-white-10 py-1.5 text-sm last:border-0"
                      >
                        <span
                          className={
                            isNonThatch(g.property)
                              ? 'mr-1 whitespace-nowrap rounded bg-purple-400/15 px-1.5 font-semibold text-purple-300'
                              : 'mr-1 whitespace-nowrap font-semibold text-white'
                          }
                        >
                          {g.property}
                        </span>
                        {g.units.map((u, i) => (
                          <span
                            key={i}
                            className={u.checkin ? 'font-semibold text-brand-gold' : 'text-white-60'}
                          >
                            {u.checkin ? `${unitBadge(u)}°` : unitBadge(u)}
                            {i < g.units.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Day total at the bottom */}
                {total > 0 && (
                  <p className="border-t border-white-10 pt-2 text-sm text-white-70">
                    <span className="font-semibold text-brand-gold">{checkins}</span> check-ins ·{' '}
                    <span className="font-semibold text-white">{total - checkins}</span> no check-in ·{' '}
                    <span className="font-semibold text-white">{total}</span> total
                    <span className="text-white-35"> · {employees.length} staff</span>
                  </p>
                )}

                {s?.note && (
                  <p className="border-t border-white-10 pt-2 text-sm text-white-70">
                    <span className="text-brand-gold">Note: </span>
                    {s.note}
                  </p>
                )}
              </div>
            </section>
          )
        })}

      {!error && numDays < 35 && (
        <div className="pt-1">
          <Link
            href={`/ops/schedule?start=${start}&days=${numDays + 7}`}
            className="text-sm text-brand-gold hover:underline"
          >
            See more →
          </Link>
        </div>
      )}

      {!error && (
        <SourceNote
          source="Airtable forecast + Scheduling · ops sheet ‘schedule’ (notes) + ‘daymeta’ (status/assignments)"
          loadedAt={new Date()}
          note="Non-Thatch clients highlighted. Tap the status flags or “Confirm roster — whole week”."
        />
      )}
    </div>
  )
}
