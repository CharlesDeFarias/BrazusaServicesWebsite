import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { ForecastUnit } from '@/lib/ops/forecast'
import { PropertyRow } from './PropertyRow'

describe('PropertyRow', () => {
  it('renders comma-separated units and emphasizes same-day check-ins', () => {
    const units: ForecastUnit[] = [
      { label: '1', kind: 'dep', checkin: false },
      { label: '2', kind: 'dep', checkin: true },
    ]

    const html = renderToStaticMarkup(
      <PropertyRow
        property="Main Street"
        units={units}
        unitLabel={(unit) => (unit.checkin ? `${unit.label}\u00b0` : unit.label)}
      />
    )

    expect(html).toBe(
      '<div class="px-3 py-2 flex flex-wrap items-baseline gap-x-2"><span class="font-medium text-neutral-300 mr-1">Main Street:</span><span class="text-neutral-300">1,</span><span class="font-bold text-emerald-400">2\u00b0</span></div>'
    )
  })
})
