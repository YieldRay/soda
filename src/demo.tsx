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
    const [checkbox, setCheckbox] = React.useState(false)
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>check</title>
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>close</title>
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                        />
                    </svg>
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

            <Soda.Checkbox
                checked={checkbox}
                onChange={setCheckbox}
            ></Soda.Checkbox>
        </main>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Demo />
    </React.StrictMode>
)
