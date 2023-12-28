import './snackbar.scss'
import clsx from 'clsx'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'
import { useEffect, useRef } from 'react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { Portal } from '@/utils/Portal'

/**
 * This component DO NOT have ref forwarded
 *
 * @specs https://m3.material.io/components/snackbar/specs
 */
export function Snackbar({
    action,
    onCloseClick,
    className,
    children,
    onActionClick,
    thirdLine,
    fixed,
    open,
    teleportTo,
    full,
    ...props
}: ExtendProps<{
    children?: React.ReactNode
    action?: React.ReactNode
    onCloseClick?: VoidFunction
    onActionClick?: VoidFunction
    thirdLine?: boolean
    /**
     * When enable `fixed`, you can toggle `open` property to
     * open and hide the SideSheet without any help of other component
     */
    fixed?: boolean
    open?: boolean
    teleportTo?: Element | DocumentFragment
    // placement?: 'left' | 'center' | 'right'
    /**
     * Span the entire width of the screen
     */
    full?: boolean
}>) {
    const ref = useRef<HTMLDivElement>(null)
    const isFirstRun = useRef(true)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        if (isFirstRun.current) {
            isFirstRun.current = false
            if (!open) el.style.display = 'none'
            return
        }

        if (open) {
            show(el)
        } else {
            hide(el)
        }
    }, [open])

    const snackbar = (
        <div
            {...props}
            className={clsx('sd-snackbar', className)}
            data-sd-third_line={thirdLine}
        >
            <div className="sd-snackbar-supporting_text">{children}</div>
            {action && (
                <ActionButton
                    className="sd-snackbar-action"
                    inverse
                    onClick={() => onActionClick?.()}
                >
                    {action}
                </ActionButton>
            )}
            {onCloseClick && (
                <ActionButton
                    inverse
                    className="sd-snackbar-icon"
                    onClick={() => onCloseClick()}
                >
                    <Icon path={mdiClose} />
                </ActionButton>
            )}
        </div>
    )

    if (fixed)
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

                    .sd-snackbar_holder-full {
                        padding: 0;
                    }
                    .sd-snackbar_holder-full > .sd-snackbar {
                        border-radius: 0;
                    }
                    .sd-snackbar_holder .sd-snackbar {
                        display: flex;
                    }
                `}</style>
                <div
                    className={clsx(
                        'sd-snackbar_holder',
                        full && 'sd-snackbar_holder-full'
                    )}
                    ref={ref}
                >
                    {snackbar}
                </div>
            </Portal>
        )

    return snackbar
}

function show(el: HTMLElement) {
    el.getAnimations().forEach((a) => a.cancel())
    el.style.display = ''
    const { height } = el.getBoundingClientRect()
    const a = el.animate(
        {
            clipPath: [
                `inset(${height * 0.666 + 'px'} 0 0 0)`,
                `inset(0 0 0 0)`,
            ],
            translate: [`0 ${height * 0.333}px`, '0 0'],
        },
        {
            duration: 600,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
        }
    )
    a.onfinish = () => (el.style.display = '')
}

function hide(el: HTMLElement) {
    el.getAnimations().forEach((a) => a.cancel())
    const { height } = el.getBoundingClientRect()
    const a = el.animate(
        {
            translate: ['0 0', `0 ${height * 0.333}px`],
            opacity: ['1', '0'],
        },
        {
            duration: 300,
            easing: 'cubic-bezier(0, 0, 0, 1)',
        }
    )
    a.onfinish = () => (el.style.display = 'none')
}
