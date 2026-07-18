import Link from 'next/link'
import { requireUser } from '@/lib/ops/auth'
import { LogoutButton } from './logout-button'

export default async function OpsAppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <nav className="flex gap-4 text-sm">
          <Link href="/ops/forecast" className="hover:text-white text-neutral-300">
            Forecast
          </Link>
          <Link href="/ops/payroll" className="hover:text-white text-neutral-300">
            Payroll
          </Link>
          <Link href="/ops/invoices" className="hover:text-white text-neutral-300">
            Invoices
          </Link>
        </nav>
        <span className="flex items-center gap-3">
          <span className="text-xs text-neutral-500">{user}</span>
          <LogoutButton />
        </span>
      </header>
      <main className="px-4 py-6 max-w-3xl mx-auto">{children}</main>
    </div>
  )
}
