import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedButton } from '.'
import { useState } from 'react'
import { mdiCheck, mdiStarOutline, mdiTriangleOutline } from '@mdi/js'
import Icon from '@mdi/react'

const meta = {
    title: 'Button/SegmentedButton',
    component: SegmentedButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SegmentedButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const items = [
            {
                value: 'enabled',
                label: (
                    <>
                        <Icon path={mdiStarOutline} /> Enabled
                    </>
                ),
            },
            {
                value: 'unknown',
                label: (
                    <>
                        <Icon path={mdiCheck} /> Selected
                    </>
                ),
                disabled: true,
            },
            {
                value: 'disabled',
                label: (
                    <>
                        <Icon path={mdiTriangleOutline} /> Unknown
                    </>
                ),
            },
        ]
        const [activeIndex, setActiveIndex] = useState(0)
        return (
            <SegmentedButton
                items={items}
                activeIndex={activeIndex}
                onChange={(i) => setActiveIndex(i)}
            />
        )
    },
}
