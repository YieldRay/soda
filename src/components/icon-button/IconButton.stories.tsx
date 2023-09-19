import type { Meta, StoryObj } from '@storybook/react'

import { IconButton } from '.'
import { IconChecked } from '@/utils/icons'

const meta = {
    title: 'IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { children: <IconChecked /> },
    argTypes: {
        disabled: {
            type: 'boolean',
            options: [false, true],
            control: { type: 'radio' },
        },
        selected: {
            type: 'boolean',
            options: [false, true],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
    args: {
        sd: 'standard',
    },
}
export const Filled: Story = {
    args: {
        sd: 'filled',
    },
}
export const Outlined: Story = {
    args: {
        sd: 'outlined',
    },
}

export const Tonal: Story = {
    args: {
        sd: 'tonal',
    },
}
