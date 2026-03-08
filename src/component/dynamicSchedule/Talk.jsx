import {
  getPersonAnchorId,
  getPersonById,
} from "../../data/people.js";

const ROOM_TONE_CLASSES = [
  {
    card: "border-l-lagoon bg-lagoon/10",
    chip: "bg-lagoon/10 text-lagoon",
  },
  {
    card: "border-l-gold bg-gold/20",
    chip: "bg-gold/25 text-chocolate",
  },
  {
    card: "border-l-deep-blue/35 bg-deep-blue/10",
    chip: "bg-deep-blue/10 text-deep-blue/60",
  },
];

const DEFAULT_ROOM_TONE_CLASSES = {
  card: "border-l-wave bg-cloud/80",
  chip: "bg-white/80 text-deep-blue/60",
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getRoomToneClasses(roomIndex) {
  if (!Number.isInteger(roomIndex) || roomIndex < 0) {
    return DEFAULT_ROOM_TONE_CLASSES;
  }

  return ROOM_TONE_CLASSES[roomIndex % ROOM_TONE_CLASSES.length];
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

function Talk({
  event,
  roomIndex = null,
  roomLabel = null,
  showRoomLabel = false,
}) {
  const title = event?.title ?? null;
  const speakers = Array.isArray(event?.speakers) ? event.speakers : [];
  const lightningTalks = Array.isArray(event?.lightning_talks)
    ? event.lightning_talks
    : [];
  const moderators = Array.isArray(event?.moderators) ? event.moderators : [];
  const roomToneClasses = getRoomToneClasses(roomIndex);
  const cardClassName = `flex h-full flex-col gap-4 overflow-hidden rounded-r-[2rem] rounded-l-none border-l-[0.55rem] px-5 py-5 ${roomToneClasses.card}`;
  const activityClassName = `inline-flex w-fit rounded-2xl px-4 py-2 text-sm font-semibold tracking-[0.16em] uppercase ${roomToneClasses.chip}`;
  const roomLabelClassName = `text-xs font-semibold uppercase ${roomToneClasses.chip.split(" ").at(-1) ?? "text-deep-blue/60"}`;

  const headerContent = (
    <div className="flex items-center justify-between gap-3">
      <p className={activityClassName}>{event.activity}</p>
      {showRoomLabel && roomLabel ? (
        <p className={roomLabelClassName}>{roomLabel}</p>
      ) : null}
    </div>
  );

  const isBreak =
    !title &&
    speakers.length === 0 &&
    lightningTalks.length === 0 &&
    moderators.length === 0;

  if (isBreak) {
    return (
      <article className={cardClassName}>
        {headerContent}
      </article>
    );
  }

  return (
    <article className={cardClassName}>
      {headerContent}

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
          <div key={`lightning-${index}`} className="flex flex-col gap-1">
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
