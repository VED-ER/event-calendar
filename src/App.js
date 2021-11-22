import "./App.css"
import Calendar from "./Calendar"

function App() {
	return (
		<div className="app">
			<Calendar />
			<div className="legend">
				<p>Hover over the date and press '+' icon to add a new event</p>
				<p>Events will appear as:</p>
				<button className="all-day-event green event legend-btn">
					<div className="event-name">All day event</div>
				</button>
				<button className="event legend-btn">
					<div className="color-dot blue"></div>
					<div className="event-time">12:54 PM</div>
					<div className="event-name">With time event</div>
				</button>
				<p>Click "+x more" when it appears to view all the events on a given date</p>
			</div>
		</div>
	)
}

export default App
