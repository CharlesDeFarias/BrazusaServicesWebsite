import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const homesCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: 'Cleaning built for homes that need the same team back',
    body: 'Your home is handled by a team that knows the space, works from notes kept on your home, and adjusts scheduling through whatever channel works for you. Communication stays open, including translation, and work is completed and confirmed.',
    microcopy: "Tell us what matters in your home. We'll handle the rest.",
  },
}
