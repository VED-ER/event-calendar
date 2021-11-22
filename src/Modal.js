import { format } from "date-fns"
import { useEffect, useState } from "react"

export default function Modal({
	show,
	modalDate,
	closeModal,
	addEventBtn,
	editEvent,
	deleteEvent,
}) {
	const [event, setEvent] = useState({
		name: "",
		isAllDay: false,
		startTime: "",
		endTime: "",
		color: "blue",
	})

	useEffect(() => {
		setEvent(
			editEvent || {
				name: "",
				isAllDay: false,
				startTime: "",
				endTime: "",
				color: "blue",
			}
		)
	}, [editEvent])

	function clearForm(e) {
		addEventBtn({ ...event, date: modalDate.toISOString() }, e)
		setEvent({
			name: "",
			isAllDay: false,
			startTime: "",
			endTime: "",
			color: "blue",
		})
	}
	return (
		<div className={`modal ${show ? "show" : ""}`}>
			<div className="overlay" onClick={closeModal}></div>
			<div className="modal-body">
				<div className="modal-title">
					<div>{editEvent && editEvent.id ? "Edit" : "Add"} Event</div>
					{modalDate && <small>{format(modalDate, "M/d/yy")}</small>}
				</div>
				<form onSubmit={(e) => clearForm(e)}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							required
							value={event.name || ""}
							onChange={(e) =>
								setEvent((prev) => {
									return { ...prev, name: e.target.value }
								})
							}
						/>
					</div>
					<div className="form-group checkbox">
						<input
							type="checkbox"
							name="all-day"
							id="all-day"
							checked={event.isAllDay || false}
							onChange={(e) =>
								setEvent((prev) => {
									return { ...prev, isAllDay: e.target.checked }
								})
							}
						/>
						<label htmlFor="all-day">All Day?</label>
					</div>
					<div className="row">
						<div className="form-group">
							<label htmlFor="start-time">Start Time</label>
							<input
								type="time"
								name="start-time"
								id="start-time"
								required={!event.isAllDay}
								value={event.startTime || ""}
								onChange={(e) =>
									setEvent((prev) => {
										return { ...prev, startTime: e.target.value }
									})
								}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="end-time">End Time</label>
							<input
								type="time"
								name="end-time"
								id="end-time"
								required={!event.isAllDay}
								value={event.endTime || ""}
								onChange={(e) =>
									setEvent((prev) => {
										return { ...prev, endTime: e.target.value }
									})
								}
							/>
						</div>
					</div>
					<div className="form-group">
						<label>Color</label>
						<div className="row left">
							<input
								type="radio"
								name="color"
								value="blue"
								id="blue"
								checked={event.color === "blue"}
								onChange={(e) =>
									setEvent((prev) => {
										return { ...prev, color: e.target.value }
									})
								}
								className="color-radio"
								data-color
							/>
							<label htmlFor="blue">
								<span className="sr-only">Blue</span>
							</label>
							<input
								type="radio"
								name="color"
								value="red"
								id="red"
								checked={event.color === "red"}
								onChange={(e) =>
									setEvent((prev) => {
										return { ...prev, color: e.target.value }
									})
								}
								className="color-radio"
								data-color
							/>
							<label htmlFor="red">
								<span className="sr-only">Red</span>
							</label>
							<input
								type="radio"
								name="color"
								value="green"
								id="green"
								checked={event.color === "green"}
								onChange={(e) =>
									setEvent((prev) => {
										return { ...prev, color: e.target.value }
									})
								}
								className="color-radio"
								data-color
							/>
							<label htmlFor="green">
								<span className="sr-only">Green</span>
							</label>
						</div>
					</div>

					<div className="row">
						<button className="btn btn-success" type="submit">
							{editEvent && editEvent.id ? "Save" : "Add"}
						</button>
						{editEvent && editEvent.id && (
							<button className="btn btn-delete" type="button" onClick={() => deleteEvent(event)}>
								Delete
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}
