import { Portal } from '@/utils/Portal'
import { useLayoutEffect, useRef } from 'react'

/**
 * Based on HTMLDialogElement, this can be a replacement for `<ModalHolder>`
 */
export function DialogHolder({
    teleportTo,
    open,
    ...props
}: React.HTMLProps<HTMLDialogElement> & {
    /**
     * @default document.body
     */
    teleportTo?: Element | DocumentFragment
    open?: boolean
}) {
    const ref = useRef<HTMLDialogElement>(null)
    useLayoutEffect(() => {
        const dialog = ref.current!
        if (open && !dialog.open) {
            dialog.showModal()
            return
        }
        if (!open && dialog.open) {
            dialog.close()
            return
        }
    }, [open])

    return (
        <Portal container={teleportTo ?? document.body}>
            <dialog {...props} ref={ref}>
                <style jsx>{`
                    dialog {
                        border: none;
                        background: transparent;
                        position: fixed;
                        inset: 0;
                        display: block;
                        visibility: hidden;
                        opacity: 0;
                        transform: scale(0.9);
                        transition: 0.2s;
                        overflow: hidden;
                    }
                    dialog[open] {
                        visibility: visible;
                        opacity: 1;
                        transform: scale(1);
                    }
                    dialog:focus {
                        outline: none;
                    }
                `}</style>
                {props.children}
            </dialog>
        </Portal>
    )
}
