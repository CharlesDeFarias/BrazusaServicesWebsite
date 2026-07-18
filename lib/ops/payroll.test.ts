import { describe, it, expect } from 'vitest'
import { latestPerKey } from './payroll'

describe('latestPerKey', () => {
  it('keeps the newest push per (type,key)', () => {
    const rows = [
      ['week', '2026-07-13', '2026-07-20T10:00:00', '{"total":100}'],
      ['week', '2026-07-13', '2026-07-20T12:00:00', '{"total":150}'],
      ['day', '2026-07-16', '2026-07-17T08:00:00', '{"total":50}'],
    ]
    const latest = latestPerKey(rows)
    expect(latest.size).toBe(2)
    expect(latest.get('week|2026-07-13')!.json).toBe('{"total":150}')
    expect(latest.get('day|2026-07-16')!.json).toBe('{"total":50}')
  })

  it('skips malformed rows', () => {
    const latest = latestPerKey([[], ['week'], ['week', 'k'], ['week', 'k', 't', '{}']])
    expect(latest.size).toBe(1)
  })
})
