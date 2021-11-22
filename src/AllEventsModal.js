import AllDayEvent from "./AllDayEvent"
import Event from "./Event"
import { format } from "date-fns"

export default function AllEventsModal({ date, events, show, showEventModal, closeModal }) {
	return (
		<div className={`modal ${show ? "show" : ""}`}>
			<div className="overlay" onClick={closeModal}></div>
			<div className="modal-body">
				<div className="modal-title">{date && format(date, "M/d/yy")}</div>
				{events.map((event) => {
					if (event.date === date.toISOString()) {
						if (event.isAllDay) {
							return (
								<AllDayEvent
									key={event.id}
									event={event}
									showEventModal={showEventModal}
									date={date}
									closeAllEventsModal={() => closeModal}
								/>
							)
						} else if (!event.isAllDay) {
							return (
								<Event
									key={event.id}
									event={event}
									showEventModal={showEventModal}
									date={date}
									closeAllEventsModal={closeModal}
								/>
							)
						}
					}
				})}
			</div>
		</div>
	)
}
