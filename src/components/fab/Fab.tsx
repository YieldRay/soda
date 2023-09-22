import './fab.scss'
import { forwardRef } from 'react'
import { Ripple } from '../../utils/Ripple.tsx'
import omit from 'lodash-es/omit'
import clsx from 'clsx'

/**
 * @specs https://m3.material.io/components/floating-action-button/specs
 */
export const Fab = forwardRef<
    HTMLElement,
    {
        /**
         * @default surface
         */
        sd?: 'surface' | 'secondary' | 'tertiary'
        /**
         * @default default
         */
        size?: 'default' | 'small' | 'large'
        children?: React.ReactNode
        extended?: boolean
        disabled?: boolean
    } & React.HTMLProps<HTMLDivElement>
>((props, ref) => (
    <Ripple
        as="div"
        {...omit(props, ['ref', 'className', 'extended'])}
        ref={ref}
        className={clsx('sd-fab', props.className)}
        data-sd={props.sd || 'surface'}
        data-sd-size={props.size || 'default'}
        data-sd-extended={props.extended}
        data-sd-disabled={props.disabled}
    >
        <div className="sd-fab-icon">{props.children}</div>
    </Ripple>
))
