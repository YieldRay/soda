import './checkbox.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { mdiCheck } from '@mdi/js'
import { Icon } from '@mdi/react'
import { SodaSimpleTransition } from '@/composition/SodaTransition'
import { useAutoState } from '@/hooks/use-auto-state'
import { useMergeEventHandlers } from '@/hooks/use-merge'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

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
        /**
         * For uncontrolled
         */
        defaultChecked?: boolean
        onChange?: (checked: boolean) => void
        disabled?: boolean
        /**
         * This do not have any functional effect, just change color to red
         */
        error?: boolean
        children?: React.ReactNode
    }>
>(function Checkbox(
    {
        checked: checked$co,
        defaultChecked = false,
        onChange,
        children,
        disabled,
        error,
        ...props
    },
    ref,
) {
    const [checked, setChecked] = useAutoState(
        onChange,
        checked$co,
        defaultChecked,
    )

    const checkedIcon = children || <Icon size={0.6} path={mdiCheck} />

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
            onClick={useMergeEventHandlers(props.onClick, () => {
                setChecked(!checked)
            })}
            onKeyDown={useMergeEventHandlers(props.onKeyDown, (e) => {
                if (!disabled && e.key === 'Enter') {
                    setChecked(!checked)
                }
            })}
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
