import type { Segment, SegmentCopy } from './types'
import { baseCopy } from './base'
import { strCopy } from './segments/str'
import { officesCopy } from './segments/offices'
import { propertyCopy } from './segments/property'
import { homesCopy } from './segments/homes'

export type { Segment, SegmentCopy }
export { isValidSegment, SEGMENTS } from './types'
export type { HeroCopy, Differentiator } from './types'

const segmentCopyMap: Record<Segment, SegmentCopy> = {
  str: strCopy,
  offices: officesCopy,
  property: propertyCopy,
  homes: homesCopy,
  other: baseCopy,
}

export function getCopy(segment: Segment | null): SegmentCopy {
  if (!segment) return baseCopy
  return segmentCopyMap[segment] ?? baseCopy
}
