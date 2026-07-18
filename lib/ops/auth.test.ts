import { describe, it, expect, beforeEach } from 'vitest'
import { parsePasscodes, userForPasscode, createSessionValue, verifySessionValue } from './auth'

describe('parsePasscodes', () => {
  it('parses user:code pairs into code->user map', () => {
    const map = parsePasscodes('charles:1234,vitor:5678, clara : 9012')
    expect(map.get('1234')).toBe('charles')
    expect(map.get('5678')).toBe('vitor')
    expect(map.get('9012')).toBe('clara')
  })

  it('returns empty map for undefined/malformed input', () => {
    expect(parsePasscodes(undefined).size).toBe(0)
    expect(parsePasscodes('nocolon').size).toBe(0)
    expect(parsePasscodes(':').size).toBe(0)
  })
})

describe('sessions', () => {
  beforeEach(() => {
    process.env.OPS_SESSION_SECRET = 'test-secret'
    process.env.OPS_PASSCODES = 'charles:1234,vitor:5678'
  })

  it('userForPasscode resolves configured users', () => {
    expect(userForPasscode('1234')).toBe('charles')
    expect(userForPasscode('wrong')).toBeNull()
  })

  it('round-trips a valid session', () => {
    const v = createSessionValue('vitor')
    expect(verifySessionValue(v)).toBe('vitor')
  })

  it('rejects tampered user', () => {
    const v = createSessionValue('vitor')
    expect(verifySessionValue(v.replace('vitor', 'admin'))).toBeNull()
  })

  it('rejects tampered signature and garbage', () => {
    const v = createSessionValue('vitor')
    expect(verifySessionValue(v.slice(0, -2) + 'zz')).toBeNull()
    expect(verifySessionValue('garbage')).toBeNull()
    expect(verifySessionValue(undefined)).toBeNull()
  })

  it('rejects expired sessions', () => {
    const past = Date.now() - 40 * 24 * 60 * 60 * 1000
    const v = createSessionValue('vitor', past)
    expect(verifySessionValue(v)).toBeNull()
  })
})
