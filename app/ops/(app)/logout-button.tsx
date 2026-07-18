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
      className="text-xs text-neutral-500 hover:text-neutral-300"
    >
      logout
    </button>
  )
}
