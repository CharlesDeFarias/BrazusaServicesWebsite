import { describe, it, expect } from 'vitest'
import { buildForecastData, typeShort, unitLabel, dateRange } from './forecast'
import type { AirtableRecord } from './airtable'

const taskTypes = new Map([
  ['tDep', 'Departure Clean'],
  ['tMid', 'Mid-stay Cleans'],
  ['tCA', 'Common Area Cleaning (Weekly Cleaning)'],
])
const props = new Map([
  ['pA', 'Building A'],
  ['pB', 'Building B'],
])

function task(date: string, prop: string, unitId: string, unitText: string, type: string): AirtableRecord {
  return {
    id: `t-${unitText}-${date}`,
    fields: {
      'Scheduled Date': `${date}T00:00:00.000Z`,
      Property: [prop],
      Unit: [unitId],
      'Unit (Text)': unitText,
      'Task Type': [type],
    },
  }
}

function reservation(unitId: string, checkin: string): AirtableRecord {
  return { id: `r-${unitId}`, fields: { 'Check-in': `${checkin}T15:00:00.000Z`, Unit: [unitId] } }
}

describe('typeShort / unitLabel', () => {
  it('classifies task types', () => {
    expect(typeShort('Departure Clean')).toBe('dep')
    expect(typeShort('Mid-stay Cleans')).toBe('mid')
    expect(typeShort('Quarters Common Area Cleaning')).toBe('ca')
  })

  it('extracts unit labels', () => {
    expect(unitLabel('12 Main St 304 (Guest Name)', 'dep')).toBe('304')
    expect(unitLabel('Somewhere - Deluxe King | Rm 07', 'dep')).toBe('7')
    expect(unitLabel('Building - Common Area', 'ca')).toBe('CA')
  })
})

describe('buildForecastData', () => {
  it('groups by property, marks check-ins by unit+date, sorts numerically', () => {
    const tasks = [
      task('2026-07-20', 'pA', 'u10', 'X St 10 (A)', 'tDep'),
      task('2026-07-20', 'pA', 'u2', 'X St 2 (B)', 'tDep'),
      task('2026-07-20', 'pB', 'u5', 'Y St 5 (C)', 'tDep'),
    ]
    const res = [reservation('u2', '2026-07-20'), reservation('u5', '2026-07-21')]
    const days = buildForecastData(tasks, res, taskTypes, props, ['2026-07-20'])
    expect(days).toHaveLength(1)
    const a = days[0].groups.find((g) => g.property === 'Building A')!
    expect(a.units.map((u) => u.label)).toEqual(['2', '10'])
    expect(a.units[0].checkin).toBe(true) // u2 arrives same day
    expect(a.units[1].checkin).toBe(false)
    const b = days[0].groups.find((g) => g.property === 'Building B')!
    expect(b.units[0].checkin).toBe(false) // u5 arrives NEXT day, not the 20th
  })

  it('dedupes CA lines and skips out-of-range dates', () => {
    const tasks = [
      task('2026-07-20', 'pA', 'uCA', 'X - Common Area', 'tCA'),
      task('2026-07-20', 'pA', 'uCA', 'X - Common Area', 'tCA'),
      task('2026-07-21', 'pA', 'u1', 'X St 1 (D)', 'tDep'),
    ]
    const days = buildForecastData(tasks, [], taskTypes, props, ['2026-07-20'])
    expect(days).toHaveLength(1)
    expect(days[0].groups[0].units).toHaveLength(1)
    expect(days[0].groups[0].units[0].label).toBe('CA')
  })
})

describe('dateRange', () => {
  it('builds inclusive ranges', () => {
    expect(dateRange('2026-07-20', 3)).toEqual(['2026-07-20', '2026-07-21', '2026-07-22'])
  })
})
