import './navigation.scss'
import { Badge } from '../badge'
import { Button } from '../button'
import { omit } from 'lodash-es'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import isFunction from 'lodash-es/isFunction'

type ReactNodeBuilder = React.ReactNode | ((active: boolean) => React.ReactNode)

function buildReactNode(builder?: ReactNodeBuilder, active: boolean = false) {
    if (!builder) return null
    if (isFunction(builder)) return builder(active)
    return builder
}

export interface HelperItem {
    active?: boolean
    icon?: ReactNodeBuilder
    label?: ReactNodeBuilder
    badge?: {
        active?: boolean
        label?: ReactNodeBuilder
        sd?: 'none' | 'small' | 'large'
    }
}

/**
 * for internal use only
 */
export function Helper({
    className,
    active,
    icon,
    label,
    badge,
    ...props
}: ExtendProps<HelperItem>) {
    return (
        <div
            {...omit(props, ['children'])}
            className={clsx('sd-navigation_helper', className)}
            data-sd-active={active}
        >
            <Badge
                sd={badge?.active ? badge?.sd : 'none'}
                label={buildReactNode(badge?.label, badge?.active)}
            >
                <Button
                    sd={active ? 'tonal' : 'text'}
                    className="sd-navigation_helper-icon"
                >
                    {buildReactNode(icon, active)}
                </Button>
            </Badge>
            <span className="sd-navigation_helper-label_text">
                {buildReactNode(label, active)}
            </span>
        </div>
    )
}
