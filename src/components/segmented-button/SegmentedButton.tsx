import './segmented-button.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'
import { refCSSProperty, useMergeRefs } from '@/hooks/use-merge'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

/**
 * Either `value` or `defaultValue` MUST be set to corresponding `items`'`value`
 */
export const SegmentedButton = forwardRef<
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
            disabled?: boolean
        }>

        /**
         * Each step down in density removes 4px from the height
         */
        density?: 0 | -1 | -2 | -3
    }>
>(function SegmentedButton(
    {
        items,
        value: value$co,
        defaultValue,
        onChange,
        density,
        className,
        ...props
    },
    ref,
) {
    const [value, setValue] = useAutoState(onChange, value$co, defaultValue!)

    const mergedRef = useMergeRefs(
        ref,
        refCSSProperty('--density', density ? String(density) : '0'),
    )

    return (
        <div
            {...props}
            className={clsx('sd-segmented_button', className)}
            ref={mergedRef}
        >
            {items &&
                items.map(({ label, disabled, value: value$i }) => (
                    <Ripple
                        as="div"
                        key={value$i}
                        tabIndex={disabled ? undefined : 0}
                        className="sd-segmented_button-item"
                        data-sd-active={value$i === value}
                        data-sd-disabled={disabled}
                        onClick={() => setValue(value$i)}
                        onKeyDown={(e) => {
                            if (onChange && e.key === 'Enter' && !disabled) {
                                setValue(value$i)
                            }
                        }}
                    >
                        <div className="sd-segmented_button-label">
                            {label ?? value$i}
                        </div>
                    </Ripple>
                ))}
        </div>
    )
})
