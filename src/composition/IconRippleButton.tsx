import './IconRippleButton.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'
import Icon from '@mdi/react'
import { useMergeRefs } from '@/hooks/use-merge'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

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
>(({ className, path, size = '24px', children, ...props }, ref) => {
    return (
        <div
            {...props}
            ref={useMergeRefs(
                ref,
                (e) => size && e?.style.setProperty('--size', size),
            )}
            className={clsx('sd-icon_ripple_button', className)}
        >
            {path ? <Icon path={path} /> : children}
            <div className="sd-icon_ripple_button-ripple">
                <Ripple />
            </div>
        </div>
    )
})
