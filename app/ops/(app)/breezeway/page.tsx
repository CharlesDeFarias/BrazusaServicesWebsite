import { requireUser } from '@/lib/ops/auth'
import { latestBreezeway, latestReconcile, type BreezewayTask } from '@/lib/ops/opsfeed'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { CopyButton } from '@/components/ops/CopyButton'

export const dynamic = 'force-dynamic'

function shortProp(name: string): string {
  // keep the recognizable tail (building + unit), drop the neighborhood prefix
  const cleaned = name.replace(/\s*\(Unknown\)\s*$/, '').trim()
  return cleaned.length > 52 ? '…' + cleaned.slice(-50) : cleaned
}

export default async function BreezewayPage() {
  await requireUser()

  let feed
  let reconcile = null
  let error: string | null = null
  try {
    ;[feed, reconcile] = await Promise.all([latestBreezeway(), latestReconcile()])
  } catch {
    error = 'Could not read the Breezeway/Reconcile feed (sheet not configured).'
  }

  const byDate = new Map<string, BreezewayTask[]>()
  for (const t of feed?.tasks ?? []) {
    const d = t[1]
    if (!byDate.has(d)) byDate.set(d, [])
    byDate.get(d)!.push(t)
  }
  const dates = [...byDate.keys()].sort()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Breezeway</h1>
        <p className="text-xs text-white-35">
          Internal Thatch source-of-truth: the reconcile check (Airtable vs Breezeway) and the raw
          capture behind it.
        </p>
      </div>

      {error && <ErrorState>{error}</ErrorState>}

      {/* Reconcile — the actionable discrepancies */}
      <section className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white-45">Reconcile</h2>
          {reconcile && <CopyButton text={reconcile.report} label="Copy report" size="sm" />}
        </div>
        {!reconcile && !error && <EmptyState>No reconcile report published yet.</EmptyState>}
        {reconcile && (
          <>
            <p className="text-xs text-white-35">
              Window {reconcile.window || '—'} · generated{' '}
              {reconcile.generatedAt.replace('T', ' ').slice(0, 16)}
            </p>
            <pre className="overflow-x-auto rounded-lg border border-white-10 bg-white-5 p-3 text-xs leading-relaxed text-white whitespace-pre-wrap">
              {reconcile.report}
            </pre>
          </>
        )}
      </section>

      {/* Raw Breezeway capture */}
      <section className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white-45">
            Breezeway capture
          </h2>
          {feed && <CopyButton text={feed.raw} label="Copy raw JSON" size="sm" />}
        </div>
        {!feed && !error && <EmptyState>No Breezeway capture published yet.</EmptyState>}
        {feed && (
          <>
            <p className="text-xs text-white-35">
              Most recent capture · {feed.tasks.length} tasks · {feed.reservationCount} reservations ·
              captured {feed.capturedAt.replace('T', ' ').slice(0, 16)}
            </p>
            {dates.map((d) => {
              const day = new Date(`${d}T00:00:00`)
              const wd = day.toLocaleDateString('en-US', { weekday: 'short' })
              return (
                <section key={d} className="space-y-1">
                  <h3 className="text-sm font-medium text-white-70">
                    {d} <span className="text-white-35">({wd})</span>{' '}
                    <span className="text-white-35">· {byDate.get(d)!.length}</span>
                  </h3>
                  <Card className="divide-y divide-white-10 text-sm">
                    {byDate.get(d)!.map((t, i) => (
                      <div key={i} className="flex justify-between gap-3 px-3 py-1.5">
                        <span className="text-white-70 truncate">{shortProp(t[0])}</span>
                        <span className="text-white-35 whitespace-nowrap text-xs">{t[2]}</span>
                      </div>
                    ))}
                  </Card>
                </section>
              )
            })}
          </>
        )}
      </section>
    </div>
  )
}
