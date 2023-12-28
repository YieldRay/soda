import { usePrefersDark } from '@/hooks/use-media-query'
import {
    applyThemeForSoda,
    themeFromImageOrFile,
    themeFromHexString,
    argbFromHex,
} from '@/utils/theme'
import { Card } from '@/components/card'
import { Button } from '@/components/button'
import { Badge } from '@/components/badge'
import { useEffect, useState } from 'react'

/**
 * Just an example widget to show example of `@material/material-color-utilities`
 */
export default function ThemingExample() {
    const prefersDark = usePrefersDark()
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
            const theme = file
                ? await themeFromImageOrFile(file, customColorArray)
                : themeFromHexString(sourceColor, customColorArray)

            applyThemeForSoda(theme, prefersDark)
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
