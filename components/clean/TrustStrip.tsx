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
  const frozenX      = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    isDragging.current = true
    startX.current = e.clientX
    dragOffset.current = 0
    e.currentTarget.setPointerCapture(e.pointerId)
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
    if (wrapperRef.current)   wrapperRef.current.style.transition = 'none'

    // Pause then immediately read the frozen position — getComputedStyle resolves % → px
    track.style.animationPlayState = 'paused'
    const matrix = window.getComputedStyle(track).transform
    frozenX.current = matrix !== 'none' ? new DOMMatrix(matrix).m41 : 0
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

    const halfWidth = track.scrollWidth / 2
    if (halfWidth === 0) return

    // Total visual displacement: where animation froze + how far the user dragged
    const totalX = frozenX.current + dragOffset.current

    // Normalise to [-halfWidth, 0) — the animation's looping range
    let normalizedX = totalX % halfWidth
    if (normalizedX > 0) normalizedX -= halfWidth

    const duration = window.innerWidth < 768 ? DURATION_MOBILE : DURATION_DESKTOP
    // Negative delay seeks the animation to normalizedX at the moment it starts
    const delay = (-normalizedX / halfWidth) * duration

    // Instantly zero the wrapper — track animation takes over at the same visual position
    wrapper.style.transform = 'translateX(0)'

    // Reflow trick: 'none' → reflow → restart with delay embedded in the shorthand.
    // animationDelay set separately after animation starts is ignored by spec — must be atomic.
    track.style.animationPlayState = ''
    track.style.animation          = 'none'
    track.offsetHeight             // eslint-disable-line @typescript-eslint/no-unused-expressions
    track.style.animation          = `marquee ${duration}s linear -${delay}s infinite`
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
