import { Card } from './Card'

export function OpsPageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading page">
      <div className="h-6 w-32 rounded bg-neutral-800" />
      <Card className="overflow-hidden">
        <div className="h-9 bg-neutral-900" />
        <div className="space-y-px bg-neutral-800">
          <div className="h-10 bg-neutral-950" />
          <div className="h-10 bg-neutral-950" />
          <div className="h-10 bg-neutral-950" />
        </div>
      </Card>
    </div>
  )
}
