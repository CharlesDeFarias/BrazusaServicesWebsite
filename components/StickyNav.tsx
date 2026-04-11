'use client'

import { useState, useEffect, type RefObject } from 'react'
import Image from 'next/image'

interface StickyNavProps {
  heroRef: RefObject<HTMLElement | null>
  onQuoteClick: () => void
}

export default function StickyNav({ heroRef, onQuoteClick }: StickyNavProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = heroRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [heroRef])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-light-gray"
      style={{
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
        <Image
          src="/logo.jpg"
          alt="Brazusa Cleaning"
          width={130}
          height={44}
          className="h-9 w-auto object-contain"
          priority
        />
        <button
          onClick={onQuoteClick}
          className="bg-brand-blue text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get a Quote
        </button>
      </div>
    </nav>
  )
}
