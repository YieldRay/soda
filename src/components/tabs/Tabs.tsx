import './tabs.scss'
import clsx from 'clsx'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'
import { useMergeRefs } from '@/hooks/use-merge'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

/**
 * Either `value` or `defaultValue` MUST be set.
 *
 * This component may similar to NavigationBar in some aspects, but you can notice that
 * Tabs is easier to change the `value`, this is by design.
 *
 * @specs https://m3.material.io/components/tabs/specs
 */
export const Tabs = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value?: string
        defaultValue?: string
        onChange?: (value: string) => void
        items: Array<{
            value: string
            /**
             * You can omit the label, it will show the `value`
             */
            label?: React.ReactNode
            icon?: React.ReactNode
            disabled?: boolean
            /**
             * @default "column"
             */
            direction?: React.CSSProperties['flexDirection']
        }>
        /**
         * @default "primary"
         */
        variant?: 'primary' | 'secondary' | 'block'
        full?: boolean
    }>
>(function Tab(
    {
        className,
        style,
        items,
        value: value$co,
        defaultValue,
        onChange,
        variant,
        full,
        ...props
    },
    eRef,
) {
    const [value, setValue] = useAutoState(onChange, value$co, defaultValue!)
    const index = items.findIndex((i) => i.value === value)
    const ref = useRef<HTMLDivElement>(null)
    const [left, setLeft] = useState('0')
    const [width, setWidth] = useState('36px')

    const correctlyPlaceIndicator = useCallback(() => {
        const tabs = ref.current
        if (!tabs) return
        const item = tabs.querySelectorAll('.sd-tabs-item')[
            index
        ] as HTMLElement

        if (!item) return

        const indicatorWidth =
            variant === 'secondary' || variant === 'block'
                ? item.clientWidth
                : 36
        setWidth(`${indicatorWidth}px`)
        const left = item.offsetLeft + (item.clientWidth - indicatorWidth) / 2
        setLeft(`${left}px`)

        if (
            left -
                tabs.scrollLeft -
                /** previous */ (item.previousElementSibling?.clientWidth ||
                    0) /
                    2 /** make sure the previous item is able to click */ <=
            0
        ) {
            // scroll to left
            tabs.scrollBy(-item.clientWidth, 0)
        } else if (
            left +
                item.clientWidth -
                tabs.scrollLeft +
                /** next */ (item.nextElementSibling?.clientWidth || 0) /
                    2 /** make sure the next item is able to click */ >=
            tabs.clientWidth
        ) {
            // scroll to right
            tabs.scrollBy(item.clientWidth, 0)
        }
    }, [index, variant])

    useEffect(correctlyPlaceIndicator, [correctlyPlaceIndicator])

    useEffect(() => {
        window.addEventListener('resize', correctlyPlaceIndicator)
        return () =>
            window.removeEventListener('resize', correctlyPlaceIndicator)
    }, [correctlyPlaceIndicator])

    return (
        <div
            {...props}
            ref={useMergeRefs(ref, eRef)}
            className={clsx('sd-tabs', className)}
            style={{
                width: full ? '100%' : undefined,
                display: full ? 'inline-grid' : undefined,
                gridTemplateColumns: full
                    ? `repeat(${items.length}, 1fr)`
                    : undefined,
                ...style,
            }}
            data-sd-variant={variant || 'primary'}
            role="tablist"
        >
            {items.map(
                ({
                    icon,
                    label,
                    disabled,
                    direction: flexDirection,
                    ...item
                }) => (
                    <Ripple
                        as="div"
                        className="sd-tabs-item"
                        rippleColor={
                            variant === 'block' ? 'transparent' : undefined
                        }
                        style={{ flexDirection }}
                        key={item.value}
                        onClick={() => setValue(item.value)}
                        aria-selected={value === item.value}
                        data-sd-active={value === item.value}
                        data-sd-disabled={disabled}
                        role="tab"
                        tabIndex={disabled ? undefined : 0}
                        onKeyDown={(e) => {
                            if (!disabled && e.key === 'Enter') {
                                setValue(item.value)
                            }
                        }}
                    >
                        {icon && (
                            <div className="sd-tabs-item-icon">{icon}</div>
                        )}
                        <div className="sd-tabs-item-label_text">
                            {label ?? String(item.value)}
                        </div>
                    </Ripple>
                ),
            )}

            {index !== -1 && (
                <div
                    className="sd-tabs-active_indicator"
                    style={{ left, width }}
                />
            )}
        </div>
    )
})
