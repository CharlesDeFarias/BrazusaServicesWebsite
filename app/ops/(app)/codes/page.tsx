import { requireUser } from '@/lib/ops/auth'
import { doorCodes, type CodeBuilding } from '@/lib/ops/opsfeed'
import { Card } from '@/components/ops/Card'
import { EmptyState, ErrorState } from '@/components/ops/StateMessage'

export const dynamic = 'force-dynamic'

export default async function CodesPage() {
  await requireUser()

  let buildings: CodeBuilding[] = []
  let error: string | null = null
  try {
    buildings = await doorCodes()
  } catch {
    error = 'Could not read the codes feed (sheet not configured).'
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white tracking-tight">Codes</h1>
      <p className="text-xs text-white-35">
        Door / lockbox codes by building. Edit in the ops sheet ‘codes’ tab (building, unit, code,
        notes). Seeded from the Thatch main sheet — verify before relying on any single code.
      </p>

      {error && <ErrorState>{error}</ErrorState>}
      {!error && buildings.length === 0 && <EmptyState>No codes published yet.</EmptyState>}

      {buildings.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {buildings.map((b) => (
            <Card key={b.building} className="border-l-2 border-l-brand-gold px-3 py-3">
              <h2 className="mb-2 font-semibold text-white">{b.building}</h2>
              <div className="divide-y divide-white-10">
                {b.entries.map((e, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-3 py-1 text-sm">
                    <span className="text-white-70">{e.unit}</span>
                    <span className="whitespace-nowrap text-right">
                      {e.code ? (
                        <span className="font-mono font-medium tracking-wider text-brand-gold">
                          {e.code}
                        </span>
                      ) : (
                        <span className="text-white-35">—</span>
                      )}
                      {e.notes && <span className="block text-xs text-white-40">{e.notes}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
