import './sheet.scss'
import { Divider } from '../divider'
import { Scrim } from '@/utils/Scrim'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { Portal } from '@/utils/Portal'

/**
 * This component do not have ref forwarded
 * @specs https://m3.material.io/components/side-sheets/specs
 */
export function SideSheet({
    header,
    footer,
    children,
    position,
    open,
    onScrimClick,
    teleportTo,
    className,
    style,
    fixed,
}: ExtendProps<{
    header?: React.ReactNode
    children?: React.ReactNode
    /**
     * @default left
     */
    footer?: React.ReactNode
    position?: 'left' | 'right'
    open?: boolean
    onScrimClick?(): void
    teleportTo?: Element | DocumentFragment
    fixed?: boolean
}>) {
    const isRight = position === 'right'
    const isOpen = open ?? true
    const translateX = isRight ? '100%' : '-100%'

    const sideSheet = (
        <div
            className={clsx('sd-side_sheet', className)}
            style={
                fixed
                    ? {
                          transform: isOpen ? '' : `translateX(${translateX})`,
                          ...style,
                      }
                    : style
            }
            data-sd-position={isRight ? 'right' : 'left'}
        >
            {header && <div className="sd-side_sheet-header">{header}</div>}
            <div className="sd-side_sheet-body">{children}</div>
            {footer && (
                <div className="sd-side_sheet-footer">
                    <Divider />
                    <div className="sd-side_sheet-footer_content">{footer}</div>
                </div>
            )}
        </div>
    )

    if (fixed)
        return (
            <Portal container={teleportTo}>
                <Scrim open={isOpen} onClick={() => onScrimClick?.()}></Scrim>
                <div className="sd-side_sheet-scrim">{sideSheet}</div>
            </Portal>
        )

    return sideSheet
}
