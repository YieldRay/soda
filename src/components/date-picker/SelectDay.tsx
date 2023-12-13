import clsx from 'clsx'
import { getFormatCalendar, isSameDay } from './calendar'
import { useRippleRef } from '@/ripple/hooks'

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
        <div className="select-day">
            <header className="select-day-header">
                {['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day) => (
                        <div key={day}>
                            <time>{day}</time>
                        </div>
                    )
                )}
            </header>
            <div className="select-day-body">
                {calendar.map((row, i) => (
                    <div className="select-day-row" key={i}>
                        {row.map((col, j) => (
                            <time
                                key={j}
                                className={clsx(
                                    'select-day-col',
                                    'day',
                                    isSameDay(col.date, current) && 'selected',
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
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
                .select-day {
                    user-select: none;
                    margin: 14px;
                    -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
                }
                .select-day-header {
                    margin-top: 30px;
                    margin-bottom: 16px;
                }

                .select-day-row {
                    margin-top: 6px;
                }

                .select-day-header,
                .select-day-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }

                .select-day-col {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    transition: all 200ms;
                    margin: 2px 0;
                }

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
        </div>
    )
}
