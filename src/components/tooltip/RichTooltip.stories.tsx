import type { Meta, StoryObj } from '@storybook/react'

import { RichTooltip } from '.'

const meta = {
    title: 'Tooltip/RichTooltip',
    component: RichTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RichTooltip>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
    args: {
        subhead: <>Rich tooltip</>,
        children: (
            <>
                Rich tooltips bring attention to a particular element of feature
                that warrants the user's focus.
            </>
        ),
        action: <span>Action</span>,
        onActionClick() {
            console.log('clicked!')
        },
    },
}
