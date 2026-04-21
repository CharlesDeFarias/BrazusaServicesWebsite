import type { SegmentCopy } from './types'

export const baseCopy: SegmentCopy = {
  hero: {
    h1: 'Cleaning built for rentals, offices, and multi-unit operations.',
    body: 'Work is completed and confirmed through your preferred channel, and when something is off it is flagged with context so it can be handled before it affects guests, staff, or schedules.',
    differentiators: [
      { n: '01', text: 'Work completed and clearly confirmed' },
      { n: '02', text: 'Issues flagged before they become problems' },
      { n: '03', text: 'Communication you do not have to chase' },
      { n: '04', text: 'Works with your tools, apps, or systems' },
      { n: '05', text: 'Consistent team that learns your space' },
      { n: '06', text: 'Handles inventory, linen, and basic property tasks' },
    ],
    microcopy: 'Tell us how your space runs and we will say if it fits or not.',
  },
  accordion: {
    headline: 'The kind of work you need',
  },
}
