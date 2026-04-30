import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const officesCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: 'Cleaning especially built for fixed routines and working hours',
    body: 'Service follows a set schedule, with the same team where possible, so staff, clients, or patients do not have to adjust around it. Each visit is completed and confirmed without extra follow-up on your end.',
  },
}
