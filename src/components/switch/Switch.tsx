import { ExtendProps } from '@/utils/type'
import './switch.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useAutoState } from '@/hooks/use-auto-state'
import { useMergeEventHandlers } from '@/hooks/use-merge'

/**
 * @specs https://m3.material.io/components/switch/specs
 */
export const Switch = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        checked?: boolean
        onChange?: (checked: boolean) => void
        defaultChecked?: boolean
        children?: React.ReactNode
        disabled?: boolean
    }>
>(function Switch(
    {
        checked: checked$co,
        defaultChecked = false,
        onChange,
        disabled,
        children,
        ...props
    },
    ref,
) {
    const [checked, setChecked] = useAutoState(
        onChange,
        checked$co,
        defaultChecked,
    )

    return (
        <div
            {...props}
            ref={ref}
            tabIndex={disabled ? undefined : 0}
            role="switch"
            className={clsx('sd-switch', props.className)}
            data-sd-disabled={disabled}
            data-sd-checked={checked}
            aria-checked={checked}
            aria-disabled={disabled}
            onClick={useMergeEventHandlers(props.onClick, () => {
                setChecked(!checked)
            })}
            onKeyDown={useMergeEventHandlers(props.onKeyDown, (e) => {
                if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault() // Prevent page scroll for space
                    setChecked(!checked)
                }
            })}
        >
            <div className="sd-switch-movable">
                <div className="sd-switch-thumb"></div>
                <div className="sd-switch-icon">{children}</div>
            </div>
        </div>
    )
})
