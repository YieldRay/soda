import './navigation.scss'
import { Badge } from '../badge'
import { Button } from '../button'
import { omit } from 'lodash-es'
import clsx from 'clsx'

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

export function Helper(
    props: HelperItem &
        Omit<
            React.HTMLProps<HTMLDivElement>,
            'active' | 'icon' | 'label' | 'badge'
        >
) {
    return (
        <div
            className={clsx('sd-navigation_helper', props.className)}
            data-sd-active={props.active ? 'true' : 'false'}
            {...omit(props, ['className', 'active', 'icon', 'label', 'badge'])}
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
