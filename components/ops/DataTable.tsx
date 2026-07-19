import type { ReactNode } from 'react'
import { Card } from './Card'

interface DataTableProps {
  children: ReactNode
  className?: string
  table?: boolean
}

export function DataTable({ children, className, table = false }: DataTableProps) {
  return (
    <Card className={className}>
      {table ? <table className="w-full text-sm">{children}</table> : children}
    </Card>
  )
}
