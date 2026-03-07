import scheduleEvents from "../../../schedule_events.json";
import Day from "./Day";

function DynamicSchedule() {
  return (
    <section className="space-y-4">
      <div className="space-y-6">
        {scheduleEvents.map((dayEntry) => (
          <Day
            key={dayEntry.date}
            day={dayEntry.day}
            date={dayEntry.date}
            rooms={dayEntry.rooms}
          />
        ))}
      </div>
    </section>
  );
}

export default DynamicSchedule;
