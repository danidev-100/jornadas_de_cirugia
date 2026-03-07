function formatNameWithDetail(name, detail) {
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanDetail = typeof detail === "string" ? detail.trim() : "";

  if (!cleanName) return cleanDetail;
  if (!cleanDetail) return cleanName;
  return `${cleanName} (${cleanDetail})`;
}

function formatModerator(moderator) {
  if (typeof moderator === "string") return moderator;
  if (!moderator || typeof moderator !== "object") return "";

  return formatNameWithDetail(moderator.name, moderator.job_title);
}

function Talk({ event }) {
  const title = event?.title ?? null;
  const speakers = Array.isArray(event?.speakers) ? event.speakers : [];
  const lightningTalks = Array.isArray(event?.lightning_talks)
    ? event.lightning_talks
    : [];
  const moderators = Array.isArray(event?.moderators) ? event.moderators : [];

  const isBreak =
    !title &&
    speakers.length === 0 &&
    lightningTalks.length === 0 &&
    moderators.length === 0;

  if (isBreak) {
    return (
      <article className="h-full rounded-xl border border-wave bg-cloud/30 p-3 flex flex-col gap-2">
        <p className="font-semibold text-ink">{event.activity}</p>
      </article>
    );
  }

  return (
    <article className="h-full rounded-xl border border-wave bg-white p-3 flex flex-col gap-2">
      <p className="font-semibold text-ink">{event.activity}</p>

      {title ? <p className="text-sm text-ink">{title}</p> : null}

      {speakers.map((speaker, index) => (
        <p key={`speaker-${index}`} className="text-sm text-ink">
          {formatNameWithDetail(speaker.speaker_name, speaker.institution)}
        </p>
      ))}

      {lightningTalks.map((lightningTalk, index) => (
        <div key={`lightning-${index}`} className="space-y-1">
          <p className="text-sm text-ink">{lightningTalk.title}</p>
          <p className="text-sm text-ink">
            {formatNameWithDetail(
              lightningTalk.speaker_name,
              lightningTalk.institution,
            )}
          </p>
        </div>
      ))}

      {moderators.map((moderator, index) => {
        const moderatorLabel = formatModerator(moderator);
        if (!moderatorLabel) return null;

        return (
          <p key={`moderator-${index}`} className="text-sm text-ink">
            {moderatorLabel}
          </p>
        );
      })}

    </article>
  );
}

export default Talk;
