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
