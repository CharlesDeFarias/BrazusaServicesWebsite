export type Segment = 'str' | 'offices' | 'property' | 'homes' | 'other'

export const SEGMENTS: readonly Segment[] = ['str', 'offices', 'property', 'homes', 'other']

export function isValidSegment(s: string): s is Segment {
  return (SEGMENTS as readonly string[]).includes(s)
}

export interface Differentiator {
  n: string
  text: string
}

export interface HeroCopy {
  h1: string
  body: string
  differentiators: Differentiator[]
  microcopy: string
}

export interface AccordionCopy {
  headline: string
}

export interface SegmentCopy {
  hero: HeroCopy
  accordion: AccordionCopy
}
