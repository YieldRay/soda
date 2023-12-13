import pick from 'lodash-es/pick'

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

/**
 * @returns A void function to reset the CSSStyleDeclaration
 */
export function withCSSStyleDeclaration(
    ele: HTMLElement,
    cssStyleDeclaration: Partial<CSSStyleDeclaration> = {}
): VoidFunction {
    const oldCSSStyleDeclaration = pick(
        ele.style,
        Object.keys(cssStyleDeclaration)
    )
    applyCSSStyleDeclaration(ele, cssStyleDeclaration)
    return () => applyCSSStyleDeclaration(ele, oldCSSStyleDeclaration)
}
