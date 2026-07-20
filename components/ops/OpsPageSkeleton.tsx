import { Card } from './Card'

export function OpsPageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading page">
      <div className="h-6 w-32 rounded bg-linen-deep animate-pulse" />
      <Card className="overflow-hidden">
        <div className="h-9 bg-linen" />
        <div className="space-y-px bg-linen-dark">
          <div className="h-10 bg-white" />
          <div className="h-10 bg-white" />
          <div className="h-10 bg-white" />
        </div>
      </Card>
    </div>
  )
}
