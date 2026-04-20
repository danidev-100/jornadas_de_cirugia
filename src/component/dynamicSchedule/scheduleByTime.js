import { isBreakLikeEvent } from "./eventContent.js";

function parseTimeToMinutes(value) {
  const match = String(value)
    .trim()
    .match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    throw new Error(`Hora invalida: "${value}"`);
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    throw new Error(`Hora invalida: "${value}"`);
  }

  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes % 5 !== 0) {
    throw new Error(`Hora fuera de multiplo de 5 minutos: "${value}"`);
  }

  return totalMinutes;
}

function formatMinutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function compareByStartTime(leftPlacement, rightPlacement) {
  if (leftPlacement.startMinute !== rightPlacement.startMinute) {
    return leftPlacement.startMinute - rightPlacement.startMinute;
  }

  if (leftPlacement.roomIndex !== rightPlacement.roomIndex) {
    return leftPlacement.roomIndex - rightPlacement.roomIndex;
  }

  if (leftPlacement.endMinute !== rightPlacement.endMinute) {
    return leftPlacement.endMinute - rightPlacement.endMinute;
  }

  return leftPlacement.activity.localeCompare(rightPlacement.activity, "es");
}

function getPlacementKey(roomName, intervalKey) {
  return `${roomName}:${intervalKey}`;
}

function normalizeRoomPlacements(dayEntry, room, roomIndex) {
  const events = Array.isArray(room?.events) ? room.events : [];
  const placements = events.map((event, eventIndex) => {
    const startMinute = parseTimeToMinutes(event.start_time);
    const endMinute = parseTimeToMinutes(event.end_time);

    if (endMinute <= startMinute) {
      throw new Error(
        `Intervalo invalido en ${dayEntry.day} / ${room.room} / ${event.activity}: ${event.start_time}-${event.end_time}`,
      );
    }

    return {
      event,
      activity: String(event?.activity ?? "").trim(),
      roomName: room.room,
      roomIndex,
      eventIndex,
      startMinute,
      endMinute,
      start_time: formatMinutesToTime(startMinute),
      end_time: formatMinutesToTime(endMinute),
      intervalKey: `${startMinute}-${endMinute}`,
      isBreak: isBreakLikeEvent(event),
    };
  });

  placements.sort((leftPlacement, rightPlacement) => {
    if (leftPlacement.startMinute !== rightPlacement.startMinute) {
      return leftPlacement.startMinute - rightPlacement.startMinute;
    }

    if (leftPlacement.endMinute !== rightPlacement.endMinute) {
      return leftPlacement.endMinute - rightPlacement.endMinute;
    }

    return leftPlacement.eventIndex - rightPlacement.eventIndex;
  });

  placements.forEach((placement, index) => {
    if (index === 0) return;

    const previousPlacement = placements[index - 1];
    if (placement.startMinute < previousPlacement.endMinute) {
      throw new Error(
        `Eventos solapados en ${dayEntry.day} / ${room.room}: ${previousPlacement.start_time}-${previousPlacement.end_time} y ${placement.start_time}-${placement.end_time}`,
      );
    }
  });

  return placements;
}

function buildMergedBreakPlacements(roomNames, placements) {
  const mergedBreaksByInterval = new Map();

  placements.forEach((placement) => {
    if (!placement.isBreak) return;

    if (!mergedBreaksByInterval.has(placement.intervalKey)) {
      mergedBreaksByInterval.set(placement.intervalKey, {
        intervalKey: placement.intervalKey,
        startMinute: placement.startMinute,
        endMinute: placement.endMinute,
        start_time: placement.start_time,
        end_time: placement.end_time,
        placementsByRoom: {},
      });
    }

    mergedBreaksByInterval.get(placement.intervalKey).placementsByRoom[
      placement.roomName
    ] = placement;
  });

  return Array.from(mergedBreaksByInterval.values())
    .filter((entry) =>
      roomNames.every((roomName) => Boolean(entry.placementsByRoom[roomName])),
    )
    .map((entry) => {
      const samplePlacement = roomNames
        .map((roomName) => entry.placementsByRoom[roomName])
        .find(Boolean);

      return {
        type: "mergedBreak",
        event: samplePlacement.event,
        activity: samplePlacement.activity,
        startMinute: entry.startMinute,
        endMinute: entry.endMinute,
        start_time: entry.start_time,
        end_time: entry.end_time,
        intervalKey: entry.intervalKey,
      };
    })
    .sort((leftPlacement, rightPlacement) => {
      if (leftPlacement.startMinute !== rightPlacement.startMinute) {
        return leftPlacement.startMinute - rightPlacement.startMinute;
      }

      return leftPlacement.endMinute - rightPlacement.endMinute;
    });
}

