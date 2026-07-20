/**
 * Boston-local date helpers. Vercel runs the server in UTC, so `new Date().toISOString()`
 * gives the UTC date — which rolls to "tomorrow" after 8pm Boston and shows the wrong day.
 * These always resolve to America/New_York regardless of where the server runs.
 */

/** Today in Boston as YYYY-MM-DD. */
export function bostonToday(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

/** Current month in Boston as YYYY-MM. */
export function bostonMonth(): string {
  return bostonToday().slice(0, 7)
}
