import { describe, it, expect } from 'vitest'
import { buildInvoiceData, listBillableClients } from './invoice'
import type { AirtableRecord } from './airtable'

const contacts = new Map([
  ['c1', 'Acme Management Inc'],
  ['c2', 'Pat Smith'],
])
const props = new Map([
  ['p1', '1 Test St'],
  ['p2', '2 Demo Ave'],
])
const templates = new Map([['tpl1', '1 Test St 5g (Resident) - Apartment Cleaning']])

function task(date: string, billing: string, prop: string, tpl: string | null, price: number): AirtableRecord {
  return {
    id: `t${date}${prop}`,
    fields: {
      'Scheduled Date': `${date}T00:00:00.000Z`,
      'Billing Contact': [billing],
      Property: [prop],
      Template: tpl ? [tpl] : [],
      'Unit (Text)': 'Fallback Unit 9 (X)',
      'Base Price': price,
      'Invoice Note': '',
    },
  }
}

describe('buildInvoiceData', () => {
  it('filters by client substring + month, groups by property, totals', () => {
    const tasks = [
      task('2026-06-19', 'c1', 'p1', 'tpl1', 130),
      task('2026-06-22', 'c1', 'p2', null, 130),
      task('2026-07-01', 'c1', 'p1', 'tpl1', 130), // wrong month
      task('2026-06-03', 'c2', 'p2', null, 350), // other client
    ]
    const inv = buildInvoiceData(tasks, contacts, props, templates, 'acme', '2026-06')!
    expect(inv.client).toBe('Acme Management Inc')
    expect(inv.taskCount).toBe(2)
    expect(inv.total).toBe(260)
    const p1 = inv.byProperty.find((p) => p.property === '1 Test St')!
    expect(p1.lines[0].desc).toBe('1 Test St 5g (Resident) - Apartment Cleaning')
    const p2 = inv.byProperty.find((p) => p.property === '2 Demo Ave')!
    expect(p2.lines[0].desc).toContain('Fallback Unit') // no template -> unit text fallback
  })

  it('returns null when no tasks match', () => {
    expect(buildInvoiceData([], contacts, props, templates, 'acme', '2026-06')).toBeNull()
  })

  it('dedupes duplicate Airtable task rows so a client is not double-billed', () => {
    const dup = () => task('2026-06-19', 'c1', 'p1', 'tpl1', 130)
    const inv = buildInvoiceData([dup(), dup(), dup()], contacts, props, templates, 'acme', '2026-06')!
    expect(inv.taskCount).toBe(1)
    expect(inv.total).toBe(130) // not 390
  })

  it('keeps genuinely different same-day cleans (different description)', () => {
    const tasks = [
      task('2026-06-19', 'c1', 'p1', 'tpl1', 130),
      { ...task('2026-06-19', 'c1', 'p1', null, 50), fields: { ...task('2026-06-19', 'c1', 'p1', null, 50).fields, 'Unit (Text)': 'Different task - extra' } },
    ]
    const inv = buildInvoiceData(tasks, contacts, props, templates, 'acme', '2026-06')!
    expect(inv.taskCount).toBe(2)
    expect(inv.total).toBe(180)
  })
})

describe('listBillableClients', () => {
  it('aggregates count and totals per billing contact for the month', () => {
    const tasks = [
      task('2026-06-19', 'c1', 'p1', 'tpl1', 130),
      task('2026-06-22', 'c1', 'p2', null, 130),
      task('2026-06-03', 'c2', 'p2', null, 350),
      task('2026-05-03', 'c2', 'p2', null, 350), // wrong month
    ]
    const clients = listBillableClients(tasks, contacts, '2026-06')
    expect(clients).toEqual([
      { name: 'Pat Smith', taskCount: 1, total: 350, firstDate: '2026-06-03', lastDate: '2026-06-03' },
      { name: 'Acme Management Inc', taskCount: 2, total: 260, firstDate: '2026-06-19', lastDate: '2026-06-22' },
    ])
  })
})
