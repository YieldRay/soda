import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '.'
import { useState } from 'react'

const meta = {
    title: 'Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [index, setIndex] = useState(0)
        return (
            <>
                <p>
                    <a
                        href="https://codesandbox.io/s/shy-snowflake-kp6479?file=/src/Select.tsx"
                        target="_blank"
                    >
                        Just a copy of floating-ui demo
                    </a>
                </p>
                <Select
                    items={fruits}
                    selectedIndex={index}
                    onChange={setIndex}
                />
            </>
        )
    },
}

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
