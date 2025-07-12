import './snackbar.scss'
import clsx from 'clsx'
import { useCallback, useRef } from 'react'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { ActionButton } from '@/composition/ActionButton'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { ExtendProps } from '@/utils/type'

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
    zIndex = 1,
    inset = 'auto 0 0',
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
     * open and hide the Snackbar without any help of other component
     *
     * See also `open` `zIndex` `inset`
     */
    fixed?: boolean
    /**
     * CSS `z-index`, if `fixed` set to `true`
     *
     * @default 2
     */
    zIndex?: number
    /**
     * CSS `inset`, if `fixed` set to `true`
     */
    inset?: string
    /**
     * See `fixed`
     */
    open?: boolean
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

    useToggleAnimation(
        ref,
        open,
        useCallback((el) => {
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
                },
            )
        }, []),
        useCallback((el) => {
            const { height } = el.getBoundingClientRect()
            return el.animate(
                {
                    translate: ['0 0', `0 ${height * 0.333}px`],
                    opacity: ['1', '0'],
                },
                {
                    duration: 300,
                    easing: 'cubic-bezier(0, 0, 0, 1)',
                },
            )
        }, []),
    )

    const snackbar = (
        <div
            {...props}
            className={clsx('sd-snackbar', className)}
            data-sd-third_line={thirdLine}
            role="alert"
            aria-live="polite"
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
                    <Icon size={1} path={mdiClose} />
                </ActionButton>
            )}
        </div>
    )

    if (fixed)
        return (
            <div
                ref={ref}
                className={clsx(
                    'sd-snackbar_holder',
                    full
                        ? 'sd-snackbar_holder-full'
                        : `sd-snackbar_holder-placement_${placement}`,
                )}
                style={{ position: 'fixed', zIndex, inset }}
            >
                {snackbar}
            </div>
        )

    return snackbar
}
