import type { Meta, StoryObj } from '@storybook/react'

import { ListItem } from '.'

const meta = {
    title: 'ListItem',
    component: ListItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        headline: 'headline',
        supportingText: 'supportingText',
    },
} satisfies Meta<typeof ListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}

export const Multiline: Story = {
    args: {
        lines: 3,
        supportingText: `this sentence is too l${'o'.repeat(100)}ng!`,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '400px' }}>
                <Story />
            </div>
        ),
    ],
}

export const LeadingIcon: Story = {
    args: {
        leadingIcon: '✨',
    },
}

export const LeadingAvatarLabelText: Story = {
    args: {
        leadingAvatarLabelText: 'A',
    },
}

export const TrailingIcon: Story = {
    args: {
        trailingIcon: '✨',
    },
}

export const TrailingSupportingText: Story = {
    args: {
        trailingSupportingText: '999+',
    },
}
