import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ripple } from '@/ripple/ripple-effect'
import { getFormatCalendar, isSameDay } from './calendar'

const Day = styled.time<{
    isToday: boolean
    selected: boolean
    disabled: boolean
}>`
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

    & > * {
        flex: 0 0 auto;
    }

    &:active {
        background: rgba(0 0 0 / 0.08);
    }

    ${(props) =>
        props.isToday &&
        css`
            border: solid 1px;
            overflow: hidden;
        `}

    ${(props) =>
        props.disabled
            ? css`
                  background: none;
                  filter: grayscale(1) opacity(0.6);
              `
            : css`
                  cursor: pointer;
                  revert: true;
              `}


              
    ${(props) =>
        props.selected &&
        css`
            background: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
        `}


        ${(props) =>
        !props.disabled &&
        !props.selected &&
        css`
            @media (any-hover: hover) {
                &:hover {
                    background: rgba(0 0 0 / 0.04);
                }
            }
        `}
`

const SelectDayRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const SelectDayHeader = styled(SelectDayRow)`
    margin-block-start: 30px;
    margin-block-end: 16px;
`.withComponent('header')

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
        <div
            css={css`
                user-select: none;
                margin: 14px;
                -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
            `}
        >
            <SelectDayHeader>
                {['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day) => (
                        <div key={day}>
                            <time>{day}</time>
                        </div>
                    ),
                )}
            </SelectDayHeader>
            <div>
                {calendar.map((row, i) => (
                    <SelectDayRow
                        key={i}
                        css={css`
                            margin-block-start: 6px;
                        `}
                    >
                        {row.map((col, j) => (
                            <Day
                                isToday={col.isToday}
                                selected={isSameDay(col.date, current)}
                                disabled={!col.isThisMonth}
                                key={j}
                                dateTime={`${year}-${month}-${col.day}`}
                                onClick={() => {
                                    if (col.isThisMonth && onChange)
                                        onChange(col.date)
                                }}
                                ref={(el) => el && ripple(el)}
                            >
                                {col.day}
                            </Day>
                        ))}
                    </SelectDayRow>
                ))}
            </div>
        </div>
    )
}
