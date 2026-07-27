import { requireUser } from '@/lib/ops/auth'
import { latestInventory } from '@/lib/ops/opsfeed'
import { CopyButton } from '@/components/ops/CopyButton'
import { SourceNote } from '@/components/ops/SourceNote'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  await requireUser()

  let feed = null
  let error: string | null = null
  try {
    feed = await latestInventory()
  } catch {
    error = 'Could not read the inventory snapshot (sheet not configured).'
  }

  const chip = (status: string) =>
    status === 'out'
      ? 'border-red-400/30 bg-red-400/15 text-red-300'
      : 'border-amber-400/30 bg-amber-400/15 text-amber-300'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Inventory</h1>
          <p className="text-xs text-white-35">
            Shortages parsed from the cleaners’ Group A messages. Low / Out per building.
          </p>
        </div>
        {feed?.reportText && (
          <CopyButton text={feed.reportText} label="Copy Missing Inventory Report" />
        )}
      </div>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && !feed && (
        <EmptyState>No inventory snapshot yet. Run the parser (inventory.py --parse --push).</EmptyState>
      )}

      {feed && (
        <div className="space-y-4">
          {/* Review queue — items the parser couldn't place (no building / unknown) */}
          {feed.review.length > 0 && (
            <details className="rounded-lg border border-purple-400/25 bg-purple-400/5">
              <summary className="cursor-pointer select-none px-3 py-2 text-sm font-semibold text-purple-300">
                {feed.review.length} item{feed.review.length === 1 ? '' : 's'} need a building / review
              </summary>
              <ul className="space-y-1 px-3 pb-3 text-sm">
                {feed.review.map((r, i) => (
                  <li key={i} className="text-white-70">
                    <span className="font-medium text-white">{r.item}</span>
                    <span className={`ml-2 rounded border px-1.5 text-[11px] uppercase ${chip(r.status)}`}>
                      {r.status}
                    </span>
                    <span className="ml-2 text-white-40">
                      {r.sender} · {r.at} · “{r.raw}”
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Status by building */}
          {feed.byBuilding.length === 0 ? (
            <p className="text-sm text-white-45">Nothing low or out right now.</p>
          ) : (
            feed.byBuilding.map((b) => (
              <div key={b.building} className="rounded-lg border border-white-10 bg-white-5 px-3 py-2">
                <h2 className="mb-1.5 text-sm font-semibold text-white">{b.building}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {b.items.map((it, i) => (
                    <span
                      key={i}
                      className={`rounded border px-2 py-0.5 text-xs ${chip(it.status)}`}
                      title={`${it.supplier ? it.supplier + ' · ' : ''}${it.status}`}
                    >
                      {it.name}
                      {it.status === 'out' && ' ·OUT'}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}

          {feed.buyList && (
            <details className="rounded-lg border border-white-10 bg-white-5">
              <summary className="cursor-pointer select-none px-3 py-2 text-sm font-semibold text-white-70">
                Buy list (by supplier)
              </summary>
              <pre className="overflow-x-auto whitespace-pre-wrap px-3 pb-3 text-xs text-white-70">
                {feed.buyList.replace(/\*/g, '')}
              </pre>
            </details>
          )}

          <SourceNote
            source="Group A shortage messages (parsed) · ops sheet ‘inventory’"
            loadedAt={new Date(feed.generatedAt || Date.now())}
            note="Parsing-first MVP. Review-queue items need a building or a new alias; fulfillment + linen transfers come next."
          />
        </div>
      )}
    </div>
  )
}
