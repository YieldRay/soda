import { forwardRef } from 'react'

// @reference https://m3.material.io/components/cards/specs
export const Card = forwardRef<
    unknown,
    {
        as?: string
        sdType: 'outlined' | 'filled' | 'elevated'
        className?: string
    } & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
>((props, ref) => {
    const As = props.as ?? 'div'

    const className =
        `sd-card sd-card-${props.sdType}` + ' ' + (props.className ?? '')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return <As {...props} className={className} ref={ref}></As>
})
