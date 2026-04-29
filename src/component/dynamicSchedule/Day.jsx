import Talk from "./Talk";
import { buildScheduleByTime } from "./scheduleByTime";

const ROOM_DOT_CLASSES = ["bg-lagoon", "bg-gold", "bg-deep-blue/35"];
const SHOW_ROOM_VENUE_NAMES = false;
const DESKTOP_TIME_COLUMN_WIDTH = "60px";

function formatRoomDisplayName(roomName) {
  return String(roomName)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getDesktopGridTemplateColumns(roomCount) {
  return `${DESKTOP_TIME_COLUMN_WIDTH} repeat(${roomCount}, minmax(0, 1fr))`;
}

function getDesktopSegmentMinHeight(durationMinutes) {
  return Math.max(24, durationMinutes * 2.4);
}

function MobileTimeline({ date, entries }) {
  return (
    <div className="md:hidden">
      <div className="overflow-hidden grid gap-4 bg-white">
        {entries.map((entry, index) => (
          <div
            key={`${date}-${entry.start_time}-${entry.end_time}-${entry.roomName ?? entry.type}-${index}`}
            className="flex flex-col gap-4 md:px-4 md:py-4"
          >
            <div className="flex items-center gap-3">
              <p className="text-base leading-none font-semibold text-deep-blue/70">
                {entry.start_time}
              </p>
              <div className="h-px flex-1 bg-cloud" />
              <p className="text-sm leading-none font-medium text-deep-blue/35">
                {entry.end_time}
              </p>
            </div>

            <Talk
              event={entry.event}
              roomIndex={entry.type === "roomEvent" ? entry.roomIndex : null}
              roomLabel={entry.roomName}
              showRoomLabel={entry.showRoomLabel}
              centerContent={entry.type === "mergedBreak"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopTimeline({ date, rooms, roomNames, segments, placements }) {
  const gridTemplateColumns = getDesktopGridTemplateColumns(roomNames.length);
  const gridTemplateRows = segments
    .map((segment) => `minmax(${getDesktopSegmentMinHeight(segment.durationMinutes)}px, auto)`)
    .join(" ");
  const segmentHasPlacement = segments.map((segment) =>
    placements.some(
      (placement) =>
        placement.segmentStartIndex <= segment.index &&
        placement.segmentEndIndex > segment.index,
    ),
  );

  return (
    <div className="hidden overflow-x-auto md:block">
      <div className="flex flex-col gap-0">
        <div className="overflow-hidden rounded-t-3xl rounded-b-none border border-cloud bg-cloud">
          <div
            className="grid items-stretch gap-3"
            style={{ gridTemplateColumns }}
          >
            <div aria-hidden="true" className="py-4">
              <div className="invisible flex flex-col gap-2">
                <span className="text-base leading-none font-semibold">
                  88:88
                </span>
              </div>
            </div>

            {rooms.map((room, index) => (
              <div
                key={`${date}-${room.room}`}
                className="flex min-w-0 items-center gap-3 px-5 py-4"
              >
                <span
                  className={`size-3 shrink-0 rounded-full ${
                    ROOM_DOT_CLASSES[index] ?? "bg-deep-blue/35"
                  }`}
                  aria-hidden="true"
                />

                <div className="flex min-w-0 items-center gap-3">
                  <p className="shrink-0 text-lg font-semibold text-ink">
                    {formatRoomDisplayName(room.room)}
                  </p>
                  {SHOW_ROOM_VENUE_NAMES && room.venue_name ? (
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-deep-blue/60">
                      {room.venue_name}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="grid overflow-hidden rounded-b-3xl border-x border-b border-cloud bg-white gap-3 py-3 pr-3"
          style={{
            gridTemplateColumns,
            gridTemplateRows,
            minWidth: "960px",
          }}
        >
          {segments.map((segment, segmentIndex) => {
            const isLastSegment = segmentIndex === segments.length - 1;
            const hasPlacement = segmentHasPlacement[segmentIndex];
            const nextSegmentHasPlacement = isLastSegment
              ? false
              : segmentHasPlacement[segmentIndex + 1];
            const shouldShowEndTime =
              hasPlacement && (isLastSegment || !nextSegmentHasPlacement);

            return (
              <div
                key={`${date}-time-${segment.start_time}-${segment.end_time}`}
                className="flex h-full flex-col items-end justify-between gap-2 py-4"
                style={{
                  gridColumn: 1,
                  gridRow: segment.index + 1,
                }}
              >
                {hasPlacement ? (
                  <p className="text-base leading-none font-semibold text-deep-blue/70">
                    {segment.start_time}
                  </p>
                ) : (
                  <span aria-hidden="true" />
                )}
                {shouldShowEndTime ? (
                  <p className="text-sm leading-none font-medium text-deep-blue/35">
                    {segment.end_time}
                  </p>
                ) : null}
              </div>
            );
          })}

          {placements.map((placement, index) => (
            <div
              key={`${date}-${placement.type}-${placement.start_time}-${placement.end_time}-${placement.roomName ?? "merged"}-${index}`}
              className="min-w-0"
              style={{
                gridColumn:
                  placement.type === "mergedBreak"
                    ? `2 / span ${roomNames.length}`
                    : `${placement.roomIndex + 2} / span 1`,
                gridRow: `${placement.segmentStartIndex + 1} / span ${placement.segmentSpan}`,
              }}
            >
              <Talk
                event={placement.event}
                roomIndex={placement.type === "roomEvent" ? placement.roomIndex : null}
                centerContent={placement.type === "mergedBreak"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Day({ day, date, rooms }) {
  const { roomNames, segments, desktopPlacements, mobileEntries } =
    buildScheduleByTime({ day, date, rooms });

  return (
    <article
      id={date}
      className="mt-16 flex scroll-mt-36 flex-col gap-4 md:mt-20"
    >
      <div className="sticky top-24 z-30 flex w-full justify-end py-2">
        <div className="relative isolate w-fit max-w-full before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:blur-lg py-4">
          <div className="text-right">
            <h3 className="text-xl font-semibold text-lagoon drop-shadow-md md:text-2xl">
              {day}
            </h3>
          </div>
        </div>
      </div>

      <MobileTimeline date={date} entries={mobileEntries} />

      <DesktopTimeline
        date={date}
        rooms={rooms}
        roomNames={roomNames}
        segments={segments}
        placements={desktopPlacements}
      />
    </article>
  );
}

export default Day;
