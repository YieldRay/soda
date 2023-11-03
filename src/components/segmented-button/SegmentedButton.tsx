import './segmented-button.scss'
import { forwardRef, useState } from 'react'
import { Ripple } from '@/utils/Ripple'
import { ExtendProps } from '@/utils/type'
import clsx from 'clsx'
import { useMergeRefs } from '@floating-ui/react'

export const SegmentedButton = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        value?: string
        defaultValue?: string
        onChange?: (value: string) => void
        items?: Array<{
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
    { value, defaultValue, items, onChange, density, className, ...props },
    ref
) {
    const controlled = value !== undefined
    const [value$, setValue$] = useState(defaultValue)
    const realValue = controlled ? value : value$
    const dispatchChange = (v: string) => {
        onChange?.(v)
        if (!controlled) {
            setValue$(v)
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
                items.map(({ label, disabled, value }, index) => (
                    <Ripple
                        key={value ?? index}
                        tabIndex={index + 1}
                        className="sd-segmented_button-item"
                        data-sd-active={value === realValue ? 'true' : 'false'}
                        data-sd-disabled={disabled}
                        onClick={() => dispatchChange(value)}
                        onKeyDown={(e) => {
                            if (onChange && e.key === 'Enter' && !disabled) {
                                dispatchChange(value)
                            }
                        }}
                    >
                        <div className="sd-segmented_button-label">{label}</div>
                    </Ripple>
                ))}
        </div>
    )
})
