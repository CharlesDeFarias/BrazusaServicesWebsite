'use client'

import { createElement, type ElementType, type ReactNode } from 'react'
import { useInView } from '@/components/nurse-aloane/helpers/use-in-view'

/**
 * Wraps children in a scroll-triggered fade-up reveal.
 * `delay` (seconds) staggers grouped items.
 * `as` controls the rendered tag for semantics (defaults to a div).
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}) {
  const { ref, inView } = useInView<HTMLElement>()

  return createElement(
    as,
    {
      ref,
      className: `na-reveal ${inView ? 'na-is-visible' : ''} ${className}`,
      style: { transitionDelay: `${delay}s` },
    },
    children
  )
}
