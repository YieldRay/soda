import { ripple } from '../utils/ripple'
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import clsx from 'clsx'
import omit from 'lodash-es/omit'

/**
 * @specs https://m3.material.io/components/buttons/specs
 */
export const Button = forwardRef<
    () => HTMLElement,
    {
        as?: string
        sd: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
        className?: string
        disableRipple?: boolean
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const As: any = props.as ?? 'button'

    const btnRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!props.disableRipple) return ripple(btnRef.current!)
    }, [props.disableRipple])

    useImperativeHandle(ref, () => {
        return () => btnRef.current!
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return (
        <As
            {...omit(props, ['as', 'sd', 'className', 'ref', 'disableRipple'])}
            className={clsx(
                'sd-button',
                `sd-button-${props.sd}`,
                props.className
            )}
            ref={btnRef}
        ></As>
    )
})
