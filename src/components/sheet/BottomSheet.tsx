import './sheet.scss'
import clsx from 'clsx'
import {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { Scrim } from '@/composition/Scrim'
import { ExtendProps } from '@/utils/type'

export type BottomSheetHandle = ReturnType<typeof attachDragEvent>

/**
 * This component DO NOT have ref forwarded.
 *
 * This component use ref to control show and hide,
 * you can call `ref.current.show()` to show and `ref.current.hide()` to hide
 *
 * @specs https://m3.material.io/components/bottom-sheets/specs
 */
export const BottomSheet = forwardRef<
    BottomSheetHandle,
    ExtendProps<{
        children?: React.ReactNode
        /**
         * Hide the drag handle element, this make
         * the entire bottom sheet draggable
         */
        hideDragHandle?: boolean
        /**
         * Set fixed to true allow you toggle show and hide via ref
         *
         * See also `onScrimClick` `zIndex`
         */
        fixed?: boolean
        /**
         * CSS `z-index`, if `fixed` set to `true`
         *
         * @default 3
         */
        zIndex?: number
        /**
         * Only works if `fixed` set to true
         */
        onChange?: (visible: boolean) => void
        /**
         * Only works if `fixed` set to true
         *
         * Most of the case you want call `ref.current.close()`
         */
        onScrimClick?(): void
    }>
>(function BottomSheet(
    {
        hideDragHandle,
        onChange,
        onScrimClick,
        fixed,
        zIndex = 3,
        style,
        className,
        children,
        ...props
    },
    ref,
) {
    const sheetRef = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)

    const dragHandlerRef = useRef<ReturnType<typeof attachDragEvent> | null>(
        null,
    )
    const [visible, setVisible] = useState(false) // = isOpen

    // useLayoutEffect() rather than useEffect()
    // this make sure ref.current exists in useImperativeHandle()
    useLayoutEffect(() => {
        // do nothing if not fixed
        if (!fixed) return
        const sheet = sheetRef.current!
        const handle = hideDragHandle ? sheet : handleRef.current!
        const handler = attachDragEvent(sheet, handle, {
            onShow() {
                setVisible(true)
                onChange?.(true)
            },
            onHide() {
                setVisible(false)
                onChange?.(false)
            },
        })
        dragHandlerRef.current = handler
        return handler.cleanup
    }, [fixed, onChange, hideDragHandle])

    useImperativeHandle(ref, () => dragHandlerRef.current!)

    const bottomSheet = (
        <div
            {...props}
            className={clsx('sd-bottom_sheet', className)}
            ref={fixed ? sheetRef : null}
            style={{
                transform: fixed ? 'translateY(100%)' : undefined,
                ...style,
            }}
        >
            {!hideDragHandle && (
                <div
                    className="sd-bottom_sheet-drag_handle"
                    ref={fixed ? handleRef : null}
                />
            )}
            <div className="sd-bottom_sheet-content">{children}</div>
        </div>
    )

    if (fixed)
        return (
            <Scrim
                open={visible}
                zIndex={zIndex}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Escape' && onScrimClick?.()}
                onScrimClick={onScrimClick}
                className="sd-bottom_sheet-scrim"
            >
                {bottomSheet}
            </Scrim>
        )

    return bottomSheet
})

function attachDragEvent(
    sheet: HTMLDivElement,
    dragHandle: HTMLDivElement,
    options?: {
        onShow?(): void
        onHide?(): void
    },
) {
    /**
     * do not capture pointer when the dragHandle is the entire sheet (when `hideDragHandle` set to true),
     * this is because the children of the sheet may want to capture the pointer,
     * for example, the <Ripple> element
     */
    const hideDragHandle = sheet === dragHandle
    let isDragging = false
    let translateY = 0 // previous translateY in px
    let initY = 0
    let pointerDownTime: number

    sheet.dataset.sdState = 'hide'

    const hide = () => {
        if (hideDragHandle && sheet.dataset.sdState !== 'show') return
        const { height } = sheet.getBoundingClientRect() // the sheet height

        sheet.dataset.sdState = 'hiding'
        const animation = sheet.animate(
            [{ transform: `translateY(${height}px)` }],
            {
                duration: 200,
                easing: 'cubic-bezier(0.3, 0, 1, 1)',
            },
        )
        animation.id = 'hide'
        animation.onfinish = animation.oncancel = () => {
            sheet.style.transform = `translateY(${height}px)`
            sheet.dataset.sdState = 'hide'
        }
        translateY = height

        options?.onHide?.()
    }

    const show = () => {
        if (hideDragHandle && sheet.dataset.sdState !== 'hide') return
        sheet.dataset.sdState = 'showing'
        const animation = sheet.animate([{ transform: `translateY(0)` }], {
            duration: 300,
            easing: 'cubic-bezier(0, 0, 0, 1)',
        })
        animation.id = 'show'
        animation.onfinish = animation.oncancel = () => {
            sheet.style.transform = `translateY(0)`
            sheet.dataset.sdState = 'show'
        }
        translateY = 0

        options?.onShow?.()
    }

    const onPointerDown = (e: PointerEvent) => {
        if (!hideDragHandle) dragHandle.setPointerCapture(e.pointerId)
        isDragging = true
        initY = e.clientY
        pointerDownTime = Date.now()
    }

    const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return
        const currY = e.clientY
        const distanceY = currY - initY
        const nextTranslateY = translateY + distanceY
        if (nextTranslateY <= 0) {
            // stop moving because the sheet is out of range
            translateY = 0
            sheet.style.transform = 'translateY(0)'
        } else {
            sheet.style.transform = `translateY(${nextTranslateY}px)`
        }
    }

    const onPointerUp = (e: PointerEvent) => {
        if (!isDragging) return
        if (!hideDragHandle) dragHandle.releasePointerCapture(e.pointerId)
        isDragging = false
        const currY = e.clientY
        const distanceY = currY - initY
        const nextTranslateY = translateY + distanceY // a positive number
        const pointerMoveDuration = Date.now() - pointerDownTime
        const { height } = sheet.getBoundingClientRect() // the sheet height

        if (pointerMoveDuration <= 200 /** ms */) {
            // if quickly drag it to the bottom, hide it
            if (distanceY >= 32 || (distanceY <= 0 && distanceY >= -32)) {
                hide()
            }
            // if quickly drag it to the top, show it in its entirely
            else {
                show()
            }
        } else {
            // not quickly drag
            if (/* distanceY >= 64 || */ nextTranslateY / height > 0.5) {
                hide()
            } else {
                show()
            }
        }
    }

    dragHandle.addEventListener('pointerdown', onPointerDown)
    dragHandle.addEventListener('pointermove', onPointerMove)
    dragHandle.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('pointerup', onPointerUp)

    return {
        cleanup: () => {
            dragHandle.removeEventListener('pointerdown', onPointerDown)
            dragHandle.removeEventListener('pointermove', onPointerMove)
            dragHandle.removeEventListener('pointercancel', onPointerUp)
            window.removeEventListener('pointerup', onPointerUp)
        },
        show,
        hide,
        visible() {
            return translateY > 0
        },
    }
}
