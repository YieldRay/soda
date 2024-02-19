import './date-picker.scss'
import { useRef, useState } from 'react'
import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStyles,
} from '@floating-ui/react'
import { mdiCalendarBlank } from '@mdi/js'
import { IconRippleButton } from '@/composition/IconRippleButton'
import { common } from '@/utils/floating-ui'
import { startViewTransitionFlushSync } from '@/utils/view-transition'
import { Button } from '../button'
import { TextField } from '../text-field'
import { MenuButton } from './MenuButton'
import { SelectDay } from './SelectDay'
import { SelectMonth } from './SelectMonth'
import { SelectYear } from './SelectYear'

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
    const { styles } = useTransitionStyles(context, {
        initial: { maxHeight: '0' },
        open: { maxHeight: '580px' },
        close: { maxHeight: '0' },
        common,
        duration: { open: 150, close: 300 },
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
        'calendar',
    )

    // the state result
    const body = (
        {
            calendar: (
                <SelectDay
                    year={year}
                    month={month}
                    current={date}
                    onChange={setDate}
                />
            ),
            year: (
                <SelectYear
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
                <SelectMonth
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
            <TextField
                style={{ width: '100%', padding: '0.5rem 0.75rem' }}
                variant="outlined"
                readonly
                value={new Intl.DateTimeFormat().format(date)}
                labelText="Date"
                supportingText={supportingText}
                data-sd-focus={isOpen}
                trailingIcon={
                    <IconRippleButton
                        path={mdiCalendarBlank}
                        onClick={() => setIsOpen((x) => !x)}
                    />
                }
            />

            <div
                style={{ width: '100%', zIndex: '2', ...floatingStyles }}
                ref={refs.setFloating}
                {...getFloatingProps()}
            >
                <section className="sd-date_picker-docked" style={styles}>
                    <header className="sd-date_picker-docked_header">
                        <MenuButton
                            onLeft={() =>
                                state === 'calendar' &&
                                startViewTransitionFlushSync(
                                    () => setMonth((m) => m - 1),
                                    ...slideLeftToRight,
                                )
                            }
                            onRight={() =>
                                state === 'calendar' &&
                                startViewTransitionFlushSync(
                                    () => setMonth((m) => m + 1),
                                    ...slideRightToLeft,
                                )
                            }
                            onClick={() =>
                                startViewTransitionFlushSync(() =>
                                    setState((state) =>
                                        state === 'month'
                                            ? 'calendar'
                                            : 'month',
                                    ),
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
                                    setYear((y) => y - 1),
                                )
                            }
                            onRight={() =>
                                state === 'calendar' &&
                                startViewTransitionFlushSync(() =>
                                    setYear((y) => y + 1),
                                )
                            }
                            onClick={() =>
                                startViewTransitionFlushSync(() =>
                                    setState((state) =>
                                        state === 'year' ? 'calendar' : 'year',
                                    ),
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
                            variant="text"
                            onClick={() => {
                                setIsOpen(false)
                                onCancel?.(date)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => {
                                setIsOpen(false)
                                onOK?.(date)
                            }}
                        >
                            OK
                        </Button>
                    </footer>
                </section>
            </div>
        </div>
    )
}
