import { chunk } from '@/utils/misc'

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
        calendar.push(getNextDay(calendar[calendar.length - 1] /* at(-1) */))
    }

    for (let i = 0; i < prependDays - 1; i++) {
        calendar.unshift(getLastDay(calendar[0] /* at(0) */))
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
    const thisMonth = new Date(year, month - 1, 1)
    return chunk(
        calendar.map((date) => {
            return {
                date,
                week: getWeekOfDate(date),
                day: date.getDate(),
                isToday: isSameDay(today, date),
                isThisMonth: isSameMonth(thisMonth, date),
            }
        }),
        7,
    )
}

export function isSameMonth(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function isSameDay(a: Date, b: Date) {
    return isSameMonth(a, b) && a.getDate() === b.getDate()
}
