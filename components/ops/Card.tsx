import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const classes = className
    ? `rounded-lg border border-neutral-800 ${className}`
    : 'rounded-lg border border-neutral-800'

  return <div className={classes}>{children}</div>
}
