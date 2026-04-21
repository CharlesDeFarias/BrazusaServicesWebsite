import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const strCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: 'Cleaning built for the gap between checkout and check-in',
    body: 'Work is completed and confirmed through your system or ours. Linens, inventory, and tiered cleans stay in rotation, and issues are flagged with context before they reach guests.',
    microcopy: "Tell us how your turnovers run and we'll tell you where we fit.",
  },
}
