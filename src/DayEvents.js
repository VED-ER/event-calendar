import AllDayEvent from "./AllDayEvent"
import Event from "./Event"
import { parseISO } from "date-fns"
import { useEffect, useState } from "react"

export default function DayEvents({ events, date, showEventModal, showAllEventsModal }) {
	const currentDayEvents = events.filter(
		(event) => parseISO(event.date).toISOString() === date.toISOString()
	)
	const [count, setCount] = useState(currentDayEvents.length)
	useEffect(() => {
		setCount(currentDayEvents.length)
	}, [currentDayEvents])

	let countHelper = 0

	return (
		<>
			<div className="events">
				{events.map((event) => {
					if (parseISO(event.date).toISOString() === date.toISOString()) {
						if (event.isAllDay && countHelper < 3) {
							countHelper++
							return (
								<AllDayEvent
									key={event.id}
									event={event}
									showEventModal={showEventModal}
									date={date}
								/>
							)
						} else if (!event.isAllDay && countHelper < 3) {
							countHelper++
							return (
								<Event key={event.id} event={event} showEventModal={showEventModal} date={date} />
							)
						}
					}
				})}
			</div>
			{count > 3 && (
				<button
					className="events-view-more-btn"
					onClick={() => showAllEventsModal(date, currentDayEvents)}
				>
					+{count - 3} More
				</button>
			)}
		</>
	)
}
