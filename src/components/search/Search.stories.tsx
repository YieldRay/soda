import type { Meta, StoryObj } from '@storybook/react'

import { Search } from '.'
import { IconButton } from '../icon-button'
import { useState } from 'react'

const meta = {
    title: 'Search',
    component: Search,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>

export const Bar: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('')
        return <Search sd="bar" value={value} onChange={setValue}></Search>
    },
}

export const View: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState('')
        return <Search sd="view" value={value} onChange={setValue}></Search>
    },
}

export const WithIcon: Story = {
    args: {
        placeholder: 'placeholder',
        leadingIcon: <IconButton>═</IconButton>,
        trailingIcon: <IconButton>🔍</IconButton>,
    },
}
