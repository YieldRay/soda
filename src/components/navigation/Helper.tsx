import './navigation.scss'
import clsx from 'clsx'
import { useState } from 'react'
import { useRippleRef } from '@/ripple/hooks'
import { ExtendProps } from '@/utils/type'
import { Badge } from '../badge'

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
 * @internal For internal use only!
 */
export function Helper({
    className,
    active,
    icon,
    label,
    badge,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children: _,
    ...props
}: ExtendProps<HelperItem>) {
    const [hover, setHover] = useState(false)
    const ref = useRippleRef()

    return (
        <div
            {...props}
            className={clsx('sd-navigation_helper', className)}
            data-sd-active={active}
            data-sd-hover={hover}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <Badge
                ref={ref}
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
