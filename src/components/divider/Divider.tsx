import './divider.scss'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/divider/specs
 * The divider has default margin included, you can remove it by adding `style={{margin:"0"}}`
 */
export function Divider(
    props: {
        /**
         * @default full
         */
        sd?: 'full' | 'inset'
        /**
         * @default horizon
         */
        direction?: 'horizon' | 'vertical'
    } & React.HTMLProps<HTMLDivElement>
) {
    return (
        <div
            {...omit(props, 'sd', 'direction', 'className')}
            data-sd-direction={
                props.direction === 'vertical' ? 'vertical' : 'horizon'
            }
            className={clsx(
                {
                    'sd-divider': true,
                    'sd-divider-full':
                        props.sd === 'full' || props.sd == undefined,
                    'sd-divider-inset': props.sd === 'inset',
                },
                props.className
            )}
        ></div>
    )
}
