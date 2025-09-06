import './fab-menu.scss'
import clsx from 'clsx'
import { forwardRef, useRef } from 'react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { useAutoState } from '@/hooks/use-auto-state'
import { useEventListenerEffect } from '@/hooks/use-event-listener'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'
import { Fab } from './Fab'

/**
 * FAB Menu component with expandable menu items
 * @specs https://m3.material.io/components/fab-menu/specs
 */
export const FabMenu = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /**
         * Color variant for the menu
         * @default "primary"
         */
        variant?: 'primary' | 'secondary' | 'tertiary'
        /**
         * Whether the menu is open
         */
        open?: boolean
        /**
         * Callback when menu open state changes
         */
        onChange?: (open: boolean) => void
        /**
         * For uncontrolled
         */
        defaultOpen?: boolean
        /**
         * Icon for the close button when menu is open
         */
        closeIcon?: React.ReactNode
        /**
         * Icon for the main FAB when menu is closed
         */
        fabIcon?: React.ReactNode
        /**
         * Menu items (max 6 items)
         */
        children?: React.ReactNode
        /**
         * Accessible label for the main FAB
         */
        'aria-label'?: string
    }>
>(function FabMenu(
    {
        variant = 'primary',
        open: open$co,
        onChange,
        defaultOpen = false,
        closeIcon,
        fabIcon,
        children,
        className,
        'aria-label': ariaLabel,
        ...props
    },
    ref,
) {
    const [isOpen, setOpen] = useAutoState(onChange, open$co, defaultOpen)

    const menuRef = useRef<HTMLDivElement>(null)

    // Close menu when clicking outside (only in uncontrolled mode)
    useEventListenerEffect(document, 'mousedown', (event) => {
        // Skip outside click handling in controlled mode to avoid conflicts
        if (!isOpen || open$co !== undefined) return

        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setOpen(false)
        }
    })

    // Limit children to max 6 items
    const childrenArray: Exclude<React.ReactNode, Iterable<React.ReactNode>>[] =
        Array.isArray(children) ? children : children ? [children] : []
    const limitedChildren = childrenArray.slice(0, 6)

    useToggleAnimation(
        menuRef,
        isOpen,
        (el) =>
            el.animate(
                { opacity: ['0.5', '1'] },
                {
                    duration: 250,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                },
            ),
        (el) =>
            el.animate(
                {
                    opacity: ['0.5', '0'],
                    clipPath: ['inset(0)', 'inset(0 16px 0 0)'],
                    transform: ['translateX(0)', 'translateX(16px)'],
                },
                {
                    duration: 100,
                    easing: 'cubic-bezier(0.3, 0, 1, 1)',
                },
            ),
    )

    const fabVariant: React.ComponentProps<typeof Fab>['variant'] =
        variant === 'primary' ? 'surface' : variant

    return (
        <div
            {...props}
            ref={ref}
            className={clsx('sd-fab-menu', className)}
            data-sd={variant}
            data-sd-open={isOpen}
        >
            <div className="sd-fab-menu-container">
                <div ref={menuRef} className="sd-fab-menu-items" role="menu">
                    {limitedChildren.map((child, index) => (
                        <div key={index} className="sd-fab-menu-item-wrapper">
                            {child}
                        </div>
                    ))}
                </div>

                {isOpen ? (
                    <Ripple
                        as="div"
                        onClick={() => setOpen(!isOpen)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setOpen(!isOpen)
                            }
                        }}
                        className="sd-fab-menu-close-button"
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        data-sd={variant}
                        data-sd-open={isOpen}
                        tabIndex={0}
                    >
                        <Icon path={mdiClose} size={1} />
                    </Ripple>
                ) : (
                    <Fab
                        onClick={() => setOpen(!isOpen)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setOpen(!isOpen)
                            }
                        }}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        variant={fabVariant}
                        tabIndex={0}
                    >
                        {fabIcon}
                    </Fab>
                )}
            </div>
        </div>
    )
})
