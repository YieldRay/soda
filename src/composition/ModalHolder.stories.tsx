import type { Meta, StoryObj } from '@storybook/react'
import { ModalHolder } from './ModalHolder'
import { Card } from '../components/card'
import { LinearProgressIndicator } from '../components/progress-indicator'
import { useState } from 'react'
import { Button } from '..'

const meta = {
    title: 'composition/ModalHolder',
    component: ModalHolder,
    tags: ['autodocs'],
} satisfies Meta<typeof ModalHolder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>start loading...</Button>
                <ModalHolder open={open} onScrimClick={() => setOpen(false)}>
                    <Card style={{ padding: '0.5rem' }}>
                        <div>Still Loading...</div>
                        <LinearProgressIndicator />
                    </Card>
                </ModalHolder>
            </>
        )
    },
}
