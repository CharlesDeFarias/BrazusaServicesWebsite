import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const homesCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    // Homes/apartments-specific hero copy goes here once approved
  },
}
