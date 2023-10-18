import { useEffect } from 'react'
const DatasetName = 'sdRipple' //? dataset name will automatically convert to underscore style

/**
 * warn: this is m2 ripple effect
 */
export function rippleEffect(
    ele: HTMLElement,
    duration = 400,
    color = 'rgba(0, 0, 0, 0.1)'
) {
    if (ele.dataset[DatasetName] === 'true') {
        // do not create ripple effect if effect has been attached
        return
    }
    ele.dataset[DatasetName] = 'true'

    const onPointerDown = (event: PointerEvent) => {
        if (event.button === 2) {
            // do not handle right click
            return
        }
        if (
            ele.hasAttribute('disabled') ||
            Reflect.get(ele, 'disabled') === true ||
            ele.dataset.sdDisabled === 'true'
        ) {
            // do not handle if is disabled
            return
        }

        ele.setPointerCapture(event.pointerId) // redirect all event to element

        const { x: eleX, y: eleY, width, height } = ele.getBoundingClientRect() // ele pos
        const { clientX: pointerX, clientY: pointerY } = event // pointer pos
        const rippleX = pointerX - eleX
        const rippleY = pointerY - eleY

        const radius = Math.max(
            Math.hypot(rippleX, rippleY),
            Math.hypot(rippleX, height - rippleY),
            Math.hypot(width - rippleX, rippleY),
            Math.hypot(width - rippleX, height - rippleY)
        )

        ele.style.position = 'relative'
        ele.style.overflow = 'hidden'
        const ripple = document.createElement('div')
        ripple.style.pointerEvents = 'none'
        ripple.style.position = 'absolute'
        ripple.style.left = rippleX - radius + 'px'
        ripple.style.top = rippleY - radius + 'px'
        ripple.style.width = radius * 2 + 'px'
        ripple.style.height = radius * 2 + 'px'
        ripple.style.borderRadius = '50%'
        ripple.style.transformOrigin = '50% 50%'
        ripple.style.background = color
        ele.append(ripple)

        ripple.animate(
            [
                { transform: 'scale(0%)' },
                {
                    transform: 'scale(101%)',
                },
            ],
            {
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards',
            }
        )

        const onPointerUp = (e: PointerEvent) => {
            ele.releasePointerCapture(e.pointerId)

            const animation = ripple.animate(
                [
                    { opacity: '1' },
                    {
                        opacity: '0',
                    },
                ],
                {
                    duration,
                    fill: 'forwards',
                }
            )

            animation.oncancel = animation.onfinish = () => {
                ripple.remove()
                ele.removeEventListener('pointerup', onPointerUp)
                ele.removeEventListener('pointercancel', onPointerUp)
            }
        }

        ele.addEventListener('pointerup', onPointerUp)
        ele.addEventListener('pointercancel', onPointerUp)
    }

    ele.addEventListener('pointerdown', onPointerDown)

    return () => {
        ele.dataset[DatasetName] = 'false'
        ele.removeEventListener('pointerdown', onPointerDown)
    }
}

/**
 * Hooks wrapper of the raw dom function
 */
export function useRippleEffect(
    eleRef: React.RefObject<HTMLElement>,
    duration?: number,
    color?: string
) {
    useEffect(
        () =>
            eleRef.current
                ? rippleEffect(eleRef.current, duration, color)
                : undefined,
        [eleRef, duration, color]
    )
}
