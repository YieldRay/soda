import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'

import * as Soda from '.'

// eslint-disable-next-line react-refresh/only-export-components
function Demo() {
    const [value, setValue] = React.useState<string | number>('Edit me!')
    const [chip, setChip] = React.useState(false)
    const [radio, setRadio] = React.useState(false)
    const [switcher, setSwitcher] = React.useState(false)
    const [dialog, setDialog] = React.useState(false)
    const [dialog2, setDialog2] = React.useState(false)
    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'flex-start',
                padding: '1rem',
            }}
        >
            <h1>M3</h1>
            <p style={{ marginTop: '0' }}>underconstruction...</p>

            {['elevated', 'filled', 'outlined', 'tonal', 'text'].map((type) => (
                <Soda.Button key={type} sd={type}>
                    {type}
                </Soda.Button>
            ))}

            {['elevated', 'filled', 'outlined'].map((type) => (
                <Soda.Card key={type} sd={type} style={{ padding: '1rem' }}>
                    {type}
                </Soda.Card>
            ))}

            <Soda.Divider />

            <Soda.TextField labelText="Label text"></Soda.TextField>

            <Soda.TextField
                labelText="Label text"
                sd="outlined"
                leadingIcon={<span>😀</span>}
            ></Soda.TextField>

            <Soda.TextField
                labelText="Label text"
                error
                supportingText="error!"
            ></Soda.TextField>

            <Soda.TextField
                labelText="Label text"
                leadingIcon={<span>😀</span>}
                tailingIcon={<span>╳</span>}
                value={value}
                onChange={setValue}
            ></Soda.TextField>

            <Soda.ListItem
                style={{ maxWidth: '200px' }}
                headline="list here (headline)"
                supportingText="supporting text is sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo long!"
                leadingAvatarLabelText="T"
                trailingSupportingText="100+"
            />

            <Soda.Chip sd="outlined" enabled={true}>
                just a chip!
            </Soda.Chip>
            <Soda.Chip sd="outlined" enabled={false}>
                just a chip!
            </Soda.Chip>
            <Soda.Chip
                sd="tonal"
                leadingIcon={'✨'}
                trailingIcon={'×'}
                enabled={chip}
                onClick={() => setChip(!chip)}
            >
                just a chip!
            </Soda.Chip>

            <Soda.RadioButton checked={radio} onChange={setRadio}>
                <span>{radio ? 'checked' : 'unchecked'}</span>
            </Soda.RadioButton>

            <Soda.Search
                leadingIcon={[1, 2]}
                trailingIcon={[3, 4]}
                placeholder="placeholder"
            ></Soda.Search>

            <Soda.Search
                leadingIcon={[1, 2]}
                trailingIcon={[3, 4]}
                placeholder="placeholder"
                sd="view"
            ></Soda.Search>

            <Soda.Switch checked={switcher} onChange={setSwitcher}>
                {switcher ? (
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                ) : (
                    '×'
                )}
            </Soda.Switch>

            <Soda.Button sd="text" onClick={() => setDialog(true)}>
                open dialog
            </Soda.Button>

            <Soda.Dialog
                headline={'headline'}
                open={dialog}
                onScrimClick={() => setDialog(false)}
                buttons={
                    <>
                        <Soda.Button sd="text" onClick={() => alert('wow!')}>
                            wow!
                        </Soda.Button>
                        <Soda.Button sd="text" onClick={() => setDialog(false)}>
                            close
                        </Soda.Button>
                    </>
                }
            >
                A dialog is a type of modal ndo that appears in front of app
                content to provide critical information, or ask for a decision.
            </Soda.Dialog>

            <Soda.Button sd="text" onClick={() => setDialog2(true)}>
                open fullscreen dialog
            </Soda.Button>

            <Soda.FullScreenDialog
                open={dialog2}
                onCloseClick={() => setDialog2(false)}
                headline={'FullScreenDialog Title'}
                button="Save"
            >
                content
            </Soda.FullScreenDialog>
        </main>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Demo />
    </React.StrictMode>
)
