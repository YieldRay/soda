/* eslint-disable react-refresh/only-export-components */
import './time-picker.scss'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { mdiClockOutline } from '@mdi/js'
import { useEventListenerEffect } from '@/hooks/use-event-listener'
import { useMediaQuery } from '@/hooks/use-media-query'
import { refCSSProperty } from '@/hooks/use-merge'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import { Button } from '../button'
import { IconButton } from '../icon-button'

type TimeValue = readonly [hour: number, minute: number]

/**
 * !WARNING: The data itself always use 24 hours system,
 * but it's appearance varies by changing the `use24hourSystem` property
 *
 * @specs https://m3.material.io/components/time-pickers/specs
 */
export const TimePicker = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        initValue?: TimeValue
        /**
         * If is not specified, will be vertical when screen width <= 600px, otherwise horizontal
         */
        direction?: 'vertical' | 'horizontal'
        /**
         * Use 12 hours system by default
         */
        use24hourSystem?: boolean
        onOK?(time: TimeValue): void
        onCancel?(time: TimeValue): void
        i18n?: Partial<typeof i18n_english>
        initShowClock?: boolean
    }>
>(function TimePicker(
    {
        direction: initDirection,
        use24hourSystem = false,
        onOK: initOnOK,
        onCancel: initOnCancel,
        /**
         * Initial value use 24 hours system, for example `[18, 30]` represents to 6:30 PM
         */
        initValue = [new Date().getHours(), new Date().getMinutes()],
        i18n: initI18n,
        initShowClock = false,
        className,
        ...props
    },
    ref,
) {
    // init state

    const isCompact = useMediaQuery('only screen and (max-width : 600px)')
    const direction = initDirection ?? (isCompact ? 'vertical' : 'horizontal')
    const i18n = Object.assign(
        navigator.language === 'zh-CN' ? i18n_chinese : i18n_english,
        initI18n,
    )

    // state

    const [enterOrSelect, setEnterOrSelect] = useState(initShowClock) // false for enter, true for select
    const [hour, setHour] = useState(normalizeTime(initValue[0]))
    const hourNumber = Number(hour)
    const [minute, setMinute] = useState(normalizeTime(initValue[1]))
    const minuteNumber = Number(minute)

    // handle input

    const onMinuteInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        const str = input.value.replace(/\D/g, '').slice(0, 2)
        setMinute(Number(str) >= 60 ? '59' : str)
    }
    const onHourInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        const str = input.value.replace(/\D/g, '').slice(0, 2)
        const max = use24hourSystem ? 23 : 11
        if (Number(str) >= max) {
            setHour(String(max))
        } else {
            setHour(str)
        }
    }

    // handle period

    const [period, setPeriod] = useState<'AM' | 'PM'>(
        initValue[0] >= 12 ? 'PM' : 'AM',
    )

    useEffect(() => {
        if (!use24hourSystem) return
        // for 24 hours system
        if (period === 'AM' && hourNumber >= 12) {
            setHour(normalizeTime(hourNumber - 12))
        } else if (period === 'PM' && hourNumber < 12) {
            setHour(normalizeTime(hourNumber + 12))
        }
    }, [use24hourSystem, hourNumber, period])

    useEffect(() => {
        if (use24hourSystem) return
        // for 12 hours system
        if (hourNumber >= 12) {
            setPeriod('PM')
            setHour(normalizeTime(hourNumber - 12))
        }
    }, [use24hourSystem, hourNumber, setPeriod, setHour])

    // handle degree (transform time to degree, 0-360deg)

    const [degree, setDegree] = useState(0)

    useEffect(() => {
        setDegree((((hourNumber % 12) + minuteNumber / 60) / 12) * 360)
    }, [hourNumber, minuteNumber, setDegree])

    // handle buttons

    const computeTuple = () => {
        const h = use24hourSystem
            ? hourNumber
            : hourNumber + (period === 'PM' ? 12 : 0)
        const m = minuteNumber
        return [h, m] as const
    }

    const onOK = () => {
        initOnOK?.(computeTuple())
    }

    const onCancel = () => {
        initOnCancel?.(computeTuple())
    }

    // handle events

    const onClockClick = (
        h: number,
        ev: React.PointerEvent<HTMLTimeElement>,
    ) => {
        if (ev.type === 'touch') return
        setHour(normalizeTime(h + (period === 'PM' ? 12 : 0)))
        setMinute('00')
    }

    const isMoving = useRef(false)
    const lastPosition = useRef<[number, number]>([0, 0])

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return
        isMoving.current = true
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        const { clientX, clientY } = e
        lastPosition.current = [clientX, clientY]
    }

    /**
     * compute new degree by adding delta degree
     */
    const degreeAddDelta = (degree: number, delta: number) => {
        const nextDegree = normalizeDegree(degree + delta)
        const nextTime = (nextDegree / 360) * 12 + (period === 'PM' ? 12 : 0)
        const nextHour = Math.trunc(nextTime)
        const nextMinute = Math.trunc((nextTime - nextHour) * 60)
        setHour(normalizeTime(nextHour))
        setMinute(normalizeTime(nextMinute))
        return normalizeDegree(nextDegree)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isMoving.current) return
        const clock = (e.target as HTMLElement).closest(
            '.sd-time_picker-clock',
        ) as HTMLElement
        const [cX, cY] = centerOfElement(clock)
        const { clientX, clientY } = e
        const [initX, initY] = lastPosition.current
        lastPosition.current = [clientX, clientY] // update for next
        const deltaDegree =
            (Math.atan2(clientY - cY, clientX - cX) -
                Math.atan2(initY - cY, initX - cX)) *
            (180 / Math.PI)
        setDegree((degree) => degreeAddDelta(degree, deltaDegree))
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        isMoving.current = false
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    }

    const clockRef = useRef<HTMLDivElement>(null)

    useEventListenerEffect(
        clockRef,
        'wheel',
        (e) => {
            e.preventDefault()
            const delta = e.deltaY / 100
            setDegree((degree) => degreeAddDelta(degree, delta * 3))
        },
        { passive: false },
    )

    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-time_picker', className)}
            data-sd-direction={direction}
        >
            <div className="sd-time_picker-clock_container">
                <div className="sd-time_picker-clock_left">
                    <div className="sd-time_picker-headline">
                        {enterOrSelect ? i18n.select_time : i18n.enter_time}
                    </div>
                    <div className="sd-time_picker-selectors">
                        <div className="sd-time_picker-time_selectors">
                            <label className="sd-time_picker-time_selector">
                                <input value={hour} onInput={onHourInput} />
                                <span>{i18n.hour}</span>
                            </label>
                            <span className="sd-time_picker-time_selector_separator">
                                <span>:</span>
                                <span>&nbsp;</span>
                            </span>
                            <label className="sd-time_picker-time_selector">
                                <input value={minute} onInput={onMinuteInput} />
                                <span>{i18n.minute}</span>
                            </label>
                        </div>
                        <div className="sd-time_picker-period_selectors">
                            <Ripple
                                as="label"
                                tabIndex={0}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && setPeriod('AM')
                                }
                                className="sd-time_picker-period_selector"
                            >
                                <input
                                    type="radio"
                                    tabIndex={-1}
                                    readOnly
                                    checked={period === 'AM'}
                                    onClick={() => setPeriod('AM')}
                                />
                                <span>{i18n.am}</span>
                            </Ripple>
                            <Ripple
                                as="label"
                                tabIndex={0}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && setPeriod('PM')
                                }
                                className="sd-time_picker-period_selector"
                            >
                                <input
                                    type="radio"
                                    tabIndex={-1}
                                    readOnly
                                    checked={period === 'PM'}
                                    onClick={() => setPeriod('PM')}
                                />
                                <span>{i18n.pm}</span>
                            </Ripple>
                        </div>
                    </div>
                </div>

                {enterOrSelect === true && (
                    <div className="sd-time_picker-clock_right">
                        <div
                            className="sd-time_picker-clock"
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (
                                    e.key === 'ArrowRight' ||
                                    e.key === 'ArrowDown'
                                ) {
                                    e.preventDefault() // prevent scroll
                                    setDegree((degree) =>
                                        degreeAddDelta(degree, 10),
                                    )
                                } else if (
                                    e.key === 'ArrowLeft' ||
                                    e.key === 'ArrowUp'
                                ) {
                                    e.preventDefault() // prevent scroll
                                    degreeAddDelta(degree, -10)
                                }
                            }}
                            ref={clockRef}
                        >
                            <div className="sd-time_picker-clock_center" />
                            <div
                                className="sd-time_picker-clock_arm"
                                ref={refCSSProperty('--degree', `${degree}deg`)}
                            />
                            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                                (h) => (
                                    <time
                                        key={h}
                                        dateTime={`${h}:00`}
                                        onPointerDown={(ev) =>
                                            onClockClick(h, ev)
                                        }
                                        style={{
                                            color: isActive(
                                                (h % 12) +
                                                    (use24hourSystem &&
                                                    period === 'PM'
                                                        ? 12
                                                        : 0),
                                                hourNumber,
                                                minuteNumber,
                                            )
                                                ? 'var(--md-sys-color-on-primary)'
                                                : undefined,
                                        }}
                                    >
                                        {h}
                                    </time>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="sd-time_picker-footer">
                <IconButton
                    path={mdiClockOutline}
                    onClick={() => setEnterOrSelect((x) => !x)}
                />
                <div className="sd-time_picker-buttons">
                    <Button variant="text" onClick={onCancel}>
                        {i18n.cancel}
                    </Button>
                    <Button variant="text" onClick={onOK}>
                        {i18n.ok}
                    </Button>
                </div>
            </div>
        </div>
    )
})

