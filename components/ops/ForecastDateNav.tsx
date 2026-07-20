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
        <button onClick={() => go(shift(start, -step))} className="rounded-md border border-navy-15 px-2 py-1 text-navy transition-colors hover:border-navy hover:bg-linen" aria-label="previous">
          ←
        </button>
        <input
          type="date"
          value={start}
          onChange={(e) => e.target.value && go(e.target.value)}
          className="rounded-md border border-navy-15 bg-white px-2 py-1 text-navy [color-scheme:light]"
        />
        <button onClick={() => go(shift(start, step))} className="rounded-md border border-navy-15 px-2 py-1 text-navy transition-colors hover:border-navy hover:bg-linen" aria-label="next">
          →
        </button>
      </div>
      <div className="flex overflow-hidden rounded-md border border-navy-15">
        <button
          onClick={() => router.push(`/ops/forecast?start=${start}`)}
          className={`px-3 py-1 transition-colors ${!week ? 'bg-navy text-white' : 'bg-white text-navy/55 hover:bg-linen'}`}
        >
          Day
        </button>
        <button
          onClick={() => router.push(`/ops/forecast?start=${start}&view=week`)}
          className={`px-3 py-1 transition-colors ${week ? 'bg-navy text-white' : 'bg-white text-navy/55 hover:bg-linen'}`}
        >
          Week
        </button>
      </div>
    </div>
  )
}
