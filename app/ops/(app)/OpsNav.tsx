'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/ops/daily', label: 'Daily' },
  { href: '/ops/forecast', label: 'Forecast' },
  { href: '/ops/reconcile', label: 'Reconcile' },
  { href: '/ops/breezeway', label: 'Breezeway' },
  { href: '/ops/payroll', label: 'Payroll' },
  { href: '/ops/invoices', label: 'Invoices' },
]

export function OpsNav() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-1">
      {LINKS.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + '/')
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`relative py-1 text-xs font-medium tracking-[0.06em] transition-colors ${
              active ? 'text-navy' : 'text-navy/50 hover:text-navy/80'
            }`}
          >
            {l.label}
            {active && (
              <span className="absolute -bottom-px left-0 right-0 h-px bg-brand-gold" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
