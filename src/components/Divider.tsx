import clsx from 'clsx'

// @specs https://m3.material.io/components/divider/specs
export const Divider = (props: {
    /**
     * @default full
     */
    sd?: 'full' | 'inset'
    className?: string
    /**
     * @default horizon
     */
    direction?: 'horizon' | 'vertical'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}) => (
    <div
        {...props}
        data-sd-type={props.direction === 'vertical' ? 'vertical' : 'horizon'}
        className={clsx(
            {
                'sd-divider': true,
                'sd-divider-full': props.sd === 'full' || props.sd == undefined,
                'sd-divider-inset': props.sd === 'inset',
            },
            props.className,
        )}
    ></div>
)
