import Talk from "./Talk";

function Room({ room, roomIndex = 0, events }) {
  return (
    <section className="flex flex-col gap-3">
      <h5 className="text-lg font-semibold text-deep-blue">{room}</h5>

      <div className="flex flex-col gap-3">
        {events.map((event, index) => (
          <Talk
            key={`${room}-${event.start_time}-${event.end_time}-${index}`}
            event={event}
            roomIndex={roomIndex}
          />
        ))}
      </div>
    </section>
  );
}

export default Room;
