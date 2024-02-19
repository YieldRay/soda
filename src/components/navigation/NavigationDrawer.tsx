import './navigation.scss'
import clsx from 'clsx'
import React, { forwardRef, useCallback, useRef } from 'react'
import { Scrim } from '@/composition/Scrim'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

/**
 * It's common that you decide whether this component is modaled by
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
    modal,
    headline,
    zIndex = 2,
    className,
    children,
    ...props
}: ExtendProps<{
    /**
     * See `modal`
     */
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
     *
     * See also `open` `onScrimClick` `zIndex`
     */
    modal?: boolean
    /**
     * Only works if `modal` set to true
     *
     * Most of the case you want toggle `open` to false
     *
     * See also `zIndex`
     */
    onScrimClick?(): void
    /**
     * CSS `z-index`, if `modal` set to `true`
     *
     * @default 2
     */
    zIndex?: number
}>) {
    const ref = useRef<HTMLDivElement>(null)
    useToggleAnimation(
        ref,
        open,
        useCallback(
            (el) => {
                if (modal)
                    return el.animate(
                        {
                            translate: ['-100% 0', '0 0'],
                        },
                        {
                            duration: 400,
                            easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        },
                    )

                // standard
                return el.animate(
                    {
                        clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'],
                        width: ['0', ''],
                    },
                    {
                        duration: 200,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    },
                )
            },
            [modal],
        ),
        useCallback(
            (el) => {
                if (modal)
                    return el.animate(
                        {
                            translate: ['0 0', '-100% 0'],
                        },
                        {
                            duration: 250,
                            easing: 'cubic-bezier(0.2, 0, 0, 1)',
                        },
                    )

                // standard
                return el.animate(
                    {
                        clipPath: ['inset(0 0 0 0)', 'inset(0 100% 0 0)'],
                        width: ['', '0'],
                    },
                    {
                        duration: 200,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    },
                )
            },
            [modal],
        ),
    )

    const drawer = (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-navigation_drawer',
                modal
                    ? 'sd-navigation_drawer_modal'
                    : 'sd-navigation_drawer_standard',
                className,
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
            <Scrim
                open={open}
                onScrimClick={onScrimClick}
                className="sd-navigation_drawer-scrim"
                zIndex={zIndex}
            >
                {drawer}
            </Scrim>
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
