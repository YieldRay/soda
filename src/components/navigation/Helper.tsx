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
            <Badge sd={badge?.active ? badge?.sd : 'none'} label={badge?.label}>
                <Button
                    sd={active ? 'tonal' : 'text'}
                    className="sd-navigation_helper-icon"
                >
                    {icon}
                </Button>
            </Badge>
            <span className="sd-navigation_helper-label_text">{label}</span>
        </div>
    )
}
