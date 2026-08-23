import { requireUser } from '@/lib/ops/auth'
import { latestCheckouts, type CheckoutStatus } from '@/lib/ops/opsfeed'
import { CopyButton } from '@/components/ops/CopyButton'
import { SourceNote } from '@/components/ops/SourceNote'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'

export const dynamic = 'force-dynamic'

const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Status → label / tone. Order = what the crew acts on first.
const META: Record<CheckoutStatus, { label: string; hint: string; cls: string; icon: string }> = {
  OUT: { label: 'Checked out', hint: 'confirmed by Breezeway — safe to clean', icon: '✅',
    cls: 'border-green-500/30 bg-green-500/10 text-green-300' },
  LATE: { label: 'Late checkout', hint: 'approved — do not enter before the time shown', icon: '🕒',
    cls: 'border-sky-400/30 bg-sky-400/10 text-sky-300' },
  PENDING: { label: 'Not confirmed', hint: 'due out today, no confirmation yet — treat as occupied; knock first', icon: '⚠️',
    cls: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
  'NO-CONV': { label: 'No conversation', hint: 'on the schedule but no guest thread in Breezeway', icon: '❓',
    cls: 'border-white-10 bg-white-5 text-white-45' },
}
const ORDER: CheckoutStatus[] = ['OUT', 'LATE', 'PENDING', 'NO-CONV']

export default async function CheckoutsPage() {
  await requireUser()

  let feed = null
  let error: string | null = null
  try {
    feed = await latestCheckouts()
  } catch {
    error = 'Could not read the checkout status (sheet not configured).'
  }

  const day = feed?.date ? new Date(feed.date + 'T12:00:00') : null
  const heading = day
    ? `${WD[day.getDay()]}, ${day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : ''
  const total = feed ? feed.rows.length : 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Checkouts</h1>
          <p className="text-xs text-white-45">
            {feed ? `${heading} · who has actually left` : 'Who has actually left today'}
          </p>
        </div>
        {feed?.text && <CopyButton text={feed.text} label="Copy for WhatsApp" />}
      </div>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && !feed && (
        <EmptyState>No checkout status yet. Run the checkout capture + checkout_status.py --push.</EmptyState>
      )}

      {feed && (
        <div className="space-y-4">
          {/* headline counts */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ORDER.map((st) => (
              <div key={st} className={`rounded-lg border px-3 py-2 ${META[st].cls}`}>
                <div className="text-2xl font-bold leading-none">{feed.counts[st] ?? 0}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide opacity-80">
                  {META[st].icon} {META[st].label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-white-60">
            <span className="font-semibold text-white">{total}</span> checkouts due today ·{' '}
            <span className="font-semibold text-green-300">{feed.counts.OUT ?? 0}</span> confirmed out ·{' '}
            <span className="font-semibold text-amber-300">{feed.counts.PENDING ?? 0}</span> still unconfirmed
          </p>

          {/* grouped lists, in action order */}
          {ORDER.map((st) => {
            const rows = feed.rows.filter((r) => r.status === st)
            if (rows.length === 0) return null
            return (
              <section key={st} className="space-y-1.5">
                <h2 className="text-sm font-semibold text-white">
                  {META[st].icon} {META[st].label}{' '}
                  <span className="font-normal text-white-35">({rows.length})</span>
                </h2>
                <p className="text-[11px] text-white-35">{META[st].hint}</p>
                <div className="divide-y divide-white-10 rounded-lg border border-white-10 bg-white-5">
                  {rows.map((r, i) => (
                    <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 px-3 py-1.5 text-sm">
                      <span className="font-medium text-white">
                        {r.building} <span className="text-brand-gold">{r.unit}</span>
                      </span>
                      {r.guest && <span className="text-white-45">{r.guest}</span>}
                      {(st === 'LATE' || st === 'PENDING') && r.detail && (
                        <span className="ml-auto text-[11px] text-white-40">{r.detail}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

          <SourceNote
            source="Breezeway guest conversations (read-only capture) × today’s scheduled checkouts"
            loadedAt={new Date(feed.generatedAt || Date.now())}
            note="‘Checked out’ = Breezeway’s own auto-confirmation to the guest. Re-run the capture through the morning as guests leave. We never message guests — relay through Sab/Thatch."
          />
        </div>
      )}
    </div>
  )
}
