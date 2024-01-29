import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'

const meta = {
    title: 'components/Button/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            type: 'boolean',
            options: [false, true],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        children: 'Button',
    },
}

export const Filled: Story = {
    args: {
        variant: 'filled',
        children: 'Button',
    },
}

export const Elevated: Story = {
    args: {
        variant: 'elevated',
        children: 'Button',
    },
}

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        children: 'Button',
    },
}

export const Text: Story = {
    args: {
        variant: 'text',
        children: 'Button',
    },
}

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <Icon size="20px" path={mdiAccount} /> Button
            </>
        ),
    },
}
