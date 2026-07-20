import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { buildInvoiceData, fetchMonthTasks, listBillableClients } from '@/lib/ops/invoice'
import { DataTable } from '@/components/ops/DataTable'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'

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
  const defaultMonth = new Date().toISOString().slice(0, 7)
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
      ? buildInvoiceData(data.tasks, data.contactNames, data.propertyNames, data.templateNames, clientSub, month)
      : null
  const clients = data && !clientSub ? listBillableClients(data.tasks, data.contactNames, month) : []

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
          {invoice.byProperty.map((p) => (
            <div key={p.property}>
              <h3 className="text-sm font-medium text-white-70 mb-1">{p.property}</h3>
              <DataTable className="divide-y divide-white-10 text-sm">
                {p.lines.map((l, i) => (
                  <div key={i} className="px-3 py-2 flex justify-between gap-3">
                    <span className="text-white-35 whitespace-nowrap">{l.date}</span>
                    <span className="flex-1 text-white-70">
                      {l.desc}
                      {l.note && <span className="block text-xs text-white-35">{l.note}</span>}
                    </span>
                    <span className="whitespace-nowrap">{money(l.amount)}</span>
                  </div>
                ))}
                <div className="px-3 py-2 flex justify-between text-white-40">
                  <span>Subtotal — {p.property}</span>
                  <span className="text-white font-medium">{money(p.subtotal)}</span>
                </div>
              </DataTable>
            </div>
          ))}
          <div className="rounded-lg border border-gold-25 bg-white-5 text-white px-3 py-3 flex justify-between">
            <span className="font-semibold">AMOUNT DUE ({invoice.taskCount} tasks)</span>
            <span className="font-bold text-brand-gold">{money(invoice.total)}</span>
          </div>
        </section>
      )}
    </div>
  )
}
