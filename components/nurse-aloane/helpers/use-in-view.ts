'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight scroll-reveal hook using IntersectionObserver.
 * Returns a ref to attach to an element and a boolean that flips to true
 * once the element scrolls into view (one-shot — it won't reset on scroll out).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, options])

  return { ref, inView }
}
