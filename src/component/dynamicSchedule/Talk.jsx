function formatNameWithInstitution(name, institution) {
  const cleanInstitution = typeof institution === "string" ? institution.trim() : "";
  if (!cleanInstitution) return name;
  return `${name} (${cleanInstitution})`;
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
          {formatNameWithInstitution(speaker.speaker_name, speaker.institution)}
        </p>
      ))}

      {lightningTalks.map((lightningTalk, index) => (
        <div key={`lightning-${index}`} className="space-y-1">
          <p className="text-sm text-ink">{lightningTalk.title}</p>
          <p className="text-sm text-ink">
            {formatNameWithInstitution(
              lightningTalk.speaker_name,
              lightningTalk.institution,
            )}
          </p>
        </div>
      ))}

      {moderators.map((moderator, index) => (
        <p key={`moderator-${index}`} className="text-sm text-ink">
          {moderator}
        </p>
      ))}

    </article>
  );
}

export default Talk;
