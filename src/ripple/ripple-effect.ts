import { applyCSSStyleDeclaration } from '@/utils/style'

const DATASET_NAME = 'sdRipple' //? dataset name will automatically convert to underscore style

/**
 * warn: this is m2 ripple effect
 */
export function ripple(ele: HTMLElement, duration = 400, color?: string) {
    if (ele.dataset[DATASET_NAME] === 'true') {
        // do not create ripple effect if effect has been attached
        return
    }
    ele.dataset[DATASET_NAME] = 'true'

    // auto handle dark mode
    color ||=
        ele.dataset.sdDark === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'rgb(255 255 255 / 0.1)'
            : 'rgba(0, 0, 0, 0.1)'

    const rippleAt = (rippleX: number, rippleY: number, autoRemove = false) => {
        const { width, height } = ele.getBoundingClientRect() // ele pos

        if (rippleX < 0) rippleX = 0
        if (rippleY < 0) rippleY = 0
        if (rippleX > width) rippleX = width
        if (rippleY > height) rippleY = height

        const radius = Math.max(
            Math.hypot(rippleX, rippleY),
            Math.hypot(rippleX, height - rippleY),
            Math.hypot(width - rippleX, rippleY),
            Math.hypot(width - rippleX, height - rippleY)
        )

        // position:relative is a MUST for ripple
        applyCSSStyleDeclaration(ele, {
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
            backgroundColor: color,
            zIndex: 'auto',
            // the ripple element is absolute positioned to it's parent (the input element)
            // force z-index to auto, this prevent stacking context's creation
        })

        ele.append(ripple)

        const scaleUpAnimation = ripple.animate(
            { transform: ['scale(0%)', 'scale(101%)'] },
            {
                duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards',
            }
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
                    duration,
                    easing: 'linear',
                    fill: 'forwards',
                }
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
            ele.hasAttribute('disabled') ||
            Reflect.get(ele, 'disabled') === true ||
            ele.dataset.sdDisabled === 'true'
        ) {
            // do not handle if is disabled
            return
        }

        // DO NOT setPointerCapture, this will cause any child element
        // within it not able to get pointed
        const { clientX: pointerX, clientY: pointerY } = event // pointer pos
        const { x: eleX, y: eleY } = ele.getBoundingClientRect() // ele pos

        const startRemoveRipple = rippleAt(pointerX - eleX, pointerY - eleY)

        const onPointerUp = (e: PointerEvent) => {
            if (e.pointerId === event.pointerId)
                startRemoveRipple(() => {
                    ele.removeEventListener('pointercancel', onPointerUp)
                    window.removeEventListener('pointerup', onPointerUp)
                })
        }

        ele.addEventListener('pointercancel', onPointerUp)
        window.addEventListener('pointerup', onPointerUp)
    }

    // listen pointer down
    ele.addEventListener('pointerdown', onPointerDown)

    return {
        cleanup: () => {
            ele.dataset[DATASET_NAME] = 'false'
            ele.removeEventListener('pointerdown', onPointerDown)
        },
        rippleAt,
    }
}
