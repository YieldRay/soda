import { applyCSSStyleDeclaration } from '@/utils/style'

const DATASET_NAME = 'sdRipple' //? dataset name will automatically convert to underscore style

export const DEFAULT_RIPPLE_COLOR = matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'rgb(255 255 255 / 0.2)'
    : 'rgba(0 0 0 / 0.2)'

export const REVERSE_RIPPLE_COLOR = matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'rgba(0 0 0 / 0.2)'
    : 'rgb(255 255 255 / 0.2)'

export const AUTO_RIPPLE_COLOR = CSS.supports('color: rgb(from white r g b)')
    ? 'rgb(from var(--md-sys-color-primary) r g b / var(--md-sys-state-pressed-state-layer-opacity))'
    : DEFAULT_RIPPLE_COLOR

// warn: this is m2 ripple effect

/**
 * Attach ripple effect to an element.
 *
 * @param el Element to attach ripple effect
 * @param rippleColor Color of the ripple (in css color string)
 * @returns An object, use `cleanup()` to remove attached event listener,
 * use `rippleAt(x, y)` to manually invoke a ripple to create
 *
 * @example
 * ```js
 * const { cleanup, rippleAt } = ripple(
 *     document.querySelector("#el"),
 *     "rgb(from var(--md-sys-color-primary) r g b / 0.1)"
 * )
 * ```
 */
export function ripple(el: HTMLElement, rippleColor = AUTO_RIPPLE_COLOR) {
    if (el.dataset[DATASET_NAME] === 'true') {
        // do not create ripple effect if effect has been attached
        return
    }
    el.dataset[DATASET_NAME] = 'true'

    const rippleAt = (rippleX: number, rippleY: number, autoRemove = false) => {
        const { width, height } = el.getBoundingClientRect() // ele pos

        if (rippleX < 0) rippleX = 0
        if (rippleY < 0) rippleY = 0
        if (rippleX > width) rippleX = width
        if (rippleY > height) rippleY = height

        const radius = Math.max(
            Math.hypot(rippleX, rippleY),
            Math.hypot(rippleX, height - rippleY),
            Math.hypot(width - rippleX, rippleY),
            Math.hypot(width - rippleX, height - rippleY),
        )

        // position:relative is a MUST for ripple
        applyCSSStyleDeclaration(el, {
            position: 'relative',
            ['-webkit-tap-highlight-color' as string]: 'transparent',
        })

        const ripple = document.createElement('div')

        applyCSSStyleDeclaration(ripple, {
            pointerEvents: 'none',
            position: 'absolute',
            left: rippleX - radius + 'px',
            top: rippleY - radius + 'px',
            width: radius * 2 + 'px',
            height: radius * 2 + 'px',
            borderRadius: '50%',
            transformOrigin: '50% 50%',
            backgroundColor: rippleColor,
            zIndex: 'auto',
            // the ripple element is absolute positioned to it's parent (the input element)
            // force z-index to auto, this prevent stacking context's creation
        })

        el.append(ripple)

        const scaleUpAnimation = ripple.animate(
            { transform: ['scale(0%)', 'scale(101%)'] },
            {
                duration: Math.max(radius * 1.6, 400),
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards',
            },
        )
        scaleUpAnimation.id = 'scaleUpAnimation'

        const startRemoveRipple = (onFinish?: VoidFunction) => {
            if (!ripple) return

            // if the element already have fadeOutAnimation running, skip
            if (ripple.getAnimations().find((a) => a.id === 'fadeOutAnimation'))
                return

            const fadeOutAnimation = ripple.animate(
                { opacity: ['1', '0'] },
                {
                    duration: 400,
                    easing: 'linear',
                    fill: 'forwards',
                },
            )
            fadeOutAnimation.id = 'fadeOutAnimation'

            fadeOutAnimation.onfinish = () => {
                ripple.remove()
                onFinish?.()
            }

            fadeOutAnimation.oncancel = () => {
                fadeOutAnimation.finish()
            }
        }

        if (autoRemove) {
            scaleUpAnimation.oncancel = () => startRemoveRipple()
            scaleUpAnimation.onfinish = () => startRemoveRipple()
        }

        return startRemoveRipple
    }

    // handle pointer event
    const onPointerDown = (event: PointerEvent) => {
        if (event.button === 2) {
            // do not handle right click
            return
        }
        if (
            el.hasAttribute('disabled') ||
            Reflect.get(el, 'disabled') === true ||
            el.dataset.sdDisabled === 'true'
        ) {
            // do not handle if is disabled
            return
        }

        // DO NOT setPointerCapture, this will cause any child element
        // within it not able to get pointed
        const { clientX: pointerX, clientY: pointerY } = event // pointer pos
        const { x: eleX, y: eleY } = el.getBoundingClientRect() // ele pos

        const startRemoveRipple = rippleAt(pointerX - eleX, pointerY - eleY)

        const onPointerUp = (e: PointerEvent) => {
            if (e.pointerId === event.pointerId)
                startRemoveRipple(() => {
                    el.removeEventListener('pointercancel', onPointerUp)
                    window.removeEventListener('pointerup', onPointerUp)
                })
        }

        el.addEventListener('pointercancel', onPointerUp)
        window.addEventListener('pointerup', onPointerUp)
    }

    // listen pointer down
    el.addEventListener('pointerdown', onPointerDown)

    return {
        cleanup: () => {
            el.dataset[DATASET_NAME] = 'false'
            el.removeEventListener('pointerdown', onPointerDown)
        },
        rippleAt,
    }
}
