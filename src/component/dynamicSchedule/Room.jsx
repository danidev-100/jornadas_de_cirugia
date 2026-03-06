import Talk from "./Talk";

function Room({ room, events }) {
  return (
    <section className="space-y-3">
      <h5 className="text-lg font-semibold text-deep-blue">{room}</h5>

      <div className="space-y-3">
        {events.map((event, index) => (
          <Talk
            key={`${room}-${event.start_time}-${event.end_time}-${index}`}
            event={event}
          />
        ))}
      </div>
    </section>
  );
}

export default Room;
