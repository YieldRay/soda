import './sheet.scss'
import { Divider } from '../divider'
import { Scrim } from '@/utils/Scrim'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import assign from 'lodash-es/assign'

/**
 * this component do not have ref forwarded
 * @specs https://m3.material.io/components/side-sheets/specs
 */
export function SideSheet(props: {
    header?: React.ReactNode
    action?: React.ReactNode
    children?: React.ReactNode
    /**
     * @default left
     */
    position?: 'left' | 'right'
    open?: boolean
    onScrimClick?(): void
    className?: string
    style?: React.CSSProperties
    portalTo?: Element | DocumentFragment
}) {
    const isRight = props.position === 'right'
    const isOpen = props.open ?? true
    const translateX = isRight ? '100%' : '-100%'

    const ele = (
        <>
            <Scrim open={isOpen} onClick={() => props.onScrimClick?.()}></Scrim>
            <div className="sd-side_sheet-scrim">
                <div
                    className={clsx('sd-side_sheet', props.className)}
                    style={assign(
                        {
                            transition: 'transform 200ms',
                            transform: isOpen
                                ? ''
                                : `translateX(${translateX})`,
                        },
                        props.style
                    )}
                    data-sd-position={isRight ? 'right' : 'left'}
                >
                    {props.header && (
                        <div className="sd-side_sheet-header">
                            {props.header}
                        </div>
                    )}
                    <div className="sd-side_sheet-body">{props.children}</div>
                    {props.action && (
                        <div className="sd-side_sheet-action">
                            <Divider style={{ margin: '0' }}></Divider>
                            <div style={{ margin: '16px' }}>{props.action}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

    if (props.portalTo) return createPortal(ele, props.portalTo)
    return ele
}
