import scheduleEvents from "../../../schedule_events.json";
import Day from "./Day";

function DynamicSchedule() {
  return (
    <section className="space-y-4">
      {scheduleEvents.map((dayEntry) => (
        <Day
          key={dayEntry.date}
          day={dayEntry.day}
          date={dayEntry.date}
          rooms={dayEntry.rooms}
        />
      ))}
    </section>
  );
}

export default DynamicSchedule;
