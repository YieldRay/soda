import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
