import { requireUser } from '@/lib/ops/auth'
import { EmptyState } from '@/components/ops/StateMessage'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  await requireUser()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Inventory</h1>
        <p className="text-xs text-white-35">
          Supplies and linen tracking. Scaffolded — the data model and sources come next.
        </p>
      </div>

      <EmptyState>Inventory tracking is being set up. Nothing here yet.</EmptyState>
    </div>
  )
}
