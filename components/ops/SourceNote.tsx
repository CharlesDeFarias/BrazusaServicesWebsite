/** Provenance footer: where the data came from, when it loaded, and any caveats.
 * Rendered UNDER a report so it's visible but not part of any copy/paste block. */
export function SourceNote({
  source,
  loadedAt,
  note,
}: {
  source: string
  loadedAt: Date
  note?: string
}) {
  const when = loadedAt.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
  return (
    <div className="mt-3 border-t border-white-10 pt-2 text-xs text-white-40 space-y-0.5">
      <p>
        Source: <span className="font-medium text-white-70">{source}</span> · loaded {when}
      </p>
      {note && <p>{note}</p>}
    </div>
  )
}
