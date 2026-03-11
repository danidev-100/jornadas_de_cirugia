import NationalityFlag from "../NationalityFlag";
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

function resolvePersonReference(reference) {
  if (!reference) return null;

  if (reference.person_id) {
    const person = getPersonById(reference.person_id);
    if (!person) {
      return {
        name: reference.person_id,
        href: null,
        nationality: null,
      };
    }

    return {
      name: person.name,
      href: person.showInSpeakers
        ? `#${getPersonAnchorId(reference.person_id)}`
        : null,
      nationality: person.nationality ?? null,
    };
  }

  if (reference.label) {
    return {
      name: normalizeText(reference.label),
      href: null,
      nationality: normalizeText(reference.nationality) || null,
    };
  }

  if (typeof reference === "string") {
    return {
      name: normalizeText(reference),
      href: null,
      nationality: null,
    };
  }

  if ("speaker_name" in reference) {
    return {
      name: normalizeText(reference.speaker_name),
      href: null,
      nationality: normalizeText(reference.nationality) || null,
    };
  }

  if ("name" in reference) {
    return {
      name: normalizeText(reference.name),
      href: null,
      nationality: normalizeText(reference.nationality) || null,
    };
  }

  return null;
}

function getSpeakerReferences(lightningTalk) {
  if (Array.isArray(lightningTalk?.speakers)) {
    return lightningTalk.speakers;
  }

  if (
    lightningTalk?.person_id ||
    lightningTalk?.label ||
    lightningTalk?.speaker_name
  ) {
    return [lightningTalk];
  }

  return [];
}

function PersonReference({ reference }) {
  const personReference = resolvePersonReference(reference);
  if (!personReference?.name) return null;

  return (
    <span className="inline-flex max-w-full items-center gap-1 align-baseline">
      {personReference.href ? (
        <a
          href={personReference.href}
          className="font-medium underline decoration-wave underline-offset-2 transition hover:text-chocolate"
        >
          {personReference.name}
        </a>
      ) : (
        <span>{personReference.name}</span>
      )}
      <NationalityFlag
        nationality={personReference.nationality}
        className="shrink-0 text-sm leading-none"
      />
    </span>
  );
}

function PersonReferenceList({ references }) {
  const items = references.reduce((result, reference, index) => {
    const personReference = resolvePersonReference(reference);
    if (!personReference?.name) return result;

    result.push(
      <span key={`${personReference.name}-${index}`}>
        {result.length > 0 ? ", " : null}
        <PersonReference reference={reference} />
      </span>,
    );

    return result;
  }, []);

  return items.length > 0 ? items : null;
}

function Talk({
  event,
  roomIndex = null,
  roomLabel = null,
  showRoomLabel = false,
  centerContent = false,
}) {
  const title = event?.title ?? null;
  const speakers = Array.isArray(event?.speakers) ? event.speakers : [];
  const lightningTalks = Array.isArray(event?.lightning_talks)
    ? event.lightning_talks
    : [];
  const moderators = Array.isArray(event?.moderators) ? event.moderators : [];
  const roomToneClasses = getRoomToneClasses(roomIndex);
  const cardClassName = `flex h-full flex-col gap-4 overflow-hidden rounded-r-[2rem] rounded-l-none border-l-5 px-5 py-5 ${roomToneClasses.card}`;
  const activityClassName = `inline-flex w-fit rounded-2xl px-4 py-2 text-sm font-semibold tracking-[0.16em] uppercase ${roomToneClasses.chip}`;
  const roomLabelClassName = `text-xs font-semibold uppercase ${roomToneClasses.chip.split(" ").at(-1) ?? "text-deep-blue/60"}`;
  const mergedCardClassName =
    "flex h-full items-center justify-center rounded-r-[2rem] rounded-l-none border border-wave border-l-5 bg-white px-8 py-10 text-center";
  const mergedActivityClassName =
    "text-lg font-semibold tracking-[0.18em] text-deep-blue/50 uppercase md:text-2xl";
  const hasMainTalk = Boolean(title || speakers.length > 0);
  const hasLightningTalks = lightningTalks.length > 0;
  const hasModerators = moderators.length > 0;

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
      <article className={centerContent ? mergedCardClassName : cardClassName}>
        {centerContent ? (
          <p className={mergedActivityClassName}>{event.activity}</p>
        ) : (
          headerContent
        )}
      </article>
    );
  }

  return (
    <article className={cardClassName}>
      {headerContent}

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-1 flex-col gap-4">
          {hasMainTalk ? (
            <div className="flex flex-col gap-2">
              {title ? (
                <h3 className="text-lg leading-tight font-bold text-ink md:text-xl">
                  {title}
                </h3>
              ) : null}
              {speakers.length > 0 ? (
                <p className="text-sm leading-snug text-ink">
                  <PersonReferenceList references={speakers} />
                </p>
              ) : null}
            </div>
          ) : null}

          {hasMainTalk && hasLightningTalks ? (
            <div aria-hidden="true" className="h-px bg-ink/8" />
          ) : null}

          {hasLightningTalks ? (
            <div className="flex flex-col gap-3">
              {lightningTalks.map((lightningTalk, index) => {
                const speakerReferences = getSpeakerReferences(lightningTalk);

                return (
                  <div key={`lightning-${index}`} className="flex flex-col gap-1">
                    <p className="text-base leading-snug font-medium text-ink/55">
                      {lightningTalk.title}
                    </p>
                    {speakerReferences.length > 0 ? (
                      <p className="text-sm leading-snug text-ink/90">
                        <PersonReferenceList references={speakerReferences} />
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {hasModerators ? (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase text-deep-blue/45">
              Moderadores
            </p>
            <p className="text-sm leading-snug text-ink/80">
              <PersonReferenceList references={moderators} />
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default Talk;
