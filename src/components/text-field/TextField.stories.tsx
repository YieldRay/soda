import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '.'
import { useState } from 'react'
import { mdiClose, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { IconRippleButton } from '@/composition/IconRippleButton'

const meta = {
    title: 'TextField',
    component: TextField,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        labelText: 'labelText',
        leadingIcon: <Icon path={mdiMagnify} />,
        trailingIcon: <IconRippleButton path={mdiClose} />,
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
                <p>
                    You may use IconRippleButton over IconButton for
                    trailingIcon
                </p>
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
                    trailingIcon={
                        <IconRippleButton
                            onClick={() => setValue('')}
                            path={mdiClose}
                        />
                    }
                />
            </>
        )
    },
}

export const TextareaFilled: Story = {
    args: {
        sd: 'filled',
        textarea: true,
        labelText: 'labelText',
        leadingIcon: undefined,
        trailingIcon: undefined,
        rows: 3,
    },
}

export const TextareaOutlined: Story = {
    args: {
        sd: 'outlined',
        textarea: true,
        labelText: 'labelText',
        leadingIcon: undefined,
        trailingIcon: undefined,
        rows: 3,
    },
}
