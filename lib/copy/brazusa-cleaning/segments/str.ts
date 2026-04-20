import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const strCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    // STR-specific hero copy goes here once approved
  },
}
