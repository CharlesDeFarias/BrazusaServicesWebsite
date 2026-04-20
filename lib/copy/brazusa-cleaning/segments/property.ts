import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const propertyCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    // Property manager-specific hero copy goes here once approved
  },
}
