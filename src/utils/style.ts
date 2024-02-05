export function insertStyle(css: string, styleSheet = document.styleSheets[0]) {
    styleSheet.insertRule(css, styleSheet.cssRules.length)
}

export function applyCSSStyleDeclaration(
    ele: HTMLElement,
    cssStyleDeclaration: Partial<CSSStyleDeclaration> = {}
) {
    for (const [k, v] of Object.entries(cssStyleDeclaration)) {
        Reflect.set(ele.style, k, v)
    }
}
