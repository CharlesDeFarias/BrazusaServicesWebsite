import { requireUser } from '@/lib/ops/auth'
import { LogoutButton } from './logout-button'
import { OpsNav } from './OpsNav'

export default async function OpsAppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()

  return (
    <div className="grain min-h-screen bg-navy text-white">
      {/* gold hairline — the brand's signature top strip */}
      <div className="h-0.5 w-full bg-brand-gold" />

      <header className="sticky top-0 z-30 border-b border-white-10 bg-navy/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-bold tracking-[0.03em] text-white [font-family:var(--font-ibm-plex-sans)]">
              Brazusa
            </span>
            <span className="border-l-2 border-brand-gold px-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Ops
            </span>
          </div>
          <span className="flex items-center gap-4">
            <span className="hidden text-[11px] uppercase tracking-[0.08em] text-white-40 sm:inline">
              {user}
            </span>
            <LogoutButton />
          </span>
        </div>
        <div className="mx-auto max-w-4xl px-5 pb-2">
          <OpsNav />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>
    </div>
  )
}
