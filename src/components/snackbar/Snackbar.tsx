import './snackbar.scss'
import clsx from 'clsx'
import { ActionButton } from '@/composition/ActionButton'
import { ExtendProps } from '@/utils/type'
import { useRef } from 'react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { Portal } from '@/utils/Portal'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'

/**
 * This component DO NOT have ref forwarded
 *
 * @specs https://m3.material.io/components/snackbar/specs
 */
export function Snackbar({
    action,
    onCloseClick,
    onActionClick,
    thirdLine,
    placement = 'left',
    full = false,
    open = false,
    fixed = false,
    teleportTo,
    className,
    children,
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
    /**
     * See `fixed`
     */
    open?: boolean
    teleportTo?: Element | DocumentFragment
    /**
     * Position of the `fixed` snackbar, has no effect for compact screen (width<600px) and `full`
     */
    placement?: 'left' | 'center' | 'right'
    /**
     * Make the `fixed` snackbar spans full width of the screen
     */
    full?: boolean
}>) {
    const ref = useRef<HTMLDivElement>(null)

    useToggleAnimation(ref, open, {
        show(el) {
            const { height } = el.getBoundingClientRect()
            return el.animate(
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
        },
        hide(el) {
            const { height } = el.getBoundingClientRect()
            return el.animate(
                {
                    translate: ['0 0', `0 ${height * 0.333}px`],
                    opacity: ['1', '0'],
                },
                {
                    duration: 300,
                    easing: 'cubic-bezier(0, 0, 0, 1)',
                }
            )
        },
    })

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
                <div
                    className={clsx(
                        'sd-snackbar_holder',
                        full
                            ? 'sd-snackbar_holder-full'
                            : `sd-snackbar_holder-placement_${placement}`
                    )}
                    ref={ref}
                >
                    {snackbar}
                </div>
            </Portal>
        )

    return snackbar
}