export const i18n_english = {
    select_time: 'Select time',
    enter_time: 'Enter time',
    hour: 'Hour',
    minute: 'Minute',
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Cancel',
} as const

export const i18n_chinese = {
    select_time: '选择时间',
    enter_time: '输入时间',
    hour: '时',
    minute: '分',
    am: '上午',
    pm: '下午',
    ok: '确认',
    cancel: '取消',
} as const

/**
 * get center position of an element
 */
function centerOfElement(ele: HTMLElement) {
    const rect = ele.getBoundingClientRect()
    const x = rect.x + rect.width / 2
    const y = rect.y + rect.height / 2
    return [x, y] as const
}

/**
 * normalize any degree (>360 or <0) to 0~360
 */
function normalizeDegree(degree: number) {
    let result = degree % 360
    if (result < 0) result += 360
    return result
}

/**
 * normalize hour or minute number to string
 */
function normalizeTime(hourOrMinute: number) {
    return String(hourOrMinute).padStart(2, '0')
}

/**
 * is time (in hour) is active
 */
function isActive(hour: number, h: number, m: number) {
    if (hour === h && m < 30) return true
    else if (hour - 1 === h && m > 30) return true
    else if (h === 11 && hour === 0 && m > 30) return true
    else if (h === 23 && hour === 12 && m > 30) return true
    else return false
}
