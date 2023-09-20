import './navigation.scss'
import { Badge } from '../badge'
import { Button } from '../button'
import { createPortal } from 'react-dom'

interface Item {
    key: React.Key
    active?: boolean
    icon?: React.ReactNode
    label?: React.ReactNode
    badge?: {
        active?: boolean
        label?: React.ReactNode
        sd?: 'none' | 'small' | 'large'
    }
}

export function NavigationBar(props: {
    items: Array<Item>
    onChange?(item: Item): void
    fixed?: boolean
}) {
    const ele = (
        <div
            className="sd-navigation_bar"
            style={
                props.fixed
                    ? {
                          position: 'fixed',
                          bottom: '0',
                          width: '100%',
                          boxSizing: 'border-box',
                      }
                    : {}
            }
        >
            {props.items.map(({ key, active, icon, label, badge }, i, a) => (
                <div
                    className="sd-navigation_bar-helper"
                    key={key}
                    onClick={() => props.onChange?.(a[i])}
                    data-sd-active={active ? 'true' : 'false'}
                >
                    <Badge
                        sd={badge?.active ? badge?.sd : 'none'}
                        label={badge?.label}
                    >
                        <Button
                            sd={active ? 'tonal' : 'text'}
                            className="sd-navigation_bar-icon"
                        >
                            {icon}
                        </Button>
                    </Badge>
                    <span className="sd-navigation_bar-label_text">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    )

    if (props.fixed) return createPortal(ele, document.body)
    return ele
}
