const LIGHT = 'rgba(0 0 0 / 0.2)'
const DARK = 'rgba(255 255 255 / 0.2)'

export function getRippleColor() {
    if (typeof window === 'undefined') return LIGHT
    if (CSS.supports('color: rgb(from white r g b)')) {
        return 'rgb(from var(--md-sys-color-primary) r g b / var(--md-sys-state-pressed-state-layer-opacity))'
    } else {
        return matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT
    }
}

export function getReversedRippleColor() {
    if (typeof window === 'undefined') return DARK
    return matchMedia('(prefers-color-scheme: dark)').matches ? LIGHT : DARK
}
