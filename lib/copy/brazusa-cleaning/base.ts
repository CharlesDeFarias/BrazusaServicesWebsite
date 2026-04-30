import type { SegmentCopy } from './types'

export const baseCopy: SegmentCopy = {
  hero: {
    h1: 'Cleaning especially built for rentals, offices, and multi-unit operations.',
    body: 'Work is completed and confirmed through your preferred channel, and when something is off it is flagged with context so it can be handled before it affects guests, staff, or schedules.',
    differentiators: [
      { n: '01', text: 'Work completed and clearly confirmed' },
      { n: '02', text: 'Issues flagged before they become problems' },
      { n: '03', text: 'Communication you do not have to chase' },
      { n: '04', text: 'Works with your tools, apps, or systems' },
      { n: '05', text: 'Consistent team that learns your space' },
      { n: '06', text: 'Handles inventory, linen, and basic property tasks' },
    ],
  },
  accordion: {
    headline: 'The kind of cleaning you need',
  },
  services: {
    serviceDefinitions: [
      {
        name: 'Routine Cleaning',
        clients: ['property', 'offices', 'apartment'],
        descriptions: {
          property: 'Recurring cleaning across units and common areas with issues flagged as they come up.',
          offices: 'Scheduled cleaning that runs without reminders and is confirmed after each visit.',
          apartment: 'Recurring upkeep handled on your schedule, with clear confirmation after each visit.',
          str: 'Baseline maintenance between turnovers so listings do not drift or fall behind.',
        },
      },
      {
        name: 'Deep Cleaning',
        clients: ['str', 'property', 'offices', 'apartment'],
        descriptions: {
          str: 'Full reset when guest wear builds up or before putting a unit back online.',
          property: 'Detail work across units and shared spaces when standard cleaning no longer holds.',
          offices: 'Detailed reset for offices and clinics when routine cleaning stops being enough.',
          apartment: 'Full reset when buildup reaches a point routine cleaning cannot keep up with.',
        },
      },
      {
        name: 'Move-in / Move-out',
        clients: ['str', 'property', 'apartment'],
        descriptions: {
          str: 'Reset units between stays or seasons so they are ready to go back online.',
          property: 'Move-out documented and move-in ready across units and managed properties.',
          offices: 'Office transition cleaning handled during relocations and tenant handoffs.',
          apartment: 'Move-in and move-out cleaning handled and confirmed so the space is ready when it needs to be.',
        },
      },
      {
        name: 'STR Turnover',
        clients: ['str'],
        descriptions: {
          str: 'Between-guest cleaning with completion confirmed so units are ready on time.',
          property: 'Turnover coordination for furnished units that follow hospitality timelines.',
          offices: 'Fast reset support when spaces turn over between short-term use or events.',
          apartment: 'Quick resets for furnished units that need to be ready again the same day.',
        },
      },
      {
        name: 'Post-construction',
        clients: ['property', 'offices'],
        descriptions: {
          str: 'Post-renovation cleanup so units can be listed again without delays.',
          property: 'Cleanup after projects, handling dust, debris, and contractor handoff issues.',
          offices: 'Construction cleanup for offices and clinics before reopening to staff.',
          apartment: 'Post-renovation cleanup handled until the space is genuinely livable again.',
        },
      },
    ],
    extendedServiceDefinitions: [
      {
        name: 'Linen processing',
        clients: ['str', 'property'],
        descriptions: {
          str: 'Wash, sort, and stage linens so turnovers do not slow down.',
          property: 'Manage linen flow across units so shortages do not disrupt operations.',
        },
        defaultDescription: 'Linen handling when volume or turnover makes it part of the workflow.',
      },
      {
        name: 'Inventory tracking',
        clients: ['str', 'property'],
        descriptions: {
          str: 'Track supplies and flag shortages before they affect guest stays.',
          property: 'Monitor inventory across units so gaps are seen before they cause delays.',
        },
        defaultDescription: 'Track supplies and flag shortages before they affect the next visit.',
      },
      {
        name: 'Closet & storage organization',
        clients: ['str', 'property', 'apartment'],
        descriptions: {
          str: 'Keep closets organized so supplies are visible and easy to restock.',
          property: 'Set storage standards so teams know where items go across units.',
          apartment: 'Organize storage so items have a clear place and are easy to find each time.',
        },
        defaultDescription: 'Organize storage so items are in the right place and easy to access.',
      },
      {
        name: 'Maintenance coordination',
        clients: ['str', 'property', 'offices'],
        descriptions: {
          str: 'Flag issues during cleans and coordinate fixes before guests notice.',
          property: 'Surface problems early and coordinate with vendors before they grow.',
          offices: 'Identify issues during service so they are handled before disruption.',
        },
        defaultDescription: 'Identify issues early and coordinate fixes when cleaning reveals them.',
      },
      {
        name: 'Minor task handling',
        clients: ['str', 'property', 'offices', 'apartment'],
        descriptions: {
          str: 'Handle small issues during service so the unit stays guest-ready between turnovers.',
          property: 'Take care of small tasks that would otherwise require another vendor.',
          offices: 'Resolve minor issues during service so they do not become larger tasks.',
          apartment: 'Handle small tasks during visits so they do not pile up.',
        },
        defaultDescription: 'Take care of small tasks during service so they do not escalate.',
      },
      {
        name: 'Guest support tasks',
        clients: ['str'],
        descriptions: {
          str: 'Assist with guest-facing needs so hosts are not pulled into small issues.',
        },
        defaultDescription: 'Cover the in-between tasks that do not fit cleaning but need to be handled.',
      },
      {
        name: 'Key & access management',
        clients: ['str', 'property', 'offices'],
        descriptions: {
          str: 'Manage keys and access so turnovers do not get delayed or blocked.',
          property: 'Keep access organized across units so staff and vendors can enter.',
          offices: 'Coordinate access for after-hours work without needing supervision.',
        },
        defaultDescription: 'Handle access so entry and handoffs do not slow down the work.',
      },
    ],
  },
}
