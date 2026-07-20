import type { ReactNode } from 'react'

interface EmptyStateProps {
  children: ReactNode
  contained?: boolean
}

interface ErrorStateProps {
  children: ReactNode
  tone?: 'error' | 'warning'
}

export function EmptyState({ children, contained = false }: EmptyStateProps) {
  const className = contained
    ? 'px-3 py-3 text-warm-gray-dark text-sm'
    : 'text-warm-gray-dark text-sm'

  return <p className={className}>{children}</p>
}

export function ErrorState({ children, tone = 'error' }: ErrorStateProps) {
  const className = tone === 'warning' ? 'text-amber-700 text-sm' : 'text-red-600 text-sm'

  return <p className={className}>{children}</p>
}
