/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { rippleEffect } from './ripple-effect'
import omit from 'lodash-es/omit'
import React from 'react'

export const Ripple: any = forwardRef<
    unknown,
    {
        as?: string
        children?: React.ReactNode
        disabled?: boolean
        /**
         * in ms
         */
        rippleDuration?: number
        /**
         * any css color string
         */
        rippleColor?: string
    }
>((props, ref) => {
    const Element: any = props.as ?? 'div'
    const eRef = useRef<HTMLElement>(null)

    useImperativeHandle(ref, () => eRef.current)
    useEffect(() => {
        if (!props.disabled)
            return rippleEffect(
                eRef.current!,
                props.rippleDuration,
                props.rippleColor
            )
    }, [props])
    return (
        <Element
            ref={eRef}
            {...omit(props, [
                'as',
                'ref',
                'disabled',
                'rippleDuration',
                'rippleColor',
            ])}
        >
            {props.children}
        </Element>
    )
})
