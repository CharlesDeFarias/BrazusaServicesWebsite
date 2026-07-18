import { requireUser } from '@/lib/ops/auth'
import { buildInvoiceData, fetchMonthTasks } from '@/lib/ops/invoice'

export const dynamic = 'force-dynamic'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function paymentLines(): string[] {
  try {
    const parsed = JSON.parse(process.env.OPS_INVOICE_PAYMENT_LINES ?? '[]')
    if (Array.isArray(parsed) && parsed.length) return parsed.map(String)
  } catch {
    /* fall through */
  }
  return ['Contact Brazusa Cleaning for payment details.']
}

function code(client: string): string {
  return client
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default async function InvoicePrintPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; client?: string }>
}) {
  await requireUser()
  const params = await searchParams
  const month = /^\d{4}-\d{2}$/.test(params.month ?? '') ? params.month! : ''
  const clientSub = params.client ?? ''
  if (!month || !clientSub) {
    return <p style={{ padding: 24 }}>Missing client/month.</p>
  }

  const data = await fetchMonthTasks(month)
  const inv = buildInvoiceData(data.tasks, data.contactNames, data.propertyNames, data.templateNames, clientSub, month)
  if (!inv) return <p style={{ padding: 24 }}>No billable tasks.</p>

  const [y, m] = month.split('-').map(Number)
  const monthName = new Date(y, m - 1, 1).toLocaleString('en-US', { month: 'short' })
  const lastDay = new Date(y, m, 0).getDate()
  const issue = new Date(y, m, 1) // 1st of following month
  const due = new Date(issue.getTime() + 30 * 86400000)
  const dfmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const multi = inv.byProperty.length > 1

  return (
    <div className="print-invoice" style={{ fontFamily: 'Georgia, serif', color: '#222', maxWidth: 780, margin: '24px auto', padding: '0 24px', background: '#fff' }}>
      <style>{`
        .print-invoice table { width:100%; border-collapse:collapse; font-size:13px }
        .print-invoice td, .print-invoice th { padding:6px 4px; text-align:left }
        .pi-r { text-align:right !important } .pi-muted { color:#777 }
        .pi-sec { font-size:10px; letter-spacing:2px; color:#888; margin:20px 0 6px; border-bottom:1px solid #eee; padding-bottom:4px }
        @media print { .pi-noprint { display:none } }
      `}</style>
      <button className="pi-noprint" style={{ margin: '8px 0', padding: '6px 14px' }}>
        {/* button is inert server-side; browsers print via Ctrl/Cmd+P */}
        Print with Ctrl/Cmd+P
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #222', paddingBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: 30, margin: 0 }}>Brazusa Cleaning</h1>
          <p className="pi-muted" style={{ margin: '2px 0', fontSize: 12 }}>302 East St, Dedham, MA 02026</p>
          <p className="pi-muted" style={{ margin: '2px 0', fontSize: 12 }}>info@brazusacleaning.com · brazusacleaning.com</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 30, fontWeight: 'bold', letterSpacing: 2 }}>INVOICE</div>
          <div className="pi-muted" style={{ fontSize: 12 }}>#{y}-{String(m).padStart(2, '0')}-{code(inv.client)}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '18px 0', borderBottom: '1px solid #ddd', paddingBottom: 14 }}>
        <div>
          <div className="pi-sec" style={{ border: 0, margin: 0 }}>BILL TO</div>
          <div style={{ fontWeight: 'bold' }}>{inv.client}</div>
        </div>
        <div>
          <div className="pi-sec" style={{ border: 0, margin: 0 }}>SERVICE PERIOD</div>
          <div style={{ fontWeight: 'bold' }}>{monthName} 1, {y} – {monthName} {lastDay}, {y}</div>
          <div className="pi-muted" style={{ fontSize: 12, fontFamily: 'monospace' }}>
            Issue date: {dfmt(issue)}<br />Due date: {dfmt(due)} (30 days)
          </div>
        </div>
      </div>

      {multi && (
        <>
          <div className="pi-sec">OVERVIEW</div>
          <table>
            <tbody>
              {inv.byProperty.map((p) => (
                <tr key={p.property} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td>{p.property}</td>
                  <td className="pi-muted" style={{ textAlign: 'center' }}>{p.lines.length} task{p.lines.length !== 1 ? 's' : ''}</td>
                  <td className="pi-r" style={{ fontWeight: 'bold' }}>{money(p.subtotal)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '2px solid #222', fontWeight: 'bold' }}>
                <td>Total</td>
                <td style={{ textAlign: 'center' }}>{inv.taskCount} tasks</td>
                <td className="pi-r">{money(inv.total)}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <div className="pi-sec">SERVICES RENDERED</div>
      {inv.byProperty.map((p) => (
        <div key={p.property}>
          {multi && <h3 style={{ fontSize: 15, margin: '18px 0 4px' }}>{p.property}</h3>}
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th className="pi-sec" style={{ border: 0 }}>DATE</th>
                <th className="pi-sec" style={{ border: 0 }}>TASK</th>
                <th className="pi-sec pi-r" style={{ border: 0 }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {p.lines.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f4f4f4' }}>
                  <td className="pi-muted" style={{ whiteSpace: 'nowrap' }}>{l.date}</td>
                  <td>
                    {l.desc}
                    {l.note && <span className="pi-muted" style={{ display: 'block', fontSize: 11 }}>{l.note}</span>}
                  </td>
                  <td className="pi-r">{money(l.amount)}</td>
                </tr>
              ))}
              {multi && (
                <tr>
                  <td />
                  <td className="pi-r" style={{ fontWeight: 'bold' }}>Subtotal — {p.property}:</td>
                  <td className="pi-r" style={{ fontWeight: 'bold' }}>{money(p.subtotal)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      <div style={{ background: '#f2f8f4', border: '1px solid #cfe6d8', borderRadius: 6, padding: '14px 16px', margin: '18px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Subtotal ({inv.taskCount} tasks):</span>
          <span>{money(inv.total)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontWeight: 'bold', fontSize: 16 }}>AMOUNT DUE:</span>
          <span style={{ color: '#2f7d4f', fontSize: 22, fontWeight: 'bold' }}>{money(inv.total)}</span>
        </div>
      </div>

      <div style={{ border: '1px solid #cfe6d8', borderRadius: 6, padding: '14px 16px', marginBottom: 40 }}>
        <div className="pi-sec" style={{ border: 0, margin: '0 0 6px' }}>PAYMENT METHODS</div>
        {paymentLines().map((l, i) => (
          <p key={i} style={{ margin: '3px 0', fontSize: 12 }}>{l}</p>
        ))}
      </div>
    </div>
  )
}
