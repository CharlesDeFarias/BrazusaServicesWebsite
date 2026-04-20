import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const officesCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    // Offices/clinics-specific hero copy goes here once approved
  },
}
