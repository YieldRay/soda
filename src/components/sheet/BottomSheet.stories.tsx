import type { Meta, StoryObj } from '@storybook/react'

import { BottomSheet, BottomSheetHandle } from '.'
import { Button } from '../button'
import { useRef } from 'react'

const meta = {
    title: 'Sheet/BottomSheet',
    component: BottomSheet,
    tags: ['autodocs'],
} satisfies Meta<typeof BottomSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const sheetRef = useRef<BottomSheetHandle>(null)
        return (
            <div style={{ width: '400px', height: '400px' }}>
                <Button
                    sd="text"
                    onClick={() => {
                        sheetRef.current?.show()
                    }}
                >
                    open bottom sheet
                </Button>

                <BottomSheet
                    ref={sheetRef}
                    onScrimClick={() => sheetRef.current?.hide()}
                >
                    <Button onClick={() => sheetRef.current?.show()}>▲</Button>
                    <p>bottom sheet</p>
                    <p>
                        support <code>{`portalTo={document.body}`}</code> so you
                        can port it to global
                    </p>
                    <Button onClick={() => sheetRef.current?.hide()}>▼</Button>
                </BottomSheet>
            </div>
        )
    },
}
