import './FabMenu.scss'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { Fab } from '@/components/fab'
import { Scrim } from '../Scrim'
import { SodaTransition } from '../SodaTransition'
import { ExtendProps } from '@/utils/type'

export interface FabMenuAction {
    icon: React.ReactNode
    label?: string
    onClick?: () => void
    disabled?: boolean
    variant?: 'surface' | 'secondary' | 'tertiary'
}

/**
 * FAB Menu (Speed Dial) - displays a main FAB that expands to show a list of action items
 * 
 * @specs https://m3.material.io/components/floating-action-button/overview
 */
export const FabMenu = forwardRef<
    HTMLDivElement,
    ExtendProps<{
        /** Main FAB icon */
        icon: React.ReactNode
        /** Alternative icon when menu is open (defaults to close icon) */
        iconOpen?: React.ReactNode
        /** Array of action items */
        actions: FabMenuAction[]
        /** Position of the menu relative to trigger */
        position?: 'top' | 'bottom' | 'left' | 'right'
        /** Main FAB variant */
        variant?: 'surface' | 'secondary' | 'tertiary'
        /** Main FAB size */
        size?: 'default' | 'small' | 'large'
        /** Whether menu is controlled externally */
        open?: boolean
        /** Callback when menu open state changes */
        onOpenChange?: (open: boolean) => void
        /** Callback when menu is closed */
        onClose?: () => void
        /** Whether to show backdrop/scrim */
        showBackdrop?: boolean
        /** Whether menu is disabled */
        disabled?: boolean
        /** Whether to show labels for action items */
        showLabels?: boolean
    }>
>(function FabMenu(
    {
        icon,
        iconOpen,
        actions,
        position = 'top',
        variant = 'surface',
        size = 'default',
        open: controlledOpen,
        onOpenChange,
        onClose,
        showBackdrop = true,
        disabled = false,
        showLabels = false,
        className,
        style,
        ...props
    },
    ref,
) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : internalOpen

    const handleToggle = () => {
        if (disabled) return
        
        const newOpen = !isOpen
        if (!isControlled) {
            setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
        if (!newOpen) {
            onClose?.()
        }
    }

    const handleActionClick = (action: FabMenuAction) => {
        if (action.disabled) return
        
        action.onClick?.()
        
        // Close menu after action
        if (!isControlled) {
            setInternalOpen(false)
        }
        onOpenChange?.(false)
        onClose?.()
    }

    const handleBackdropClick = () => {
        if (!isControlled) {
            setInternalOpen(false)
        }
        onOpenChange?.(false)
        onClose?.()
    }

    // Default close icon if no iconOpen provided
    const closeIcon = iconOpen || (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    )

    return (
        <>
            {showBackdrop && (
                <Scrim
                    open={isOpen}
                    onScrimClick={handleBackdropClick}
                    zIndex={999}
                    duration={200}
                />
            )}
            
            <div
                {...props}
                ref={ref}
                className={clsx('sd-fab-menu', className)}
                style={style}
                data-sd-position={position}
                data-sd-open={isOpen}
            >
                {/* Action items */}
                <div className={clsx('sd-fab-menu_actions', `sd-fab-menu_actions--${position}`)}>
                    {actions.map((action, index) => (
                        <SodaTransition
                            key={index}
                            in={isOpen}
                            appear
                            style={{
                                transitionDelay: `${index * 50}ms`,
                            }}
                            entering={{
                                opacity: 0,
                                transform: position === 'top' ? 'translateY(20px) scale(0.8)' :
                                         position === 'bottom' ? 'translateY(-20px) scale(0.8)' :
                                         position === 'left' ? 'translateX(20px) scale(0.8)' :
                                         'translateX(-20px) scale(0.8)',
                            }}
                            entered={{
                                opacity: 1,
                                transform: 'translateY(0) translateX(0) scale(1)',
                            }}
                            exiting={{
                                opacity: 1,
                                transform: 'translateY(0) translateX(0) scale(1)',
                            }}
                            exited={{
                                opacity: 0,
                                transform: position === 'top' ? 'translateY(20px) scale(0.8)' :
                                         position === 'bottom' ? 'translateY(-20px) scale(0.8)' :
                                         position === 'left' ? 'translateX(20px) scale(0.8)' :
                                         'translateX(-20px) scale(0.8)',
                            }}
                        >
                            <div className="sd-fab-menu_action">
                                {showLabels && action.label && (
                                    <div className="sd-fab-menu_label">
                                        {action.label}
                                    </div>
                                )}
                                <Fab
                                    variant={action.variant || 'surface'}
                                    size="small"
                                    disabled={action.disabled}
                                    onClick={() => handleActionClick(action)}
                                >
                                    {action.icon}
                                </Fab>
                            </div>
                        </SodaTransition>
                    ))}
                </div>

                {/* Main trigger FAB */}
                <Fab
                    variant={variant}
                    size={size}
                    disabled={disabled}
                    onClick={handleToggle}
                    className="sd-fab-menu_trigger"
                >
                    <SodaTransition
                        in={isOpen}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        entering={{ opacity: 1, transform: 'rotate(0deg)' }}
                        entered={{ opacity: 0, transform: 'rotate(45deg)' }}
                        exiting={{ opacity: 0, transform: 'rotate(45deg)' }}
                        exited={{ opacity: 1, transform: 'rotate(0deg)' }}
                    >
                        {icon}
                    </SodaTransition>
                    <SodaTransition
                        in={isOpen}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        entering={{ opacity: 0, transform: 'rotate(-45deg)' }}
                        entered={{ opacity: 1, transform: 'rotate(0deg)' }}
                        exiting={{ opacity: 1, transform: 'rotate(0deg)' }}
                        exited={{ opacity: 0, transform: 'rotate(-45deg)' }}
                    >
                        {closeIcon}
                    </SodaTransition>
                </Fab>
            </div>
        </>
    )
})