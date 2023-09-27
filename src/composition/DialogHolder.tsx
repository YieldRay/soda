import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function DialogHolder({
    portalTo,
    open,
    ...props
}: React.HTMLProps<HTMLDialogElement> & {
    /**
     * @default document.body
     */
    portalTo?: Element | DocumentFragment
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

    const ele = (
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
    )
    return createPortal(ele, portalTo ?? document.body)
}
