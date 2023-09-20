import './badge.scss'
import clsx from 'clsx'

/**
 * @specs https://m3.material.io/components/badges/specs
 */
export function Badge(props: {
    children?: React.ReactNode
    label?: React.ReactNode
    /**
     * do not need specify this property by default, as it will automatically
     * choose small for empty label and large for none-empty label
     */
    sd?: 'none' | 'small' | 'large'
    className?: string
}) {
    return (
        <div
            className={clsx('sd-badge', props.className)}
            data-sd={props.sd ?? (props.label ? 'large' : 'small')}
        >
            {props.children}
            <div className="sd-badge-label">{props.label}</div>
        </div>
    )
}
