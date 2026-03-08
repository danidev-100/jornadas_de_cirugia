import Time from "./Time";
import { buildScheduleByTime } from "./scheduleByTime";

const ROOM_DOT_CLASSES = ["bg-lagoon", "bg-gold", "bg-deep-blue/35"];

function formatRoomDisplayName(roomName) {
  return String(roomName)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function Day({ day, date, rooms }) {
  const { roomNames, timeRows } = buildScheduleByTime({ day, date, rooms });
  const columnsTemplate = `repeat(${roomNames.length}, minmax(0, 1fr))`;

  return (
    <article className="flex flex-col gap-4">
      <div className="flex justify-end">
        <div className="max-w-full rounded-full border border-wave/50 bg-cloud p-2">
          <div className="rounded-full bg-white px-6 py-4 sm:px-8">
            <h3 className="text-3xl font-semibold text-lagoon">
              {day}
            </h3>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[800px] flex-col gap-2">
          <div className="overflow-hidden rounded-t-3xl rounded-b-none border border-wave bg-cloud">
            <div
              className="grid items-stretch gap-0"
              style={{ gridTemplateColumns: columnsTemplate }}
            >
              {roomNames.map((roomName, index) => (
                <div
                  key={`${date}-${roomName}`}
                  className="flex min-w-0 items-center gap-3 px-5 py-4"
                >
                  <span
                    className={`size-3 shrink-0 rounded-full ${
                      ROOM_DOT_CLASSES[index] ?? "bg-deep-blue/35"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex min-w-0 items-center gap-3">
                    <p className="shrink-0 text-[1.125rem] font-semibold text-ink">
                      {formatRoomDisplayName(roomName)}
                    </p>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-deep-blue/60">
                      Descripción Sala
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {timeRows.map((timeRow) => (
            <Time
              key={`${date}-${timeRow.start_time}-${timeRow.end_time}`}
              start_time={timeRow.start_time}
              end_time={timeRow.end_time}
              roomNames={roomNames}
              roomEventsByRoom={timeRow.roomEventsByRoom}
              isMergedBreak={timeRow.isMergedBreak}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default Day;
