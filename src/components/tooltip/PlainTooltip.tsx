import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/tooltips/specs
 */
export function PlainTooltip(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...omit(props, 'className')}
            className={clsx('sd-plain_tooltip', props.className)}
        >
            {props.children}
        </div>
    )
}
