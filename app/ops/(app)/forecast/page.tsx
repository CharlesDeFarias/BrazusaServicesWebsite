import { requireUser } from '@/lib/ops/auth'
import {
  fetchForecast,
  dateRange,
  dayToWhatsApp,
  weekToWhatsApp,
  FORECAST_SOURCE_NOTE,
  type ForecastDay,
  type ForecastUnit,
} from '@/lib/ops/forecast'
import { fetchSchedule } from '@/lib/ops/schedule'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { PropertyRow } from '@/components/ops/PropertyRow'
import { CopyButton } from '@/components/ops/CopyButton'
import { SourceNote } from '@/components/ops/SourceNote'
import { ForecastDateNav } from '@/components/ops/ForecastDateNav'
import { bostonToday } from '@/lib/ops/time'

export const dynamic = 'force-dynamic'

function unitBadge(u: ForecastUnit) {
  if (u.kind === 'ca') return 'CA'
  if (u.kind === 'restock') return 'Restock'
  if (u.kind === 'linen') return 'Linen'
  if (u.kind === 'mid') return `${u.label} (Mid)`
  return u.checkin ? `${u.label}°` : u.label
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default async function ForecastPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; view?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const todayISO = bostonToday()
  const start = /^\d{4}-\d{2}-\d{2}$/.test(params.start ?? '') ? params.start! : todayISO
  const week = params.view === 'week'
  // Day view shows today AND tomorrow (today on top); week view shows 7 days.
  const dates = dateRange(start, week ? 7 : 2)

  let days: ForecastDay[]
  let staffByDate = new Map<string, string[]>()
  let error: string | null = null
  try {
    const [forecast, sched] = await Promise.all([fetchForecast(dates), fetchSchedule(dates)])
    days = forecast
    staffByDate = new Map(sched.map((s) => [s.date, s.employees]))
  } catch {
    days = []
    error = 'Could not load Airtable data. Check ops token configuration.'
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-white tracking-tight">{week ? 'Weekly' : 'Daily'} Forecast</h1>
        <ForecastDateNav start={start} week={week} />
      </div>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && days.length === 0 && (
        <EmptyState>No cleanings scheduled in this range (or Airtable not yet imported for these dates).</EmptyState>
      )}

      {week && days.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border border-white-10 bg-white-5 px-3 py-2">
          <span className="text-sm text-white-70">Copy the whole week as one message</span>
          <CopyButton text={weekToWhatsApp(days)} label="Copy week" size="sm" />
        </div>
      )}

      {days.map((day) => {
        const d = new Date(`${day.date}T00:00:00`)
        const staff = staffByDate.get(day.date) ?? []
        return (
          <section key={day.date} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-medium text-white">
                {day.date.slice(8)}/{day.date.slice(5, 7)} — {WEEKDAYS[d.getDay()]}
              </h2>
              <CopyButton text={dayToWhatsApp(day)} label="Copy day" size="sm" />
            </div>
            {staff.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] uppercase tracking-[0.1em] text-white-35">Team:</span>
                {staff.map((name) => (
                  <span
                    key={name}
                    className="border-l-2 border-brand-gold bg-white-5 px-2 py-0.5 text-xs text-white"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
            <Card className="divide-y divide-white-10">
              {day.groups.map((g) => (
                <PropertyRow key={g.property} property={g.property} address={g.address} units={g.units} unitLabel={unitBadge} />
              ))}
            </Card>
          </section>
        )
      })}

      {days.length > 0 && (
        <SourceNote source="Airtable" loadedAt={new Date()} note={FORECAST_SOURCE_NOTE} />
      )}
    </div>
  )
}
