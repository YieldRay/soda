import {
    applyTheme,
    argbFromHex,
    CustomColor,
    hexFromArgb,
    themeFromImage,
    themeFromSourceColor,
    type Theme,
} from '@material/material-color-utilities'

/**
 * Re-export @material/material-color-utilities with extra utilities
 */

export * from '@material/material-color-utilities'

/**
 * Wrapper function of `applyTheme()`
 */
export function applyThemeForSoda(theme: Theme | string, dark?: boolean) {
    dark ??= window.matchMedia('(prefers-color-scheme: dark)').matches
    const options = { target: document.documentElement, dark }
    ;[applyTheme, applySurfaceStyles].forEach((fn) =>
        fn(
            typeof theme === 'string'
                ? themeFromSourceColor(argbFromHex(theme))
                : theme,
            options,
        ),
    )
}

/**
 * https://github.com/material-foundation/material-color-utilities/issues/98
 */
export function applySurfaceStyles(
    theme: Theme,
    { dark, target }: { dark?: boolean; target: HTMLElement },
): void {
    if (dark) {
        const elevationProps = {
            '--md-sys-color-surface-container-lowest':
                theme.palettes.neutral.tone(4),
            '--md-sys-color-surface-container-low':
                theme.palettes.neutral.tone(10),
            '--md-sys-color-surface-container': theme.palettes.neutral.tone(12),
            '--md-sys-color-surface-container-high':
                theme.palettes.neutral.tone(17),
            '--md-sys-color-surface-container-highest':
                theme.palettes.neutral.tone(22),
        }

        for (const [property, argbColor] of Object.entries(elevationProps)) {
            document.body.style.setProperty(property, hexFromArgb(argbColor))
        }
    } else {
        const elevationProps = {
            '--md-sys-color-surface-container-lowest':
                theme.palettes.neutral.tone(100),
            '--md-sys-color-surface-container-low':
                theme.palettes.neutral.tone(96),
            '--md-sys-color-surface-container': theme.palettes.neutral.tone(94),
            '--md-sys-color-surface-container-high':
                theme.palettes.neutral.tone(92),
            '--md-sys-color-surface-container-highest':
                theme.palettes.neutral.tone(90),
        }

        for (const [property, argbColor] of Object.entries(elevationProps)) {
            target.style.setProperty(property, hexFromArgb(argbColor))
        }
    }
}

/**
 * Wrapper function of `themeFromImage()`
 */
export async function themeFromImageOrFile(
    img: HTMLImageElement | File,
    customColors?: CustomColor[],
) {
    let image: HTMLImageElement
    if (img instanceof File) {
        image = new Image()
        image.src = URL.createObjectURL(img)
        const { promise, resolve, reject } = Promise.withResolvers()
        image.onload = resolve
        image.onerror = reject
        await promise
    } else {
        image = img
    }
    const theme = await themeFromImage(image, customColors)
    if (img instanceof File) {
        URL.revokeObjectURL(image.src)
    }
    return theme
}

/**
 * Wrapper function for `themeFromSourceColor()`
 */
export function themeFromHexString(
    hexColor: string,
    customColors?: CustomColor[],
) {
    return themeFromSourceColor(argbFromHex(hexColor), customColors)
}
