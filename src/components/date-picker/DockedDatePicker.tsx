import './date-picker.scss'
import '@/style/view-transition.scss'
import { useRef, useState } from 'react'
import { Button } from '../button'
import { TextField } from '../text-field'
import { IconButton } from '../icon-button'
import { MenuButton } from './MenuButton'
import { mdiCalendarBlank } from '@mdi/js'
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useInteractions,
    useRole,
} from '@floating-ui/react'
import assign from 'lodash-es/assign'
import { YearList } from './YearList'
import { MonthList } from './MonthList'
import { DayList } from './DayList'
import { startViewTransitionFlushSync } from '@/utils/view-transition'

/**
 * @specs https://m3.material.io/components/date-pickers/specs
 */
export function DockedDatePicker({
    initDate = new Date(),
    supportingText,
    onOK,
    onCancel,
}: {
    initDate?: Date
    format?: (value: Date) => string
    supportingText?: string
    onOK?: (value: Date) => void
    onCancel?: (value: Date) => void
}) {
    // just for UI display
    const [year, setYear] = useState(initDate.getFullYear())
    const [month, setMonth] = useState(initDate.getMonth() + 1)

    const dateDisplay = new Date(year, month - 1, initDate.getDate())

    // internal value
    const [date, setDate] = useState(initDate)

    // floating-ui
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, update, context } = useFloating({
        whileElementsMounted: autoUpdate,
        placement: 'bottom',
        middleware: [offset(4), flip(), shift()],
        open: isOpen,
        onOpenChange: setIsOpen,
    })
    const role = useRole(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([role])

    // panel state
    const bodyRef = useRef<HTMLDivElement>(null)
    const slideLeftToRight = [
        () => bodyRef.current?.classList.add('sd-vt-slide_left_to_right'),
        () => bodyRef.current?.classList.remove('sd-vt-slide_left_to_right'),
    ] as const
    const slideRightToLeft = [
        () => bodyRef.current?.classList.add('sd-vt-slide_right_to_left'),
        () => bodyRef.current?.classList.remove('sd-vt-slide_right_to_left'),
    ]
    const [state, setState] = useState<'calendar' | 'year' | 'month'>(
        'calendar'
    )

    const body = (
        {
            calendar: (
                <DayList
                    year={year}
                    month={month}
                    current={date}
                    onChange={setDate}
                />
            ),
            year: (
                <YearList
                    current={year}
                    onChange={(y) =>
                        startViewTransitionFlushSync(() => {
                            setState('calendar')
                            setYear(y)
                        })
                    }
                />
            ),
            month: (
                <MonthList
                    current={month}
                    onChange={(m) =>
                        startViewTransitionFlushSync(() => {
                            setState('calendar')
                            setMonth(m)
                        })
                    }
                />
            ),
        } as const
    )[state]

    return (
        <div
            className="sd-date_picker"
            data-sd="docked"
            {...getReferenceProps()}
            ref={refs.setReference}
            onResize={update}
        >
            <div className="input">
                <TextField
                    style={{ width: '100%' }}
                    sd="outlined"
                    readOnly
                    value={new Intl.DateTimeFormat().format(date)}
                    labelText="Date"
                    supportingText={supportingText}
                />
                <div className="input-icon">
                    <IconButton
                        path={mdiCalendarBlank}
                        onClick={() => setIsOpen((x) => !x)}
                    />
                </div>
            </div>

            <section
                className="sd-date_picker-docked"
                style={assign(
                    {
                        pointerEvents: isOpen ? 'auto' : 'none',
                        opacity: isOpen ? '1' : '0',
                        transition: 'all 200ms',
                    },
                    floatingStyles
                )}
                ref={refs.setFloating}
                {...getFloatingProps()}
            >
                <header className="sd-date_picker-docked_header">
                    <MenuButton
                        onLeft={() =>
                            state === 'calendar' &&
                            startViewTransitionFlushSync(
                                () => setMonth((m) => m - 1),
                                ...slideLeftToRight
                            )
                        }
                        onRight={() =>
                            state === 'calendar' &&
                            startViewTransitionFlushSync(
                                () => setMonth((m) => m + 1),
                                ...slideRightToLeft
                            )
                        }
                        onClick={() =>
                            startViewTransitionFlushSync(() =>
                                setState((state) =>
                                    state === 'month' ? 'calendar' : 'month'
                                )
                            )
                        }
                    >
                        {
                            new Intl.DateTimeFormat(undefined, {
                                month: 'long',
                            }).formatToParts(dateDisplay)[0].value
                        }
                    </MenuButton>
                    <MenuButton
                        onLeft={() =>
                            state === 'calendar' &&
                            startViewTransitionFlushSync(() =>
                                setYear((y) => y - 1)
                            )
                        }
                        onRight={() =>
                            state === 'calendar' &&
                            startViewTransitionFlushSync(() =>
                                setYear((y) => y - 1)
                            )
                        }
                        onClick={() =>
                            startViewTransitionFlushSync(() =>
                                setState((state) =>
                                    state === 'year' ? 'calendar' : 'year'
                                )
                            )
                        }
                    >
                        {
                            new Intl.DateTimeFormat(undefined, {
                                year: 'numeric',
                            }).formatToParts(dateDisplay)[0].value
                        }
                    </MenuButton>
                </header>
                <div className="sd-date_picker-docked_body" ref={bodyRef}>
                    {body}
                </div>
                <footer className="sd-date_picker-docked_footer">
                    <Button
                        sd="text"
                        onClick={() => {
                            setIsOpen(false)
                            onCancel?.(date)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        sd="text"
                        onClick={() => {
                            setIsOpen(false)
                            onOK?.(date)
                        }}
                    >
                        OK
                    </Button>
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
                `}
            </style>
        </div>
    )
}
