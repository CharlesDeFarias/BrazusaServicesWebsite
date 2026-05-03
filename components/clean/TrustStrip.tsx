'use client'

import { type JSX, useRef, useCallback } from 'react'

// Must match animation-duration values in globals.css .marquee-track / @media override
const DURATION_DESKTOP = 19
const DURATION_MOBILE  = 9

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
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const isDragging   = useRef(false)
  const startX       = useRef(0)
  const dragOffset   = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    startX.current = e.clientX
    dragOffset.current = 0
    e.currentTarget.setPointerCapture(e.pointerId)
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
    if (wrapperRef.current)   wrapperRef.current.style.transition = 'none'
    if (trackRef.current)     trackRef.current.style.animationPlayState = 'paused'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const offset = e.clientX - startX.current
    dragOffset.current = offset
    if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(${offset}px)`
  }, [])

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'

    const track   = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    // Read where the animation was frozen in px (getComputedStyle resolves % to px)
    const matrix  = window.getComputedStyle(track).transform
    const frozenX = matrix !== 'none' ? new DOMMatrix(matrix).m41 : 0

    // Combine frozen animation position with how far the user dragged
    const totalX    = frozenX + dragOffset.current
    const halfWidth = track.scrollWidth / 2

    // Instantly zero the wrapper — the track animation takes over at the same visual position
    wrapper.style.transform = 'translateX(0)'

    if (halfWidth === 0) return

    // Normalise to [-halfWidth, 0) — the animation's looping range
    let normalizedX = totalX % halfWidth
    if (normalizedX > 0) normalizedX -= halfWidth

    // Negative delay starts the animation mid-loop at the correct position
    const duration = window.innerWidth < 768 ? DURATION_MOBILE : DURATION_DESKTOP
    const delay    = (-normalizedX / halfWidth) * duration

    // Reflow trick: 'none' → reflow → new animation with computed delay
    track.style.animationPlayState = ''
    track.style.animation          = 'none'
    track.offsetHeight             // eslint-disable-line @typescript-eslint/no-unused-expressions
    track.style.animation          = `marquee ${duration}s linear infinite`
    track.style.animationDelay     = `-${delay}s`
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
        touchAction: 'pan-y', /* vertical page scroll passes through; horizontal captured for drag */
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
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
