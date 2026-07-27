import { requireUser } from '@/lib/ops/auth'
import { fetchResidents, type Resident } from '@/lib/ops/residents'
import { doorCodes, type CodeBuilding } from '@/lib/ops/opsfeed'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'
import { SourceNote } from '@/components/ops/SourceNote'

export const dynamic = 'force-dynamic'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-16 shrink-0 text-[11px] uppercase tracking-[0.08em] text-white-35 pt-0.5">
        {label}
      </span>
      <span className="text-white-70">{children}</span>
    </div>
  )
}

export default async function ResidentsPage() {
  await requireUser()

  let residents: Resident[] = []
  let codes: CodeBuilding[] = []
  let error: string | null = null
  try {
    ;[residents, codes] = await Promise.all([fetchResidents(), doorCodes().catch(() => [])])
  } catch {
    error = 'Could not load residents from Airtable. Check ops token configuration.'
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-white tracking-tight">Residents &amp; Codes</h1>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && residents.length === 0 && <EmptyState>No residents found.</EmptyState>}

      {residents.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {residents.map((r) => (
            <Card key={r.name} className="border-l-2 border-l-brand-gold px-3 py-3 space-y-2">
              <h2 className="font-semibold text-white">{r.name}</h2>

              <Field label="Address">
                <span className="space-y-0.5 block">
                  {r.units.map((u, i) => (
                    <span key={i} className="block">
                      {u.address}
                      {u.unit && <span className="text-white-40"> · {u.unit}</span>}
                    </span>
                  ))}
                </span>
              </Field>

              {r.code ? (
                <Field label="Code">
                  <span className="font-medium text-brand-gold">{r.code}</span>
                </Field>
              ) : (
                <Field label="Code">
                  <span className="text-white-35 italic">not set</span>
                </Field>
              )}

              {(r.phone || r.email) && (
                <Field label="Contact">
                  <span className="space-y-0.5 block">
                    {r.phone && <span className="block">{r.phone}</span>}
                    {r.email && <span className="block text-white-40">{r.email}</span>}
                  </span>
                </Field>
              )}

              {r.notes && <Field label="Notes">{r.notes}</Field>}
            </Card>
          ))}
        </div>
      )}

      {/* Door / lockbox codes by building */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white-45">Door codes</h2>
        <p className="text-xs text-white-35">
          By building. Edit in the ops sheet ‘codes’ tab (building, unit, code, notes). Seeded from
          the Thatch main sheet — verify before relying on any single code.
        </p>
        {codes.length === 0 ? (
          <EmptyState>No codes published yet.</EmptyState>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {codes.map((b) => (
              <Card key={b.building} className="border-l-2 border-l-brand-gold px-3 py-3">
                <h3 className="mb-2 font-semibold text-white">{b.building}</h3>
                <div className="divide-y divide-white-10">
                  {b.entries.map((e, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-3 py-1 text-sm">
                      <span className="text-white-70">{e.unit}</span>
                      <span className="whitespace-nowrap text-right">
                        {e.code ? (
                          <span className="font-medium text-brand-gold">{e.code}</span>
                        ) : (
                          <span className="text-white-35 italic">—</span>
                        )}
                        {e.notes && <span className="block text-[11px] text-white-40">{e.notes}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {!error && (
        <SourceNote
          source="Airtable Units + Contacts (address, phone) · ops sheet ‘residents’ + ‘codes’ tabs"
          loadedAt={new Date()}
          note="Fill codes/notes by adding rows in the sheet’s residents and codes tabs."
        />
      )}
    </div>
  )
}
