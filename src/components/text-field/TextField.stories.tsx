import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'
import { IconClose, IconMagnify } from '@/utils/icons'
import { useState } from 'react'

const meta = {
    title: 'TextField',
    component: TextField,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        labelText: 'labelText',
        leadingIcon: <IconMagnify />,
        trailingIcon: <IconClose />,
        placeholder: 'placeholder',
    },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Filled: Story = {
    args: {
        sd: 'filled',
    },
}

export const Outlined: Story = {
    args: {
        sd: 'outlined',
    },
}

export const Error: Story = {
    args: {
        error: true,
        supportingText: 'supportingText',
    },
}

export const WithoutLabelText: Story = {
    render: () => {
        const [value, setValue] = useState('edit me plz')

        return (
            <>
                <p>You can use supportingText to display string length</p>
                <TextField
                    inputRef={(e) => {
                        console.dir(e)
                    }}
                    placeholder="placeholder"
                    value={value}
                    onChange={setValue}
                    supportingText={
                        <span style={{ float: 'right' }}>
                            {value.length}/100
                        </span>
                    }
                />
            </>
        )
    },
}

export const Textarea: Story = {
    args: {
        textarea: true,
        labelText: 'labelText',
        leadingIcon: undefined,
        trailingIcon: undefined,
        rows: 3,
    },
}
