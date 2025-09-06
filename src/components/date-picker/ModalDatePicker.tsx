import './date-picker.scss'
import { useCallback, useRef, useState } from 'react'
import { Scrim } from '@/composition/Scrim'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { Portal } from '@/utils/Portal'
import { startViewTransitionFlushSync } from '@/utils/view-transition'
import { Button } from '../button'
import { Dialog } from '../dialog'
import { MenuButton } from './MenuButton'
import { SelectDay } from './SelectDay'
import { SelectMonth } from './SelectMonth'
import { SelectYear } from './SelectYear'

/**
 * @experimental
 * Highly experimental!
 */
export function ModalDatePicker({
    open,
    initDate = new Date(),
    onScrimClick,
    onOK,
    onCancel,
}: {
    open: boolean
    initDate?: Date
    supportingText?: string
    onScrimClick?: (value: Date) => void
    onOK?: (value: Date) => void
    onCancel?: (value: Date) => void
}) {
    // just for UI display
    const [year, setYear] = useState(initDate.getFullYear())
    const [month, setMonth] = useState(initDate.getMonth() + 1)

    const dateDisplay = new Date(year, month - 1, initDate.getDate())

    // internal value
    const [date, setDate] = useState(initDate)

    // modal state
    const dialogRef = useRef<HTMLDivElement>(null)

    const show = useCallback(
        (el: HTMLElement) =>
            el.animate(
                { scale: ['0.9', '1'] },
                {
                    duration: 250,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                },
            ),
        [],
    )

    const hide = useCallback(
        (el: HTMLElement) =>
            el.animate(
                { scale: ['1', '0.9'], opacity: ['1', '0'] },
                {
                    duration: 250,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                },
            ),
        [],
    )

    // Animation for modal dialog
    useToggleAnimation(dialogRef, open, show, hide)

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
        <>
            <Portal container={document.body}>
                <Scrim
                    center
                    open={open}
                    onScrimClick={() => onScrimClick?.(date)}
                >
                    <Dialog
                        ref={dialogRef}
                        headline="Select date"
                        noPadding
                        buttons={
                            <>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        onCancel?.(date)
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        onOK?.(date)
                                    }}
                                >
                                    OK
                                </Button>
                            </>
                        }
                    >
                        <section className="sd-date_picker-modal">
                            <header className="sd-date_picker-modal_header">
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
                                                state === 'year'
                                                    ? 'calendar'
                                                    : 'year',
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
                            <div
                                className="sd-date_picker-modal_body"
                                ref={bodyRef}
                            >
                                {body}
                            </div>
                        </section>
                    </Dialog>
                </Scrim>
            </Portal>
        </>
    )
}
