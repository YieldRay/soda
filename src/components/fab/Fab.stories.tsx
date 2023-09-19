import type { Meta, StoryObj } from '@storybook/react'

import { Fab } from './'

const pencilIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <title>pencil-outline</title>
        <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
    </svg>
)

const meta = {
    title: 'Fab',
    component: Fab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: pencilIcon,
    },
    argTypes: {
        sd: {
            options: ['surface', 'secondary', 'tertiary'],
            control: { type: 'radio' },
        },
        size: {
            options: ['small', 'middle', 'large'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof Fab>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        sd: 'surface',
    },
}

export const Extended: Story = {
    args: {
        sd: 'surface',
        extended: true,
        children: (
            <>
                {pencilIcon}
                Compose
            </>
        ),
    },
}
