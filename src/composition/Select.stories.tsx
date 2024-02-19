import type { Meta, StoryObj } from '@storybook/react'
import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import { List } from '../components/list'
import { Select } from './Select'

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
    parameters: {
        layout: 'centered',
    },
    args: {
        options: fruits.map((fruit) => ({ value: fruit })),
        defaultValue: fruits[3],
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
        <div style={{ padding: '10rem 1rem', minWidth: '50vw' }}>
            {<Story />}
        </div>
    ),
    args: {
        placement: 'bottom-end',
        full: true,
        children: (value) => (
            <List
                full
                headline={value}
                trailingIcon={<Icon path={mdiChevronRight} size={1} />}
            />
        ),
    },
}
