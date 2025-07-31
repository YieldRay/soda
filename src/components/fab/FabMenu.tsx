import './fab-menu.scss'
import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingPortal,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useRole,
    useTransitionStyles,
    useTypeahead,
} from '@floating-ui/react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { createContext, forwardRef, useContext, useRef, useState } from 'react'
import { Ripple } from '@/ripple/Ripple'
import { ExtendProps } from '@/utils/type'

const FabMenuContext = createContext<{
    getItemProps: (
        userProps?: React.HTMLProps<HTMLElement>,
    ) => Record<string, unknown>
    activeIndex: number | null
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    isOpen: boolean
    variant: 'primary' | 'secondary' | 'tertiary'
}>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    isOpen: false,
    variant: 'primary',
})

export interface FabMenuProps {
    /**
     * FAB trigger element
     */
    children: React.ReactNode
    /**
     * Menu items
     */
    items: React.ReactNode[]
    /**
     * @default "primary"
     */
    variant?: 'primary' | 'secondary' | 'tertiary'
    /**
     * FAB size affects menu positioning
     * @default "default"
     */
    fabSize?: 'default' | 'small' | 'large'
    /**
     * Control open state
     */
    open?: boolean
    /**
     * Handle open state change
     */
    onOpenChange?: (open: boolean) => void
    /**
     * Default open state
     */
    defaultOpen?: boolean
}

/**
 * FAB Menu - A floating action button menu that opens from a FAB to display multiple related actions
 * 
 * @specs https://m3.material.io/components/floating-action-button/specs
 */
export const FabMenu = forwardRef<
    HTMLElement,
    ExtendProps<FabMenuProps>
>(function FabMenu(
    {
        children,
        items,
        variant = 'primary',
        fabSize = 'default',
        open: controlledOpen,
        onOpenChange,
        defaultOpen = false,
        className,
        ...props
    },
    _ref,
) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
    const setIsOpen = (open: boolean) => {
        if (controlledOpen === undefined) {
            setUncontrolledOpen(open)
        }
        onOpenChange?.(open)
    }

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const elementsRef = useRef<Array<HTMLElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])

    // Calculate offset based on FAB size
    const getOffset = () => {
        switch (fabSize) {
            case 'small':
                return { mainAxis: -48, alignmentAxis: -8 } // 40dp FAB -> align close button higher
            case 'large':
                return { mainAxis: -96, alignmentAxis: -20 } // 96dp FAB -> align close button much higher
            default:
                return { mainAxis: -64, alignmentAxis: -8 } // 56dp FAB -> align close button at same level
        }
    }

    const { floatingStyles, refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top-end',
        middleware: [
            offset(getOffset()),
            flip(),
            shift({ padding: 16 }),
        ],
        whileElementsMounted: autoUpdate,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context, { bubbles: true })
    const role = useRole(context, { role: 'menu' })
    const listNavigation = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        onNavigate: setActiveIndex,
    })
    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        onMatch: setActiveIndex,
        activeIndex,
    })

    const { styles, isMounted } = useTransitionStyles(context, {
        duration: {
            open: 300,
            close: 200,
        },
        initial: {
            opacity: 0,
            transform: 'scale(0.8) translateY(8px)',
        },
        open: {
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
        },
        close: {
            opacity: 0,
            transform: 'scale(0.8) translateY(8px)',
        },
    })

    const { getReferenceProps, getFloatingProps, getItemProps } =
        useInteractions([click, dismiss, role, listNavigation, typeahead])

    return (
        <FabMenuContext.Provider
            value={{
                activeIndex,
                setActiveIndex,
                getItemProps,
                isOpen,
                variant,
            }}
        >
            <div
                {...props}
                ref={refs.setReference}
                className={clsx('sd-fab-menu-trigger', className)}
                {...getReferenceProps()}
            >
                {children}
            </div>

            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {isMounted && (
                    <FloatingPortal>
                        <FloatingFocusManager
                            context={context}
                            modal={false}
                            initialFocus={0}
                            returnFocus
                        >
                            <div
                                ref={refs.setFloating}
                                className={clsx('sd-fab-menu', `sd-fab-menu--${variant}`)}
                                style={{ ...floatingStyles, ...styles }}
                                {...getFloatingProps()}
                            >
                                {/* Close button */}
                                <Ripple
                                    as="button"
                                    className="sd-fab-menu-close"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <Icon path={mdiClose} size="20px" />
                                </Ripple>

                                {/* Menu items */}
                                <div className="sd-fab-menu-items">
                                    {items}
                                </div>
                            </div>
                        </FloatingFocusManager>
                    </FloatingPortal>
                )}
            </FloatingList>
        </FabMenuContext.Provider>
    )
})

export interface FabMenuItemProps {
    /**
     * Icon for the menu item
     */
    icon: React.ReactNode
    /**
     * Label text for the menu item
     */
    children: React.ReactNode
    /**
     * Disabled state
     */
    disabled?: boolean
    /**
     * Click handler
     */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

/**
 * Menu item for FAB Menu
 */
export const FabMenuItem = forwardRef<
    HTMLElement,
    ExtendProps<FabMenuItemProps>
>(function FabMenuItem(
    {
        icon,
        children,
        disabled,
        onClick,
        className,
        ...props
    },
    forwardedRef,
) {
    const menu = useContext(FabMenuContext)

    return (
        <Ripple
            {...props}
            ref={forwardedRef}
            as="button"
            className={clsx('sd-fab-menu-item', className)}
            data-sd-variant={menu.variant}
            data-sd-disabled={disabled}
            aria-disabled={disabled}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            {...menu.getItemProps({
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    if (!disabled) {
                        onClick?.(event)
                    }
                },
            })}
        >
            <div className="sd-fab-menu-item-icon">
                {icon}
            </div>
            <div className="sd-fab-menu-item-label">
                {children}
            </div>
        </Ripple>
    )
})