'use client'

import { type JSX, useRef, useEffect, useCallback } from 'react'

// Loop duration in seconds — adjust speed here; no globals.css sync needed
const DURATION_DESKTOP = 48
const DURATION_MOBILE  = 23

const items = [
  'Work Confirmed',
  'Issues Flagged Early',
  'Structured Communication',
  'Fully Insured & Documented',
  'Same Team Every Visit',
  '30+ Years in Boston',
  'Scope Adapts to Your Needs',
  '24/7 Availability',
  'No Oversight Required',
]

export default function TrustStrip(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const posRef       = useRef(0)         // current X offset in px (moves negative = scrolls left)
  const halfWidthRef = useRef(0)         // scrollWidth / 2 — the loop length
  const rafRef       = useRef<number>(0)
  const lastTimeRef  = useRef<number | undefined>(undefined)
  const isDragging   = useRef(false)
  const startX       = useRef(0)

  const tick = useCallback((time: number) => {
    if (lastTimeRef.current === undefined) lastTimeRef.current = time
    const dt = time - lastTimeRef.current
    lastTimeRef.current = time

    if (!isDragging.current && halfWidthRef.current > 0) {
      const duration = window.innerWidth < 768 ? DURATION_MOBILE : DURATION_DESKTOP
      posRef.current -= (halfWidthRef.current / (duration * 1000)) * dt
      if (posRef.current <= -halfWidthRef.current) posRef.current += halfWidthRef.current
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2
      trackRef.current.style.willChange = 'transform'
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current) }
  }, [tick])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    startX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
    startX.current = e.clientX
    posRef.current += dx
    if (posRef.current > 0) posRef.current -= halfWidthRef.current
    if (posRef.current <= -halfWidthRef.current) posRef.current += halfWidthRef.current
  }, [])

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    lastTimeRef.current = undefined  // reset to prevent dt spike after drag
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }, [])

  return (
    <div
      ref={containerRef}
      className="bg-off-white overflow-hidden"
      style={{
        borderTop:    '1px solid rgba(11,29,46,0.08)', /* no token: intentional — between navy-5 and navy-10 */
        borderBottom: '1px solid rgba(11,29,46,0.08)', /* no token: intentional — between navy-5 and navy-10 */
        padding: '10px 0',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'pan-y', /* vertical scroll passes through; horizontal captured for drag */
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div>
        <div ref={trackRef} className="flex whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 flex-shrink-0"
              style={{
                margin: '0 32px',
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: 'var(--color-navy-60)',
                textTransform: 'uppercase',
              }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-brand-gold)' }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
