/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'

export type BottomSheetHandle = () => ReturnType<typeof drag>

/**
 * @specs https://m3.material.io/components/bottom-sheets/specs

 */
export const BottomSheet = forwardRef<
    BottomSheetHandle,
    {
        children?: React.ReactNode
        hideDragHandle?: boolean
        onChange?: (visiable: boolean) => void
    }
>(function (props, ref) {
    const sheetRef = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)

    const dragHandlerRef = useRef<ReturnType<typeof drag> | null>(null)
    const [visiable, setVisiable] = useState(false)

    useEffect(() => {
        dragHandlerRef.current = drag(handleRef.current!, sheetRef.current!, {
            onShow() {
                setVisiable(true)
                props.onChange?.(true)
            },
            onHide() {
                setVisiable(false)
                props.onChange?.(false)
            },
        })
        return dragHandlerRef.current.cleanup
    }, [props])

    useImperativeHandle(ref, () => () => dragHandlerRef.current!)

    return (
        <>
            <div
                style={{
                    background: 'rgb(0 0 0 / 0.1)',
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    pointerEvents: 'none',
                    opacity: visiable ? '1' : '0',
                    transition: 'opacity linear 200ms',
                }}
            ></div>

            <div
                className="sd-bottom_sheet-scrim"
                style={{ pointerEvents: visiable ? 'auto' : 'none' }}
            >
                <div
                    className="sd-bottom_sheet"
                    ref={sheetRef}
                    style={{ transform: 'translateY(100%)' }}
                >
                    <div
                        className="sd-bottom_sheet-drag_handle"
                        ref={handleRef}
                    ></div>
                    {props.children}
                </div>
            </div>
        </>
    )
})

// eslint-disable-next-line react-refresh/only-export-components
export function drag(
    dragHandle: HTMLDivElement,
    sheet: HTMLDivElement,
    options?: {
        onShow?(): void
        onHide?(): void
    }
) {
    sheet.style.userSelect = 'none' // disable content copy so it does not affect dragging

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
        dragHandle.setPointerCapture(e.pointerId)
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
        dragHandle.releasePointerCapture(e.pointerId)
        isDragging = false
        const currY = e.clientY
        const distanceY = currY - initY
        const nextTranslateY = translateY + distanceY // a positive number
        const pointerMoveDuration = Date.now() - pointerDownTime
        const { height } = sheet.getBoundingClientRect() // the sheet height

        // hide if space is not enought to display the drag handle
        if (height - nextTranslateY < 20) {
            hide()
        }
        // 150ms
        else if (pointerMoveDuration <= 150) {
            // if fast drag to bottom, hide it
            if (distanceY >= 32) {
                hide()
            }
            // if fast drag to top, show it entirely
            else if (distanceY <= -32) {
                show()
            }
            // not fast drag
        } else {
            translateY = nextTranslateY
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
