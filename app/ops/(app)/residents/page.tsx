import { requireUser } from '@/lib/ops/auth'
import { fetchResidents, type Resident } from '@/lib/ops/residents'
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
  let error: string | null = null
  try {
    residents = await fetchResidents()
  } catch {
    error = 'Could not load residents from Airtable. Check ops token configuration.'
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white tracking-tight">Residents</h1>

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

      {!error && (
        <SourceNote
          source="Airtable Units + Contacts (address, phone) · ops sheet ‘residents’ tab (code, notes)"
          loadedAt={new Date()}
          note="Add a row [resident, door_code, notes] in the sheet’s residents tab to fill codes/notes."
        />
      )}
    </div>
  )
}
