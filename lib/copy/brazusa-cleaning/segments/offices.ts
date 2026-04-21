import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const officesCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: 'Cleaning built for fixed routines and working hours',
    body: 'Service follows a set schedule, with the same team where possible, so staff, clients, or patients do not have to adjust around it. Each visit is completed and confirmed without extra follow-up on your end.',
    microcopy: "Tell us how your space runs and we'll say if the fit is right.",
  },
}
