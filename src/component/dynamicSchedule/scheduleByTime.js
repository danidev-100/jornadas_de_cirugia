function parseTimeToMinutes(value) {
  const match = String(value)
    .trim()
    .match(/^(\d{1,2}):(\d{2})$/);

  if (!match) return Number.POSITIVE_INFINITY;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours * 60 + minutes;
}

function isBreakLikeEvent(event) {
  if (!event) return false;

  const speakers = Array.isArray(event.speakers) ? event.speakers : [];
  const lightningTalks = Array.isArray(event.lightning_talks)
    ? event.lightning_talks
    : [];
  const moderators = Array.isArray(event.moderators) ? event.moderators : [];

  return (
    !event.title &&
    speakers.length === 0 &&
    lightningTalks.length === 0 &&
    moderators.length === 0
  );
}

export function buildScheduleByTime(dayEntry) {
  const rooms = Array.isArray(dayEntry?.rooms) ? dayEntry.rooms : [];
  const roomNames = rooms.map((room) => room.room);
  const rowsByTime = new Map();

  rooms.forEach((room) => {
    const events = Array.isArray(room.events) ? room.events : [];

    events.forEach((event) => {
      const timeKey = `${event.start_time}-${event.end_time}`;

      if (!rowsByTime.has(timeKey)) {
        rowsByTime.set(timeKey, {
          start_time: event.start_time,
          end_time: event.end_time,
          roomEventsByRoom: {},
        });
      }

      const row = rowsByTime.get(timeKey);
      row.roomEventsByRoom[room.room] = event;
    });
  });

  const timeRows = Array.from(rowsByTime.values())
    .map((row) => {
      const roomEventsByRoom = roomNames.reduce((acc, roomName) => {
        acc[roomName] = row.roomEventsByRoom[roomName] ?? null;
        return acc;
      }, {});

      const allRoomsHaveEvent = roomNames.every((roomName) => roomEventsByRoom[roomName]);
      const isMergedBreak =
        allRoomsHaveEvent &&
        roomNames.every((roomName) => isBreakLikeEvent(roomEventsByRoom[roomName]));

      return {
        start_time: row.start_time,
        end_time: row.end_time,
        roomEventsByRoom,
        isMergedBreak,
      };
    })
    .sort((a, b) => parseTimeToMinutes(a.start_time) - parseTimeToMinutes(b.start_time));

  return { roomNames, timeRows };
}

