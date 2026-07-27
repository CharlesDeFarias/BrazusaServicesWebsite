import { latestCleaningList } from '@/lib/ops/opsfeed'
import { fetchSchedule } from '@/lib/ops/schedule'
import { CopyButton } from '@/components/ops/CopyButton'
import { SourceNote } from '@/components/ops/SourceNote'
import { ErrorState, EmptyState } from '@/components/ops/StateMessage'

export const dynamic = 'force-dynamic'

const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default async function CleaningListPage() {
  let feed = null
  let employees: string[] = []
  let error: string | null = null
  try {
    feed = await latestCleaningList()
    if (feed?.date) {
      const sched = await fetchSchedule([feed.date]).catch(() => [])
      employees = sched[0]?.employees ?? []
    }
  } catch {
    error = 'Could not read the cleaning list (sheet not configured).'
  }

  // Anchor at noon so the YYYY-MM-DD date doesn't roll back a day in ET.
  const day = feed?.date ? new Date(feed.date + 'T12:00:00') : null
  const heading = day
    ? `${WD[day.getDay()]}, ${day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : ''

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Daily</h1>
          {feed && <p className="text-xs text-white-45">{heading}</p>}
        </div>
        {feed && <CopyButton text={feed.whatsappText} label="Copy for WhatsApp" />}
      </div>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && !feed && <EmptyState>No cleaning list published yet. Run the daily build.</EmptyState>}

      {feed && (
        <div className="space-y-3">
          {/* Scheduled cleaners for the day */}
          {employees.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="uppercase tracking-wide text-white-35">Cleaners</span>
              {employees.map((n) => (
                <span
                  key={n}
                  className="rounded border-l-2 border-brand-gold bg-white-5 px-1.5 py-0.5 text-white"
                >
                  {n}
                </span>
              ))}
            </div>
          )}

          {/* Condensed: one line per building, check-in units in gold */}
          <div className="rounded-lg border border-white-10 bg-white-5 px-3 py-1">
            {feed.buildings.map((g) => (
              <div
                key={g.building}
                className="flex flex-wrap items-baseline gap-x-1.5 border-b border-white-10 py-1.5 text-sm last:border-0"
              >
                <span className="mr-1 whitespace-nowrap font-semibold text-white">{g.building}</span>
                {g.units.map((u, i) => (
                  <span
                    key={i}
                    className={u.checkin ? 'font-semibold text-brand-gold' : 'text-white-60'}
                    title={u.checkin ? 'same-day check-in' : undefined}
                  >
                    {u.label}
                    {i < g.units.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Residential (non-Thatch) — color-highlighted */}
          {feed.residential.length > 0 && (
            <div className="rounded-lg border border-purple-400/25 bg-purple-400/5 px-3 py-1.5">
              <span className="text-[11px] uppercase tracking-wide text-purple-300">Residential</span>
              {feed.residential.map((r, i) => (
                <div key={i} className="text-sm text-white-70">
                  <span className="font-medium text-purple-200">{r.client}</span> — {r.address}
                  <span className="text-white-45"> · {r.task}</span>
                </div>
              ))}
            </div>
          )}

          <p className="border-t border-white-10 pt-2 text-sm text-white-70">
            <span className="font-semibold text-brand-gold">{feed.totals.checkins}</span> check-ins ·{' '}
            <span className="font-semibold text-white">
              {feed.totals.cleans - feed.totals.checkins}
            </span>{' '}
            no check-in ·{' '}
            <span className="font-semibold text-white">{feed.totals.cleans}</span> total
            {feed.totals.residential > 0 && ` · ${feed.totals.residential} residential`}
          </p>

          {feed.held.length > 0 && (
            <div className="rounded-lg border border-amber-400/25 bg-amber-400/5 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                ⚠ Held — likely extensions (verify):{' '}
              </span>
              <span className="text-sm text-white-70">{feed.held.map((h) => h.unit).join(', ')}</span>
            </div>
          )}

          {feed.unmatched.length > 0 && (
            <div className="rounded-lg border border-red-400/25 bg-red-400/5 px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-red-300">
                ⚠ Check-in with no unit — possible missed clean:{' '}
              </span>
              <span className="text-sm text-white-70">
                {feed.unmatched.map((u) => u.guest || `home ${u.home_id}`).join(', ')}
              </span>
            </div>
          )}

          <SourceNote
            source="Breezeway + Airtable residential · cleaners from Airtable Scheduling"
            loadedAt={new Date(feed.generatedAt || Date.now())}
            note="Assembled locally and pushed; refresh by re-running the daily build."
          />
        </div>
      )}
    </div>
  )
}
