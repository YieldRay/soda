//TODO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */

import './date-picker.scss'
import { useState } from 'react'

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

    return <div className="sd-date_picker">{dateString}</div>
}

function defaultFormat(value: DateValue) {
    return value.join('/')
}
