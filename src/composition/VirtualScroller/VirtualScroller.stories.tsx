import type { Meta, StoryObj } from '@storybook/react'
import { VirtualScroller } from './VirtualScroller'

const meta: Meta<typeof VirtualScroller> = {
    title: 'composition/VirtualScroller',
    component: VirtualScroller,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        itemHeight: 20,
        windowHeight: 400,
        bufferSize: 50,
        children(_, index) {
            return (
                <div
                    style={{
                        background:
                            index % 2
                                ? 'var(--md-sys-color-surface-container-low)'
                                : '',
                    }}
                >
                    Item {index}
                </div>
            )
        },
        data: Array.from({ length: 999 }, (_, i) => i + 1),
    },
}
