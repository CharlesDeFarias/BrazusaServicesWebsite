import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders the shared ops container classes before page-specific classes', () => {
    const html = renderToStaticMarkup(
      <Card className="divide-y divide-neutral-800">
        <span>content</span>
      </Card>
    )

    expect(html).toBe(
      '<div class="rounded-lg border border-navy-10 bg-white divide-y divide-neutral-800"><span>content</span></div>'
    )
  })
})
