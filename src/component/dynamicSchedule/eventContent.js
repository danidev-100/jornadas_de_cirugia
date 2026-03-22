function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeReferenceEntry(reference) {
  if (!reference || typeof reference !== "object") {
    return null;
  }

  if (reference.person_id) {
    return reference;
  }

  if (reference.label) {
    const label = normalizeText(reference.label);
    return label ? { ...reference, label } : null;
  }

  if (reference.speaker_name) {
    const speaker_name = normalizeText(reference.speaker_name);
    return speaker_name ? { ...reference, speaker_name } : null;
  }

  if (reference.name) {
    const name = normalizeText(reference.name);
    return name ? { ...reference, name } : null;
  }

  return null;
}

function normalizeReferenceList(references) {
  if (!Array.isArray(references)) {
    return [];
  }

  return references.map(normalizeReferenceEntry).filter(Boolean);
}

function normalizeMainTalk(mainTalk) {
  const title = normalizeText(mainTalk?.title) || null;
  const speakers = normalizeReferenceList(mainTalk?.speakers);
  const lightning_talks = Array.isArray(mainTalk?.lightning_talks)
    ? mainTalk.lightning_talks
    : [];
  const moderators = normalizeReferenceList(mainTalk?.moderators);
  const commentators = normalizeReferenceList(mainTalk?.commentators);
  const secretaries = normalizeReferenceList(mainTalk?.secretaries);

  return {
    title,
    speakers,
    lightning_talks,
    moderators,
    commentators,
    secretaries,
  };
}

export function getMainTalks(event) {
  if (!event || !Array.isArray(event.main_talks)) {
    return [];
  }

  return event.main_talks
    .map(normalizeMainTalk)
    .filter(
      (mainTalk) =>
        mainTalk.title ||
        mainTalk.speakers.length > 0 ||
        mainTalk.lightning_talks.length > 0 ||
        mainTalk.moderators.length > 0 ||
        mainTalk.commentators.length > 0 ||
        mainTalk.secretaries.length > 0,
    );
}

export function isFeaturedEvent(event) {
  return normalizeText(event?.emphasis).toLowerCase() === "featured";
}

export function isBreakLikeEvent(event) {
  return Boolean(event) && getMainTalks(event).length === 0;
}
