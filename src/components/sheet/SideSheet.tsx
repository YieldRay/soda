import './sheet.scss'
import clsx from 'clsx'
import { Divider } from '../divider'
import { Scrim } from '@/composition/Scrim'
import { ExtendProps } from '@/utils/type'
import { Portal } from '@/utils/Portal'
import { useToggleAnimation } from '@/hooks/use-toggle-animation'
import { useRef } from 'react'

/**
 * This component DO NOT have ref forwarded.
 *
 * Note that the standard SideSheet requires additional css to make things work (see example),
 * while the modal one does not. Simply toggle the `open` property to show and hide (default is hide).
 *
 * @specs https://m3.material.io/components/side-sheets/specs
 */
export function SideSheet({
    header,
    footer,
    children,
    position = 'right',
    open = false,
    modal,
    onScrimClick,
    teleportTo,
    zIndex,
    className,
    ...props
}: ExtendProps<{
    open?: boolean
    header?: React.ReactNode
    children?: React.ReactNode
    footer?: React.ReactNode
    /**
     * When enable `modal`, you can toggle `open` property to
     * open and hide the SideSheet without any help of other component
     */
    modal?: boolean
    /**
     * Position of the sheet, default `right`
     */
    position?: 'left' | 'right'
    /**
     * Only works if `modal` set to true
     *
     * Most of the case you want toggle `open` to false
     */
    onScrimClick?(): void
    /**
     * Only works if `fixed` set to true
     *
     * Element that has `position:fixed` will positioned relative
     * to it's containing block (will be viewport if no containing block)
     *
     * To force the position relative to viewport you can set teleportTo
     * to `document.body`
     */
    teleportTo?: Element | DocumentFragment
    zIndex?: number
}>) {
    const ref = useRef<HTMLDivElement>(null)
    useToggleAnimation(ref, open, {
        show(el) {
            if (modal)
                return el.animate(
                    {
                        translate: [
                            `${position === 'left' ? '-100%' : '100%'} 0`,
                            '0 0',
                        ],
                    },
                    {
                        duration: 400,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    }
                )

            // standard
            const { width } = el.getBoundingClientRect()
            return el.animate(
                {
                    clipPath: [
                        position === 'left'
                            ? 'inset(0 100% 0 0)'
                            : 'inset(0 0 0 100%)',
                        'inset(0 0 0 0)',
                    ],
                    width: [0, width],
                },
                {
                    duration: 200,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                }
            )
        },
        hide(el) {
            if (modal)
                return el.animate(
                    {
                        translate: [
                            '0 0',
                            `${position === 'left' ? '-100%' : '100%'} 0`,
                        ],
                    },
                    {
                        duration: 250,
                        easing: 'cubic-bezier(0.2, 0, 0, 1)',
                    }
                )

            // standard
            const { width } = el.getBoundingClientRect()
            return el.animate(
                {
                    clipPath: [
                        'inset(0 0 0 0)',
                        position === 'left'
                            ? 'inset(0 100% 0 0)'
                            : 'inset(0 0 0 100%)',
                    ],
                    width: [width, 0],
                },
                {
                    duration: 200,
                    easing: 'cubic-bezier(0.2, 0, 0, 1)',
                }
            )
        },
    })

    const sheet = (
        <div
            {...props}
            ref={ref}
            className={clsx(
                'sd-side_sheet',
                modal ? 'sd-side_sheet_modal' : 'sd-side_sheet_standard',
                className
            )}
            data-sd-position={position}
        >
            {header && <div className="sd-side_sheet-header">{header}</div>}
            <div className="sd-side_sheet-body">{children}</div>
            {footer && (
                <div className="sd-side_sheet-footer">
                    <Divider />
                    <div className="sd-side_sheet-footer_content">{footer}</div>
                </div>
            )}
        </div>
    )

    if (modal)
        return (
            <Portal container={teleportTo}>
                <Scrim open={open} onClick={() => onScrimClick?.()} />
                <div className="sd-side_sheet-scrim" style={{ zIndex }}>
                    {sheet}
                </div>
            </Portal>
        )

    return sheet
}
