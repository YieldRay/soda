import type { Meta, StoryObj } from '@storybook/react-vite'
import { TimePicker } from '.'

const meta: Meta<typeof TimePicker> = {
    title: 'components/TimePicker',
    component: TimePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        onOK: alert,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Vertical: Story = {
    args: {
        direction: 'vertical',
    },
}

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
    },
}

export const Use24hourSystem: Story = {
    args: {
        use24hourSystem: true,
        initShowClock: true,
    },
}
