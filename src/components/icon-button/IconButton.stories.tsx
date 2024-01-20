import type { Meta, StoryObj } from '@storybook/react'

import { IconButton } from '.'
import Icon from '@mdi/react'
import { mdiCheck } from '@mdi/js'

const meta = {
    title: 'components/Button/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { children: <Icon path={mdiCheck}></Icon> },
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
        variant: 'standard',
    },
}
export const Filled: Story = {
    args: {
        variant: 'filled',
    },
}
export const Outlined: Story = {
    args: {
        variant: 'outlined',
    },
}

export const Tonal: Story = {
    args: {
        variant: 'tonal',
    },
}
