import './navigation.scss'
import clsx from 'clsx'
import { Scrim } from '@/composition/Scrim'
import { ExtendProps } from '@/utils/type'
import { Portal } from '@/utils/Portal'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import React, { forwardRef, useRef } from 'react'
import { Ripple } from '@/ripple/Ripple'

/**
 * It's common that you decide wether this component is modaled by
 * the screen width, example code:
 * Note that you will always want to set `onScrimClick` to close the
 * drawer when scrim is clicked
 *
 * ```jsx
 * const [open, setOpen] = useState(false)
 * const isScreenExpanded = useWindowSizeType() === 'expanded'
 * return <NavigationDrawer
 *            modal={!isScreenExpanded}
 *            open={open}
 *            onScrimClick={() => setOpen(false)}
 *        />
 * ```
 * This component DO NOT have ref forwarded.
 *
 * @specs https://m3.material.io/components/navigation-drawer/specs
 */
export function NavigationDrawer({
    open = false,
    onScrimClick,
    teleportTo,
    modal,
    headline,
    zIndex,
    className,
    children,
    ...props
}: ExtendProps<{
    open?: boolean
    /**
     * Headline text, can be omitted
     */
    headline?: React.ReactNode
    /**
     * Usually you'd like to put `<NavigationDrawerItem>` component here
     */
    children?: React.ReactNode
    /**
     * When enable `modal`, you can toggle `open` property to
     * open and hide the SideSheet without any help of other component
     */
    modal?: boolean
    /**
     * Only works if `modal` set to true
     *
     * Most of the case you want toggle `open` to false
     */
    onScrimClick?(): void
    /**
     * Only works if `fixed` set to true
     *
     * Element that has `position:fixed` will positioned relative
     * to it's containing block (will be viewport if no containing block)
     *
     * To force the position relative to viewport you can set teleportTo
     * to `document.body`
     */
    teleportTo?: Element | DocumentFragment
    zIndex?: number
}>) {
    const ref = useRef<HTMLDivElement>(null)
    useToggleAnimation(ref, open, {
        show(el) {
            if (modal)
                return el.animate(
                    {
                        translate: ['-100% 0', '0 0'],
                    },
                    {
                        duration: 400,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    }
                )

            // standard
            const { width } = el.getBoundingClientRect()
            return el.animate(
                {
                    clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'],
                    width: [0, width],
                },
                {
                    duration: 200,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                }
            )
        },
        hide(el) {
            if (modal)
                return el.animate(
                    {
                        translate: ['0 0', '-100% 0'],
                    },
                    {
                        duration: 250,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    }
                )

            // standard
            const { width } = el.getBoundingClientRect()
            return el.animate(
                {
                    clipPath: ['inset(0 0 0 0)', 'inset(0 100% 0 0)'],
                    width: [width, 0],
                },
                {
                    duration: 200,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                }
            )
        },
    })

    const drawer = (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-navigation_drawer',
                modal
                    ? 'sd-navigation_drawer_modal'
                    : 'sd-navigation_drawer_standard',
                className
            )}
        >
            {headline && (
                <div className="sd-navigation_drawer-headline">{headline}</div>
            )}
            <div className="sd-navigation_drawer-body">{children}</div>
        </div>
    )

    if (modal)
        return (
            <Portal container={teleportTo}>
                <Scrim
                    open={open}
                    onClick={() => onScrimClick?.()}
                    style={{ zIndex }}
                />
                <div className="sd-navigation_drawer-scrim" style={{ zIndex }}>
                    {drawer}
                </div>
            </Portal>
        )

    return drawer
}

/**
 * This component has ref forwarded.
 */
export const NavigationDrawerItem = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        icon?: React.ReactNode
        badge?: React.ReactNode
        active?: boolean
        children?: React.ReactNode
    }>
>(({ icon, badge, children, className, active, ...props }, ref) => (
    <Ripple
        {...props}
        ref={ref}
        data-sd-active={active}
        className={clsx('sd-navigation_drawer_item', className)}
    >
        <div className="sd-navigation_drawer_item-icon">{icon}</div>
        <div className="sd-navigation_drawer_item-label">{children}</div>
        <div className="sd-navigation_drawer_item-badge">{badge}</div>
    </Ripple>
))
