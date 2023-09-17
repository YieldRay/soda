import './fab.scss'
import { forwardRef } from 'react'
import { Ripple } from '../../utils/Ripple.tsx'
import omit from 'lodash-es/omit'
import clsx from 'clsx'

export const Fab = forwardRef<
    HTMLElement,
    {
        sd?: 'surface' | 'secondary' | 'tertiary'
        size?: 'default' | 'small' | 'large'
        children?: React.ReactNode
        extended?: boolean
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => (
    <Ripple
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
