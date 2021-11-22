export default function Event({ event, showEventModal, date }) {
	const hour = event.startTime.split(":")[0]

	return (
		<button className="event" onClick={() => showEventModal(date, event.id)}>
			<div className={`color-dot ${event.color}`}></div>
			<div className="event-time">
				{event.startTime} {hour >= 12 ? "PM" : "AM"}
			</div>
			<div className="event-name">{event.name}</div>
		</button>
	)
}
