import clsx from 'clsx'
import { getFormatCalendar, isSameDay } from './calendar'
import { useRippleRef } from '@/utils/ripple-effect'

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
        <table>
            <thead>
                <tr>
                    {['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                        (day) => (
                            <td key={day}>
                                <time>{day}</time>
                            </td>
                        )
                    )}
                </tr>
            </thead>
            <tbody>
                {calendar.map((row, i) => (
                    <tr key={i}>
                        {row.map((col, j) => (
                            <td key={j}>
                                <time
                                    className={clsx(
                                        'day',
                                        isSameDay(col.date, current) &&
                                            'selected',
                                        col.isToday && 'today',
                                        !col.isThisMonth && 'disabled'
                                    )}
                                    data-sd-disabled={!col.isThisMonth}
                                    dateTime={`${year}-${month}-${col.day}`}
                                    onClick={() => {
                                        if (col.isThisMonth && onChange)
                                            onChange(col.date)
                                    }}
                                    ref={useRippleRef()}
                                >
                                    {col.day}
                                </time>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

            <style jsx>{`
                .day.today {
                    border: solid 1px;
                    overflow: hidden;
                }
                .day:hover {
                    background: rgba(0 0 0 / 0.04);
                }
                .day:active {
                    background: rgba(0 0 0 / 0.08);
                }
                .day.selected {
                    background: var(--md-sys-color-primary);
                    color: var(--md-sys-color-on-primary);
                }
                .day.disabled {
                    background: none;
                    filter: grayscale(1) opacity(0.6);
                }
                .day:not(.disabled) {
                    cursor: pointer;
                    revert: true;
                }
            `}</style>
        </table>
    )
}
