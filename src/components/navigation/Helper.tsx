import './navigation.scss'
import clsx from 'clsx'
import { Badge } from '../badge'
import { ExtendProps } from '@/utils/type'
import { useRippleRef } from '@/ripple/hooks'
import { useState } from 'react'
import { omit } from '@/utils/misc'

type ReactNodeBuilder = React.ReactNode | ((active: boolean) => React.ReactNode)

function buildReactNode(builder?: ReactNodeBuilder, active: boolean = false) {
    if (!builder) return null
    if (typeof builder === 'function') return builder(active)
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
 * @warn For internal use only
 */
export function Helper({
    className,
    active,
    icon,
    label,
    badge,
    ...props
}: ExtendProps<HelperItem>) {
    const [hover, setHover] = useState(false)

    return (
        <div
            {...omit(props, ['children'])}
            className={clsx('sd-navigation_helper', className)}
            data-sd-active={active}
            data-sd-hover={hover}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <Badge
                ref={useRippleRef()}
                className="sd-navigation_helper-active_indicator"
                variant={badge?.active ? badge?.sd : 'none'}
                label={buildReactNode(badge?.label, badge?.active)}
            >
                <div className="sd-navigation_helper-icon">
                    {buildReactNode(icon, active)}
                </div>
            </Badge>
            <span className="sd-navigation_helper-label_text">
                {buildReactNode(label, active)}
            </span>
        </div>
    )
}
