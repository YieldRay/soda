import clsx from 'clsx'

/**
 * @specs https://m3.material.io/components/badges/specs
 */
export function Badge(props: {
    children?: React.ReactNode
    label?: React.ReactNode
    sd?: 'small' | 'large'
    className?: string
}) {
    return (
        <div
            className={clsx('sd-badge', props.children)}
            data-sd={props.sd ?? (props.label ? 'large' : 'small')}
        >
            {props.children}
            <div className="sd-badge-label">{props.label}</div>
        </div>
    )
}
