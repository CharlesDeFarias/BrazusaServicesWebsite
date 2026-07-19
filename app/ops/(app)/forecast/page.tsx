import { requireUser } from '@/lib/ops/auth'
import { fetchForecast, dateRange, type ForecastDay, type ForecastUnit } from '@/lib/ops/forecast'
import Link from 'next/link'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { PropertyRow } from '@/components/ops/PropertyRow'

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
  const todayISO = new Date().toISOString().slice(0, 10)
  const start = /^\d{4}-\d{2}-\d{2}$/.test(params.start ?? '') ? params.start! : todayISO
  const week = params.view === 'week'
  const dates = dateRange(start, week ? 7 : 1)

  let days: ForecastDay[]
  let error: string | null = null
  try {
    days = await fetchForecast(dates)
  } catch {
    days = []
    error = 'Could not load Airtable data. Check ops token configuration.'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {week ? 'Weekly' : 'Daily'} Forecast <span className="text-neutral-500">{start}</span>
        </h1>
        <div className="flex gap-2 text-sm">
          <Link
            href={`/ops/forecast?start=${start}`}
            className={!week ? 'text-white underline' : 'text-neutral-400'}
          >
            Day
          </Link>
          <Link
            href={`/ops/forecast?start=${start}&view=week`}
            className={week ? 'text-white underline' : 'text-neutral-400'}
          >
            Week
          </Link>
        </div>
      </div>

      <p className="text-xs text-neutral-500">° = same-day check-in (from Reservations)</p>
      {error && <ErrorState>{error}</ErrorState>}
      {!error && days.length === 0 && (
        <EmptyState>No cleanings scheduled in this range (or Airtable not yet imported for these dates).</EmptyState>
      )}

      {days.map((day) => {
        const d = new Date(`${day.date}T00:00:00`)
        return (
          <section key={day.date} className="space-y-2">
            <h2 className="font-medium text-neutral-200">
              {day.date.slice(8)}/{day.date.slice(5, 7)} — {WEEKDAYS[d.getDay()]}
            </h2>
            <Card className="divide-y divide-neutral-800">
              {day.groups.map((g) => (
                <PropertyRow
                  key={g.property}
                  property={g.property}
                  units={g.units}
                  unitLabel={unitBadge}
                />
              ))}
            </Card>
          </section>
        )
      })}
    </div>
  )
}
