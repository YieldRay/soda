import type { Meta, StoryObj } from '@storybook/react'
import { DialogHolder } from './DialogHolder'
import { Card } from '../components/card'
import { LinearProgressIndicator } from '../components/progress-indicator'
import { useState } from 'react'
import { Button } from '..'

const meta = {
    title: 'composition/DialogHolder',
    component: DialogHolder,
    tags: ['autodocs'],
} satisfies Meta<typeof DialogHolder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>start loading...</Button>
                <DialogHolder open={open}>
                    <Card style={{ padding: '0.5rem' }}>
                        <div>Still Loading...</div>
                        <LinearProgressIndicator />
                    </Card>
                </DialogHolder>
            </>
        )
    },
}
