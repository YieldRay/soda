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
import { useEffect, useRef, useState } from 'react'
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
    LinearProgressIndicator,
    CircularProgressIndicator,
    RadioButton,
    Search,
    Switch,
    Tab,
    Tabs,
    TextField,
    TimePicker,
    TopAppBar,
    BottomSheet,
    BottomSheetHandle,
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
import { TabPanel } from '../components/tab/TabPanel'

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

function LayoutNaviagtionDrawer({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const isScreenExpanded = useWindowSizeType() === 'expanded'
    const bottomSheetRef = useRef<BottomSheetHandle>(null)

    useEffect(() => {
        // this make our element not be affected by sb's style
        const divs = document.querySelectorAll('.sbdocs-content *')
        divs.forEach((div) => {
            if (!(div instanceof HTMLElement)) return
            if (!div.className.includes('sd-')) return
            div.classList.add('sb-unstyled')
        })
        const sbdocs = document.querySelector('.sbdocs') as HTMLElement
        sbdocs.style.all = 'unset'
    }, [isScreenExpanded])

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                overflowY: 'hidden',
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
                <NavigationDrawerItem
                    icon={<Icon path={mdiInbox} />}
                    badge="24"
                >
                    Inbox
                </NavigationDrawerItem>
                <NavigationDrawerItem
                    icon={<Icon path={mdiSendVariantOutline} />}
                    badge="99+"
                >
                    Outbox
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Icon path={mdiHeartOutline} />}>
                    Favorites
                </NavigationDrawerItem>
                <NavigationDrawerItem icon={<Icon path={mdiDeleteOutline} />}>
                    Trash
                </NavigationDrawerItem>
                <Divider />
            </NavigationDrawer>

            <div style={{ width: '100%', overflowY: 'auto' }}>
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
                        <>
                            <IconButton
                                path={mdiMagnify}
                                onClick={() => {
                                    bottomSheetRef.current?.show()
                                }}
                            />
                            <PopoverHolder
                                trigger={<IconButton path={mdiDotsVertical} />}
                                placement="bottom-end"
                                content={
                                    <Menu>
                                        <MenuItem
                                            leadingIcon={
                                                <Icon path={mdiRefresh} />
                                            }
                                        >
                                            Refresh
                                        </MenuItem>
                                        <MenuItem
                                            leadingIcon={
                                                <Icon path={mdiShare} />
                                            }
                                        >
                                            Share
                                        </MenuItem>
                                    </Menu>
                                }
                            />
                        </>
                    }
                >
                    Soda
                </TopAppBar>
                {children}
                <BottomSheet
                    fixed
                    ref={bottomSheetRef}
                    onScrimClick={() => bottomSheetRef.current!.hide()}
                    style={{ height: '100%' }}
                >
                    <Flex>
                        <Search
                            leadingIcon={<IconButton path={mdiMenu} />}
                            placeholder="Search"
                            trailingIcon={<IconButton path={mdiMagnify} />}
                        />
                    </Flex>

                    <Flex>
                        <CircularProgressIndicator />
                    </Flex>
                </BottomSheet>
            </div>
        </div>
    )
}

function Flex({
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

export function Preview() {
    return (
        <LayoutNaviagtionDrawer>
            <Card disabled style={{ padding: '1rem', display: 'inline-block' }}>
                <h2>Login</h2>
                <TextField labelText="Username" variant="outlined" />
                <br />
                <TextField labelText="Password" />
                <br />
                <h4 style={{ display: 'inline' }}>Mode: </h4>
                <Select options={['Development', 'Production', 'Preview']} />
                <br />
                <Button>OK</Button>
                <Button variant="elevated">Cancel</Button>
            </Card>

            <Card disabled style={{ padding: '1rem', display: 'inline-block' }}>
                <h2>Comments Area</h2>
                <TextField
                    labelText="Comment"
                    textarea
                    style={{ width: '100%' }}
                />
                <TextField
                    labelText="Comment"
                    variant="outlined"
                    textarea
                    style={{ width: '100%' }}
                />
                <Flex alignItems="center" justifyContent="space-between">
                    <p>
                        <RadioButton defaultChecked>
                            By making comments, you must accept our terms of
                            service.
                        </RadioButton>
                    </p>
                    <Button variant="text">Cancel</Button>
                    <Button>Submit</Button>
                </Flex>
                <Flex gap="2rem">
                    <div>
                        <h1>3.5</h1>
                    </div>
                    <div style={{ flex: '1' }}>
                        {[0.5, 0.4, 0.3, 0.2, 0.1].map((value, index) => (
                            <Flex gap="4px">
                                <span>{5 - index}</span>
                                <LinearProgressIndicator
                                    thickness="6px"
                                    value={value}
                                />
                            </Flex>
                        ))}
                    </div>
                </Flex>
            </Card>

            <Tabs defaultIndex={0}>
                <Tab index={0}>Tab1</Tab>
                <Tab index={1}>Tab2</Tab>

                <div>
                    <TabPanel index={0}>
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
                    </TabPanel>
                    <TabPanel index={1}>
                        <List
                            headline="theming"
                            leadingAvatarLabelText="S"
                            supportingText="soda/theme"
                            trailingIcon={<Checkbox />}
                        />
                        <List
                            headline="theming"
                            leadingAvatarLabelText="M"
                            supportingText="@material/material-color-utilities"
                            trailingIcon={<Switch />}
                        />
                    </TabPanel>
                </div>
            </Tabs>

            <DatePicker />
            <TimePicker use24hourSystem />
        </LayoutNaviagtionDrawer>
    )
}
