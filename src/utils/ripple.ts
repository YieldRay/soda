// function insertStyle(css: string) {
//     const styleSheet = document.styleSheets[0]
//     styleSheet.insertRule(css, styleSheet.cssRules.length)
// }

/**
 * warn: this is m2 ripple effect
 */
export function ripple<E extends HTMLElement>(ele: E, duration = 400) {
    if (ele.hasAttribute('disabled') || ele.dataset['sd_ripple'] === 'true') {
        // do not create ripple effect if element is disabled or effect has been attached
        return
    }
    ele.dataset['sd_ripple'] = 'true'

    const onPointerDown = (event: PointerEvent) => {
        if (event.button === 2) {
            // do not handle right click
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
        ripple.style.transform = 'scale(0%)'
        ripple.style.transition = `all cubic-bezier(0.4, 0, 0.2, 1) ${duration}ms`
        ripple.style.background = 'rgba(0, 0, 0, 0.1)'
        ele.append(ripple)

        // if pointer is still down, we animate it slowly
        requestAnimationFrame(() => {
            ripple.style.transform = 'scale(101%)'
        })

        const onPointerUp = () => {
            ripple.ontransitionend = () => {
                ripple.remove()
                ele.removeEventListener('pointerup', onPointerUp)
                ele.removeEventListener('pointercancel', onPointerUp)
            }
            // when pointer up or cancel, we remove current ripple as fast as possiable
            requestAnimationFrame(() => {
                ripple.style.opacity = '0'
            })
        }
        ele.addEventListener('pointerup', onPointerUp)
        ele.addEventListener('pointercancel', onPointerUp)
    }

    ele.addEventListener('pointerdown', onPointerDown)

    return () => {
        ele.dataset['sd_ripple'] = 'false'
        ele.removeEventListener('pointerdown', onPointerDown)
    }
}
