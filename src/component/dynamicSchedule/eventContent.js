function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMainTalk(mainTalk) {
  const title = normalizeText(mainTalk?.title) || null;
  const speakers = Array.isArray(mainTalk?.speakers) ? mainTalk.speakers : [];

  return { title, speakers };
}

export function getMainTalks(event) {
  if (!event) return [];

  if (Array.isArray(event.main_talks) && event.main_talks.length > 0) {
    return event.main_talks
      .map(normalizeMainTalk)
      .filter((mainTalk) => mainTalk.title || mainTalk.speakers.length > 0);
  }

  const title = normalizeText(event.title) || null;
  const speakers = Array.isArray(event.speakers) ? event.speakers : [];

  if (!title && speakers.length === 0) {
    return [];
  }

  return [{ title, speakers }];
}

export function getEventNotes(event) {
  if (!event || !Array.isArray(event.notes)) {
    return [];
  }

  return event.notes.map(normalizeText).filter(Boolean);
}

export function isFeaturedEvent(event) {
  return normalizeText(event?.emphasis).toLowerCase() === "featured";
}

export function isBreakLikeEvent(event) {
  if (!event) return false;

  const lightningTalks = Array.isArray(event.lightning_talks)
    ? event.lightning_talks
    : [];
  const moderators = Array.isArray(event.moderators) ? event.moderators : [];
  const notes = getEventNotes(event);

  return (
    getMainTalks(event).length === 0 &&
    lightningTalks.length === 0 &&
    moderators.length === 0 &&
    notes.length === 0
  );
}
