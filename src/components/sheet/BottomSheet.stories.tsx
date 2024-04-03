import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'
import { BottomSheet, BottomSheetHandle } from '.'
import { Button } from '../button'
import { List } from '../list'

const meta: Meta<typeof BottomSheet> = {
    title: 'components/Sheet/BottomSheet',
    component: BottomSheet,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const sheetRef = useRef<BottomSheetHandle>(null)
        return (
            <div style={{ willChange: 'transform', minHeight: '400px' }}>
                <Button variant="text" onClick={() => sheetRef.current!.show()}>
                    open bottom sheet
                </Button>

                <BottomSheet
                    fixed
                    ref={sheetRef}
                    onScrimClick={() => sheetRef.current!.hide()}
                >
                    <Button onClick={() => sheetRef.current!.show()}>▲</Button>
                    <p>
                        Set the fixed property to true, so you can toggle it's
                        show and hide via it's ref!
                    </p>
                    <Button onClick={() => sheetRef.current!.hide()}>▼</Button>
                </BottomSheet>
            </div>
        )
    },
}

export const HideDragHandle: Story = {
    render: () => {
        const sheetRef = useRef<BottomSheetHandle>(null)
        return (
            <div style={{ willChange: 'transform', minHeight: '400px' }}>
                <Button variant="text" onClick={() => sheetRef.current!.show()}>
                    open bottom sheet
                </Button>

                <BottomSheet
                    fixed
                    ref={sheetRef}
                    onScrimClick={() => sheetRef.current!.hide()}
                    hideDragHandle
                >
                    <List
                        headline="Apple"
                        onClick={() => sheetRef.current!.hide()}
                    />
                    <List
                        headline="Banana"
                        onClick={() => sheetRef.current!.hide()}
                    />
                    <List
                        headline="Orange"
                        onClick={() => sheetRef.current!.hide()}
                    />
                </BottomSheet>
            </div>
        )
    },
}
