import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { LinearProgressIndicator } from '@/components/progress-indicator'
import { Portal } from '@/utils/Portal'
import { Scrim } from './Scrim'

const meta: Meta<typeof Scrim> = {
    title: 'composition/Scrim',
    component: Scrim,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>start loading...</Button>
                <Portal container={document.body}>
                    <Scrim
                        center
                        open={open}
                        onScrimClick={() => setOpen(false)}
                    >
                        <Card style={{ padding: '0.5rem' }}>
                            <div>Still Loading...</div>
                            <LinearProgressIndicator />
                        </Card>
                    </Scrim>
                </Portal>
            </>
        )
    },
}

export const UnmountOnClose: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>start loading...</Button>
                <Portal container={document.body}>
                    <Scrim
                        center
                        open={open}
                        onScrimClick={() => setOpen(false)}
                        unmountOnClose
                    >
                        <Card style={{ padding: '0.5rem' }}>
                            <div>Still Loading...</div>
                            <LinearProgressIndicator />
                        </Card>
                    </Scrim>
                </Portal>
            </>
        )
    },
}
