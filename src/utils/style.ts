export function insertStyle(css: string, styleSheet = document.styleSheets[0]) {
    styleSheet.insertRule(css, styleSheet.cssRules.length)
}

export function applyCSSStyleDeclaration(
    ele: HTMLElement,
    cssStyleDeclaration: Partial<CSSStyleDeclaration> = {},
) {
    for (const [k, v] of Object.entries(cssStyleDeclaration)) {
        Reflect.set(ele.style, k, v)
    }
}

export function mergeStyles(
    ...styles: Array<React.CSSProperties | boolean | void>
): React.CSSProperties {
    const s: React.CSSProperties = {}
    for (const style of styles) {
        if (typeof style === 'object') {
            Object.assign(s, style)
        }
    }
    return s
}
