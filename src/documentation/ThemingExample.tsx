import { useEffect, useRef, useState } from 'react'
import {
    mdiCheckboxOutline,
    mdiDeleteOutline,
    mdiDotsVertical,
    mdiFullscreen,
    mdiFullscreenExit,
    mdiGreasePencil,
    mdiHeartOutline,
    mdiImageOutline,
    mdiInbox,
    mdiMagnify,
    mdiMenu,
    mdiMicrophone,
    mdiPlus,
    mdiRefresh,
    mdiSendVariantOutline,
    mdiShare,
} from '@mdi/js'
import Icon from '@mdi/react'
import {
    Badge,
    BottomAppBar,
    BottomSheet,
    BottomSheetHandle,
    Button,
    Card,
    Checkbox,
    CircularProgressIndicator,
    DatePicker,
    Dialog,
    Divider,
    Fab,
    IconButton,
    LinearProgressIndicator,
    List,
    Menu,
    MenuItem,
    NavigationDrawer,
    NavigationDrawerItem,
    PlainTooltip,
    RadioButton,
    Search,
    Snackbar,
    Switch,
    Tabs,
    TextField,
    TimePicker,
    TopAppBar,
} from '@/components'
import { PopoverHolder, Scrim, Select, TooltipHolder } from '@/composition'
import { useFullscreen } from '@/hooks/use-fullscreen'
import { usePrefersDark, useWindowSizeType } from '@/hooks/use-media-query'
import {
    applyThemeForSoda,
    argbFromHex,
    themeFromHexString,
    themeFromImageOrFile,
} from '@/utils/theme'

/**
 * Just an example widget to show example of `@material/material-color-utilities`
 */
export function ThemingExample() {
    const prefersDark = usePrefersDark()
    const [sourceColor, setSourceColor] = useState(
        localStorage.getItem('sourceColor') || '#6750a4',
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
                                        e.target.value,
                                    ),
                                )
                            }}
                        />
                        <Badge label={index}>
                            <Button
                                onClick={() => {
                                    setCustomColors(
                                        customColors.toSpliced(index, 1),
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

function LayoutNavigationDrawer({ children }: { children?: React.ReactNode }) {
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
    const containerRef = useRef<HTMLDivElement>(null)
    const [fullscreen, setFullscreen] = useFullscreen(containerRef)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <div
            ref={containerRef}
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

            <div
                className="sd-scrollbar"
                style={{ width: '100%', overflowY: 'auto' }}
            >
                <TopAppBar
                    fixed
                    leadingNavigationIcon={
                        <TooltipHolder
                            trigger={
                                <IconButton
                                    path={mdiMenu}
                                    onClick={() => setOpen(!open)}
                                />
                            }
                            content={<PlainTooltip>menu</PlainTooltip>}
                        />
                    }
                    trailingIcon={
                        <>
                            <TooltipHolder
                                trigger={
                                    <IconButton
                                        path={
                                            fullscreen
                                                ? mdiFullscreenExit
                                                : mdiFullscreen
                                        }
                                        onClick={() => {
                                            setFullscreen(!fullscreen)
                                        }}
                                    />
                                }
                                content={
                                    <PlainTooltip>fullscreen</PlainTooltip>
                                }
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
                                            onClick={() => setDialogOpen(true)}
                                        >
                                            Refresh
                                        </MenuItem>
                                        <MenuItem
                                            leadingIcon={
                                                <Icon path={mdiShare} />
                                            }
                                            onClick={() => {
                                                setSnackbarOpen(true)
                                            }}
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
                <div style={{ padding: '100px 0' }}>{children}</div>
                <Snackbar
                    fixed
                    full
                    inset="auto 0 5rem"
                    open={snackbarOpen}
                    action="Close"
                    onActionClick={() => setSnackbarOpen(false)}
                    onCloseClick={() => setSnackbarOpen(false)}
                >
                    Noting to share!
                </Snackbar>
                <BottomAppBar
                    fixed
                    buttons={
                        <>
                            <IconButton size={1} path={mdiCheckboxOutline} />
                            <IconButton size={1} path={mdiGreasePencil} />
                            <IconButton size={1} path={mdiMicrophone} />
                            <IconButton size={1} path={mdiImageOutline} />
                        </>
                    }
                    fab={
                        <Fab
                            variant="secondary"
                            onClick={() => {
                                bottomSheetRef.current?.show()
                            }}
                        >
                            <Icon size={1} path={mdiPlus} />
                        </Fab>
                    }
                />
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
                <Scrim
                    center
                    zIndex={999}
                    open={dialogOpen}
                    onScrimClick={() => setDialogOpen(false)}
                >
                    <Dialog
                        headline="Refresh"
                        buttons={
                            <Button
                                variant="text"
                                onClick={() => setDialogOpen(false)}
                            >
                                Close
                            </Button>
                        }
                    >
                        Not allowed to refresh!
                    </Dialog>
                </Scrim>
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

function ListSwitch(props: React.ComponentProps<typeof List>) {
    const [checked, setChecked] = useState(false)
    return (
        <List
            {...props}
            onClick={() => setChecked(!checked)}
            trailingIcon={<Switch checked={checked} />}
        />
    )
}

function ListCheckbox(props: React.ComponentProps<typeof List>) {
    const [checked, setChecked] = useState(false)
    return (
        <List
            {...props}
            onClick={() => setChecked(!checked)}
            trailingIcon={<Checkbox checked={checked} />}
        />
    )
}

export function Preview() {
    return (
        <LayoutNavigationDrawer>
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
                    <div style={{ margin: '2rem 0.5rem' }}>
                        <RadioButton defaultChecked>
                            By making comments, you must accept our terms of
                            service.
                        </RadioButton>
                    </div>
                    <Button style={{ flexShrink: '0' }} variant="text">
                        Cancel
                    </Button>
                    <Button style={{ flexShrink: '0' }}>Submit</Button>
                </Flex>
                <Flex gap="2rem">
                    <div>
                        <h1>3.5</h1>
                    </div>
                    <div style={{ flex: '1' }}>
                        {[undefined, 0.4, 0.3, 0.2, 0.1].map((value, index) => (
                            <Flex gap="4px" key={index}>
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

            <WithTabs>
                {[
                    {
                        value: 'Tab 1',
                        children: (
                            <>
                                <ListSwitch
                                    headline="theming"
                                    leadingAvatarLabelText="M"
                                    supportingText="@material/material-color-utilities"
                                />
                                <ListCheckbox
                                    headline="theming"
                                    leadingAvatarLabelText="S"
                                    supportingText="soda/theme"
                                />
                            </>
                        ),
                    },
                    {
                        value: 'Tab 2',
                        children: (
                            <>
                                {' '}
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
                            </>
                        ),
                    },
                ]}
            </WithTabs>

            <DatePicker />
            <TimePicker use24hourSystem />
        </LayoutNavigationDrawer>
    )
}

function WithTabs({
    children: tabs,
}: {
    children: Array<{
        children?: React.ReactNode
        label?: React.ReactNode
        value: string
    }>
}) {
    const [value, setValue] = useState(tabs[0].value)
    return (
        <>
            <Tabs
                value={value}
                onChange={setValue}
                items={tabs}
                full
                variant="secondary"
            />
            {tabs.map(
                ({ children, ...item }) => item.value === value && children,
            )}
        </>
    )
}
