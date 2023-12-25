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
                .sd-snakebar_holder {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 1rem 1.5rem;
                    overflow: hidden;
                }

                .sd-snakebar_holder-span {
                    padding: 0;
                }
                .sd-snakebar_holder-span > .sd-snakebar {
                    border-radius: 0;
                }
                .sd-snakebar_holder .sd-snakebar {
                    display: flex;
                }
            `}</style>
            <div
                className={clsx(
                    'sd-snakebar_holder',
                    span && 'sd-snakebar_holder-span'
                )}
                ref={(el) => {
                    if (!el) return

                    const { height } = el.getBoundingClientRect()
                    el.onclick = () =>
                        el.animate(
                            {
                                clipPath: [
                                    `inset(${height * 0.75 + 'px'} 0 0 0)`,
                                    `inset(0 0 0 0)`,
                                ],
                            },
                            {
                                duration: 9000,
                                easing: 'cubic-bezier(0,1,0,1)',
                            }
                        )
                }}
            >
                {children}
            </div>
        </Portal>
    )
}
