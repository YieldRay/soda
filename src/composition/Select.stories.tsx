import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'
import { List } from '..'
import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'

const fruits = [
    '🍒 Cherry',
    '🍓 Strawberry',
    '🍇 Grape',
    '🍎 Apple',
    '🍉 Watermelon',
    '🍑 Peach',
    '🍊 Orange',
    '🍋 Lemon',
    '🍍 Pineapple',
    '🍌 Banana',
    '🥑 Avocado',
    '🍏 Green Apple',
    '🍈 Melon',
    '🍐 Pear',
    '🥝 Kiwifruit',
    '🥭 Mango',
    '🥥 Coconut',
    '🍅 Tomato',
]

const meta = {
    title: 'composition/Select',
    component: Select,
    tags: ['autodocs'],
    args: {
        options: fruits.map((fruit) => ({ value: fruit })),
        defaultValue: fruits[0],
    },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    decorators: (Story) => (
        <div style={{ padding: '10rem 1rem' }}>{<Story />}</div>
    ),
    render: (props) => <Select {...props} />,
}

export const Customized: Story = {
    decorators: (Story) => (
        <div style={{ padding: '10rem 1rem' }}>{<Story />}</div>
    ),
    args: {
        placement: 'bottom-end',
        children: (value) => (
            <List
                headline={value}
                trailingIcon={<Icon path={mdiChevronRight} size={1} />}
            />
        ),
    },
}
