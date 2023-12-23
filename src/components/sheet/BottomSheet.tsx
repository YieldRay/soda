import './sheet.scss'
import clsx from 'clsx'
import { ExtendProps } from '@/utils/type'
import { Scrim } from '@/composition/Scrim'
import {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { Portal } from '@/utils/Portal'

export type BottomSheetHandle = ReturnType<typeof drag>

/**
 * This component DO NOT have ref forwarded.
 *
 * This component use ref to control show and hide,
 * you can call `ref.current.show()` to show and `ref.current.hide()` to hide
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
         */
        fixed?: boolean
        /**
         * Only works if `fixed` set to true
         */
        onChange?: (visiable: boolean) => void
        /**
         * Only works if `fixed` set to true
         *
         * Most of the case you want call `ref.current.close()`
         */
        onScrimClick?(): void
        /**
         * Only works if `fixed` set to true
         */
        teleportTo?: Element | DocumentFragment
    }>
>(function BottomSheet(
    {
        children,
        hideDragHandle,
        fixed,
        onChange,
        onScrimClick,
        className,
        style,
        teleportTo,
        ...props
    },
    ref
) {
    const sheetRef = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)

    const dragHandlerRef = useRef<ReturnType<typeof drag> | null>(null)
    const [visiable, setVisiable] = useState(false) // = isOpen

    // useLayoutEffect() rather than useEffect()
    // this make sure ref.current exists in useImperativeHandle()
    useLayoutEffect(() => {
        // do nothing if not fixed
        if (!fixed) return
        const sheet = sheetRef.current!
        const handle = hideDragHandle ? sheet : handleRef.current!
        const handler = drag(handle, sheet, {
            onShow() {
                setVisiable(true)
                onChange?.(true)
            },
            onHide() {
                setVisiable(false)
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
            {children}
        </div>
    )

    if (fixed)
        return (
            <Portal container={teleportTo}>
                <Scrim open={visiable} onClick={() => onScrimClick?.()} />
                <div className="sd-bottom_sheet-scrim">{bottomSheet}</div>
            </Portal>
        )

    return bottomSheet
})

export function drag(
    dragHandle: HTMLDivElement,
    sheet: HTMLDivElement,
    options?: {
        onShow?(): void
        onHide?(): void
    }
) {
    /**
     * do not capture pointer when the dragHandle is the entire sheet (when `hideDragHandle` set to true),
     * this is because the children of the sheet may want to capture the pointer,
     * for example, the <Ripple> element
     */
    const isCapturePointer = dragHandle !== sheet
    let isDragging = false
    let translateY = 0 // previous translateY in px
    let initY = 0
    let pointerDownTime: number

    const hide = () => {
        const { height } = sheet.getBoundingClientRect() // the sheet height

        const animation = sheet.animate(
            [{ transform: `translateY(${height}px)` }],
            {
                duration: 200,
                easing: 'ease-out',
            }
        )
        animation.onfinish = animation.oncancel = () => {
            sheet.style.transform = `translateY(${height}px)`
        }
        translateY = height

        options?.onHide?.()
    }

    const show = () => {
        const animation = sheet.animate([{ transform: `translateY(0)` }], {
            duration: 200,
            easing: 'ease-out',
        })
        animation.onfinish = animation.oncancel = () => {
            sheet.style.transform = `translateY(0)`
        }
        translateY = 0

        options?.onShow?.()
    }

    const onPointerDown = (e: PointerEvent) => {
        if (isCapturePointer) dragHandle.setPointerCapture(e.pointerId)
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
        if (isCapturePointer) dragHandle.releasePointerCapture(e.pointerId)
        isDragging = false
        const currY = e.clientY
        const distanceY = currY - initY
        const nextTranslateY = translateY + distanceY // a positive number
        const pointerMoveDuration = Date.now() - pointerDownTime
        const { height } = sheet.getBoundingClientRect() // the sheet height

        if (pointerMoveDuration <= 200 /** ms */) {
            // if fast drag to bottom, hide it
            if (distanceY >= 32) {
                hide()
            }
            // if fast drag to top, show it entirely
            else if (distanceY <= -32) {
                show()
            }
        } else {
            // not fast drag
            if (nextTranslateY / height > 0.5) {
                hide()
            } else {
                show()
            }
        }
    }

    dragHandle.addEventListener('pointerdown', onPointerDown)
    dragHandle.addEventListener('pointermove', onPointerMove)
    dragHandle.addEventListener('pointerup', onPointerUp)
    dragHandle.addEventListener('pointercancel', onPointerUp)

    return {
        cleanup: () => {
            dragHandle.removeEventListener('pointerdown', onPointerDown)
            dragHandle.removeEventListener('pointermove', onPointerMove)
            dragHandle.removeEventListener('pointerup', onPointerUp)
            dragHandle.removeEventListener('pointercancel', onPointerUp)
        },
        show,
        hide,
        visiable() {
            return translateY > 0
        },
    }
}
