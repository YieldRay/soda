import clsx from 'clsx'
import './ModalHolder.scss'
import { Scrim } from './Scrim'
import { Portal } from '@/utils/Portal'
import { useEffect } from 'react'

/**
 * Provide a clickable scrim to document.body and hold single child.
 * Currently only a utility for `<Dialog>` component
 */
export function ModalHolder({
    open,
    onScrimClick,
    onEscape,
    zIndex,
    teleportTo,
    children,
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
     * Most of the case you want toggle `open` to false
     */
    onEscape?: VoidFunction
    /**
     * @default document.body
     */
    teleportTo?: Element | DocumentFragment
    zIndex?: number
}) {
    useEffect(() => {
        if (!onEscape) return
        const onKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onEscape()
            }
        }
        window.addEventListener('keydown', onKeydown)
        return () => window.removeEventListener('keydown', onKeydown)
    }, [onEscape])

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
