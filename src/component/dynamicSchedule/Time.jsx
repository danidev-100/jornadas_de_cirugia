import Talk from "./Talk";

function Time({
  start_time,
  end_time,
  roomNames,
  roomEventsByRoom,
  isMergedBreak,
  isLastRow = false,
}) {
  const mergedEvent = roomNames
    .map((roomName) => roomEventsByRoom[roomName])
    .find((event) => Boolean(event));

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
        roomNames.map((roomName, roomIndex) => {
          const event = roomEventsByRoom[roomName];

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
