import type { Meta, StoryObj } from '@storybook/react'
import { mdiOpenInNew } from '@mdi/js'
import Icon from '@mdi/react'
import { List } from '.'

const meta: Meta<typeof List> = {
    title: 'components/List',
    component: List,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        headline: 'headline',
        supportingText: 'supportingText',
        as: 'a',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        href: '/',
    },
}

export const SingleLine: Story = {
    args: {
        lines: 1,
        leadingIcon: '✨',
        supportingText: '',
        headline: 'headline',
    },
}

export const MultiLine: Story = {
    args: {
        lines: 3,
        leadingIcon: '✨',
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
        trailingIcon: <Icon path={mdiOpenInNew} size={1} />,
    },
}

export const TrailingSupportingText: Story = {
    args: {
        trailingSupportingText: '999+',
    },
}
