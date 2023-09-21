import type { Meta, StoryObj } from '@storybook/react'

import { Search } from '.'
import { IconButton } from '../icon-button'
import { useState } from 'react'
import { IconMagnify, IconMenu } from '@/utils/icons'

const meta = {
    title: 'Search',
    component: Search,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'placeholder',
    },
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>

export const Bar: Story = {
    render: (props) => {
        const [value, setValue] = useState('')
        return (
            <Search
                {...props}
                sd="bar"
                value={value}
                onChange={setValue}
            ></Search>
        )
    },
}

export const View: Story = {
    render: (props) => {
        const [value, setValue] = useState('')
        return (
            <Search
                {...props}
                sd="view"
                value={value}
                onChange={setValue}
            ></Search>
        )
    },
}

export const WithIcon: Story = {
    args: {
        leadingIcon: (
            <IconButton>
                <IconMenu />
            </IconButton>
        ),
        trailingIcon: (
            <IconButton>
                <IconMagnify />
            </IconButton>
        ),
    },
}
