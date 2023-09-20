import './sheet.scss'
import { Divider } from '../divider/Divider'

export function SideSheet(props: {
    header?: React.ReactNode
    action?: React.ReactNode
    children?: React.ReactNode
    /**
     * default right
     */
    position?: 'left' | 'right'
    open?: boolean
    onScrimClick?(): void
}) {
    const isRight = props.position !== 'left'
    const isOpen = props.open
    const translateX = isRight ? '100%' : '-100%'

    return (
        <>
            <div
                style={{
                    background: 'rgb(0 0 0 / 0.1)',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    pointerEvents: 'none',
                    opacity: isOpen ? '1' : '0',
                    transition: 'opacity linear 200ms',
                }}
            ></div>

            <div
                className="sd-side_sheet-scrim"
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
                onClick={(e) => {
                    if (
                        props.onScrimClick &&
                        (e.target as HTMLElement).classList.contains(
                            'sd-side_sheet-scrim',
                        )
                    )
                        props.onScrimClick()
                }}
            >
                <div
                    className="sd-side_sheet"
                    style={{
                        transition: 'transform 200ms',
                        transform: isOpen ? '' : `translateX(${translateX})`,
                    }}
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
}
