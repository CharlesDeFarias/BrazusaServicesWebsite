import { latestCleaningList } from '@/lib/ops/opsfeed'
import { CopyButton } from '@/components/ops/CopyButton'
import { SourceNote } from '@/components/ops/SourceNote'
import { ErrorState, EmptyState } from '@/components/ops/StateMessage'

export const dynamic = 'force-dynamic'

const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default async function CleaningListPage() {
  let feed = null
  let error: string | null = null
  try {
    feed = await latestCleaningList()
  } catch {
    error = 'Could not read the cleaning list (sheet not configured).'
  }

  // Anchor at noon so the YYYY-MM-DD date doesn't roll back a day in ET.
  const day = feed?.date ? new Date(feed.date + 'T12:00:00') : null
  const heading = day ? `${WD[day.getDay()]}, ${day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Cleaning List</h1>
          {feed && <p className="text-xs text-white-45">{heading}</p>}
        </div>
        {feed && <CopyButton text={feed.whatsappText} label="Copy for WhatsApp" />}
      </div>

      <p className="text-xs text-white-35">
        Breezeway (Thatch, extension-screened) + residential from Airtable. This is the list the team
        works from - the Forecast page reads Airtable directly and can lag.
      </p>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && !feed && <EmptyState>No cleaning list published yet. Run the daily build.</EmptyState>}

      {feed && (
        <div className="space-y-4">
          {feed.buildings.map((g) => (
            <div key={g.building} className="rounded-lg border border-white-10 bg-white-5 p-3">
              <h2 className="mb-1.5 text-sm font-semibold text-white">{g.building}</h2>
              <div className="flex flex-wrap gap-1.5">
                {g.units.map((u, i) => (
                  <span
                    key={i}
                    className={`rounded px-2 py-0.5 text-sm ${
                      u.checkin
                        ? 'bg-brand-gold/15 text-brand-gold font-semibold'
                        : 'bg-white-5 text-white-70'
                    }`}
                    title={u.checkin ? 'same-day check-in' : undefined}
                  >
                    {u.label}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {feed.residential.length > 0 && (
            <div className="rounded-lg border border-white-10 bg-white-5 p-3">
              <h2 className="mb-1.5 text-sm font-semibold text-white">Residential</h2>
              <ul className="space-y-1">
                {feed.residential.map((r, i) => (
                  <li key={i} className="text-sm text-white-70">
                    <span className="font-medium text-white">{r.client}</span> — {r.address}
                    <span className="text-white-45"> · {r.task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-sm text-white-70">
            <span className="font-semibold text-white">{feed.totals.cleans}</span> cleans ·{' '}
            <span className="font-semibold text-white">{feed.totals.checkins}</span> check-ins
            {feed.totals.residential > 0 && ` · ${feed.totals.residential} residential`}
          </p>

          {feed.held.length > 0 && (
            <div className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                Held — likely extensions (verify)
              </h2>
              <p className="text-sm text-white-70">{feed.held.map((h) => h.unit).join(', ')}</p>
            </div>
          )}

          {feed.unmatched.length > 0 && (
            <div className="rounded-lg border border-red-400/25 bg-red-400/5 p-3">
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-300">
                Check-in with no unit — possible missed clean
              </h2>
              <p className="text-sm text-white-70">
                {feed.unmatched.map((u) => u.guest || `home ${u.home_id}`).join(', ')}
              </p>
            </div>
          )}

          <SourceNote
            source="Breezeway + Airtable residential"
            loadedAt={new Date(feed.generatedAt || Date.now())}
            note="Assembled locally and pushed; refresh by re-running the daily build."
          />
        </div>
      )}
    </div>
  )
}
