import type { Meta, StoryObj } from '@storybook/react'

import { Search } from '.'
import { IconButton } from '../icon-button'
import { mdiMagnify, mdiMenu } from '@mdi/js'

const meta = {
    title: 'components/Search',
    component: Search,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'placeholder',
        leadingIcon: <IconButton path={mdiMenu} />,
        trailingIcon: <IconButton path={mdiMagnify} />,
    },
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>

export const Bar: Story = {
    args: {
        variant: 'bar',
    },
}

export const View: Story = {
    args: {
        variant: 'view',
    },
}
