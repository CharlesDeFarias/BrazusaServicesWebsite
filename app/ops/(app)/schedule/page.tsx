import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { dateRange } from '@/lib/ops/forecast'
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
  let error: string | null = null
  try {
    days = await fetchSchedule(dates)
  } catch {
    error = 'Could not load the schedule from Airtable. Check ops token configuration.'
  }

  const end = dates[dates.length - 1]

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
      {!error && days.length === 0 && (
        <EmptyState>No one scheduled in this range yet.</EmptyState>
      )}

      {days.map((day) => {
        const d = new Date(`${day.date}T00:00:00`)
        return (
          <section key={day.date} className="space-y-2">
            <h2 className="font-medium text-white">
              {day.date.slice(8)}/{day.date.slice(5, 7)} — {WEEKDAYS[d.getDay()]}
              <span className="text-white-35 text-sm"> · {day.employees.length}</span>
            </h2>
            <Card className="px-3 py-3 space-y-2">
              {day.employees.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {day.employees.map((name) => (
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
              {day.note && (
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
