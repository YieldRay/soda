import { Scrim } from '@/utils/Scrim'
import { Portal } from '@/utils/Portal'

/**
 * Provide a clickable scrim to document.body and hold the children.
 * Currently only a utility for `<Dialog>` component
 */
export function ModalHolder({
    open,
    children,
    onScrimClick,
    teleportTo,
    zIndex,
}: {
    open?: boolean
    /**
     * Children must has `position: fixed`
     */
    children?: React.ReactNode
    onScrimClick?: () => void
    /**
     * @default document.body
     */
    teleportTo?: Element | DocumentFragment
    zIndex?: number
}) {
    return (
        <Portal container={teleportTo ?? document.body}>
            <style jsx>
                {`
                    .sd-modal-holder {
                        position: fixed;
                        inset: 0;
                        box-sizing: border-box;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 200ms;
                        background: transparent;
                    }
                `}
            </style>
            <Scrim open={open} />
            <div
                className="sd-modal-holder"
                style={{
                    pointerEvents: open ? 'auto' : 'none',
                    opacity: open ? '1' : '0',
                    zIndex,
                }}
                onClick={(e) => {
                    if (
                        onScrimClick &&
                        (e.target as HTMLDivElement).classList.contains(
                            'sd-modal-holder'
                        )
                    )
                        onScrimClick()
                }}
            >
                {children}
            </div>
        </Portal>
    )
}
