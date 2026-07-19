import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { OpsPageSkeleton } from './OpsPageSkeleton'

describe('OpsPageSkeleton', () => {
  it('exposes a loading status and stable skeleton structure', () => {
    const html = renderToStaticMarkup(<OpsPageSkeleton />)

    expect(html).toContain('aria-busy="true"')
    expect(html).toContain('aria-label="Loading page"')
    expect(html).toContain('class="rounded-lg border border-neutral-800 overflow-hidden"')
  })
})
