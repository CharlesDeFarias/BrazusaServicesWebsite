type LogContext = Record<string, unknown>

function formatEntry(
  level: 'info' | 'warn' | 'error',
  event: string,
  errorOrContext?: unknown,
  context?: LogContext
): string {
  const isError = errorOrContext instanceof Error
  const message = isError
    ? errorOrContext.message
    : typeof errorOrContext === 'string'
      ? errorOrContext
      : undefined

  return JSON.stringify({
    level,
    event,
    message,
    context: isError ? context : (errorOrContext as LogContext | undefined),
    timestamp: new Date().toISOString(),
  })
}

export const log = {
  info(event: string, context?: LogContext): void {
    console.info(formatEntry('info', event, undefined, context))
  },

  warn(event: string, errorOrContext?: unknown, context?: LogContext): void {
    console.warn(formatEntry('warn', event, errorOrContext, context))
  },

  error(event: string, errorOrContext?: unknown, context?: LogContext): void {
    console.error(formatEntry('error', event, errorOrContext, context))
  },
}
