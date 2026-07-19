import type { ForecastUnit } from '@/lib/ops/forecast'

interface PropertyRowProps {
  property: string
  units: ForecastUnit[]
  unitLabel: (unit: ForecastUnit) => string
}

export function PropertyRow({ property, units, unitLabel }: PropertyRowProps) {
  return (
    <div className="px-3 py-2 flex flex-wrap items-baseline gap-x-2">
      <span className="font-medium text-neutral-300 mr-1">{property}:</span>
      {units.map((unit, index) => (
        <span
          key={index}
          className={unit.checkin ? 'font-bold text-emerald-400' : 'text-neutral-300'}
        >
          {unitLabel(unit)}
          {index < units.length - 1 ? ',' : ''}
        </span>
      ))}
    </div>
  )
}
