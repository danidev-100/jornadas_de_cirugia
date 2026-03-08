import Talk from "./Talk";

function Time({
  start_time,
  end_time,
  roomNames,
  roomEventsByRoom,
  isMergedBreak,
  mobileLayout = false,
  isLastRow = false,
}) {
  const roomEntries = roomNames.map((roomName, roomIndex) => ({
    roomName,
    roomIndex,
    event: roomEventsByRoom[roomName] ?? null,
  }));
  const mergedEvent = roomNames
    .map((roomName) => roomEventsByRoom[roomName])
    .find((event) => Boolean(event));

  if (mobileLayout) {
    const visibleRoomEntries = roomEntries.filter(({ event }) => Boolean(event));

    return (
      <div
        className={`flex flex-col gap-4 bg-white py-4 ${
          isLastRow ? "" : "border-b border-cloud"
        }`}
      >
        <div className="flex items-center gap-3">
          <p className="text-base leading-none font-semibold text-deep-blue/70">
            {start_time}
          </p>
          <div className="h-px flex-1 bg-cloud" />
          <p className="text-sm leading-none font-medium text-deep-blue/35">
            {end_time}
          </p>
        </div>

        {isMergedBreak && mergedEvent ? (
          <Talk event={mergedEvent} />
        ) : (
          <div className="flex flex-col gap-3">
            {visibleRoomEntries.map(({ roomName, roomIndex, event }) => (
              <Talk
                key={`${start_time}-${end_time}-${roomName}`}
                event={event}
                roomIndex={roomIndex}
                roomLabel={roomName}
                showRoomLabel
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-[auto_repeat(3,minmax(0,1fr))] items-stretch border-x border-b border-cloud bg-white ${
        isLastRow ? "overflow-hidden rounded-b-3xl" : ""
      }`}
    >
      <div className="grid px-3 py-5">
        <div aria-hidden="true" className="invisible flex flex-col gap-2">
          <span className="text-base leading-none font-semibold">88:88</span>
          <span className="text-sm leading-none font-medium">88:88</span>
        </div>

        <div className="col-start-1 row-start-1 flex min-h-16 flex-col justify-start gap-2">
          <p className="text-base leading-none font-semibold text-deep-blue/70">
            {start_time}
          </p>
          <p className="text-sm leading-none font-medium text-deep-blue/35">
            {end_time}
          </p>
        </div>
      </div>

      {isMergedBreak && mergedEvent ? (
        <div className="col-span-3 h-full p-3">
          <Talk event={mergedEvent} />
        </div>
      ) : (
        roomEntries.map(({ roomName, roomIndex, event }) => {

          return (
            <div
              key={`${start_time}-${end_time}-${roomName}`}
              className="min-h-16 h-full p-3"
            >
              {event ? (
                <Talk event={event} roomIndex={roomIndex} />
              ) : (
                <div className="h-full min-h-16 rounded-xl border border-dashed border-wave bg-cloud/10" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Time;
