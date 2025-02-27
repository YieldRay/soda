import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SodaImage } from '../SodaImage'
import { RefreshIndicator } from './RefreshIndicator'

const meta: Meta<typeof RefreshIndicator> = {
    title: 'composition/RefreshIndicator',
    component: RefreshIndicator,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const w = 400,
            h = 300

        const gen = (length = 1) =>
            Array.from(
                { length },
                () => `https://picsum.photos/${w}/${h}?random=${Math.random()}`,
            )
        const [list, setList] = useState(gen(10))

        return (
            <RefreshIndicator
                onRefresh={() =>
                    new Promise((r) =>
                        setTimeout(() => {
                            r()
                            setList(gen(10))
                        }, 2000),
                    )
                }
                style={{
                    background: 'var(--md-sys-color-primary-container)',
                    height: '400px',
                    overflow: 'auto',
                }}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {list.map((src) => (
                        <SodaImage key={src} src={src} width={w} height={h} />
                    ))}
                </div>
            </RefreshIndicator>
        )
    },
}
