import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const strCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: 'Cleaning built for the gap between checkout and check-in',
    body: 'Work is completed and confirmed through your system or ours, with linens, inventory, and tiered cleans built into the rotation. If something is off, it is flagged with context before it turns into a guest problem.',
    microcopy: "Tell us how your turnovers run and we'll tell you where we fit.",
  },
}
