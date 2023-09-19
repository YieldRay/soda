export function insertStyle(css: string) {
    const styleSheet = document.styleSheets[0]
    styleSheet.insertRule(css, styleSheet.cssRules.length)
}
