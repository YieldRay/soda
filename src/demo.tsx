import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'

import { TextFields } from './components/TextFields'
import { Button } from './components/Button'
import { Card } from './components/Card'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <main
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
            <h1>M3</h1>
            <p>underconstruction...</p>

            {['elevated', 'filled', 'outlined'].map((type) => (
                <Button key={type} class={type}>
                    {type}
                </Button>
            ))}

            {['elevated', 'filled', 'outlined'].map((type) => (
                <Card key={type} class={type} style={{ padding: '1rem' }}>
                    {type}
                </Card>
            ))}

            <TextFields labelText="Label text"></TextFields>

            <TextFields
                labelText="Label text"
                leadingIcon={<span>😀</span>}
                tailingIcon={<span>╳</span>}
                value={'readonly!'}
                disabled
                readonly
            ></TextFields>
        </main>
    </React.StrictMode>
)
