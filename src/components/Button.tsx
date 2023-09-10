import { ripple } from '../utils/ripple'
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

// @reference https://m3.material.io/components/buttons/specs
export const Button = forwardRef<
    unknown,
    {
        as?: string
        sdType: 'outlined' | 'filled' | 'elevated' | 'tonal' | 'text'
        className?: string
        disableRipple?: boolean
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => {
    const As = props.as ?? 'button'

    const className =
        `sd-button sd-button-${props.sdType}` + ' ' + (props.className ?? '')

    const btnRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!props.disableRipple) return ripple(btnRef.current!)
    }, [props.disableRipple])

    useImperativeHandle(ref, () => {
        return btnRef.current
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <As {...props} className={className} ref={btnRef}></As>
})
