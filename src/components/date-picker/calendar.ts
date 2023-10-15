import chunk from 'lodash-es/chunk'

function getDaysInMonth(year: number, month: number) {
    const firstDay = new Date(year, month - 1, 1)
    const firstDayOfNextMonth = new Date(year, month, 1)
    const lastDay = getLastDay(firstDayOfNextMonth)
    const daysInMonth = lastDay.getDate() - firstDay.getDate() + 1

    return {
        days: daysInMonth,
        firstDay,
        lastDay,
    }
}

function getLastDay(date: Date) {
    return new Date(date.getTime() - 24 * 60 * 60 * 1000)
}

function getNextDay(date: Date) {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000)
}

function getWeekOfDate(date: Date) {
    const day = date.getDay()
    if (day === 0) return 7
    return day
}

function getCalendarOfMonth(year: number, month: number) {
    const { firstDay, lastDay, days } = getDaysInMonth(year, month)

    const prependDays = getWeekOfDate(firstDay)
    const appendDays = 7 - getWeekOfDate(lastDay)

    const calendar: Date[] = [firstDay]

    for (let i = 0; i < appendDays + (days - 1); i++) {
        calendar.push(getNextDay(calendar.at(-1)!))
    }

    for (let i = 0; i < prependDays - 1; i++) {
        calendar.unshift(getLastDay(calendar.at(0)!))
    }

    console.assert(calendar.length % 7 === 0)

    return {
        calendar,
        days,
        firstDay,
        lastDay,
        prependDays,
        appendDays,
    }
}

export function getFormatCalendar(year: number, month: number) {
    const { calendar } = getCalendarOfMonth(year, month)
    const today = new Date()
    return chunk(
        calendar.map((date) => {
            return {
                date,
                week: getWeekOfDate(date),
                day: date.getDate(),
                isThisMonth: date.getMonth() + 1 === month,
                isToday: isSameDay(today, date),
            }
        }),
        7
    )
}

export function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}
