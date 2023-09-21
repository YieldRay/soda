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
        sd?: 'surface' | 'secondary' | 'tertiary'
        size?: 'default' | 'small' | 'large'
        children?: React.ReactNode
        extended?: boolean
    } & React.HTMLProps<HTMLDivElement>
>((props, ref) => (
    <Ripple
        as="div"
        {...omit(props, ['ref', 'className', 'extended'])}
        ref={ref}
        className={clsx('sd-fab', props.className)}
        data-sd={props.sd || 'surface'}
        data-sd-size={props.size || 'default'}
        data-sd-extended={props.extended ? 'true' : 'false'}
    >
        <div className="sd-fab-icon">{props.children}</div>
    </Ripple>
))
