import { Ripple } from '@/ripple/Ripple'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { forwardRef } from 'react'
import Icon from '@mdi/react'
import { useMergeRefs } from '@floating-ui/react'

/**
 * This component is a replacement for <IconButton> when you want the element
 * only take space of the icon but not for the ripple
 * This component has ref forwarded.
 */
export const IconRippleButton = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        path?: string
        /**
         * @default 24px
         */
        size?: string
        children?: React.ReactNode
    }>
>(({ className, path, size, children, ...props }, ref) => {
    return (
        <>
            <style jsx global>{`
                .sd-icon_ripple_button {
                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent; // remove webkit blue tap effect
                    transition: all 200ms;
                    --size: 24px;
                    width: var(--size);
                    height: var(--size);
                    line-height: var(--size);
                    text-align: center;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .sd-icon_ripple_button-ripple {
                    position: absolute;
                    overflow: hidden;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: calc(var(--size) * 1.666666);
                    height: calc(var(--size) * 1.666666);
                    clip-path: circle(50%);
                    border-radius: 50%;
                    transition: all 200ms;
                }
                .sd-icon_ripple_button-ripple > div {
                    width: 100%;
                    height: 100%;
                }
                @media (any-hover: hover) {
                    .sd-icon_ripple_button-ripple:hover {
                        background: rgb(0 0 0 / 0.1);
                    }
                }
            `}</style>
            <div
                {...props}
                ref={useMergeRefs([
                    ref,
                    (e) => size && e?.style.setProperty('--size', size),
                ])}
                className={clsx('sd-icon_ripple_button', className)}
            >
                {path ? <Icon path={path}></Icon> : children}
                <div className="sd-icon_ripple_button-ripple">
                    <Ripple />
                </div>
            </div>
        </>
    )
})
