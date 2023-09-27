import './sheet.scss'
import { Divider } from '../divider'
import { Scrim } from '@/utils/Scrim'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import assign from 'lodash-es/assign'
import { ExtendProps } from '@/utils/type'

/**
 * this component do not have ref forwarded
 * @specs https://m3.material.io/components/side-sheets/specs
 */
export function SideSheet({
    header,
    action,
    children,
    position,
    open,
    onScrimClick,
    portalTo,
    className,
    style,
}: ExtendProps<{
    header?: React.ReactNode
    action?: React.ReactNode
    children?: React.ReactNode
    /**
     * @default left
     */
    position?: 'left' | 'right'
    open?: boolean
    onScrimClick?(): void
    portalTo?: Element | DocumentFragment
}>) {
    const isRight = position === 'right'
    const isOpen = open ?? true
    const translateX = isRight ? '100%' : '-100%'

    const ele = (
        <>
            <Scrim open={isOpen} onClick={() => onScrimClick?.()}></Scrim>
            <div className="sd-side_sheet-scrim">
                <div
                    className={clsx('sd-side_sheet', className)}
                    style={assign(
                        {
                            transition: 'transform 200ms',
                            transform: isOpen
                                ? ''
                                : `translateX(${translateX})`,
                        },
                        style
                    )}
                    data-sd-position={isRight ? 'right' : 'left'}
                >
                    {header && (
                        <div className="sd-side_sheet-header">{header}</div>
                    )}
                    <div className="sd-side_sheet-body">{children}</div>
                    {action && (
                        <div className="sd-side_sheet-action">
                            <Divider style={{ margin: '0' }}></Divider>
                            <div style={{ margin: '16px' }}>{action}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

    if (portalTo) return createPortal(ele, portalTo)
    return ele
}
