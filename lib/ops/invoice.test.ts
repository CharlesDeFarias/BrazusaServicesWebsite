import { describe, it, expect } from 'vitest'
import { buildInvoiceData, isBillableDesc, listBillableClients, overridePrice } from './invoice'
import type { AirtableRecord } from './airtable'
import type { PriceOverride } from './opsfeed'

const contacts = new Map([
  ['c1', 'Acme Management Inc'],
  ['c2', 'Pat Smith'],
])
const props = new Map([
  ['p1', '1 Test St'],
  ['p2', '2 Demo Ave'],
])
const templates = new Map([
  ['tpl1', '1 Test St 5g (Resident) - Apartment Cleaning'],
  ['tplOps', '1 Test St Common Areas - Operational Tasks'],
  ['tplLinen', '1 Test St Common Areas - Linens Organization & Inventory'],
])

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

  it('excludes internal Operational Tasks + Linens Organization (Vitor never bills them)', () => {
    const tasks = [
      task('2026-06-19', 'c1', 'p1', 'tpl1', 130), // billable clean
      task('2026-06-20', 'c1', 'p1', 'tplOps', 200), // operational -> excluded
      task('2026-06-21', 'c1', 'p1', 'tplLinen', 100), // linens mgmt -> excluded
    ]
    const inv = buildInvoiceData(tasks, contacts, props, templates, 'acme', '2026-06')!
    expect(inv.taskCount).toBe(1)
    expect(inv.total).toBe(130) // not 430
  })
})

describe('isBillableDesc', () => {
  it('bills real cleans, drops operational/linens upkeep', () => {
    expect(isBillableDesc('58 Burbank St Common Areas - Standard Cleaning')).toBe(true)
    expect(isBillableDesc('94 Charles St 3 - Departure Cleaning')).toBe(true)
    expect(isBillableDesc('6 Prentiss St Common Areas - Operational Tasks')).toBe(false)
    expect(isBillableDesc('304 Newbury St Common Areas - Linens Organization & Inventory')).toBe(false)
  })
})

describe('overridePrice', () => {
  const ovs: PriceOverride[] = [
    { unitMatch: '94 Charles St 2', newPrice: 77.25, effectiveFrom: '2026-07-01' },
    { unitMatch: '33 - 1 Highland Ave 1G', newPrice: 100, effectiveFrom: '2026-07-01' },
  ]
  it('overrides a matching unit on/after the effective date', () => {
    expect(overridePrice('94 Charles St 2 (Unknown)', '2026-07-15', 66.95, ovs)).toBe(77.25)
    expect(overridePrice('33 - 1 Highland Ave 1G (Unknown)', '2026-07-05', 80, ovs)).toBe(100)
  })
  it('leaves the base price for non-matching units (e.g. unit #1, common areas)', () => {
    expect(overridePrice('94 Charles St 1 (Unknown)', '2026-07-15', 100, ovs)).toBe(100)
    expect(overridePrice('94 Charles St Common Areas (Unknown)', '2026-07-15', 50, ovs)).toBe(50)
  })
  it('does not apply before the effective date', () => {
    expect(overridePrice('94 Charles St 2 (Unknown)', '2026-06-30', 66.95, ovs)).toBe(66.95)
  })
  it('no overrides -> base price unchanged', () => {
    expect(overridePrice('94 Charles St 2 (Unknown)', '2026-07-15', 66.95, [])).toBe(66.95)
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
