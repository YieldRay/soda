import { forwardRef } from 'react'

// @reference https://m3.material.io/components/cards/specs
export const Card = forwardRef<
    unknown,
    {
        as?: string
        class: 'outlined' | 'filled' | 'elevated'
        className?: string
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => {
    const As = props.as ?? 'div'

    const className =
        `sd-cards sd-cards-${props.class}` + ' ' + (props.className ?? '')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <As {...props} className={className} ref={ref}></As>
})
