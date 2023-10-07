import './time-picker.scss'
import { Button } from '../button'
import { useState, useEffect } from 'react'
import { IconButton } from '../icon-button'
import { IconClock } from '@/utils/icons'
import { Ripple } from '@/utils/Ripple'
import { useMediaQuery } from '@/utils/hooks'

/**
 * [warn]: data itself always use 24 hours system,
 * but it's appearance varys by changing the `use24hourSystem` property
 */
export function TimePicker({
    direction: initDirection,
    use24hourSystem = false,
    onOK: initOnOK,
    onCancel: initOnCancel,
    /**
     * Initial value use 24 hours system, for example `[18, 30]` represents to 6:30 PM
     */
    initValue = [new Date().getHours(), new Date().getMinutes()],
}: {
    initValue?: readonly [hour: number, minute: number]
    /**
     * If is not spcified, choose when screen width <= 600px, use vertical, otherwise horizontal
     */
    direction?: 'vertical' | 'horizontal'
    /**
     * Use 12 hours system by default
     */
    use24hourSystem?: boolean
    onOK?(time: readonly [hour: number, minute: number]): void
    onCancel?(time: readonly [hour: number, minute: number]): void
}) {
    const isCompact = useMediaQuery('only screen and (max-width : 600px)')
    const direction = initDirection ?? (isCompact ? 'vertical' : 'horizontal')
    const [mode, setMode] = useState<'Enter time' | 'Select time'>('Enter time')
    const [hour, setHour] = useState(initValue[0].toString().padStart(2, '0'))
    const hourNumber = Number(hour)
    const [minute, setMinute] = useState(
        initValue[1].toString().padStart(2, '0')
    )
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
        const max = use24hourSystem ? 24 : 12
        if (Number(str) >= max) {
            setHour(String(max))
        } else {
            setHour(str)
        }
    }

    // handle period

    const [period, setPeriod] = useState<'AM' | 'PM'>(
        initValue[0] >= 12 ? 'PM' : 'AM'
    )

    useEffect(() => {
        if (!use24hourSystem) return
        // for 24 hours system
        if (period === 'AM' && hourNumber >= 12) {
            setHour((hourNumber - 12).toString().padStart(2, '0'))
        } else if (period === 'PM' && hourNumber < 12) {
            setHour((hourNumber + 12).toString().padStart(2, '0'))
        }
    }, [use24hourSystem, hourNumber, period])

    useEffect(() => {
        if (use24hourSystem) return
        // for 12 hours system
        if (hourNumber >= 12) {
            setPeriod('PM')
            setHour((hourNumber - 12).toString().padStart(2, '0'))
        }
    }, [use24hourSystem, hourNumber, setPeriod, setHour])

    // handle degree

    const [degree, setDegree] = useState(0)

    useEffect(() => {
        setDegree((((hourNumber % 12) + minuteNumber / 60) / 12) * 360)
    }, [hourNumber, minuteNumber, setDegree])

    const onClockHover = (h: number) => {
        setDegree(((h + (period === 'PM' ? 12 : 0)) / 12) * 360)
    }
    const onClockClick = (h: number) => {
        setHour(String(h + (period === 'PM' ? 12 : 0)).padStart(2, '0'))
    }

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

    return (
        <div className="sd-time_picker" data-sd-direction={direction}>
            <div className="sd-time_picker-clock_container">
                <div className="sd-time_picker-clock_left">
                    <div className="sd-time_picker-headline">{mode}</div>
                    <div className="sd-time_picker-selectors">
                        <div className="sd-time_picker-time_selectors">
                            <label className="sd-time_picker-time_selector">
                                <input value={hour} onInput={onHourInput} />
                                <span>Hour</span>
                            </label>
                            <span className="sd-time_picker-time_selector_separator">
                                <span>:</span>
                                <span>&nbsp;</span>
                            </span>
                            <label className="sd-time_picker-time_selector">
                                <input value={minute} onInput={onMinuteInput} />
                                <span>Minute</span>
                            </label>
                        </div>
                        <div className="sd-time_picker-period_selectors">
                            <Ripple
                                as="label"
                                className="sd-time_picker-period_selector"
                            >
                                <input
                                    type="radio"
                                    readOnly
                                    checked={period === 'AM'}
                                    onClick={() => setPeriod('AM')}
                                />
                                <span>AM</span>
                            </Ripple>
                            <Ripple
                                as="label"
                                className="sd-time_picker-period_selector"
                            >
                                <input
                                    type="radio"
                                    readOnly
                                    checked={period === 'PM'}
                                    onClick={() => setPeriod('PM')}
                                />
                                <span>PM</span>
                            </Ripple>
                        </div>
                    </div>
                </div>

                {mode === 'Select time' && (
                    <div className="sd-time_picker-clock_right">
                        <div className="sd-time_picker-clock">
                            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                                (h) => (
                                    <time
                                        key={h}
                                        dateTime={`${h}:00`}
                                        onPointerEnter={() => onClockHover(h)}
                                        onPointerDown={() => onClockClick(h)}
                                    >
                                        {h}
                                    </time>
                                )
                            )}

                            <div className="sd-time_picker-clock_center" />
                            <div
                                className="sd-time_picker-clock_arm"
                                ref={(e) => {
                                    e?.style.setProperty(
                                        '--degree',
                                        `${degree}deg`
                                    )
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="sd-time_picker-footer">
                <IconButton
                    onClick={() =>
                        setMode((mode) =>
                            mode === 'Select time'
                                ? 'Enter time'
                                : 'Select time'
                        )
                    }
                >
                    <IconClock />
                </IconButton>
                <div className="sd-time_picker-buttons">
                    <Button sd="text" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button sd="text" onClick={onOK}>
                        OK
                    </Button>
                </div>
            </div>
        </div>
    )
}
