import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const propertyCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: 'Cleaning especially built to hold standards across multiple buildings',
    body: 'We set a repeatable structure across properties so standards do not drift from unit to unit. Building details stay tracked, work is completed and confirmed, and service can expand or contract with occupancy.',
  },
}
