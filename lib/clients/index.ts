import { brazusaCleaningConfig } from './brazusa-cleaning'

export const clients = {
  'brazusa-cleaning': brazusaCleaningConfig,
} as const

export type ClientConfig = typeof brazusaCleaningConfig
