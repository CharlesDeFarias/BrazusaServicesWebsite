import type { SegmentCopy } from '../types'
import { baseCopy } from '../base'

export const otherCopy: SegmentCopy = {
  ...baseCopy,
  hero: {
    ...baseCopy.hero,
    h1: "Cleaning that fits setups that don't fit a category",
    body: 'We work with mixed-use spaces, one-off projects, and setups where cleaning overlaps with scheduling or coordination. Scope is defined, completed, and confirmed.',
    differentiators: [
      { n: '01', text: 'Scope defined upfront so nothing gets assumed or missed' },
      { n: '02', text: 'Work completed and confirmed through your preferred channel' },
      { n: '03', text: 'Coordination handled when cleaning overlaps with logistics' },
    ],
  },
}
