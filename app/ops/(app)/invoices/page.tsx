import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import {
  buildInvoiceData,
  fetchMonthTasks,
  listBillableClients,
  fetchOpenInvoiceLines,
  type OpenInvoiceLine,
} from '@/lib/ops/invoice'
import { lineConfirmations, effectiveConfirmation, type ConfirmationsFeed } from '@/lib/ops/opsfeed'
import { InvoiceLineGroups, type LineGroup } from '@/components/ops/InvoiceLineGroups'
import { DataTable } from '@/components/ops/DataTable'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { bostonMonth, bostonToday } from '@/lib/ops/time'

export const dynamic = 'force-dynamic'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
const dateSpan = (a: string, b: string) => (a === b ? shortDate(a) : `${shortDate(a)} – ${shortDate(b)}`)

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; client?: string; week?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const defaultMonth = bostonMonth()
  // week=YYYY-MM-DD (a Monday) switches to a Mon-Sun weekly invoice period
  const week = /^\d{4}-\d{2}-\d{2}$/.test(params.week ?? '') ? params.week! : null
  const weekEnd = week
    ? new Date(new Date(`${week}T00:00:00`).getTime() + 6 * 86400000).toISOString().slice(0, 10)
    : null
  const month = week
    ? `${week}..${weekEnd}`
    : /^\d{4}-\d{2}$/.test(params.month ?? '') ? params.month! : defaultMonth
  const clientSub = params.client

  let data
  let error: string | null = null
  try {
    data = await fetchMonthTasks(month)
  } catch {
    error = 'Could not load Airtable data. Check ops token configuration.'
  }

  const monthBase = week ? defaultMonth : month
  const prevMonth = new Date(`${monthBase}-15T00:00:00`)
  prevMonth.setMonth(prevMonth.getMonth() - 1)
  const nextMonth = new Date(`${monthBase}-15T00:00:00`)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  const fmt = (d: Date) => d.toISOString().slice(0, 7)

  const invoice =
    data && clientSub
      ? buildInvoiceData(data.tasks, data.contactNames, data.propertyNames, data.templateNames, clientSub, month, data.overrides)
      : null
  const clients =
    data && !clientSub ? listBillableClients(data.tasks, data.contactNames, month, data.overrides) : []

  // Line confirmations (dad confirms/flags each line; seeded confirmed through a watermark date).
  const empty: ConfirmationsFeed = { confirmedThrough: '', byKey: new Map() }
  const confs = await lineConfirmations().catch(() => empty)
  const counts = { confirmed: 0, flagged: 0, pending: 0 }
  if (invoice)
    for (const p of invoice.byProperty)
      for (const l of p.lines) counts[effectiveConfirmation(confs, l.key, l.date).status]++

  // Unconfirmed items across ALL clients since the confirmed-through watermark (not retroactive).
  const openFrom = confs.confirmedThrough || bostonToday()
  let openLines: OpenInvoiceLine[] = []
  try {
    openLines = await fetchOpenInvoiceLines(openFrom, bostonToday())
  } catch {
    /* keep the section empty on error */
  }
  const unconfirmed = openLines.filter(
    (l) => effectiveConfirmation(confs, l.key, l.date).status !== 'confirmed'
  )
  const unconfByClient = new Map<string, OpenInvoiceLine[]>()
  for (const l of unconfirmed) {
    if (!unconfByClient.has(l.client)) unconfByClient.set(l.client, [])
    unconfByClient.get(l.client)!.push(l)
  }
  for (const [, lines] of unconfByClient)
    lines.sort((a, b) => a.property.localeCompare(b.property) || a.date.localeCompare(b.date))

  const unconfGroups: LineGroup[] = [...unconfByClient.entries()].map(([client, lines]) => ({
    heading: client,
    lines: lines.map((l) => {
      const c = effectiveConfirmation(confs, l.key, l.date)
      return {
        key: l.key, date: l.date, desc: l.desc, amount: l.amount, building: l.property,
        initialStatus: c.status, initialNote: c.note, initialBy: c.by,
      }
    }),
  }))
  const invoiceGroups: LineGroup[] = invoice
    ? invoice.byProperty.map((p) => ({
        heading: `${p.property} · ${money(p.subtotal)}`,
        lines: p.lines.map((l) => {
          const c = effectiveConfirmation(confs, l.key, l.date)
          return {
            key: l.key, date: l.date, desc: l.desc, amount: l.amount,
            initialStatus: c.status, initialNote: c.note, initialBy: c.by,
          }
        }),
      }))
    : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">Invoices</h1>
        <div className="flex items-center gap-3 text-sm">
          {week ? (
            <span className="text-white">week {week} – {weekEnd}</span>
          ) : (
            <>
              <Link href={`/ops/invoices?month=${fmt(prevMonth)}`} className="text-white-40">
                ←
              </Link>
              <span className="text-white">{month}</span>
              <Link href={`/ops/invoices?month=${fmt(nextMonth)}`} className="text-white-40">
                →
              </Link>
            </>
          )}
        </div>
      </div>

      {error && <ErrorState>{error}</ErrorState>}

      {/* Unconfirmed items across all clients (since the confirmed-through watermark) */}
      {unconfirmed.length > 0 && (
        <details className="group rounded-lg border-2 border-amber-400/40 bg-amber-400/10">
          <summary className="flex cursor-pointer select-none items-center gap-2 px-4 py-3 text-base font-semibold text-amber-200 [&::-webkit-details-marker]:hidden">
            <span className="text-lg leading-none transition-transform group-open:rotate-90">▸</span>
            <span className="flex-1">
              {unconfirmed.length} item{unconfirmed.length === 1 ? '' : 's'} to review
              <span className="ml-2 text-sm font-normal text-white-45 group-open:hidden">· tap to open</span>
            </span>
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs">
              {unconfByClient.size} client{unconfByClient.size === 1 ? '' : 's'}
            </span>
          </summary>
          <div className="px-3 pb-3">
            <InvoiceLineGroups groups={unconfGroups} />
          </div>
        </details>
      )}

      {!error && !clientSub && (
        <DataTable className="divide-y divide-white-10">
          {clients.map((c) => (
            <Link
              key={c.name}
              href={`/ops/invoices?month=${month}&client=${encodeURIComponent(c.name)}`}
              className="flex items-center justify-between px-3 py-3 hover:bg-white-5"
            >
              <span className="min-w-0">
                <span className="block truncate">{c.name}</span>
                <span className="block text-xs text-white-35">{dateSpan(c.firstDate, c.lastDate)}</span>
              </span>
              <span className="text-white-40 whitespace-nowrap pl-3">
                {c.taskCount} tasks · <span className="text-white font-medium">{money(c.total)}</span>
              </span>
            </Link>
          ))}
          {clients.length === 0 && (
            <EmptyState contained>No billable tasks this month.</EmptyState>
          )}
        </DataTable>
      )}

      {!error && clientSub && !invoice && (
        <EmptyState>No billable tasks for “{clientSub}” in {month}.</EmptyState>
      )}

      {invoice && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-medium text-white">{invoice.client}</h2>
            <span className="flex gap-3 text-sm">
              <Link
                href={`/ops/invoice-print?month=${month}&client=${encodeURIComponent(clientSub!)}`}
                className="text-brand-gold underline"
              >
                print view
              </Link>
              <Link href={`/ops/invoices?month=${month}`} className="text-white-40 underline">
                all clients
              </Link>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <span className="text-green-300">{counts.confirmed} confirmed</span>
            <span className="text-amber-300">{counts.flagged} flagged</span>
            <span className={counts.pending ? 'text-white font-medium' : 'text-white-45'}>
              {counts.pending} to review
            </span>
            {confs.confirmedThrough && (
              <span className="text-white-35">· auto-confirmed through {confs.confirmedThrough}</span>
            )}
          </div>

          <InvoiceLineGroups groups={invoiceGroups} />
          <div className="rounded-lg border border-gold-25 bg-white-5 text-white px-3 py-3 flex justify-between">
            <span className="font-semibold">AMOUNT DUE ({invoice.taskCount} tasks)</span>
            <span className="font-bold text-brand-gold">{money(invoice.total)}</span>
          </div>
        </section>
      )}
    </div>
  )
}
