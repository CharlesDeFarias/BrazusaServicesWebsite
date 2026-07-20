import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const classes = className
    ? `rounded-lg border border-navy-10 bg-white ${className}`
    : 'rounded-lg border border-navy-10 bg-white'

  return <div className={classes}>{children}</div>
}
