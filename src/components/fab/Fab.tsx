import './fab.scss'
import { Ripple } from '../../utils/Ripple.tsx'
import omit from 'lodash-es/omit'
import clsx from 'clsx'
import { ExtendProps, TagNameString } from '@/utils/type.ts'

/**
 * @specs https://m3.material.io/components/floating-action-button/specs
 */
export function Fab(
    props: ExtendProps<{
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
        as?: TagNameString
    }>
) {
    return (
        <Ripple
            {...omit(props, [
                'className',
                'sd',
                'size',
                'children',
                'extended',
                'disabled',
                'as',
            ])}
            as={props.as || 'button'}
            className={clsx('sd-fab', props.className)}
            data-sd={props.sd || 'surface'}
            data-sd-size={props.size || 'default'}
            data-sd-extended={props.extended}
            data-sd-disabled={props.disabled}
        >
            <div className="sd-fab-icon">{props.children}</div>
        </Ripple>
    )
}
