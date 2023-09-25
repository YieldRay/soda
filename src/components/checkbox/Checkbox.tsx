import './checkbox.scss'
import clsx from 'clsx'
import { Ripple } from '@/utils/Ripple.tsx'
import { IconChecked } from '@/utils/icons.tsx'
import { forwardRef } from 'react'
import { ExtendProps } from '@/utils/type'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/checkbox/specs
 */
export const Checkbox = forwardRef<
    HTMLElement,
    ExtendProps<{
        checked?: boolean
        onChange?: (checked: boolean) => void
        children?: React.ReactNode
        disabled?: boolean
        /**
         * This do not have any functional effect, just change color to red
         */
        error?: boolean
    }>
>(function Checkbox(props, ref) {
    const checkedIcon = props.children || <IconChecked />

    return (
        <Ripple
            {...omit(props, [
                'checked',
                'onChange',
                'children',
                'disabled',
                'error',
                'as',
            ])}
            ref={ref}
            className={clsx('sd-checkbox', props.className)}
            data-sd-disabled={props.disabled}
            data-sd-checked={props.checked}
            data-sd-error={props.error}
            onClick={() => props.onChange?.(!props.checked)}
        >
            <div className="sd-checkbox-icon">
                {props.checked && checkedIcon}
            </div>
        </Ripple>
    )
})
