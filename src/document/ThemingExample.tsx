import { useMediaQuery } from '@/utils/hooks'
import {
    argbFromHex,
    applyTheme,
    themeFromSourceColor,
    themeFromImage,
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
    const [sourceColor, setSourceColor] = useState('#6750a4')
    const [customColors, setCustomColors] = useState<string[]>([])
    const [file, setFile] = useState<File | null>(null)
    const customColorArray = customColors.map((color, index) => ({
        name: `custom-${index}`,
        value: argbFromHex(color),
        blend: true,
    }))

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
        })()
    }, [customColorArray, prefersDark, sourceColor, file])

    return (
        <Card
            style={{ padding: '1rem', margin: '0 0 3rem', maxWidth: '350px' }}
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
                ></input>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setFile(file)
                    }}
                ></input>
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
                        ></input>
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
