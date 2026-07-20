'use client'

import { useRouter } from 'next/navigation'

function shift(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Date picker + prev/next + Day/Week toggle for the forecast page. Client-side nav. */
export function ForecastDateNav({ start, week }: { start: string; week: boolean }) {
  const router = useRouter()
  const step = week ? 7 : 1
  const go = (s: string) => router.push(`/ops/forecast?start=${s}${week ? '&view=week' : ''}`)

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <div className="flex items-center gap-1">
        <button onClick={() => go(shift(start, -step))} className="px-2 py-1 rounded-md border border-neutral-700 text-neutral-300 hover:border-neutral-500" aria-label="previous">
          ←
        </button>
        <input
          type="date"
          value={start}
          onChange={(e) => e.target.value && go(e.target.value)}
          className="rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-neutral-100 [color-scheme:dark]"
        />
        <button onClick={() => go(shift(start, step))} className="px-2 py-1 rounded-md border border-neutral-700 text-neutral-300 hover:border-neutral-500" aria-label="next">
          →
        </button>
      </div>
      <div className="flex overflow-hidden rounded-md border border-neutral-700">
        <button
          onClick={() => router.push(`/ops/forecast?start=${start}`)}
          className={`px-3 py-1 ${!week ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-900 text-neutral-400'}`}
        >
          Day
        </button>
        <button
          onClick={() => router.push(`/ops/forecast?start=${start}&view=week`)}
          className={`px-3 py-1 ${week ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-900 text-neutral-400'}`}
        >
          Week
        </button>
      </div>
    </div>
  )
}
