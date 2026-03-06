import Talk from "./Talk";

function Time({ start_time, end_time, roomNames, roomEventsByRoom, isMergedBreak }) {
  const columnsTemplate = `repeat(${roomNames.length}, minmax(0, 1fr))`;
  const mergedEvent = roomNames
    .map((roomName) => roomEventsByRoom[roomName])
    .find((event) => Boolean(event));

  return (
    <div className="space-y-1">
      <div className="px-1 text-xs font-medium text-deep-blue/75">
        {start_time}-{end_time}
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: columnsTemplate }}>
        {isMergedBreak && mergedEvent ? (
          <div
            className="h-full"
            style={{ gridColumn: `span ${roomNames.length} / span ${roomNames.length}` }}
          >
            <Talk event={mergedEvent} />
          </div>
        ) : (
          roomNames.map((roomName) => {
            const event = roomEventsByRoom[roomName];

            return (
              <div
                key={`${start_time}-${end_time}-${roomName}`}
                className="min-h-16 h-full"
              >
                {event ? (
                  <Talk event={event} />
                ) : (
                  <div className="h-full min-h-16 rounded-xl border border-dashed border-wave bg-cloud/10" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Time;
