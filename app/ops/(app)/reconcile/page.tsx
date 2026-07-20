import { requireUser } from '@/lib/ops/auth'
import { latestReconcile } from '@/lib/ops/opsfeed'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { CopyButton } from '@/components/ops/CopyButton'

export const dynamic = 'force-dynamic'

export default async function ReconcilePage() {
  await requireUser()

  let feed
  let error: string | null = null
  try {
    feed = await latestReconcile()
  } catch {
    error = 'Could not read the reconcile feed (sheet not configured).'
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">Reconcile</h1>
        {feed && <CopyButton text={feed.report} label="Copy report" size="sm" />}
      </div>

      <p className="text-xs text-neutral-500">
        Airtable (what the report shows) vs Breezeway (Thatch source of truth), plus WhatsApp
        change-chatter. Read-only, surface-only — nothing is written back. A human verifies and fixes.
      </p>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && !feed && <EmptyState>No reconcile report published yet.</EmptyState>}

      {feed && (
        <>
          <p className="text-xs text-neutral-500">
            Window {feed.window || '—'} · generated {feed.generatedAt.replace('T', ' ').slice(0, 16)}
          </p>
          <pre className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 text-xs leading-relaxed text-neutral-200 whitespace-pre-wrap">
            {feed.report}
          </pre>
        </>
      )}
    </div>
  )
}
