import { ripple } from '@/ripple/ripple-effect'
import { getFormatCalendar, isSameDay } from './calendar'

export function SelectDay({
    year,
    month,
    current,
    onChange,
}: {
    year: number
    month: number
    current: Date
    onChange?(date: Date): void
}) {
    const calendar = getFormatCalendar(year, month)
    return (
        <div className="sd-date_picker-day_container">
            <header className="sd-date_picker-day_header">
                {['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day) => (
                        <div key={day}>
                            <time>{day}</time>
                        </div>
                    ),
                )}
            </header>
            <div>
                {calendar.map((row, i) => (
                    <div className="sd-date_picker-day_row" key={i}>
                        {row.map((col, j) => (
                            <time
                                className="sd-date_picker-day"
                                data-sd-today={col.isToday}
                                data-sd-selected={isSameDay(col.date, current)}
                                data-sd-disabled={!col.isThisMonth}
                                key={j}
                                dateTime={`${year}-${month}-${col.day}`}
                                onClick={() => {
                                    if (col.isThisMonth && onChange)
                                        onChange(col.date)
                                }}
                                ref={(el) => el && ripple(el)}
                            >
                                {col.day}
                            </time>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
