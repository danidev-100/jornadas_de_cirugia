import {
  getPersonAnchorId,
  getPersonById,
} from "../../data/people.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function resolvePersonReference(reference, detailKey) {
  if (!reference) return null;

  if (reference.person_id) {
    const person = getPersonById(reference.person_id);
    if (!person) {
      return {
        name: reference.person_id,
        detail: "",
        href: null,
      };
    }

    return {
      name: person.name,
      detail: normalizeText(person[detailKey]),
      href: `#${getPersonAnchorId(reference.person_id)}`,
    };
  }

  if (reference.label) {
    return {
      name: normalizeText(reference.label),
      detail: "",
      href: null,
    };
  }

  if (typeof reference === "string") {
    return {
      name: normalizeText(reference),
      detail: "",
      href: null,
    };
  }

  if ("speaker_name" in reference) {
    return {
      name: normalizeText(reference.speaker_name),
      detail: normalizeText(reference.institution),
      href: null,
    };
  }

  if ("name" in reference) {
    return {
      name: normalizeText(reference.name),
      detail: normalizeText(reference.job_title),
      href: null,
    };
  }

  return null;
}

function PersonReference({ reference, detailKey }) {
  const personReference = resolvePersonReference(reference, detailKey);
  if (!personReference?.name) return null;

  return (
    <>
      {personReference.href ? (
        <a
          href={personReference.href}
          className="font-medium underline decoration-wave underline-offset-2 transition hover:text-chocolate"
        >
          {personReference.name}
        </a>
      ) : (
        personReference.name
      )}
      {personReference.detail ? ` (${personReference.detail})` : null}
    </>
  );
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
          <PersonReference reference={speaker} detailKey="institution" />
        </p>
      ))}

      {lightningTalks.map((lightningTalk, index) => {
        const speakerReferences = Array.isArray(lightningTalk?.speakers)
          ? lightningTalk.speakers
          : lightningTalk.person_id ||
              lightningTalk.label ||
              lightningTalk.speaker_name
            ? [lightningTalk]
            : [];

        return (
          <div key={`lightning-${index}`} className="space-y-1">
            <p className="text-sm text-ink">{lightningTalk.title}</p>
            {speakerReferences.map((speakerReference, speakerIndex) => (
              <p
                key={`lightning-${index}-speaker-${speakerIndex}`}
                className="text-sm text-ink"
              >
                <PersonReference
                  reference={speakerReference}
                  detailKey="institution"
                />
              </p>
            ))}
          </div>
        );
      })}

      {moderators.map((moderator, index) => (
        <p key={`moderator-${index}`} className="text-sm text-ink">
          <PersonReference reference={moderator} detailKey="job_title" />
        </p>
      ))}
    </article>
  );
}

export default Talk;
