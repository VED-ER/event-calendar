import { format } from "date-fns"

export default function Header({ currentDate, gotoCurrentMonth, gotoPrevMonth, gotoNextMonth }) {
	return (
		<div className="header">
			<button className="btn" onClick={gotoCurrentMonth}>
				Today
			</button>
			<div>
				<button className="month-change-btn" onClick={gotoPrevMonth}>
					&lt;
				</button>
				<button className="month-change-btn" onClick={gotoNextMonth}>
					&gt;
				</button>
			</div>
			<span className="month-title">{format(currentDate, "MMMM yyyy")}</span>
		</div>
	)
}
