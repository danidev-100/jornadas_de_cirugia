import NationalityFlag from "../NationalityFlag";
import {
  getPersonAnchorId,
  getPersonById,
} from "../../data/people.js";
import {
  getMainTalks,
  isBreakLikeEvent,
  isFeaturedEvent,
} from "./eventContent.js";

const ROOM_TONE_CLASSES = [
  {
    card: "border-l-lagoon bg-lagoon/10",
    roomLabel: "text-lagoon",
  },
  {
    card: "border-l-gold bg-gold/20",
    roomLabel: "text-chocolate",
  },
  {
    card: "border-l-deep-blue/35 bg-deep-blue/10",
    roomLabel: "text-deep-blue/60",
  },
];

const ACTIVITY_TONE_CLASSES = {
  HPB: {
    chip: "border border-emerald-200 bg-emerald-100 text-emerald-900",
  },
  Coloproctología: {
    chip: "border border-orange-900 bg-orange-100 text-orange-900",
  },
  Oncología: {
    chip: "border border-stone-300 bg-stone-200 text-stone-900",
  },
  "Cirugía Percutánea": {
    chip: "border border-slate-400 bg-slate-100 text-slate-900",
  },
  "Esófago Gastro": {
    chip: "border border-rose-200 bg-rose-100 text-rose-900",
  },
  Bariátrica: {
    chip: "border-2 border-pink-300 bg-pink-50 text-pink-900",
  },
  Endoscopía: {
    chip: "border border-orange-300 bg-orange-50 text-orange-900",
  },
  "Cx Robótica": {
    chip: "border-2 border-cyan-300 bg-white text-cyan-950",
  },
  Tórax: {
    chip: "border border-cyan-400 bg-cyan-50 text-cyan-900",
  },
  "Pared Abdominal": {
    chip: "border border-amber-200 bg-amber-100 text-amber-900",
  },
  Instrumentadores: {
    chip: "border border-red-200 bg-red-100 text-red-900",
  },
  PSQ: {
    chip: "border border-sky-200 bg-sky-100 text-sky-900",
  },
};

const DEFAULT_ACTIVITY_TONE_CLASSES = {
  chip: "border border-blue-200 bg-blue-100 text-blue-900",
};

const DEFAULT_ROOM_TONE_CLASSES = {
  card: "border-wave bg-white",
  roomLabel: "text-deep-blue/60",
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getActivityToneClasses(activity) {
  const activityLabel = normalizeText(activity);
  return ACTIVITY_TONE_CLASSES[activityLabel] ?? DEFAULT_ACTIVITY_TONE_CLASSES;
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
    lightningTalk?.speaker_name ||
    lightningTalk?.name
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

function MainTalkSection({ mainTalk, isLast }) {
  const lightningTalks = Array.isArray(mainTalk?.lightning_talks)
    ? mainTalk.lightning_talks
    : [];
  const moderators = Array.isArray(mainTalk?.moderators)
    ? mainTalk.moderators
    : [];
  const commentators = Array.isArray(mainTalk?.commentators)
    ? mainTalk.commentators
    : [];
  const secretaries = Array.isArray(mainTalk?.secretaries)
    ? mainTalk.secretaries
    : [];
  const hasHeader = Boolean(mainTalk?.title) || mainTalk.speakers.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasHeader ? (
        <div className="flex flex-col gap-2">
          {mainTalk.title ? (
            <h3 className="text-lg leading-tight font-bold text-ink md:text-xl">
              {mainTalk.title}
            </h3>
          ) : null}
          {mainTalk.speakers.length > 0 ? (
            <p className="text-sm leading-snug text-ink">
              <PersonReferenceList references={mainTalk.speakers} />
            </p>
          ) : null}
        </div>
      ) : null}

      {lightningTalks.length > 0 ? (
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

      {moderators.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase text-deep-blue/45">
            Moderadores
          </p>
          <p className="text-sm leading-snug text-ink/80">
            <PersonReferenceList references={moderators} />
          </p>
        </div>
      ) : null}

      {commentators.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase text-deep-blue/45">
            Comentadores
          </p>
          <p className="text-sm leading-snug text-ink/80">
            <PersonReferenceList references={commentators} />
          </p>
        </div>
      ) : null}

      {secretaries.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase text-deep-blue/45">
            Secretarios
          </p>
          <div className="flex flex-col gap-1 text-sm leading-snug text-ink/80">
            {secretaries.map((secretary, index) => (
              <p key={`secretary-${index}`}>
                <PersonReference reference={secretary} />
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {isLast ? null : <div aria-hidden="true" className="h-px bg-ink/8" />}
    </div>
  );
}

function Talk({
  event,
  roomIndex = null,
  roomLabel = null,
  showRoomLabel = false,
  centerContent = false,
}) {
  const mainTalks = getMainTalks(event);
  const activityToneClasses = getActivityToneClasses(event?.activity);
  const roomToneClasses = getRoomToneClasses(roomIndex);
  const isFeatured = isFeaturedEvent(event);
  const cardClassName = `flex h-full flex-col gap-4 overflow-hidden rounded-r-4xl rounded-l-none border-l-4 px-5 py-5 ${
    isFeatured
      ? "border-l-lagoon bg-gradient-to-br from-cloud via-white to-sand/40 shadow-sm"
      : roomToneClasses.card
  }`;
  const activityClassName = `inline-flex w-fit rounded-2xl px-4 py-2 text-sm font-semibold tracking-widest uppercase shadow-sm ${
    isFeatured
      ? "border border-lagoon/20 bg-white/90 text-lagoon"
      : activityToneClasses.chip
  }`;
  const roomLabelClassName = `text-xs font-semibold uppercase ${
    isFeatured ? "text-lagoon" : roomToneClasses.roomLabel
  }`;
  const mergedCardClassName = `flex h-full items-center justify-center rounded-r-4xl rounded-l-none border border-l-4 px-8 py-10 text-center ${
    isFeatured
      ? "border-lagoon/40 bg-gradient-to-r from-cloud via-white to-sand/40 shadow-sm"
      : "border-wave bg-white"
  }`;
  const mergedActivityClassName = `text-lg font-semibold tracking-widest uppercase md:text-2xl ${
    isFeatured ? "text-deep-blue" : "text-deep-blue/50"
  }`;
  const featuredEyebrowClassName =
    "inline-flex rounded-full border border-lagoon/25 bg-white/90 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-lagoon";
  const hasMainTalks = mainTalks.length > 0;

  const headerContent = (
    <div className="flex items-center justify-between gap-3">
      <p className={activityClassName}>{event.activity}</p>
      {showRoomLabel && roomLabel ? (
        <p className={roomLabelClassName}>{roomLabel}</p>
      ) : null}
    </div>
  );

  const isBreak = isBreakLikeEvent(event);

  if (isBreak) {
    return (
      <article className={centerContent ? mergedCardClassName : cardClassName}>
        {centerContent ? (
          <div className="flex flex-col items-center gap-3">
            {isFeatured ? (
              <p className={featuredEyebrowClassName}>Evento institucional</p>
            ) : null}
            <p className={mergedActivityClassName}>{event.activity}</p>
          </div>
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
          {hasMainTalks ? (
            <div className="flex flex-col gap-4">
              {mainTalks.map((mainTalk, index) => (
                <MainTalkSection
                  key={`main-talk-${index}`}
                  mainTalk={mainTalk}
                  isLast={index === mainTalks.length - 1}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default Talk;
