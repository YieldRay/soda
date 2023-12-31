import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'
import Icon from '@mdi/react'
import { mdiCheck } from '@mdi/js'

const meta = {
    title: 'Button/Button',
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
        sd: 'outlined',
        children: 'Button',
    },
}

export const Filled: Story = {
    args: {
        sd: 'filled',
        children: 'Button',
    },
}

export const Elevated: Story = {
    args: {
        sd: 'elevated',
        children: 'Button',
    },
}

export const Tonal: Story = {
    args: {
        sd: 'tonal',
        children: 'Button',
    },
}

export const Text: Story = {
    args: {
        sd: 'text',
        children: 'Button',
    },
}

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <Icon path={mdiCheck} /> Button
            </>
        ),
    },
}
