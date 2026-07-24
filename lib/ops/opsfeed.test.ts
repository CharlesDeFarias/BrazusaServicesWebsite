import { describe, it, expect } from 'vitest'
import { parseCleaningListRow } from './opsfeed'

describe('parseCleaningListRow', () => {
  it('parses a full cleaning-list row', () => {
    const json = JSON.stringify({
      date: '2026-07-24',
      generatedAt: '2026-07-24T00:10:00-04:00',
      buildings: [
        { building: 'Prentiss', units: [{ unit: '3', kind: 'dep', checkin: true, label: '3°' }] },
      ],
      residential: [{ client: 'Jaime', address: '120 Kingston Street 2004', task: 'Apartment Cleaning' }],
      held: [{ unit: '80 Dot 201' }],
      unmatched: [{ home_id: 999, date: '2026-07-24', guest: 'Ghost' }],
      totals: { cleans: 33, checkins: 17, thatchCleans: 31, residential: 2 },
      whatsappText: '*Lista*',
    })
    const f = parseCleaningListRow(['2026-07-24T00:10:00-04:00', json])!
    expect(f.date).toBe('2026-07-24')
    expect(f.buildings[0].building).toBe('Prentiss')
    expect(f.buildings[0].units[0].checkin).toBe(true)
    expect(f.residential[0].client).toBe('Jaime')
    expect(f.totals.cleans).toBe(33)
    expect(f.whatsappText).toBe('*Lista*')
  })

  it('returns null on malformed json', () => {
    expect(parseCleaningListRow(['ts', '{not json'])).toBeNull()
  })

  it('defaults missing arrays/totals', () => {
    const f = parseCleaningListRow(['ts', JSON.stringify({ date: '2026-07-24' })])!
    expect(f.buildings).toEqual([])
    expect(f.residential).toEqual([])
    expect(f.totals.cleans).toBe(0)
  })
})
