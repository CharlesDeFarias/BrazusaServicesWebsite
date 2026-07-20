import { Card } from './Card'

export function OpsPageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading page">
      <div className="h-6 w-32 rounded bg-white-10 animate-pulse" />
      <Card className="overflow-hidden">
        <div className="h-9 bg-white-10" />
        <div className="space-y-px bg-white-10">
          <div className="h-10 bg-navy" />
          <div className="h-10 bg-navy" />
          <div className="h-10 bg-navy" />
        </div>
      </Card>
    </div>
  )
}
