//TODO
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck

import './date-picker.scss'
import { Button } from '../button'
import { TextField } from '../text-field'
import { useState } from 'react'
import { IconButton } from '../icon-button/IconButton'
import { mdiChevronLeft, mdiCalendarBlank, mdiChevronRight } from '@mdi/js'
import { Ripple } from '@/utils/Ripple'

type DateValue = readonly [year: number, month: number, day: number]
export function DatePicker({
    initValue = [2000, 12, 12],
    format = defaultFormat,
}: {
    initValue?: DateValue
    format?: (value: DateValue) => string
}) {
    const [year, setYear] = useState(initValue[0])
    const [month, setMonth] = useState(initValue[1])
    const [day, setDay] = useState(initValue[2])

    const dateString = format([year, month, day])

    return (
        <div className="sd-date_picker">
            <TextField
                sd="outlined"
                readOnly
                value={dateString}
                labelText="Date"
                supportingText="MM/DD/YYYY"
            />
            <div className="sd-date_picker-icon">
                <IconButton path={mdiCalendarBlank} />
            </div>

            <div className="sd-date_picker-year">
                <div>
                    <IconButton path={mdiChevronLeft} />
                    <Ripple>...</Ripple>
                    <IconButton path={mdiChevronRight} />
                </div>
                <div></div>
                <div>
                    <Button sd="text">Cancel</Button>
                    <Button sd="text">OK</Button>
                </div>
            </div>
            <div className="sd-date_picker-month"></div>
        </div>
    )
}

function defaultFormat(value: DateValue) {
    return value.join('/')
}
