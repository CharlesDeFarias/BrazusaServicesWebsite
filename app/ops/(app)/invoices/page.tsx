import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { buildInvoiceData, fetchMonthTasks, listBillableClients } from '@/lib/ops/invoice'

export const dynamic = 'force-dynamic'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; client?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const defaultMonth = new Date().toISOString().slice(0, 7)
  const month = /^\d{4}-\d{2}$/.test(params.month ?? '') ? params.month! : defaultMonth
  const clientSub = params.client

  let data
  let error: string | null = null
  try {
    data = await fetchMonthTasks(month)
  } catch {
    error = 'Could not load Airtable data. Check ops token configuration.'
  }

  const prevMonth = new Date(`${month}-15T00:00:00`)
  prevMonth.setMonth(prevMonth.getMonth() - 1)
  const nextMonth = new Date(`${month}-15T00:00:00`)
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
        <h1 className="text-lg font-semibold">Invoices</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/ops/invoices?month=${fmt(prevMonth)}`} className="text-neutral-400">
            ←
          </Link>
          <span className="text-neutral-200">{month}</span>
          <Link href={`/ops/invoices?month=${fmt(nextMonth)}`} className="text-neutral-400">
            →
          </Link>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!error && !clientSub && (
        <div className="rounded-lg border border-neutral-800 divide-y divide-neutral-800">
          {clients.map((c) => (
            <Link
              key={c.name}
              href={`/ops/invoices?month=${month}&client=${encodeURIComponent(c.name)}`}
              className="flex justify-between px-3 py-3 hover:bg-neutral-900"
            >
              <span>{c.name}</span>
              <span className="text-neutral-400">
                {c.taskCount} tasks · <span className="text-neutral-100 font-medium">{money(c.total)}</span>
              </span>
            </Link>
          ))}
          {clients.length === 0 && (
            <p className="px-3 py-3 text-neutral-400 text-sm">No billable tasks this month.</p>
          )}
        </div>
      )}

      {!error && clientSub && !invoice && (
        <p className="text-neutral-400 text-sm">No billable tasks for “{clientSub}” in {month}.</p>
      )}

      {invoice && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-medium text-neutral-200">{invoice.client}</h2>
            <span className="flex gap-3 text-sm">
              <Link
                href={`/ops/invoice-print?month=${month}&client=${encodeURIComponent(clientSub!)}`}
                className="text-emerald-400 underline"
              >
                print view
              </Link>
              <Link href={`/ops/invoices?month=${month}`} className="text-neutral-400 underline">
                all clients
              </Link>
            </span>
          </div>
          {invoice.byProperty.map((p) => (
            <div key={p.property}>
              <h3 className="text-sm font-medium text-neutral-300 mb-1">{p.property}</h3>
              <div className="rounded-lg border border-neutral-800 divide-y divide-neutral-800 text-sm">
                {p.lines.map((l, i) => (
                  <div key={i} className="px-3 py-2 flex justify-between gap-3">
                    <span className="text-neutral-500 whitespace-nowrap">{l.date}</span>
                    <span className="flex-1 text-neutral-300">
                      {l.desc}
                      {l.note && <span className="block text-xs text-neutral-500">{l.note}</span>}
                    </span>
                    <span className="whitespace-nowrap">{money(l.amount)}</span>
                  </div>
                ))}
                <div className="px-3 py-2 flex justify-between text-neutral-400">
                  <span>Subtotal — {p.property}</span>
                  <span className="text-neutral-200 font-medium">{money(p.subtotal)}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/20 px-3 py-3 flex justify-between">
            <span className="font-semibold">AMOUNT DUE ({invoice.taskCount} tasks)</span>
            <span className="font-bold text-emerald-400">{money(invoice.total)}</span>
          </div>
        </section>
      )}
    </div>
  )
}
