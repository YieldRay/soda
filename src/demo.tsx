import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'

import * as Soda from '.'

// eslint-disable-next-line react-refresh/only-export-components
function Demo() {
    const [value, setValue] = React.useState<string | number>('Edit me!')
    const [chip, setChip] = React.useState(false)
    const [radio, setRadio] = React.useState(false)
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
                trailingIcon={'╳'}
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
        </main>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Demo />
    </React.StrictMode>
)
