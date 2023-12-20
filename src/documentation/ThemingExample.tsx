import { useMediaQuery } from '@/hooks/use-media-query'
import {
    argbFromHex,
    applyTheme,
    themeFromSourceColor,
    themeFromImage,
    hexFromArgb,
    type Theme,
} from '@material/material-color-utilities'
import { Card } from '@/components/card'
import { Button } from '@/components/button'
import { Badge } from '@/components/badge'
import { useEffect, useState } from 'react'

/**
 * Just an example widget to show example of `@material/material-color-utilities`
 */
export default function ThemingExample() {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
    const [sourceColor, setSourceColor] = useState(
        localStorage.getItem('sourceColor') || '#6750a4'
    )
    const [customColors, setCustomColors] = useState<string[]>([])
    const [file, setFile] = useState<File | null>(null)
    const customColorArray = customColors.map((color, index) => ({
        name: `custom-${index}`,
        value: argbFromHex(color),
        blend: true,
    }))

    useEffect(() => {
        localStorage.setItem('sourceColor', sourceColor)
    }, [sourceColor])

    useEffect(() => {
        // this make our element not be affected by sb's style
        const divs = document.querySelectorAll('.sbdocs-content *')
        divs.forEach((div) => {
            if (!(div instanceof HTMLElement)) return
            if (!div.className.includes('sd-')) return
            div.classList.add('sb-unstyled')
        })
    }, [])

    useEffect(() => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
            let theme: Theme
            if (file) {
                const image = new Image()
                image.src = URL.createObjectURL(file)
                const { promise, resolve, reject } =
                    Promise.withResolvers<Theme>()
                image.onerror = reject
                image.onload = async () => {
                    const theme = await themeFromImage(image, customColorArray)
                    URL.revokeObjectURL(image.src)
                    resolve(theme)
                }
                theme = await promise
            } else {
                theme = themeFromSourceColor(
                    argbFromHex(sourceColor),
                    customColorArray
                )
            }

            applyTheme(theme, {
                target: document.documentElement,
                dark: prefersDark,
            })
            applySurfaceStyles(theme, {
                target: document.documentElement,
                dark: prefersDark,
            })
        })()
    }, [customColorArray, prefersDark, sourceColor, file])

    return (
        <Card
            style={{
                padding: '1rem',
                margin: '2.5rem 0 5rem',
                maxWidth: '350px',
            }}
            disabled
        >
            <section>
                <h3>SourceColor</h3>

                <input
                    type="color"
                    value={sourceColor}
                    onChange={(e) => {
                        setFile(null)
                        setSourceColor(e.target.value)
                    }}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setFile(file)
                    }}
                />
            </section>

            <section>
                <h3>CustomColors</h3>

                {customColors.map((customColor, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            margin: '.5rem 0',
                        }}
                    >
                        <input
                            key={index}
                            type="color"
                            value={customColor}
                            onChange={(e) => {
                                setCustomColors(
                                    customColors.toSpliced(
                                        index,
                                        1,
                                        e.target.value
                                    )
                                )
                            }}
                        />
                        <Badge label={index}>
                            <Button
                                onClick={() => {
                                    setCustomColors(
                                        customColors.toSpliced(index, 1)
                                    )
                                }}
                            >
                                Delete This
                            </Button>
                        </Badge>
                    </div>
                ))}

                <Button
                    onClick={() =>
                        setCustomColors([...customColors, '#ffffff'])
                    }
                >
                    Add One
                </Button>
            </section>
        </Card>
    )
}

/**
 * https://github.com/material-foundation/material-color-utilities/issues/98
 */
function applySurfaceStyles(
    theme: Theme,
    { dark, target }: { dark?: boolean; target: HTMLElement }
): void {
    if (dark) {
        const elevationProps = {
            '--md-sys-color-surface-dim': theme.palettes.neutral.tone(6),
            '--md-sys-color-surface-bright': theme.palettes.neutral.tone(24),
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
            '--md-sys-color-surface-dim': theme.palettes.neutral.tone(87),
            '--md-sys-color-surface-bright': theme.palettes.neutral.tone(98),
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
