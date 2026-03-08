import Time from "./Time";
import { buildScheduleByTime } from "./scheduleByTime";

const ROOM_DOT_CLASSES = ["bg-lagoon", "bg-gold", "bg-deep-blue/35"];
const SHOW_ROOM_VENUE_NAMES = false; // Alternar la visualización de los nombres de los recintos junto a las salas

function formatRoomDisplayName(roomName) {
  return String(roomName)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function Day({ day, date, rooms }) {
  const { roomNames, timeRows } = buildScheduleByTime({ day, date, rooms });

  return (
    <article className="flex flex-col gap-4 mt-30">
      <div className="flex w-full md:justify-end">
        <div className="w-full rounded-full border border-wave/50 bg-cloud p-2 md:w-auto md:max-w-full">
          <div className="rounded-full bg-white px-6 py-4 text-center sm:px-8 md:text-left">
            <h3 className="text-3xl font-semibold text-lagoon">
              {day}
            </h3>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="overflow-hidden rounded-3xl bg-white">
          {timeRows.map((timeRow, index) => (
            <Time
              key={`${date}-${timeRow.start_time}-${timeRow.end_time}-mobile`}
              start_time={timeRow.start_time}
              end_time={timeRow.end_time}
              roomNames={roomNames}
              roomEventsByRoom={timeRow.roomEventsByRoom}
              isMergedBreak={timeRow.isMergedBreak}
              mobileLayout
              isLastRow={index === timeRows.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <div className="flex min-w-[960px] flex-col gap-0">
          <div className="overflow-hidden rounded-t-3xl rounded-b-none border border-cloud bg-cloud">
            <div className="grid grid-cols-[auto_repeat(3,minmax(0,1fr))] items-stretch gap-0">
              <div aria-hidden="true" className="px-3 py-4">
                <div className="invisible flex flex-col gap-2">
                  <span className="text-base leading-none font-semibold">
                    88:88
                  </span>
                  <span className="text-sm leading-none font-medium">
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
                    <p className="shrink-0 text-[1.125rem] font-semibold text-ink">
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

          {timeRows.map((timeRow, index) => (
            <Time
              key={`${date}-${timeRow.start_time}-${timeRow.end_time}`}
              start_time={timeRow.start_time}
              end_time={timeRow.end_time}
              roomNames={roomNames}
              roomEventsByRoom={timeRow.roomEventsByRoom}
              isMergedBreak={timeRow.isMergedBreak}
              isLastRow={index === timeRows.length - 1}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default Day;
