export function getRippleColor() {
    if (CSS.supports('color: rgb(from white r g b)')) {
        return 'rgb(from var(--md-sys-color-primary) r g b / var(--md-sys-state-pressed-state-layer-opacity))'
    } else {
        return matchMedia('(prefers-color-scheme: dark)').matches
            ? 'rgb(255 255 255 / 0.2)'
            : 'rgba(0 0 0 / 0.2)'
    }
}

export function getReversedRippleColor() {
    return matchMedia('(prefers-color-scheme: dark)').matches
        ? 'rgba(0 0 0 / 0.2)'
        : 'rgb(255 255 255 / 0.2)'
}
