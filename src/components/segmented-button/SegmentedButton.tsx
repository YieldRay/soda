import './segmented-button.scss'
import { forwardRef, useState } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { useMergeRefs } from '@floating-ui/react'

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
        value: value$co,
        defaultValue,
        items,
        onChange,
        density,
        className,
        ...props
    },
    ref
) {
    const controlled = value$co !== undefined
    const [value$un, setValue$un] = useState(defaultValue)
    const value = controlled ? value$co : value$un
    const dispatchChange = (v: string) => {
        onChange?.(v)
        if (!controlled) {
            setValue$un(v)
        }
    }

    return (
        <div
            {...props}
            className={clsx('sd-segmented_button', className)}
            ref={useMergeRefs([
                (e) =>
                    e &&
                    e.style.setProperty(
                        '--density',
                        density ? String(density) : '0'
                    ),
                ref,
            ])}
        >
            {items &&
                items.map(({ label, disabled, value: value$i }, index) => (
                    <Ripple
                        key={value$i}
                        tabIndex={index + 1}
                        className="sd-segmented_button-item"
                        data-sd-active={value$i === value}
                        data-sd-disabled={disabled}
                        onClick={() => dispatchChange(value$i)}
                        onKeyDown={(e) => {
                            if (onChange && e.key === 'Enter' && !disabled) {
                                dispatchChange(value$i)
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
