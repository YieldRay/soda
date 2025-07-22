import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlainTooltip } from '.'

const meta: Meta<typeof PlainTooltip> = {
    title: 'components/Tooltip/PlainTooltip',
    component: PlainTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: <>Save to favorites</>,
    },
}
