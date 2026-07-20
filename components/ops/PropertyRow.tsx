import type { ForecastUnit } from '@/lib/ops/forecast'

interface PropertyRowProps {
  property: string
  address?: string
  units: ForecastUnit[]
  unitLabel: (unit: ForecastUnit) => string
}

export function PropertyRow({ property, address, units, unitLabel }: PropertyRowProps) {
  return (
    <div className="px-3 py-2 flex flex-wrap items-baseline gap-x-2">
      <span className="font-semibold text-white mr-1">
        {property}
        {address ? <span className="font-normal text-white-40"> · {address}</span> : null}:
      </span>
      {units.map((unit, index) => (
        <span
          key={index}
          className={unit.checkin ? 'font-bold text-brand-gold' : 'text-white-70'}
        >
          {unitLabel(unit)}
          {index < units.length - 1 ? ',' : ''}
        </span>
      ))}
    </div>
  )
}
