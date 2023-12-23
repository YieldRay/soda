import clsx from 'clsx'
import './ModalHolder.scss'
import { Scrim } from './Scrim'
import { Portal } from '@/utils/Portal'

/**
 * Provide a clickable scrim to document.body and hold single child.
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
    /**
     * Most of the case you want toggle `open` to false
     */
    onScrimClick?: VoidFunction
    /**
     * @default document.body
     */
    teleportTo?: Element | DocumentFragment
    zIndex?: number
}) {
    return (
        <Portal container={teleportTo ?? document.body}>
            <Scrim open={open} />
            <div
                className={clsx(
                    'sd-modal_holder',
                    open && 'sd-modal_holder-open'
                )}
                style={{ zIndex }}
                onClick={(e) => {
                    if (
                        onScrimClick &&
                        (e.target as HTMLDivElement).classList.contains(
                            'sd-modal_holder'
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
