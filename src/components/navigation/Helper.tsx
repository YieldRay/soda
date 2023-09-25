import './navigation.scss'
import { Badge } from '../badge'
import { Button } from '../button'
import { omit } from 'lodash-es'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'

export interface HelperItem {
    active?: boolean
    icon?: React.ReactNode
    label?: React.ReactNode
    badge?: {
        active?: boolean
        label?: React.ReactNode
        sd?: 'none' | 'small' | 'large'
    }
}

/**
 * for internal use only
 */
export function Helper(props: ExtendProps<HelperItem>) {
    return (
        <div
            {...omit(props, [
                'className',
                'active',
                'icon',
                'label',
                'badge',
                'children',
            ])}
            className={clsx('sd-navigation_helper', props.className)}
            data-sd-active={props.active}
        >
            <Badge
                sd={props.badge?.active ? props.badge?.sd : 'none'}
                label={props.badge?.label}
            >
                <Button
                    as="div"
                    sd={props.active ? 'tonal' : 'text'}
                    className="sd-navigation_helper-icon"
                >
                    {props.icon}
                </Button>
            </Badge>
            <span className="sd-navigation_helper-label_text">
                {props.label}
            </span>
        </div>
    )
}
