import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	startOfMonth,
	startOfWeek,
	subMonths,
} from "date-fns"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import AllEventsModal from "./AllEventsModal"
import Day from "./Day"
import Header from "./Header"
import Modal from "./Modal"

const KEY = "LOC_STR_CAL_KEY"

export default function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [showModal, setShowModal] = useState(false)
	const [modalDate, setModalDate] = useState("")
	const [eventId, setEventId] = useState(null)

	const [showAllEventsModalToggle, setShowAllEventsModalToggle] = useState(false)
	const [allEventsModalEvents, setAllEventsModalEvents] = useState([])
	const [allEventsModalDate, setAllEventsModalDate] = useState("")

	const firstWeekStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
	const lastWeekEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
	const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })

	const [events, setEvents] = useState(JSON.parse(localStorage.getItem(KEY)) || [])

	function gotoCurrentMonth() {
		setCurrentDate(new Date())
	}

	function gotoPrevMonth() {
		setCurrentDate((prevDate) => subMonths(prevDate, 1))
	}

	function gotoNextMonth() {
		setCurrentDate((prevDate) => addMonths(prevDate, 1))
	}

	function showEventModal(date, id) {
		closeAllEventsModal()
		setEventId(id)
		setShowModal(true)
		setModalDate((prev) => date)
	}

	function closeModal() {
		setShowModal(false)
	}

	function closeAllEventsModal() {
		setShowAllEventsModalToggle(false)
	}

	function addEventBtn(newEvent, e) {
		e.preventDefault()
		setEvents((prevEvents) => {
			const upd = prevEvents.find((e) => e.id === newEvent.id)

			if (upd) {
				const index = prevEvents.indexOf(upd)
				prevEvents[index] = newEvent
				return prevEvents
			} else {
				return [...prevEvents, { ...newEvent, id: uuidv4() }]
			}
		})
		closeModal()
	}

	function deleteEvent(event) {
		setEvents((prevEvents) => prevEvents.filter((e) => e !== event))
		closeModal()
	}

	function showAllEventsModal(date, events) {
		setShowAllEventsModalToggle(true)
		setAllEventsModalEvents(events)
		setAllEventsModalDate(date)
	}

	localStorage.setItem(KEY, JSON.stringify(events))
	return (
		<div className="calendar">
			<Header
				currentDate={currentDate}
				gotoCurrentMonth={gotoCurrentMonth}
				gotoPrevMonth={gotoPrevMonth}
				gotoNextMonth={gotoNextMonth}
			/>
			<div className="days">
				{dates.map((date, index) => (
					<Day
						key={date}
						date={date}
						index={index}
						currentDate={currentDate}
						showEventModal={showEventModal}
						events={events}
						showAllEventsModal={showAllEventsModal}
					/>
				))}
			</div>
			<Modal
				show={showModal}
				modalDate={modalDate}
				closeModal={closeModal}
				editEvent={events.find((e) => e.id === eventId)}
				addEventBtn={addEventBtn}
				deleteEvent={deleteEvent}
			/>
			<AllEventsModal
				date={allEventsModalDate}
				events={allEventsModalEvents}
				show={showAllEventsModalToggle}
				showEventModal={showEventModal}
				closeModal={closeAllEventsModal}
			/>
		</div>
	)
}
