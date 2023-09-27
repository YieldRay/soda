import { createPortal } from 'react-dom'

export function DialogHolder(
    props: React.HTMLProps<HTMLDialogElement> & {
        /**
         * @default document.body
         */
        portalTo?: Element | DocumentFragment
    }
) {
    const portalTo = props.portalTo ?? document.body

    const ele = (
        <dialog {...props}>
            <style jsx>{`
                dialog {
                    border: none;
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
    return createPortal(ele, portalTo)
}