function attachSegmentPlacementData(placements, boundaryIndexByMinute) {
  return placements.map((placement) => {
    const segmentStartIndex = boundaryIndexByMinute.get(placement.startMinute);
    const endBoundaryIndex = boundaryIndexByMinute.get(placement.endMinute);
    const segmentSpan = endBoundaryIndex - segmentStartIndex;

    return {
      ...placement,
      segmentStartIndex,
      segmentSpan,
      segmentEndIndex: segmentStartIndex + segmentSpan,
    };
  });
}

export function buildScheduleByTime(dayEntry) {
  const rooms = Array.isArray(dayEntry?.rooms) ? dayEntry.rooms : [];
  const roomNames = rooms.map((room) => room.room);
  const roomPlacements = rooms.flatMap((room, roomIndex) =>
    normalizeRoomPlacements(dayEntry, room, roomIndex),
  );

  if (roomPlacements.length === 0) {
    return {
      roomNames,
      segments: [],
      desktopPlacements: [],
      mobileEntries: [],
      roomPlacements: [],
    };
  }

  const boundaryMinutes = Array.from(
    new Set(
      roomPlacements.flatMap((placement) => [
        placement.startMinute,
        placement.endMinute,
      ]),
    ),
  ).sort((leftMinute, rightMinute) => leftMinute - rightMinute);

  const boundaryIndexByMinute = new Map(
    boundaryMinutes.map((minute, index) => [minute, index]),
  );

  const segments = boundaryMinutes.slice(0, -1).map((startMinute, index) => {
    const endMinute = boundaryMinutes[index + 1];

    return {
      index,
      startMinute,
      endMinute,
      durationMinutes: endMinute - startMinute,
      start_time: formatMinutesToTime(startMinute),
      end_time: formatMinutesToTime(endMinute),
    };
  });

  const segmentedRoomPlacements = attachSegmentPlacementData(
    roomPlacements,
    boundaryIndexByMinute,
  );
  const mergedBreakPlacements = attachSegmentPlacementData(
    buildMergedBreakPlacements(roomNames, segmentedRoomPlacements),
    boundaryIndexByMinute,
  );

  const mergedBreakKeys = new Set(
    mergedBreakPlacements.flatMap((placement) =>
      roomNames.map((roomName) => getPlacementKey(roomName, placement.intervalKey)),
    ),
  );

  const visibleRoomPlacements = segmentedRoomPlacements.filter(
    (placement) =>
      !mergedBreakKeys.has(getPlacementKey(placement.roomName, placement.intervalKey)),
  );

  const desktopPlacements = [
    ...mergedBreakPlacements.map((placement) => ({
      ...placement,
      columnStart: 2,
      columnSpan: roomNames.length,
    })),
    ...visibleRoomPlacements.map((placement) => ({
      ...placement,
      type: "roomEvent",
      columnStart: placement.roomIndex + 2,
      columnSpan: 1,
    })),
  ].sort((leftPlacement, rightPlacement) => {
    if (leftPlacement.segmentStartIndex !== rightPlacement.segmentStartIndex) {
      return leftPlacement.segmentStartIndex - rightPlacement.segmentStartIndex;
    }

    if (leftPlacement.columnStart !== rightPlacement.columnStart) {
      return leftPlacement.columnStart - rightPlacement.columnStart;
    }

    if (leftPlacement.segmentSpan !== rightPlacement.segmentSpan) {
      return leftPlacement.segmentSpan - rightPlacement.segmentSpan;
    }

    return leftPlacement.activity.localeCompare(rightPlacement.activity, "es");
  });

  const mobileEntries = [
    ...mergedBreakPlacements.map((placement) => ({
      ...placement,
      roomIndex: -1,
      roomName: null,
      showRoomLabel: false,
    })),
    ...visibleRoomPlacements.map((placement) => ({
      ...placement,
      type: "roomEvent",
      showRoomLabel: true,
    })),
  ].sort(compareByStartTime);

  return {
    roomNames,
    roomPlacements: segmentedRoomPlacements,
    segments,
    desktopPlacements,
    mobileEntries,
  };
}
