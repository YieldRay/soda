import './checkbox.scss'
import clsx from 'clsx'
import { Ripple } from '@/ripple/Ripple'
import { forwardRef, useState } from 'react'
import { ExtendProps } from '@/utils/type'
import { Icon } from '@mdi/react'
import { mdiCheck } from '@mdi/js'
import { SodaSimpleTransition } from '@/composition/SodaTransition'

/**
 * According to the official implementation, the ripple effect should not occupy space.
 * Therefore, if the parent container has `overflow: hidden`, make sure that there is enough area to show the ripple effect.
 * @specs https://m3.material.io/components/checkbox/specs
 */
export const Checkbox = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * This components is controlled if checked !== undefined
         */
        checked?: boolean
        onChange?: (checked: boolean) => void
        /**
         * For uncontrolled
         */
        defaultChecked?: boolean
        children?: React.ReactNode
        disabled?: boolean
        /**
         * This do not have any functional effect, just change color to red
         */
        error?: boolean
    }>
>(function Checkbox(
    {
        checked: checked$co,
        onChange,
        defaultChecked = false,
        children,
        disabled,
        error,
        ...props
    },
    ref
) {
    const controlled = checked$co !== undefined
    const [checked$un, setChecked$un] = useState(defaultChecked)
    const checked = controlled ? checked$co : checked$un
    const dispatchChange = () => {
        onChange?.(!checked)
        if (!controlled) {
            setChecked$un(!checked$un)
        }
    }
    const checkedIcon = children || <Icon path={mdiCheck} />

    return (
        <div
            ref={ref}
            className={clsx('sd-checkbox', props.className)}
            tabIndex={disabled ? undefined : 0}
            role="checkbox"
            data-sd-disabled={disabled}
            data-sd-error={error}
            data-sd-checked={checked}
            aria-checked={checked}
            onClick={dispatchChange}
            onKeyDown={(e) => {
                if (!disabled && e.key === 'Enter') {
                    dispatchChange()
                }
            }}
        >
            <div className="sd-checkbox-icon">
                <SodaSimpleTransition
                    in={checked}
                    enter={{ clipPath: `inset(0 0 0 0)` }}
                    leave={{ clipPath: `inset(0 100% 0 0)` }}
                >
                    {checkedIcon}
                </SodaSimpleTransition>
            </div>
            <div className="sd-checkbox-ripple">
                <Ripple />
            </div>
        </div>
    )
})
