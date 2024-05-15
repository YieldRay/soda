/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { mdiFile, mdiPalette } from '@mdi/js'
import { Card } from '@/components/card'
import { usePrefersDark } from '@/hooks/use-media-query'
import { applyCSSStyleDeclaration } from '@/utils/style'
import {
    applyThemeForSoda,
    themeFromHexString,
    themeFromImageOrFile,
} from '@/utils/theme'
import { IconButton } from '../..'

export function ChangeTheme() {
    const prefersDark = usePrefersDark()
    const [sourceColor, setSourceColor] = useState(
        localStorage.getItem('sourceColor') || '#6750a4',
    )

    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        localStorage.setItem('sourceColor', sourceColor)
    }, [sourceColor])

    useEffect(() => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
            const theme = file
                ? await themeFromImageOrFile(file)
                : themeFromHexString(sourceColor)

            applyThemeForSoda(theme, prefersDark)
        })()
    }, [prefersDark, sourceColor, file])

    return (
        <Card
            style={{
                padding: '1rem',
                maxWidth: '400px',
            }}
            disabled
        >
            <Flex flexDirection="column" gap="1rem">
                <Flex width="100%" justifyContent="space-between">
                    <span>Pick color</span>
                    <Holder
                        content={
                            <IconButton
                                path={mdiPalette}
                                size={1}
                                variant="outlined"
                            />
                        }
                    >
                        {(ref) => (
                            <input
                                //@ts-ignore
                                ref={ref}
                                type="color"
                                value={sourceColor}
                                onChange={(e) => {
                                    setFile(null)
                                    setSourceColor(e.target.value)
                                }}
                            />
                        )}
                    </Holder>
                </Flex>

                <Flex width="100%" justifyContent="space-between">
                    <span>Pick file</span>
                    <Holder
                        content={
                            <IconButton
                                path={mdiFile}
                                size={1}
                                variant="outlined"
                            />
                        }
                    >
                        {(ref) => (
                            <input
                                //@ts-ignore
                                ref={ref}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    setFile(file)
                                }}
                            />
                        )}
                    </Holder>
                </Flex>
            </Flex>
        </Card>
    )
}

function Holder({
    children,
    content,
}: {
    children: (ref: React.Ref<HTMLElement | undefined>) => React.ReactNode
    content: React.ReactNode
}) {
    const ref = useRef<HTMLElement | undefined>()
    useLayoutEffect(() => {
        const el = ref.current
        if (!el) return
        applyCSSStyleDeclaration(el, {
            cursor: 'pointer',
            position: 'absolute',
            opacity: '0',
            left: '0',
            display: 'inline-block',
            width: '100%',
            height: '100%',
        })
    })
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {content}
            {children(ref)}
        </div>
    )
}

export function Flex({
    children,
    ...style
}: React.CSSProperties & { children?: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}
        >
            {children}
        </div>
    )
}
