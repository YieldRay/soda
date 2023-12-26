//TODO

import { Portal } from '@/utils/Portal'
import clsx from 'clsx'

export function SnackbarHolder({
    children,
    teleportTo,
    span,
}: {
    children?: React.ReactNode
    teleportTo?: Element | DocumentFragment
    inverse?: 'left' | 'center' | 'right'
    /**
     * Span the entire width of the screen
     */
    span?: boolean
}) {
    return (
        <Portal container={teleportTo}>
            <style jsx global>{`
                .sd-snackbar_holder {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 1rem 1.5rem;
                    overflow: hidden;
                }

                .sd-snackbar_holder-span {
                    padding: 0;
                }
                .sd-snackbar_holder-span > .sd-snackbar {
                    border-radius: 0;
                }
                .sd-snackbar_holder .sd-snackbar {
                    display: flex;
                }
            `}</style>
            <div
                className={clsx(
                    'sd-snackbar_holder',
                    span && 'sd-snackbar_holder-span'
                )}
                ref={(el) => {
                    if (!el) return
                    el.onclick = () => hide(el)
                }}
            >
                {children}
            </div>
        </Portal>
    )
}

function show(el: HTMLElement) {
    const { height } = el.getBoundingClientRect()
    el.animate(
        {
            clipPath: [
                `inset(${height * 0.666 + 'px'} 0 0 0)`,
                `inset(0 0 0 0)`,
            ],
            translate: [`0 ${height * 0.333}px`, '0 0'],
        },
        {
            duration: 900,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
        }
    )
}

function hide(el: HTMLElement) {
    const { height } = el.getBoundingClientRect()
    el.animate(
        {
            translate: ['0 0', `0 ${height * 0.333}px`],
            opacity: ['1', '0'],
        },
        {
            duration: 400,
            easing: 'cubic-bezier(0, 0, 0, 1)',
        }
    )
}
