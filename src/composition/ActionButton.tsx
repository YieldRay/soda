import { Ripple } from '@/ripple/Ripple'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'

/**
 * This component is primary for internal use.
 * This component has ref forwarded.
 */
export const ActionButton = forwardRef<
    HTMLElement,
    ExtendProps<{
        inverse?: boolean
        disabled?: boolean
        children?: React.ReactNode
    }>
>(({ className, inverse, disabled, children, ...props }, ref) => {
    return (
        <>
            <style jsx global>{`
                .sd-action_button {
                    all: unset;
                    display: inline-block;
                    text-align: center;
                    vertical-align: middle;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 4px;
                    padding: 6px 10px;
                    cursor: pointer;
                    user-select: none;
                    transition: all 200ms;
                    overflow: hidden;
                    -webkit-tap-highlight-color: transparent;
                }
                .sd-action_button[data-sd-inverse='false'] {
                    color: var(--md-sys-color-primary);
                }
                .sd-action_button[data-sd-inverse='false']:hover {
                    background: rgb(0 0 0 / 0.04);
                }
                .sd-action_button[data-sd-inverse='false']:active {
                    background: rgb(0 0 0 / 0.08);
                }
                .sd-action_button[data-sd-inverse='false']:focus-visiable {
                    background: rgb(0 0 0 / 0.12);
                }
                .sd-action_button[data-sd-inverse='true'] {
                    color: var(--md-sys-color-inverse-primary);
                }
                .sd-action_button[data-sd-inverse='true']:hover {
                    background: rgb(255 255 255 / 0.04);
                }
                .sd-action_button[data-sd-inverse='true']:active {
                    background: rgb(255 255 255 / 0.08);
                }
                .sd-action_button[data-sd-inverse='true']:focus-visiable {
                    background: rgb(255 255 255 / 0.12);
                }
                .sd-action_button[data-sd-disabled='true'] {
                    pointer-events: none;
                    filter: grayscale(98%) opacity(40%);
                }
            `}</style>
            <Ripple
                {...props}
                ref={ref}
                as="button"
                className={clsx('sd-action_button', className)}
                rippleColor={
                    inverse ? 'rgb(255 255 255 / 0.1)' : 'rgb(0 0 0 / 0.1)'
                }
                data-sd-inverse={inverse ? 'true' : 'false'}
                data-sd-disabled={disabled ? 'true' : 'false'}
            >
                {children}
            </Ripple>
        </>
    )
})
