import './time-picker.scss'
import { Button } from '../button'
import { useState } from 'react'
import { IconButton } from '../icon-button'
import { IconClock } from '@/utils/icons'
import { Ripple } from '@/utils/Ripple'

/**
 * TODO: unimplemented yet!
 */
export function TimePicker({
    direction = 'vertical',
}: {
    direction?: 'vertical' | 'horizontal'
}) {
    const [mode, setMode] = useState<'Enter time' | 'Select time'>('Enter time')

    return (
        <div className="sd-time_picker" data-sd-direction={direction}>
            <div className="sd-time_picker-clock_container">
                <div className="sd-time_picker-clock_left">
                    <div className="sd-time_picker-headline">{mode}</div>
                    <div className="sd-time_picker-selectors">
                        <div className="sd-time_picker-time_selectors">
                            <label className="sd-time_picker-time_selector">
                                <input value={'07'} />
                                <span>Hour</span>
                            </label>
                            <span className="sd-time_picker-time_selector_separator">
                                <span>:</span>
                                <span>&nbsp;</span>
                            </span>
                            <label className="sd-time_picker-time_selector">
                                <input value={'00'} />
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
                                    value="AM"
                                    name="period_selector"
                                />
                                <span>AM</span>
                            </Ripple>
                            <Ripple
                                as="label"
                                className="sd-time_picker-period_selector"
                            >
                                <input
                                    type="radio"
                                    value="PM"
                                    name="period_selector"
                                />
                                <span>PM</span>
                            </Ripple>
                        </div>
                    </div>
                </div>

                {mode === 'Select time' && (
                    <div className="sd-time_picker-clock_right">
                        <div className="sd-time_picker-clock">
                            <time dateTime="12:00">12</time>
                            <time dateTime="1:00">1</time>
                            <time dateTime="2:00">2</time>
                            <time dateTime="3:00">3</time>
                            <time dateTime="4:00">4</time>
                            <time dateTime="5:00">5</time>
                            <time dateTime="6:00">6</time>
                            <time dateTime="7:00">7</time>
                            <time dateTime="8:00">8</time>
                            <time dateTime="9:00">9</time>
                            <time dateTime="10:00">10</time>
                            <time dateTime="11:00">11</time>
                            <div className="sd-time_picker-clock_center" />
                            <div className="sd-time_picker-clock_arm" />
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
                    <Button sd="text">Cancel</Button>
                    <Button sd="text">OK</Button>
                </div>
            </div>
        </div>
    )
}
