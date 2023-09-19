import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedButton } from '.'
import { useState } from 'react'

const meta = {
    title: 'SegmentedButton',
    component: SegmentedButton,
    tags: ['autodocs'],
} satisfies Meta<typeof SegmentedButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const values = [
            {
                value: 'enabled',
                label: <>✅ Enabled</>,
            },
            {
                value: 'unknown',
                label: <>🔄 Unknown</>,
                disabled: true,
            },
            {
                value: 'disabled',
                label: <>❎ disabled</>,
            },
        ]
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState<string>('disabled')
        return (
            <SegmentedButton
                values={values}
                value={value}
                onChange={(v) => setValue(v)}
            />
        )
    },
}
