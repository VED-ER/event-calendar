export default function AllDayEvent({ event, showEventModal, date }) {
	return (
		<button
			onClick={() => showEventModal(date, event.id)}
			className={`all-day-event ${event.color} event`}
		>
			<div className="event-name">{event.name}</div>
		</button>
	)
}
