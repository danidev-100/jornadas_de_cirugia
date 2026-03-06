import Time from "./Time";
import { buildScheduleByTime } from "./scheduleByTime";

function Day({ day, date, rooms }) {
  const { roomNames, timeRows } = buildScheduleByTime({ day, date, rooms });
  const columnsTemplate = `repeat(${roomNames.length}, minmax(0, 1fr))`;

  return (
    <article className="space-y-4 rounded-2xl border border-wave bg-cloud/20 p-4">
      <header className="space-y-1">
        <h4 className="text-xl font-semibold text-ink">{day}</h4>
        <p className="text-sm text-deep-blue">{date}</p>
      </header>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] space-y-2">
          <div
            className="grid gap-2 items-center"
            style={{ gridTemplateColumns: columnsTemplate }}
          >
            {roomNames.map((roomName) => (
              <div
                key={`${date}-${roomName}`}
                className="rounded-xl border border-wave bg-white p-3 text-sm font-semibold text-deep-blue"
              >
                {roomName}
              </div>
            ))}
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
