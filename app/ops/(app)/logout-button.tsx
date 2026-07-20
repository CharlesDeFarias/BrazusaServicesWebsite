'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await fetch('/api/ops/logout', { method: 'POST' })
        router.push('/ops/login')
        router.refresh()
      }}
      className="text-[11px] uppercase tracking-[0.08em] text-white-40 transition-colors hover:text-white"
    >
      Logout
    </button>
  )
}
