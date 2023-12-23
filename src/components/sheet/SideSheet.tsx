import './sheet.scss'
import clsx from 'clsx'
import { Divider } from '../divider'
import { Scrim } from '@/composition/Scrim'
import { ExtendProps } from '@/utils/type'
import { Portal } from '@/utils/Portal'

/**
 * This component DO NOT have ref forwarded
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
    footer?: React.ReactNode
    /**
     * When enable `fixed`, you can toggle `open` property to
     * open and hide the SideSheet without any help of other component
     */
    fixed?: boolean
    /**
     * Only works if `fixed` set to true
     * @default left
     */
    position?: 'left' | 'right'
    /**
     * Only works if `fixed` set to true
     * @default false
     */
    open?: boolean
    /**
     * Only works if `fixed` set to true
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
