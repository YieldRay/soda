import './date-picker.scss'
import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '../button'
import { TextField } from '../text-field'
import { IconButton } from '../icon-button'
import { MenuButton } from './MenuButton'
import { mdiCalendarBlank } from '@mdi/js'
import { getFormatCalendar, isSameDay } from './calendar'

//TODO
/**
 * @warn Unimplemented yet!
 *
 * @specs https://m3.material.io/components/date-pickers/specs
 */
export function DatePicker({
    initDate = new Date(),
}: {
    initDate?: Date
    format?: (value: Date) => string
}) {
    // just for UI display
    const [year, setYear] = useState(initDate.getFullYear())
    const [month, setMonth] = useState(initDate.getMonth() + 1)
    // internal value
    const [date, setDate] = useState(initDate)
    const calendar = getFormatCalendar(year, month)

    return (
        <div className="sd-date_picker">
            <div className="input">
                <TextField
                    style={{ width: '100%' }}
                    sd="outlined"
                    readOnly
                    value={new Intl.DateTimeFormat().format(date)}
                    labelText="Date"
                    supportingText="YYYY/MM/DD"
                />
                <div className="input-icon">
                    <IconButton path={mdiCalendarBlank} />
                </div>
            </div>

            <section className="sd-date_picker-docked">
                <header className="sd-date_picker-docked_header">
                    <MenuButton
                        onLeft={() => setMonth((m) => m - 1)}
                        onRight={() => setMonth((m) => m + 1)}
                    >
                        {
                            new Intl.DateTimeFormat(undefined, {
                                month: 'long',
                            }).formatToParts(date)[0].value
                        }
                    </MenuButton>
                    <MenuButton
                        onLeft={() => setYear((y) => y - 1)}
                        onRight={() => setYear((y) => y + 1)}
                    >
                        {
                            new Intl.DateTimeFormat(undefined, {
                                year: 'numeric',
                            }).formatToParts(date)[0].value
                        }
                    </MenuButton>
                </header>
                <div className="sd-date_picker-docked_body">
                    <table>
                        <thead>
                            <tr>
                                {[
                                    'Mon',
                                    'Tue',
                                    'Wen',
                                    'Thu',
                                    'Fri',
                                    'Sat',
                                    'Sun',
                                ].map((day) => (
                                    <td key={day}>
                                        <time>{day}</time>
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {calendar.map((row, i) => (
                                <tr key={i}>
                                    {row.map((col, j) => (
                                        <td key={j}>
                                            <time
                                                className={clsx(
                                                    isSameDay(col.date, date) &&
                                                        'selected',
                                                    col.isToday && 'today',
                                                    !col.isThisMonth &&
                                                        'disabled'
                                                )}
                                                dateTime={`${year}-${month}-${col.day}`}
                                                onClick={() => {
                                                    if (col.isThisMonth)
                                                        setDate(col.date)
                                                }}
                                            >
                                                {col.day}
                                            </time>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer className="sd-date_picker-docked_footer">
                    <Button sd="text">Cancel</Button>
                    <Button sd="text">OK</Button>
                </footer>
            </section>

            <style jsx>
                {`
                    .input {
                        display: inline-block;
                        position: relative;
                    }
                    .input-icon {
                        position: absolute;
                        right: 4px;
                        top: 4px;
                        color: var(--sd-sys-color-outline);
                    }
                    time.today {
                        border: solid 1px;
                    }
                    time.selected {
                        background: var(--sd-sys-color-primary);
                        color: var(--sd-sys-color-on-primary);
                    }
                    time.disabled {
                        color: var(--sd-sys-color-on-surface-variant);
                    }
                    time:not(.disabled) {
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    )
}
