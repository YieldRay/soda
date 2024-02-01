import { usePrefersDark, useWindowSizeType } from '@/hooks/use-media-query'
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
import {
    Checkbox,
    DatePicker,
    Divider,
    IconButton,
    List,
    Menu,
    MenuItem,
    NavigationDrawer,
    NavigationDrawerItem,
    PlainTooltip,
    ProgressIndicator,
    RadioButton,
    Search,
    Switch,
    Tab,
    Tabs,
    TextField,
    TimePicker,
    TopAppBar,
} from '@/components'
import { Select, TooltipHolder, PopoverHolder } from '@/composition'
import {
    mdiDeleteOutline,
    mdiDotsVertical,
    mdiHeartOutline,
    mdiInbox,
    mdiMagnify,
    mdiMenu,
    mdiRefresh,
    mdiSendVariantOutline,
    mdiShare,
} from '@mdi/js'
import Icon from '@mdi/react'

/**
 * Just an example widget to show example of `@material/material-color-utilities`
 */
export function ThemingExample() {
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

export function Preview() {
    const [open, setOpen] = useState(false)
    const isScreenExpanded = useWindowSizeType() === 'expanded'

    useEffect(() => {
        // this make our element not be affected by sb's style
        const divs = document.querySelectorAll('.sbdocs-content *')
        divs.forEach((div) => {
            if (!(div instanceof HTMLElement)) return
            if (!div.className.includes('sd-')) return
            div.classList.add('sb-unstyled')
        })
    }, [isScreenExpanded])

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                background: 'var(--md-sys-color-surface)',
                willChange: 'transform',
            }}
        >
            <NavigationDrawer
                open={open}
                headline="Mail"
                modal={!isScreenExpanded}
                onScrimClick={() => setOpen(false)}
            >
                <NavigationDrawerItem icon={mdiInbox} badge="24">
                    Inbox
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={mdiSendVariantOutline} badge="99+">
                    Outbox
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={mdiHeartOutline}>
                    Favorites
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={mdiDeleteOutline}>
                    Trash
                </NavigationDrawerItem>
                <Divider />
            </NavigationDrawer>

            <div>
                <TopAppBar
                    leadingNavigationIcon={
                        <TooltipHolder
                            trigger={
                                <IconButton
                                    path={mdiMenu}
                                    onClick={() => setOpen(!open)}
                                />
                            }
                            content={<PlainTooltip>Menu</PlainTooltip>}
                        />
                    }
                    trailingIcon={
                        <PopoverHolder
                            trigger={<IconButton path={mdiDotsVertical} />}
                            placement="bottom-end"
                            content={
                                <Menu>
                                    <MenuItem
                                        leadingIcon={<Icon path={mdiRefresh} />}
                                    >
                                        Refresh
                                    </MenuItem>
                                    <MenuItem
                                        leadingIcon={<Icon path={mdiShare} />}
                                    >
                                        Share
                                    </MenuItem>
                                </Menu>
                            }
                        />
                    }
                >
                    React Component Library
                </TopAppBar>
                <ProgressIndicator variant="linear" />
                <ProgressIndicator variant="circular" />
                <Search
                    leadingIcon={<IconButton path={mdiMenu} />}
                    placeholder="placeholder"
                    trailingIcon={<IconButton path={mdiMagnify} />}
                />

                <Card disabled style={{ padding: '1rem' }}>
                    <h2>Login</h2>
                    <TextField labelText="Username" variant="outlined" />
                    <br />
                    <TextField labelText="Password" />
                    <br />
                    <h4 style={{ display: 'inline' }}>Mode: </h4>
                    <Select
                        options={['Development', 'Production', 'Preview']}
                    />
                    <br />
                    <Button>OK</Button>
                    <Button variant="elevated">Cancel</Button>
                </Card>
                <TextField labelText="TextField" textarea />
                <TextField labelText="TextField" variant="outlined" textarea />

                <RadioButton defaultChecked>RadioButton</RadioButton>

                <List
                    headline="theming"
                    leadingAvatarLabelText="M"
                    supportingText="@material/material-color-utilities"
                    trailingIcon={<Switch />}
                />
                <List
                    headline="theming"
                    leadingAvatarLabelText="S"
                    supportingText="soda/theme"
                    trailingIcon={<Checkbox />}
                />
                <Tabs defaultIndex={1}>
                    <Tab index={0}>Apple</Tab>
                    <Tab index={1}>Banana</Tab>
                    <Tab index={2}>Orange</Tab>
                </Tabs>

                <DatePicker />
                <TimePicker use24hourSystem />
            </div>
        </div>
    )
}
