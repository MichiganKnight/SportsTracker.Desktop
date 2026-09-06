import { addDaysToDateValue, formatNavigationDate } from "../../utils/date.ts";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface DateNavigationProps {
    selectedDate: string
    today: string
    onDateChange: (date: string) => void
}

export function DateNavigation({ selectedDate, today, onDateChange }: DateNavigationProps) {
    const isToday = selectedDate === today

    return (
        <div className="games-date-card mb-4">
            <div className="games-date-navigation">
                <button type="button" className="games-date-nav-button" onClick={() => onDateChange(addDaysToDateValue(selectedDate, -1))}>
                    <ChevronLeft size={17} aria-hidden="true"/>

                    <span className="d-none d-md-inline">
                        Previous
                    </span>
                </button>

                <div className="games-date-center">
                    <div className="games-date-heading">
                        {formatNavigationDate(selectedDate)}
                    </div>

                    <div className="games-date-actions">
                        <label className="games-change-date-button">
                            <CalendarDays size={15} aria-hidden="true"/>

                            Change Date

                            <input className="games-native-date-input" type="date" value={selectedDate} aria-label="Choose a Scoreboard Date" onChange={(event) => {
                                if (event.target.value) {
                                    onDateChange(event.target.value)
                                }
                            }} />
                        </label>

                        {!isToday && (
                            <>
                                <span className="games-date-divider" />

                                <button type="button" className="games-today-link" onClick={() => onDateChange(today)}>
                                    Today
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <button type="button" className="games-date-nav-button" onClick={() => onDateChange(addDaysToDateValue(selectedDate, 1))}>
                    <span className="d-none d-md-inline">
                        Next
                    </span>

                    <ChevronRight size={17} aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}