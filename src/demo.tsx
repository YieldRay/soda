import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'

import { TextField } from './components/TextField'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Divider } from './components/Divider'
import { ListItem } from './components/List'

// eslint-disable-next-line react-refresh/only-export-components
function Demo() {
    const [value, setValue] = React.useState<string | number>('Edit me!')
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
                <Button key={type} sd={type}>
                    {type}
                </Button>
            ))}

            {['elevated', 'filled', 'outlined'].map((type) => (
                <Card key={type} sd={type} style={{ padding: '1rem' }}>
                    {type}
                </Card>
            ))}

            <Divider />

            <TextField labelText="Label text"></TextField>

            <TextField
                labelText="Label text"
                sd="outlined"
                leadingIcon={<span>😀</span>}
            ></TextField>

            <TextField
                labelText="Label text"
                error
                supportingText="error!"
            ></TextField>

            <TextField
                labelText="Label text"
                leadingIcon={<span>😀</span>}
                tailingIcon={<span>╳</span>}
                value={value}
                onChange={setValue}
            ></TextField>

            <ListItem
                style={{ 'max-width': '200px' }}
                headline="list here (headline)"
                supportingText="supporting text is sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo long!"
                leadingAvatarLabelText="T"
                trailingSupportingText="100+"
            />
        </main>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Demo />
    </React.StrictMode>,
)
