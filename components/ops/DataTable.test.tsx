import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DataTable } from './DataTable'

describe('DataTable', () => {
  it('renders the payroll table structure', () => {
    const html = renderToStaticMarkup(
      <DataTable className="overflow-hidden" table>
        <tbody>
          <tr>
            <td>row</td>
          </tr>
        </tbody>
      </DataTable>
    )

    expect(html).toBe(
      '<div class="rounded-lg border border-neutral-800 overflow-hidden"><table class="w-full text-sm"><tbody><tr><td>row</td></tr></tbody></table></div>'
    )
  })

  it('preserves div-based invoice detail rows', () => {
    const html = renderToStaticMarkup(
      <DataTable className="divide-y divide-neutral-800 text-sm">
        <div>invoice row</div>
      </DataTable>
    )

    expect(html).toBe(
      '<div class="rounded-lg border border-neutral-800 divide-y divide-neutral-800 text-sm"><div>invoice row</div></div>'
    )
  })
})
