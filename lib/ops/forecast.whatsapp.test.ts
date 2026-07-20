import { describe, it, expect } from 'vitest'
import { dayToWhatsApp, weekToWhatsApp, type ForecastDay } from './forecast'

const day: ForecastDay = {
  date: '2026-07-16',
  groups: [
    {
      property: 'Prentiss',
      units: [
        { label: '1', kind: 'dep', checkin: false },
        { label: '13', kind: 'dep', checkin: true },
        { label: '12', kind: 'mid', checkin: false },
        { label: 'CA', kind: 'ca', checkin: false },
      ],
    },
    {
      property: '30 Webro',
      units: [{ label: '304', kind: 'dep', checkin: true }],
    },
  ],
}

describe('dayToWhatsApp', () => {
  it('renders the house format with bolded check-ins and (Mid)/CA tokens', () => {
    const out = dayToWhatsApp(day)
    expect(out).toContain('*🗓️ Daily Forecast (07/16)*')
    expect(out).toContain('*° = same-day check-in*')
    expect(out).toContain('*☀️ 16/07 – Thursday 🗓️*')
    expect(out).toContain('- *Prentiss*: 1, *13°*, 12 (Mid), CA')
    expect(out).toContain('- *30 Webro*: *304°*')
  })
})

describe('weekToWhatsApp', () => {
  it('renders a weekly header spanning first..last day and stacks day blocks', () => {
    const day2: ForecastDay = { date: '2026-07-17', groups: [{ property: 'Prentiss', units: [{ label: '5', kind: 'dep', checkin: false }] }] }
    const out = weekToWhatsApp([day, day2])
    expect(out).toContain('*🗓️ Weekly Forecast (07/16 - 07/17)*')
    expect(out).toContain('*☀️ 16/07 – Thursday 🗓️*')
    expect(out).toContain('*☀️ 17/07 – Friday 🗓️*')
  })

  it('returns empty string for no days', () => {
    expect(weekToWhatsApp([])).toBe('')
  })
})
