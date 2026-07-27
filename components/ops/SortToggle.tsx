import Link from 'next/link'

/** Server-rendered toggle for unit ordering: "By number" vs "Check-ins first". URL-param driven. */
export function SortToggle({ mode, numHref, ciHref }: { mode: 'num' | 'ci'; numHref: string; ciHref: string }) {
  const base = 'rounded border px-2 py-0.5 text-xs transition-colors'
  const on = 'border-brand-gold/40 bg-brand-gold/10 text-brand-gold'
  const off = 'border-white-10 text-white-45 hover:text-white-70'
  return (
    <div className="flex gap-1.5">
      <Link href={numHref} className={`${base} ${mode === 'num' ? on : off}`}>
        By number
      </Link>
      <Link href={ciHref} className={`${base} ${mode === 'ci' ? on : off}`}>
        Check-ins first
      </Link>
    </div>
  )
}

/** Compare by leading number; `ci` mode puts check-ins first, then non-check-ins. */
export function unitComparator(mode: 'num' | 'ci') {
  const num = (label: string) => {
    const m = /^(\d+)/.exec(label)
    return m ? Number(m[1]) : 9999
  }
  return (a: { label: string; checkin: boolean }, b: { label: string; checkin: boolean }) => {
    if (mode === 'ci' && a.checkin !== b.checkin) return a.checkin ? -1 : 1
    return num(a.label) - num(b.label) || a.label.localeCompare(b.label)
  }
}
