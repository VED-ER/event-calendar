import { format, isSameMonth, isToday } from "date-fns"
import DayEvents from "./DayEvents"

export default function Day({
	date,
	index,
	currentDate,
	showEventModal,
	events,
	showAllEventsModal,
}) {
	return (
		<div className={`day ${isSameMonth(date, currentDate) ? "" : "non-month-day"}`}>
			<div className="day-header">
				{index < 7 && <div className="week-name">{format(date, "eee")}</div>}
				<div className={`day-number ${isToday(date) ? "active" : ""}`}>{format(date, "d")}</div>
				<button className="add-event-btn" onClick={() => showEventModal(date, null)}>
					+
				</button>
			</div>
			<DayEvents
				events={events}
				date={date}
				showEventModal={showEventModal}
				showAllEventsModal={showAllEventsModal}
			/>
		</div>
	)
}
