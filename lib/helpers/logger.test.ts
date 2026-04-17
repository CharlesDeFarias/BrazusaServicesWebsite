import { describe, it, expect, vi, beforeEach } from 'vitest'

const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

import { log } from './logger'

describe('log.error', () => {
  beforeEach(() => consoleSpy.mockClear())

  it('logs a structured JSON object to console.error', () => {
    log.error('quote_submission_failed', new Error('test error'), { clientId: 'brazusa-cleaning' })
    expect(consoleSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleSpy.mock.calls[0][0] as string)
    expect(logged.level).toBe('error')
    expect(logged.event).toBe('quote_submission_failed')
    expect(logged.message).toBe('test error')
    expect(logged.context.clientId).toBe('brazusa-cleaning')
    expect(typeof logged.timestamp).toBe('string')
  })

  it('handles non-Error objects gracefully', () => {
    log.error('unknown_error', 'a string error')
    expect(consoleSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleSpy.mock.calls[0][0] as string)
    expect(logged.message).toBe('a string error')
  })
})

describe('log.info', () => {
  beforeEach(() => consoleInfoSpy.mockClear())

  it('logs a structured JSON object to console.info', () => {
    log.info('quote_submitted', { clientId: 'brazusa-cleaning' })
    expect(consoleInfoSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleInfoSpy.mock.calls[0][0] as string)
    expect(logged.level).toBe('info')
    expect(logged.event).toBe('quote_submitted')
  })
})

describe('log.warn', () => {
  beforeEach(() => consoleWarnSpy.mockClear())

  it('logs a structured JSON object to console.warn', () => {
    log.warn('slow_integration', { integration: 'airtable' })
    expect(consoleWarnSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleWarnSpy.mock.calls[0][0] as string)
    expect(logged.level).toBe('warn')
    expect(logged.event).toBe('slow_integration')
  })
})
