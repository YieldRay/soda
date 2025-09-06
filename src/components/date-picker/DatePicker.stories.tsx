import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker, ModalDatePicker } from '.'
import { Switch } from '../switch'

const meta: Meta<typeof DatePicker> = {
    title: 'components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Docked: Story = {
    args: { variant: 'docked' },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '50vh' }}>
                <Story />
            </div>
        ),
    ],
}

export const Modal: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <ModalDatePicker
                    open={open}
                    onScrimClick={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    onOK={(value) => {
                        setOpen(false)
                        alert(value.toDateString())
                    }}
                    {...args}
                />
                <Switch checked={open} onChange={setOpen} />
            </>
        )
    },
}
