import type { Meta, StoryObj } from '@storybook/react'

import { Search } from '.'
import { IconButton } from '../icon-button'
import { useState } from 'react'
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
    },
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>

export const Bar: Story = {
    render: (props) => {
        const [value, setValue] = useState('')
        return <Search {...props} sd="bar" value={value} onChange={setValue} />
    },
}

export const View: Story = {
    render: (props) => {
        const [value, setValue] = useState('')
        return <Search {...props} sd="view" value={value} onChange={setValue} />
    },
}

export const WithIcon: Story = {
    args: {
        leadingIcon: <IconButton path={mdiMenu} />,
        trailingIcon: <IconButton path={mdiMagnify} />,
    },
}
