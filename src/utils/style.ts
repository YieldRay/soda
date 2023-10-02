export function insertStyle(css: string) {
    const styleSheet = document.styleSheets[0]
    styleSheet.insertRule(css, styleSheet.cssRules.length)
}

export function applyCSSStyle(ele: HTMLElement, styl?: React.CSSProperties) {
    if (!styl) return
    for (const [k, v] of Object.entries(styl)) {
        Reflect.set(ele.style, k, v)
    }
}
