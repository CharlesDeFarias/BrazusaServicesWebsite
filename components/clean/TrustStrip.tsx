'use client'

import { type JSX, useRef, useCallback } from 'react'

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
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const isDragging  = useRef(false)
  const startX      = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    startX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
    if (wrapperRef.current)   wrapperRef.current.style.transition = 'none'
    if (trackRef.current)     trackRef.current.style.animationPlayState = 'paused'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const offset = e.clientX - startX.current
    if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(${offset}px)`
  }, [])

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = 'transform 0.4s ease-out'
      wrapperRef.current.style.transform  = 'translateX(0)'
    }
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
  }, [])

  return (
    <div
      ref={containerRef}
      className="bg-off-white overflow-hidden"
      style={{
        borderTop: '1px solid rgba(11,29,46,0.08)', /* no token: intentional — between navy-5 and navy-10 */
        borderBottom: '1px solid rgba(11,29,46,0.08)', /* no token: intentional — between navy-5 and navy-10 */
        padding: '10px 0',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'pan-y', /* allow vertical page scroll; capture horizontal drag */
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Drag offset wrapper — slides with pointer, eases back to 0 on release */}
      <div ref={wrapperRef}>
        <div
          ref={trackRef}
          className="flex marquee-track whitespace-nowrap"
        >
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
