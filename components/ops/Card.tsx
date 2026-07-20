import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const classes = className
    ? `rounded-lg border border-white-10 bg-white-5 ${className}`
    : 'rounded-lg border border-white-10 bg-white-5'

  return <div className={classes}>{children}</div>
}
